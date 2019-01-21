import { 
    dispatch,
    subscribePartialState,
} from '../state/state-manager.js';
import {
  updateSearchTermAction,
  resetSearchTermAction,
  setUserLocationAction,
  actionWithLoading,
} from '../state/actions.js';

class SearchBox extends HTMLElement {
    constructor() {
        super();
        this.input = this.querySelector('#searchInput');
        this.resetBtn = this.querySelector('.clearSearch');
        this.geolocateBtn = this.querySelector('.geolocalizeBtn');
    }    
    
    connectedCallback() {
        this.input.addEventListener('input', this.handleInput.bind(this));
        this.resetBtn.addEventListener('click', this.handleReset.bind(this))
        this.geolocateBtn.addEventListener('click', this.handleGeoLocation.bind(this));
        subscribePartialState('searchTerm', (state) => {
           this.searchTerm = state.searchTerm;
        });
    }

    static get observedAttributes() {
        return ['search-term'];
    }

    get searchTerm() { 
        return this.getAttribute('search-term');
    }

    set searchTerm(newValue) { 
        this.update(newValue);
    } 

    attributeChangedCallback(name, oldValue, newValue) {
        this.update(newValue);
    }

    update(value) {
        this.input.value = value;
    }

    handleInput(ev) {
        dispatch(updateSearchTermAction(ev.target.value));
    }

    handleReset() {
        dispatch(actionWithLoading(resetSearchTermAction()));
    }

    handleGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
  
                dispatch(updateSearchTermAction(''));
                dispatch(setUserLocationAction(pos));
            }, function(error) {
               console.log('Geolocation error:', error); 
            });
          } else {
            // Browser doesn't support Geolocation
            console.log('Geolocation error: missing support');
          }
    }
}

window.customElements.define('search-box', SearchBox);