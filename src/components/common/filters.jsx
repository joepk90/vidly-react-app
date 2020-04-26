import React, { Component } from 'react';

class Filters extends Component {
    state = {}

    renderFilterClasses(filter) {

        let classes = 'list-group-item';
        if (this.props.currentFilterId === filter._id) {
            classes += ' active';
        }

        return classes;

    }

    renderFilters = () => {

        const { filters: queriedFilters, onFilterChange } = this.props;

        const filters = [{ _id: 'all', name: 'All Genres' }, ...queriedFilters];

        return filters.map((filter) => {
            return <li key={filter._id} className={this.renderFilterClasses(filter)} onClick={() => onFilterChange(filter)}>{filter.name}</li>;
        })
    }

    render() {
        return (
            <ul className="list-group">
                {this.renderFilters()}
            </ul>
        );
    }
}

export default Filters;