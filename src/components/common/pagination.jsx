import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Pagination extends Component {

    state = {}

    pageItemClasses = (page) => {

        const { currentPage } = this.props;

        let classList = 'page-item';
        if (currentPage === page) {
            classList += ' active';
        }

        return classList;

    }

    renderPaginationItems = () => {

        const { itemsCount, pageSize, onPageChange } = this.props;

        const pagesCount = Math.ceil(itemsCount / pageSize);
        const pages = _.range(1, pagesCount + 1)

        if (pagesCount === 1) return null;

        return pages.map((page) => {
            return (
                <li key={page} className={this.pageItemClasses(page)}>
                    <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                </li>
            );
        })

    };

    render() {

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {this.renderPaginationItems()}
                </ul>
            </nav>
        );
    }
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;