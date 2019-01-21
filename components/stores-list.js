import { 
    subscribePartialState, 
    dispatch 
} from '../state/state-manager.js';
import {
    openStoreDetailsAction,
    hideLoadingAction,
    showLoadingAction,
} from '../state/actions.js';
import './stores-list-element.js';

class StoresList extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        
    }

    static get observedAttributes() {
        return ['stores'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.update(JSON.parse(newValue));
    };

    get stores() { 
        return this.getAttribute('stores');
    }

    set stores(newValue) { 
        this.update(newValue);
    } 

    update(stores) {
        const ul = document.createElement('ul');
        
        stores.forEach((store) => {
            const storeListElement = document.createElement('stores-list-element');
            storeListElement.store = store;
            ul.appendChild(storeListElement);
        });
        
        this.innerHTML = '';
        this.appendChild(ul);
    }
}

window.customElements.define('stores-list', StoresList);