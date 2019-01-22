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
        const alreadyRendered = this.querySelectorAll('stores-list-element').length;
        
        if (alreadyRendered) {
            this.update(newValue);
        } else {
            this.render(newValue);
        }
    }

    render(allStores) {
        const ul = document.createElement('ul');

        allStores.forEach((store) => {
            const storeListElement = document.createElement('stores-list-element');
            storeListElement.store = store;
            storeListElement.hidden = !store.visible;
            ul.appendChild(storeListElement);
        });

        this.innerHTML = '';
        this.appendChild(ul);
    }

    update(stores) {
        const renderedStores = this.querySelectorAll('stores-list-element');

        renderedStores.forEach((renderedStore) => {
            renderedStore.hidden = !stores.find((store) => store.id === renderedStore.storeId).visible;
        })
    }
}

window.customElements.define('stores-list', StoresList);