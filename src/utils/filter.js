// import _ from 'lodash';

export function filter(items, filterId) {

    console.log(items);

    let filteredItems = [];

    items.forEach((item) => {

        if (filterId === item.genre._id) {
            filteredItems.push(item);
        }
    });

    return filteredItems;

}