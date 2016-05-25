/**
 * Returns true if at least one string is null, undefined or empty
 * @param objs Array of strings
 * @returns {boolean}
 */
export function isStringNullOrEmpty(objs: string[]): boolean {
    var empty = false;
    objs.forEach(function (currentValue) {
        if (currentValue === null || currentValue === undefined || currentValue === "") {
            empty = true;
        }
    });
    return empty;
}

/**
 * Returns true if the array is null or undefined
 * @param obj
 * @returns {boolean}
 */
export function isArrayNullOrUndefined(obj: any[]): boolean {
    return typeof obj === 'undefined' || typeof obj === 'null';
}