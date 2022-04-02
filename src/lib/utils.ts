export function groupBy<Key, Value>(array: Value[], grouper: (item: Value) => Key) {
    return array.reduce((map, item) => {
        var key = grouper(item);

        if (map.has(key)) {
            map.get(key).push(item);
        }
        else {
            map.set(key, [item]);
        }

        return map;
    }, new Map<Key, Value[]>())
}

export function mapToArray<Key, Value, Result>(map: Map<Key, Value>, converter: (key: Key, value: Value) => Result): Array<Result> {
    var result = new Array<Result>();

    map.forEach((value, key) => {
        result.push(converter(key, value));
    })

    return result;
}