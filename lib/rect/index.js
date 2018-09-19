const X_COMPONENT = 0;
const Y_COMPONENT = 1;
const WIDTH_COMPONENT = 2;
const HEIGHT_COMPONENT = 3;
const COMPONENT_COUNT = 4;

/**
 * Defines a rectangular region of space.
 */
export default class Rect {
    constructor() {
        this.data = new Float32Array(COMPONENT_COUNT);
    }

    /**
     * Retrieves the position of the rectangle along the horizontal axis.
     * @returns {number} THe position of the rectangle along the horizontal axis.
     */
    get x() {
        return this.data[X_COMPONENT];
    }

    set x(value) {
        this.data[X_COMPONENT] = value;
    }

    /**
     * Retrieves the position of the rectangle along the vertical axis.
     * @returns {number} The position of the rectangle along the vertical axis.
     */
    get y() {
        return this.data[Y_COMPONENT];
    }

    set y(value) {
        this.data[Y_COMPONENT] = value;
    }

    /**
     * Retrieves the width of the rectangle.
     * @returns {number} The width of the rectangle.
     */
    get width() {
        return this.data[WIDTH_COMPONENT];
    }

    set width(value) {
        this.data[WIDTH_COMPONENT] = value;
    }

    /**
     * Retrieves the height of the rectangle.
     * @returns {number} The height of the rectangle.
     */
    get height() {
        return this.data[HEIGHT_COMPONENT];
    }

    set height(value) {
        this.data[HEIGHT_COMPONENT] = value;
    }

    /**
     * Returns the left most position of the rectangle.
     * This is a synonym for x.
     * @returns {number} The left most position of the rectangle.
     */
    get left() {
        return this.data[Y_COMPONENT];
    }

    /**
     * Returns the top most position of the rectangle.
     * This is a synonym for y.
     * @returns {number} The top most position of the rectangle.
     */
    get top() {
        return this.data[X_COMPONENT];
    }

    /**
     * Retrieves the right most position of the rectangle.
     * @returns {number} The right most position of the rectangle.
     */
    get right() {
        return this.data[X_COMPONENT] + this.data[WIDTH_COMPONENT];
    }

    /**
     * Retrieves the lowest position of the rectangle.
     * @returns {number} The lowest position of the rectangle.
     */
    get bottom() {
        return this.data[Y_COMPONENT] + this.data[HEIGHT_COMPONENT];
    }

    /**
     * Determines whether or not the specified point lies within the rectangles boundaries.
     * @param {number} x - Position of the point along the horizontal axis.
     * @param {number} y - Position of the point along the vertical axis.
     * @returns {boolean} True if the specified position resides within the rectangle otherwise false.
     */
    contains(x, y) {
        if (x >= this.left && x <= this.right) {
            if (y >= this.top && y <= this.bottom) {
                return true;
            }
        }

        return false;
    }
}
