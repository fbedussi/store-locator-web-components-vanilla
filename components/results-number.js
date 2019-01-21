class ResultsNumber extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['stores-number'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.update(newValue);
    };

    get storesNumber() { 
        return this.getAttribute('stores-number');
    }

    set storesNumber(newValue) { 
        this.update(newValue);
    } 

    update(value) {
        const numebrOfSelectedStores = Number(value);
        const texts = [
            'No store found, check che search query',
            '1 store found',
            `${numebrOfSelectedStores} stores found`];
        this.innerText = texts[Math.min(2, numebrOfSelectedStores)];
    }
}

window.customElements.define('results-number', ResultsNumber);

