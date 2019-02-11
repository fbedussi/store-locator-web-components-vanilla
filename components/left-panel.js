import {
    dispatch,
} from '../state/state-manager.js';
import { toggleSearchLayerAction } from '../state/actions.js';

class LeftPanel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('touchstart', (ev) => {
            this.touchStart = ev.touches[0].clientX;
        }, {passive: true});
        this.addEventListener('touchend', (ev) => {
            if (this.touchStart - ev.changedTouches[0].clientX > 100) {
                dispatch(toggleSearchLayerAction());
            }
        }, {passive: true});
    }

    static get observedAttributes() {
        return ['open'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.setOpen(newValue === 'true' ? true : false);
    };

    setOpen(newValue) { 
        this.open = newValue;
        this.update(newValue);
    }

    update(open) {
        this.className = open ? 'slide-in-left' : 'slide-out-right';
    }
}

window.customElements.define('left-panel', LeftPanel);