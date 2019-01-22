import _ from 'lodash';

export function Paginate(moviesList, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    return _(moviesList).slice(startIndex).take(pageSize).value();
}