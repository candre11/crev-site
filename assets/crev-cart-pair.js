if (!customElements.get('crev-cart-pair')) {
  customElements.define(
    'crev-cart-pair',
    class extends HTMLElement {
      static dismissed = new Set();

      connectedCallback() {
        this.storageKey = 'crev-cart-pair-dismissed';
        let dismissed = this.constructor.dismissed.has(this.storageKey);
        try {
          dismissed ||= sessionStorage.getItem(this.storageKey) === 'true';
        } catch {
          // The in-memory preference still survives cart updates if storage is unavailable.
        }
        if (dismissed) {
          this.hidden = true;
          return;
        }

        this.button = this.querySelector('[data-dismiss-pair]');
        this.onDismiss = () => this.dismiss();
        this.onSharedDismiss = (event) => {
          if (event.detail.key === this.storageKey) this.hidden = true;
        };
        this.button?.addEventListener('click', this.onDismiss);
        document.addEventListener('crev:cart-pair-dismiss', this.onSharedDismiss);

        const drawer = this.closest('cart-drawer');
        if (drawer) {
          let wasOpen = drawer.classList.contains('active');
          this.observer = new MutationObserver(() => {
            const isOpen = drawer.classList.contains('active');
            if (wasOpen && !isOpen) this.dismiss();
            wasOpen = isOpen;
          });
          this.observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
        }
      }

      dismiss() {
        if (this.hidden) return;
        const hadFocus = this.contains(document.activeElement);
        this.hidden = true;
        this.constructor.dismissed.add(this.storageKey);
        try {
          sessionStorage.setItem(this.storageKey, 'true');
        } catch {
          // Dismissal never blocks the cart or checkout.
        }
        if (hadFocus) {
          const focusTarget = this.closest('.drawer__inner') || this.closest('#main-cart-footer')?.querySelector('#checkout');
          focusTarget?.focus({ preventScroll: true });
        }
        document.dispatchEvent(new CustomEvent('crev:cart-pair-dismiss', { detail: { key: this.storageKey } }));
      }

      disconnectedCallback() {
        this.button?.removeEventListener('click', this.onDismiss);
        if (this.onSharedDismiss) document.removeEventListener('crev:cart-pair-dismiss', this.onSharedDismiss);
        this.observer?.disconnect();
      }
    }
  );
}
