import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {

    state = {}

    pageItemClasses = (page) => {

        let classList = 'page-item';
        if (this.props.currentPage === page) {
            classList += ' active';
        }

        return classList;

    }

    renderPaginationItems = () => {

        const { itemsCount, pageSize, currentPage, onPageChange } = this.props;

        const pagesCount = Math.ceil(itemsCount / pageSize);
        const pages = _.range(1, pagesCount + 1)

        if (pagesCount === 1) return null;

        return pages.map((page) => {
            return (
                <li key={page} className={this.pageItemClasses(page)}>
                    <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
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

export default Pagination;