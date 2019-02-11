import { 
    dispatch, 
} from '../state/state-manager.js';
import { 
    toggleFilterPanelAction, 
    resetStoreTypesAction,
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
                this.setFilters(JSON.parse(newValue));
                break;
            case 'open':
                this.setOpen(newValue === 'true' ? true : false);
                break;
            case 'filters-applied':
                this.setFiltersApplied(JSON.parse(newValue));
        }
    };

    setFilters(newValue) {
        this.filters = newValue;
        this.handleFilters(newValue);
    }

    setOpen(newValue) { 
        this.open = newValue;
        this.handleOpen(newValue);
    }

    setFiltersApplied(newValue) {
        this.filtersApplied = newValue;
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
            filterBtn.setFilter(filter);
            filterBtn.setApplied(false);
            return filterBtn;
        });
    }

    handleFiltersApplied(filtersApplied) {
        this.filterBtns.forEach((filterBtn) => {
            const applied = filtersApplied.includes(filterBtn.filterId);
            filterBtn.setApplied(applied);
        });
    }
}

window.customElements.define('filter-panel', FilterPanel);