import {
    dispatch,
} from '../state/state-manager.js';
import { toggleSearchLayerAction } from '../state/actions.js';

class SearchOpener extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =/*html*/`
            <span class="icon">${SearchIcon()}</span>
            <span class="text visuallyHidden">Search</span>
        `;
        this.addEventListener('click', function () {
            dispatch(toggleSearchLayerAction());
        })
    }
}

window.customElements.define('search-opener', SearchOpener, { extends: 'button' });