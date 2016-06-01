declare var base64: any;

/**
 * Returns true if at least one string is null, undefined or empty
 * @param objs Array of strings
 * @returns {boolean}
 */
export function isStringNullOrEmpty(objs: string[]): boolean {
    var empty = false;
    objs.forEach(function(currentValue) {
        if (currentValue === null || currentValue === undefined || currentValue === '') {
            empty = true;
            return true;
        }
    });
    return empty;
}

/**
 * Returns true if at least one object is null or undefined or NaN
 * @param objs Array of objects
 * @returns {boolean}
 */
export function isObjectNullOrEmptyOrNaN(objs: any[]): boolean {
    var empty = false;
    objs.forEach(function(currentValue) {
        if (currentValue === null || currentValue === undefined || isNaN(currentValue)) {
            empty = true;
            return true;
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

export function encodeBase64(text: string) {
    return base64.encode(text);
}