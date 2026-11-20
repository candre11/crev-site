if (!customElements.get('crev-hero-joke')) {
  customElements.define(
    'crev-hero-joke',
    class extends HTMLElement {
      connectedCallback() {
        this.hero = this.closest('.crev-photo-hero');
        this.dialog = this.querySelector('dialog');
        const trigger = this.hero?.querySelector('[data-crev-joke-open]');
        if (!trigger || !this.dialog || this.controller) return;

        this.controller = new AbortController();
        const { signal } = this.controller;
        trigger.addEventListener('click', () => {
          if (this.dialog.open) return;
          this.hero.classList.add('is-joke-open');
          document.body.classList.add('crev-joke-open');
          this.dialog.showModal();
        }, { signal });
        // Native modal dialogs route backdrop clicks to the dialog as well.
        this.dialog.addEventListener('click', () => this.dialog.close(), { signal });
        this.dialog.addEventListener('close', () => this.clearBlur(), { signal });
      }

      clearBlur() {
        this.hero?.classList.remove('is-joke-open');
        document.body.classList.remove('crev-joke-open');
      }

      disconnectedCallback() {
        if (this.dialog?.open) this.dialog.close();
        this.controller?.abort();
        this.controller = null;
        this.clearBlur();
      }
    }
  );
}
