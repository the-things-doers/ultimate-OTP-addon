

class BitToChar {

    /**
     * Array of characters used for mapping.
     * Removed characters a, e, o, i, n and digits 1, 2, 7 because they are more frequent
     * in leaked password datasets, improving uniqueness and reducing predictability.
     *
     * @type {string[]}
     * @private
     */
    static #values = [
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        ...'bcdfghjklmpqrstuvwxyz',
        ...'034568',
        ...'@^$&-*(#/%_'
    ];

    /**
     * Reverse mapping from character to its index.
     * Constructed once at class load time.
     * Provides O(1) lookup for character indices.
     *
     * @type {Object.<string, number>}
     * @private
     */
    static #reverseMap = (() => {
        const map = {};
        this.#values.forEach((char, index) => {
            map[char] = index;
        });
        return Object.freeze(map);
    })();

    /**
     * Returns the character mapped to the given index.
     *
     * @param {number} index - Index between 0 and (size - 1).
     * @returns {string|undefined} The character at the given index, or undefined if out of range.
     */
    static get(index) {
        return this.#values[index];
    }

    /**
     * Returns the index associated with a given character.
     *
     * @param {string} char - Single character to lookup.
     * @returns {number|undefined} The index of the character, or undefined if not found.
     */
    static indexOf(char) {
        return this.#reverseMap[char];
    }

    /**
     * Returns the total number of characters in the mapping.
     *
     * @returns {number} Number of mapped characters (typically 64).
     */
    static size() {
        return this.#values.length;
    }

    /**
     * Returns a copy of the array of characters used in the mapping.
     *
     * @returns {string[]} Array of characters.
     */
    static values() {
        return [...this.#values]; // return a copy, to avoid mutation
    }
}

export default BitToChar;