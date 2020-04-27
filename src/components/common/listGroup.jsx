import React, { Component } from 'react';

class ListGroup extends Component {
    state = {}

    renderFilterClasses(item) {

        const { selectedItem } = this.props;

        let classes = 'list-group-item';
        if (selectedItem === item) {
            classes += ' active';
        }

        return classes;

    }

    renderFilters = () => {

        const { items, textProperty, valueProperty, onItemSelect } = this.props;

        return items.map((item) => {
            return <li
                key={item[valueProperty]}
                className={this.renderFilterClasses(item)}
                onClick={() => onItemSelect(item)}
                style={{ cursor: 'pointer' }}
            >{item[textProperty]}</li>;
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

// these can be overriden when the component is used
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;