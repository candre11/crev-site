if (!customElements.get('crev-photo-pan')) {
  customElements.define(
    'crev-photo-pan',
    class extends HTMLElement {
      connectedCallback() {
        const canvas = this.querySelector('.crev-photo-hero__canvas');
        if (!canvas || this.controller) return;

        this.controller = new AbortController();
        const { signal } = this.controller;
        const focus = Number(this.dataset.focus);
        this.positionRatio = Number.isFinite(focus) ? Math.min(1, Math.max(0, focus / 100)) : 0.28;
        this.maximumScroll = -1;
        this.suppressClick = false;

        this.addEventListener('scroll', () => {
          const maximum = this.scrollWidth - this.clientWidth;
          // A resize can clamp scrollLeft before ResizeObserver restores the framing.
          if (maximum === this.maximumScroll && maximum > 0) {
            this.positionRatio = Math.min(1, Math.max(0, this.scrollLeft / maximum));
          }
        }, { signal, passive: true });

        this.addEventListener('pointerdown', (event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          this.suppressClick = false;
          if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
          this.gesture = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            scroll: this.scrollLeft,
            dragging: false,
          };
        }, { signal });

        this.addEventListener('pointermove', (event) => {
          const gesture = this.gesture;
          if (!gesture || gesture.id !== event.pointerId || this.maximumScroll <= 0) return;
          if (!(event.buttons & 1)) {
            this.gesture = null;
            this.classList.remove('is-dragging');
            return;
          }
          const dx = event.clientX - gesture.x;
          const dy = event.clientY - gesture.y;
          if (!gesture.dragging) {
            if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
              this.gesture = null;
              return;
            }
            if (Math.abs(dx) <= 8 || Math.abs(dx) <= Math.abs(dy)) return;
            gesture.dragging = true;
            this.setPointerCapture(event.pointerId);
            this.classList.add('is-dragging');
          }
          event.preventDefault();
          this.scrollLeft = gesture.scroll - dx;
        }, { signal });

        const finishGesture = (event) => {
          const gesture = this.gesture;
          if (!gesture || gesture.id !== event.pointerId) return;
          this.suppressClick = gesture.dragging && event.type === 'pointerup';
          this.gesture = null;
          this.classList.remove('is-dragging');
          if (this.hasPointerCapture(event.pointerId)) this.releasePointerCapture(event.pointerId);
        };
        this.addEventListener('pointerup', finishGesture, { signal });
        this.addEventListener('pointercancel', finishGesture, { signal });
        this.addEventListener('lostpointercapture', finishGesture, { signal });

        this.addEventListener('click', (event) => {
          if (!this.suppressClick) return;
          this.suppressClick = false;
          if (event.detail === 0) return;
          event.preventDefault();
          event.stopImmediatePropagation();
        }, { signal, capture: true });
        this.addEventListener('dragstart', (event) => event.preventDefault(), { signal });

        this.addEventListener('keydown', (event) => {
          if (event.target !== this || event.ctrlKey || event.metaKey || event.altKey) return;
          let left;
          if (event.key === 'ArrowLeft') left = this.scrollLeft - this.clientWidth / 2;
          else if (event.key === 'ArrowRight') left = this.scrollLeft + this.clientWidth / 2;
          else if (event.key === 'Home') left = 0;
          else if (event.key === 'End') left = this.maximumScroll;
          else return;
          event.preventDefault();
          this.scrollTo({
            left,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }, { signal });

        this.observer = new ResizeObserver(() => this.updateFraming());
        this.observer.observe(this);
        this.observer.observe(canvas);
        this.updateFraming();
      }

      updateFraming() {
        const maximum = Math.max(0, this.scrollWidth - this.clientWidth);
        if (maximum === this.maximumScroll) return;
        this.maximumScroll = maximum;
        this.scrollLeft = maximum * this.positionRatio;
        this.classList.toggle('is-pannable', maximum > 0);
      }

      disconnectedCallback() {
        this.observer?.disconnect();
        this.controller?.abort();
        this.controller = null;
        this.gesture = null;
        this.classList.remove('is-dragging');
      }
    }
  );
}
