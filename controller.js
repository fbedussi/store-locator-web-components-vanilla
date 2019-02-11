import { subscribePartialState } from './state/state-manager.js';
import { throttle } from './utils.js';

export default function init() {
    const searchBox = document.querySelector('search-box');
    subscribePartialState('searchTerm', (state) => {
        searchBox.setSearchTerm(state.searchTerm);
    });
    
    const resultsNumber = document.querySelector('results-number');
    subscribePartialState('stores', (state) => {
        const numebrOfSelectedStores = state.stores.filter((store) => store.visible).length;
        
        resultsNumber.setStoresNumber(numebrOfSelectedStores); 
    });
    
    const storesList = document.querySelector('stores-list');
    subscribePartialState('stores', throttle((state) => {
        storesList.setStores(state.stores); 
    }, 900));

    const storeDetails = document.querySelector('store-details');
    subscribePartialState('openedStore', (state) => {
        storeDetails.setStore(state.openedStore);
    });

    const filterPanel = document.querySelector('filter-panel');
    subscribePartialState(['storeTypes'], (state) => {
        filterPanel.setFilters(state.storeTypes);
    });
    subscribePartialState(['filters.storeTypes'], (state) => {
        filterPanel.setFiltersApplied(state.filters.storeTypes);
    });
    subscribePartialState(['ui.filterPanelOpen'], (state) => {
        filterPanel.setOpen(state.ui.filterPanelOpen ? 'true' : 'false');
    });

    const leftPanel = document.querySelector('left-panel');
    subscribePartialState(['ui.searchLayerOpen'], (state) => {
        leftPanel.setOpen(state.ui.searchLayerOpen);
    });
}