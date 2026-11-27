if (!customElements.get('crev-product-viewport')) {
  customElements.define(
    'crev-product-viewport',
    class extends HTMLElement {
      connectedCallback() {
        this.product = this.closest('product-info');
        this.summary = this.product?.querySelector('.crev-product__summary');
        if (!this.summary) return;

        this.measure = () => {
          cancelAnimationFrame(this.frame);
          this.frame = requestAnimationFrame(() => {
            const height = `${Math.ceil(this.summary.getBoundingClientRect().height)}px`;
            if (height !== this.height) {
              this.height = height;
              this.product.style.setProperty('--crev-summary-height', height);
            }
          });
        };

        this.observer = new ResizeObserver(this.measure);
        this.observer.observe(this.summary);
        document.fonts?.ready.then(() => this.isConnected && this.measure());
        this.measure();
      }

      disconnectedCallback() {
        this.observer?.disconnect();
        cancelAnimationFrame(this.frame);
      }
    }
  );
}
