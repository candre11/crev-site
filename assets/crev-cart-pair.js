if (!customElements.get('crev-cart-pair')) {
  customElements.define(
    'crev-cart-pair',
    class extends HTMLElement {
      static dismissed = new Set();

      connectedCallback() {
        this.storageKey = 'crev-cart-pair-dismissed';
        this.drawer = this.closest('cart-drawer');
        this.link = this.querySelector('.crev-cart-pair__monkey');
        this.onClick = (event) => {
          if (this.hidden) return;
          if (this.link?.contains(event.target)) {
            this.dismiss(false);
            return;
          }
          // Consume this click so dismissing never also checks out or closes the cart.
          event.preventDefault();
          event.stopImmediatePropagation();
          this.dismiss();
        };
        this.onKeydown = (event) => {
          if (this.hidden) return;
          if (event.key === 'Escape') {
            this.consumeEscapeKeyup = true;
            event.preventDefault();
            event.stopImmediatePropagation();
            this.dismiss();
          } else if (event.key === 'Tab') {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.link?.focus({ preventScroll: true });
          }
        };
        this.onKeyup = (event) => {
          if (event.key === 'Escape' && this.consumeEscapeKeyup) {
            this.consumeEscapeKeyup = false;
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        };
        this.onSharedDismiss = (event) => {
          if (event.detail.key === this.storageKey) {
            this.hidden = true;
            this.updateCursor();
          }
        };
        document.addEventListener('click', this.onClick, true);
        document.addEventListener('keydown', this.onKeydown, true);
        document.addEventListener('keyup', this.onKeyup, true);
        document.addEventListener('crev:cart-pair-dismiss', this.onSharedDismiss);

        if (this.drawer) {
          let wasOpen = this.drawer.classList.contains('active');
          this.observer = new MutationObserver(() => {
            const isOpen = this.drawer.classList.contains('active');
            if (wasOpen && !isOpen) this.dismiss(false);
            else this.syncVisibility();
            wasOpen = isOpen;
          });
          this.observer.observe(this.drawer, { attributes: true, attributeFilter: ['class'] });
          this.onTransitionEnd = (event) => {
            if (!this.hidden && event.target.classList.contains('drawer__inner')) {
              this.link?.focus({ preventScroll: true });
            }
          };
          this.drawer.addEventListener('transitionend', this.onTransitionEnd);
        }
        this.syncVisibility();
      }

      syncVisibility() {
        let dismissed = this.constructor.dismissed.has(this.storageKey);
        try {
          dismissed ||= sessionStorage.getItem(this.storageKey) === 'true';
        } catch {
          // The in-memory preference survives Ajax cart updates without storage.
        }
        const wasHidden = this.hidden;
        this.hidden = dismissed || Boolean(this.drawer && !this.drawer.classList.contains('active'));
        this.updateCursor();
        if (wasHidden && !this.hidden) this.link?.focus({ preventScroll: true });
      }

      updateCursor() {
        document.body.classList.toggle('crev-cart-pair-open', Boolean(document.querySelector('crev-cart-pair:not([hidden])')));
      }

      dismiss(restoreFocus = true) {
        if (this.hidden) return;
        const hadFocus = this.contains(document.activeElement);
        this.hidden = true;
        this.updateCursor();
        this.constructor.dismissed.add(this.storageKey);
        try {
          sessionStorage.setItem(this.storageKey, 'true');
        } catch {
          // Dismissal never blocks the cart or checkout.
        }
        if (restoreFocus && hadFocus) {
          const focusTarget = this.drawer?.querySelector('.drawer__close') || this.closest('#main-cart-footer')?.querySelector('#checkout');
          focusTarget?.focus({ preventScroll: true });
        }
        document.dispatchEvent(new CustomEvent('crev:cart-pair-dismiss', { detail: { key: this.storageKey } }));
      }

      disconnectedCallback() {
        document.removeEventListener('click', this.onClick, true);
        document.removeEventListener('keydown', this.onKeydown, true);
        document.removeEventListener('keyup', this.onKeyup, true);
        document.removeEventListener('crev:cart-pair-dismiss', this.onSharedDismiss);
        this.drawer?.removeEventListener('transitionend', this.onTransitionEnd);
        this.observer?.disconnect();
        this.updateCursor();
      }
    }
  );
}
