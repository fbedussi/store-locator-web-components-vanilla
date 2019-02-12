import {
    dispatch,
} from '../state/state-manager.js';
import { toggleSearchLayerAction } from '../state/actions.js';

class SearchOpener extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.querySelector('button').addEventListener('click', function () {
            dispatch(toggleSearchLayerAction());
        })
    }
}

window.customElements.define('search-opener', SearchOpener);