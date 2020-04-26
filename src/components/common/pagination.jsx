import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {

    state = {}

    renderPaginationItem = (index) => {

        return (
            <li key={index} className="page-item">
                <a className="page-link" onClick={() => this.props.onClick()} href="#">{index}</a>
            </li>
        );

    };

    renderPaginationItems = () => {

        const { itemsCount, pageSize } = this.props;

        const pagesCount = Math.ceil(itemsCount / pageSize);
        const pages = _.range(1, pagesCount + 1)

        if (pagesCount === 1) return null;

        return pages.map((page) => {

            console.log(this);

            return (
                <li key={page} className="page-item">
                    <a className="page-link" onClick={() => this.props.onPageChange(page)}>{page}</a>
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