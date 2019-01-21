import {
    getState,
    dispatch,
    subscribePartialState,
} from '../state/state-manager.js';
import { getAnimationClass } from '../wc-utils.js';
import { toggleSearchLayerAction } from '../state/actions.js';

class LeftPanel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // this.render();
        // subscribePartialState('ui.searchLayerOpen', (state, oldState) => {
        //     this.className = getAnimationClass(state.ui.searchLayerOpen, oldState && oldState.ui.searchLayerOpen, ['hiddenLight', 'slide-in-left', '', 'slide-out-right'])
        // });
        // subscribePartialState('ui.showLoading', (state) => {
        //     this.loading.classList.toggle('show', state.ui.showLoading);
        // });
        // this.addEventListener('animationend', function() {
        //     const state = getState();
        //     this.className = getAnimationClass(state.ui.searchLayerOpen, state.ui.searchLayerOpen, ['hiddenLight', 'slide-in-left', '', 'slide-out-right'])
        // });
        // this.addEventListener('touchstart', (ev) => {
        //     this.touchStart = ev.touches[0].clientX;
        // }, {passive: true});
        // this.addEventListener('touchend', (ev) => {
        //     if (this.touchStart - ev.changedTouches[0].clientX > 100) {
        //         dispatch(toggleSearchLayerAction());
        //     }
        // }, {passive: true});
        this.controlledElements = [];

        this.elements = this.querySelectorAll('[data-fiu]');
        this.elements.forEach((element) => {
            if (element.dataset && element.dataset.value) {
                this.controlledElements.push({
                    element,
                    value: element.dataset.value,
                })
            }
        })
    }

    render() {
        // this.innerHTML = /*html*/`
            
        //     <filter-panel></filter-panel>
        //     <div class="storesAndStoreDetails">
        //     <stores-list></stores-list>
        //     <store-details></store-details>
        //     </div>
        //     <div class="loading"></div>  
        // `;
                
        //this.loading = this.querySelector('.loading');
    }
}

window.customElements.define('left-panel', LeftPanel);