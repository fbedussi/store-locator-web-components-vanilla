import { 
    dispatch, 
    subscribePartialState 
} from '../state/state-manager.js';
import { 
    toggleFilterPanelAction, 
    resetStoreTypesAction,
    toggleStoreTypeAction,
    actionWithLoading,
} from '../state/actions.js';
import './filter-btn.js';

class FilterPanel extends HTMLElement {
    constructor() {
        super();
        this.toggleBtn = this.querySelector('.filter-panel_toggleBtn');
        this.resetBtn = this.querySelector('.filter-panel_resetBtn');
        this.panel = this.querySelector('collapsable-tab');
        this.list = this.querySelector('ul');
        // this.filterBtns = [];
    }
    
    connectedCallback() {
        this.toggleBtn.addEventListener('click', this.handleToggleBtn.bind(this));
        this.resetBtn.addEventListener('click', this.handleReset.bind(this));
    }

    static get observedAttributes() {
        return ['filters', 'open', 'filters-applied'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'filters':
                this.handleFilters(JSON.parse(newValue));
                break;
            case 'open':
                this.handleOpen(newValue === 'true' ? true : false);
                break;
            case 'filters-applied':
                this.handleFiltersApplied(newValue);
        }
    };

    get filters() { 
        return this.getAttribute('filters');
    }

    set filters(newValue) { 
        this.handleFilters(newValue);
    }

    get open() { 
        return this.getAttribute('open');
    }

    set open(newValue) { 
        this.setAttribute('open', newValue ? 'true' : 'false');
    }

    get filtersApplied() { 
        return this.getAttribute('filters-applied');
    }

    set filtersApplied(newValue) { 
        this.handleFiltersApplied(newValue);
    }

    handleOpen(newValue) {
        if (this.panel) {
            this.panel.setAttribute('open', newValue);
        }
    }
    
    handleToggleBtn() {
        dispatch(toggleFilterPanelAction());
    }

    handleReset() {
        dispatch(actionWithLoading(resetStoreTypesAction()));
    }

    handleFilters(filters) {
        this.filterBtns = filters.map((filter) => {
            const filterBtn = document.createElement('filter-btn');
            this.list.appendChild(filterBtn);
            filterBtn.filter = filter;
            filterBtn.applied = false;
            return filterBtn;
        });
    }

    handleFiltersApplied(filtersApplied) {
        this.filterBtns.forEach((filterBtn) => {
            filterBtn.applied = filtersApplied.includes(filterBtn.filterId) 
        });
    }
}

window.customElements.define('filter-panel', FilterPanel);