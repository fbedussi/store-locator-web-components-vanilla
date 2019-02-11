import {
    dispatch,
} from '../state/state-manager.js';
import { toggleSearchLayerAction } from '../state/actions.js';

class SearchOpener extends HTMLButtonElement {
    // constructor() {
    //     super();
    // }

    connectedCallback() {
        this.addEventListener('click', function () {
            dispatch(toggleSearchLayerAction());
        })
    }
}

window.customElements.define('search-opener', SearchOpener, { extends: 'button' });