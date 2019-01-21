import {
    openStoreDetailsAction,
} from '../state/actions.js';
import { 
    dispatch, 
} from '../state/state-manager.js';

class StoreDetails extends HTMLElement {
    constructor() {
        super();
        this.name = this.querySelector('.store_name');
        this.phone = this.querySelector('.store_phone .text');
        this.mail = this.querySelector('.store_mail .text a');
    }
    
    connectedCallback() {
        this.querySelector('.backButton').addEventListener('click', this.closePanel.bind(this));
    }

    static get observedAttributes() {
        return ['store'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.update(newValue);
    };

    get store() { 
        return this.getAttribute('store');
    }

    set store(newValue) { 
        this.update(newValue);
    } 

    update(store) {
        this.classList.toggle('slide-in-left', store); 
        this.classList.toggle('slide-out-right', !store); 

        if (!store) {
            return;
        }
        
        this.name.innerText = store.name;
        this.phone.innerText = store.phone;
        this.mail.innerText = store.mail;
        this.mail.href = 'mailto:' + store.mail;
    }

    closePanel() {
        dispatch(openStoreDetailsAction(null));
    }
}

window.customElements.define('store-details', StoreDetails);
