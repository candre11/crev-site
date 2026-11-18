if (!customElements.get('crev-acronym')) {
  class CrevAcronym extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      this.buttons = Array.from(this.querySelectorAll('.crev-acronym__letter'));
      const { signal } = this.controller;

      this.close();
      this.classList.add('is-enhanced');

      this.buttons.forEach((button) => {
        button.addEventListener(
          'pointerenter',
          (event) => {
            if (event.pointerType === 'mouse' || event.pointerType === 'pen') this.open(button);
          },
          { signal }
        );

        button.addEventListener(
          'click',
          () => {
            if (button.getAttribute('aria-expanded') === 'true') this.close();
            else this.open(button);
          },
          { signal }
        );

        button.addEventListener(
          'focus',
          () => {
            if (button.matches(':focus-visible')) this.open(button);
          },
          { signal }
        );
      });

      this.addEventListener(
        'pointerleave',
        (event) => {
          if (
            (event.pointerType === 'mouse' || event.pointerType === 'pen') &&
            !this.buttons.some((button) => button.matches(':focus-visible'))
          ) {
            this.close();
          }
        },
        { signal }
      );

      this.addEventListener(
        'focusout',
        (event) => {
          if (!this.contains(event.relatedTarget)) this.close();
        },
        { signal }
      );

      this.ownerDocument.addEventListener(
        'pointerdown',
        (event) => {
          if (!this.contains(event.target)) this.close();
        },
        { signal }
      );

      this.ownerDocument.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape') this.close();
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    open(activeButton) {
      this.buttons.forEach((button) => {
        button.setAttribute('aria-expanded', String(button === activeButton));
      });
    }

    close() {
      this.buttons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
    }
  }

  customElements.define('crev-acronym', CrevAcronym);
}
