
import {
    dispatch,
} from '../state/state-manager.js';
import {
    toggleStoreTypeAction,
} from '../state/actions.js';

class FilterBtn extends HTMLElement {
    constructor() {
        super();
        this.template = document.querySelector('#filter-btn-template');
    }
    
    connectedCallback() {
        this.innerHTML = this.template.innerHTML;
        this.text = this.querySelector('.text');
        this.icon = this.querySelector('.icon');
        this.finalClassName = 'icon';
        this.addEventListener('click', this.handleFilterClick.bind(this));
        this.icon.addEventListener('transitionend', () => {
            this.icon.className = this.finalClassName;
        });
    }

    static get observedAttributes() {
        return ['applied', 'filter'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'filter':
                this.setFilter(newValue);
                break;
            case 'applied':
                this.setApplied(newValue);
                break;
        }
        this.update(name, newValue);
    };

    setFilter(newValue) {
        this.filger = newValue;
        this.handleFilter(newValue);
    }

    setApplied(newValue) {
        this.applied = newValue;
        this.handleApplied(newValue);
    }

    handleFilter(filter = {name: '',id: ''}) {
        this.text.innerText = filter.name;
        this.filterId = filter.id;
    }

    handleApplied(applied) {
        const className = applied ? 'icon fade-in' : 'icon fade-out';
        this.finalClassName = applied ? 'icon visible' : 'icon invisible';
        if (this.icon) {
            this.icon.className = className;
        }
    }

    handleFilterClick(event) {
        dispatch(toggleStoreTypeAction(this.filterId));
    }

}

window.customElements.define('filter-btn', FilterBtn);