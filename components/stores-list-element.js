import { 
    dispatch 
} from '../state/state-manager.js';
import {
    openStoreDetailsAction,
} from '../state/actions.js';

const template = document.querySelector('#storeListElement');

class StoresListElement extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
    }

    static get observedAttributes() {
        return ['store'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.setStore(JSON.parse(newValue));
    };

    setStore(newValue) {
        this.store = newValue;
        this.update(newValue);
    }

    update(store) {
        this.innerHTML = template.innerHTML;
        this.storeId = store.id;
        this.querySelector('.storeName').innerText = store.name;
        this.querySelector('.storePhone .text').innerText = store.phone;
        this.addEventListener('click', this.handleStoreClick.bind(this, store));
    }

    handleStoreClick(store) {
        dispatch(openStoreDetailsAction(store));
    }
}

window.customElements.define('stores-list-element', StoresListElement);