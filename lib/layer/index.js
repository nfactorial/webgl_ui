/**
 * Represents a layer that contains a collection of two dimensional elements to be rendered.
 *
 * Although two-dimensional, the layer may be placed in 3D space. Allowing objects to be placed within a 3D scene.
 *
 * @property {number} alpha - The base alpha value of the layer, all children have their alpha multiplied by this.
 * @property {boolean} isHidden - If true, the layer is not rendered otherwise false.
 * @property {boolean} pixelAdjust - If true, element positions and sizes are forced to lie on pixel boundaries.
 * @property {object} layoutSize - Specifies the design size of the layer.
 */
export default class Layer {
    constructor() {
        this.alpha = 1;
        this.isHidden = false;
        this.children = [];

        this.pixelAdjust = true;

        this.layoutSize = {
            width: 640,
            height: 480,
        };
    }

    /**
     * Updates the layout of this layer.
     * @param {Canvas} canvas - The canvas object to use when measuring items.
     */
    refreshLayout(canvas) {
        const count = this.children.length;
        for (let loop = 0; loop < count; loop++) {
            this.children[loop].refreshLayout(this, canvas);
        }
    }

    /**
     * Renders the contents of this layer.
     * @param {Canvas} canvas - The canvas object to use for rendering.
     */
    onRender(canvas) {
        if (!this.isHidden) {
            const count = this.children.length;
            for (let loop = 0; loop < count; loop++) {
                this.children[loop].onRender(canvas, this.alpha);
            }
        }
    }

    /**
     * Determines which (if any) element lies at the specified position on the layer.
     * @param {number} x
     * @param {number} y
     * @returns {UIElement|null}
     */
    findElement(x, y) {
        let element = null;

        const count = this.children.length;
        for (let loop = count - 1; !element && loop >= 0; loop--) {
            element = this.children[loop].findElement(x, y);
        }

        return element;
    }
}
