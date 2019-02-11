import { dispatch } from './state/state-manager.js';
import { decodeStores, decodeLocations, decodeStoreTypes } from './data/dataDecoder.js';
import { loadStoresAction, loadLocationsAction, loadStoreTypesAction } from './state/actions.js';
import { decodeRoute } from './history.js';
import './components/search-box.js';
import './components/search-suggestions.js';
import './components/results-number.js';
import './components/stores-list.js';
import './components/stores-map.js';
import './components/filter-panel.js';
import './components/store-details.js';
import './components/collapsable-tab.js';
//import './components/search-opener.js';
import './components/left-panel.js';
import init from './controller.js';


fetch('data/stores.json')
    .then((response) => response.json())
    .then((storesJson) => {
        const stores = decodeStores(storesJson);
        dispatch(loadStoresAction(stores));
    });

fetch('data/store-types.json')
    .then((response) => response.json())
    .then((storeTypesJson) => {
        const storeTypes = decodeStoreTypes(storeTypesJson);
        dispatch(loadStoreTypesAction(storeTypes));
    });

fetch('data/locations.json')
    .then((response) => response.json())
    .then((locationsJson) => {
        const locations = decodeLocations(locationsJson);
        dispatch(loadLocationsAction(locations));
    });

decodeRoute();
window.onpopstate = decodeRoute;

document.body.addEventListener('keydown', function(ev) {
    if (ev.keyCode === 9) {
        document.body.classList.add('keyboardNavigation');
    }
});
document.body.addEventListener('click', function(ev) {
    document.body.classList.remove('keyboardNavigation');
});

//SetTimeout is needed on IE
setTimeout(init, 0); 