/**
 * Created by sissoko on 16/05/2016.
 */

exports.toContainsQuery = function (query) {
    var containsQuery = query;
    for (var p in query) {
        if (query.hasOwnProperty(p)) {
            var v = query[p]
            containsQuery[p] = {$regex: '.*' + v + '.*', $options: 'i'}
        }
    }
    return containsQuery;
}

exports.textSearch = function (q) {
    var textQuery = {$text: {$search: q}};
    return textQuery;
}
