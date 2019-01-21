import { 
    dispatch, 
    subscribePartialState 
} from '../state/state-manager.js';
import {
    updateSearchTermAction,
} from '../state/actions.js';
import './collapsable-tab.js';

class SearchSuggestions extends HTMLElement {
    constructor() {
        super();
        this.oldSuggestions = [];
        this.suggestionList = this.querySelector('ul');
        this.tab = this.querySelector('collapsable-tab');
    }
    
    connectedCallback() {
        subscribePartialState('searchTerm', (state) => {
            this.update(state);
        });
    }

    update(state = {searchTerm: '', locations: []}) {
        const searchTerm = state.searchTerm;
        const locations = state.locations
        const suggestions = searchTerm.length > 2 ? locations.filter((location) => location.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
        const thereAreSuggestions = Boolean(suggestions.length);
        const suggestionsToRender = thereAreSuggestions ? suggestions : this.oldSuggestions;
        this.oldSuggestions = suggestions;
        
        this.tab.open = thereAreSuggestions;
        this.suggestionList.innerHTML = '';
        suggestionsToRender.forEach((suggestion) => {
            const li = document.createElement('li');
            li.onclick = this.handleSuggestionClick.bind(this, suggestion.name);
            li.innerText = suggestion.name;
            this.suggestionList.appendChild(li)
        });
    }    

    handleSuggestionClick(suggestion) {
        dispatch(updateSearchTermAction(suggestion));
        //è corretto chiuderlo a mano o si dovrebbe chiudere "automaticamente" in base allo stato?
        this.tab.open = false;
    }
}

window.customElements.define('search-suggestions', SearchSuggestions);