import { subscribePartialState } from './state/state-manager.js';
import { throttle } from '../utils.js';

export default function init() {
    const searchBox = document.querySelector('search-box');
    subscribePartialState('searchTerm', (state) => {
        searchBox.searchTerm = state.searchTerm;
    });
    
    const resultsNumber = document.querySelector('results-number');
    subscribePartialState('stores', (state) => {
        const numebrOfSelectedStores = state.stores.filter((store) => store.visible).length;
        resultsNumber.storesNumber = numebrOfSelectedStores; 
    });
    
    const storesList = document.querySelector('stores-list');
    subscribePartialState('stores', throttle((state) => {
        storesList.stores = state.stores; 
    }, 900));

    const storeDetails = document.querySelector('store-details');
    subscribePartialState('openedStore', (state) => {
        storeDetails.store = state.openedStore;
    });

    const filterPanel = document.querySelector('filter-panel');
    subscribePartialState(['storeTypes'], (state) => {
        filterPanel.filters = state.storeTypes;
    });
    subscribePartialState(['filters.storeTypes'], (state) => {
        filterPanel.filtersApplied = state.filters.storeTypes;
    });
    subscribePartialState(['ui.filterPanelOpen'], (state) => {
        filterPanel.open = state.ui.filterPanelOpen;
    });

    const leftPanel = document.querySelector('left-panel');
    subscribePartialState(['ui.searchLayerOpen'], (state) => {
        leftPanel.open = state.ui.searchLayerOpen;
    });
}