import Rect from '../rect';
import * as Layout from '../layout';

/**
 * An object that presents a two-dimensional user interface element.
 *
 * Whilst child elements are expected to be contained by their parent, this is not enforced during
 * rendering. So Items that spill out of their container will still be visible. In the future we
 * may render (or have the option to render) to another render target. Allowing us to clip our content better.
 */
export default class UIElement extends Rect {
    constructor() {
        super();

        // TODO: Need to support an optional HTML/CSS element that is attached to the element.
        // TODO: The HTML/CSS element does not need to support full 3d placement, but should mirror the size/position

        this.alpha = 1;
        this.children = [];
        this.hidden = false;
        this.background = null;
        this.foreground = null;
        this.textContent = null;

        this.pivot = {
            x: 0.5,
            y: 0.5,
        };

        this.position = {
            x: 0,
            y: 0,
        };

        this.size = {
            width: 1,
            height: 1,
            majorAxis: Layout.MajorAxis.Both,
        };

        this.horizontalAnchor = Layout.Anchor.None;
        this.verticalAnchor = Layout.Anchor.None;
    }

    /**
     * Refreshes the position and size of the element as well as its children.
     * @param {Layer} layer - The layer we belong to.
     * @param {Canvas} canvas - The canvas to be used to measure objects.
     */
    refreshLayout(layer, canvas) {
        switch (this.size.majorAxis) {
            case Layout.MajorAxis.None:
                this.width = this.size.width;
                break;

            case Layout.MajorAxis.Vertical: {
                    const heightScale = layer.layoutSize.height / display.height;

                    this.height = this.size.height * heightScale;
                    this.width = this.size.width * heightScale;
                }
                break;

            case Layout.MajorAxis.Horizontal: {
                    const widthScale = layer.layoutSize.height / display.width;

                    this.width = this.size.width * widthScale;
                    this.height = this.size.height * widthScale;
                }
                break;

            case Layout.MajorAxis.Both: {
                    const heightScale = layer.layoutSize.height / display.height;
                    const widthScale = layer.layoutSize.height / display.width;

                    this.width = this.size.width * widthScale;
                    this.height = this.size.height * heightScale;
                }
                break;

            default:
                throw new Error('Invalid major axis.');
        }

        this.x = this.position.x;
        this.y = this.position.y;
        this.width = this.size.width;
        this.height = this.size.height;

        const count = this.children.length;
        for (let loop = 0; loop < count; loop++) {
            this.children[loop].refreshLayout(layer, canvas);
        }
    }

    /**
     *
     * We multiply our alpha by the parents alpha, when we get added on top this is not accurate of how we should
     * be seen. In the future might be interesting to render everything to a render target, then present the result
     * with the parents alpha. Which would look more correct.
     * @param {Canvas} canvas
     * @param {number} alpha - Current alpha multiplier [0...1]
     */
    onRender(canvas, alpha) {
        // TODO: Draw background
        // this.background.onRender(canvas, alpha);

        // TODO: Draw content

        const count = this.children.length;
        for (let loop = 0; loop < count; loop++) {
            this.children[loop].onRender(canvas, alpha * this.alpha);
        }

        // TODO: Draw foreground
        // this.foreground.onRender(canvas, alpha);
    }

    /**
     * Determines which (if any) element lies beneath the specified coordinates.
     * @param {number} x -
     * @param {number} y -
     * @returns {UIElement|null}
     */
    findElement(x, y) {
        if (!this.hidden && this.contains(x, y)) {
            // TODO: Add an extra 'hit test' to allow for non-rectangular content
            const localX = x - this.x;
            const localY = y - this.y;

            let element = null;

            // Iterate backwards, to test the top-most elements first.
            const count = this.children.length;
            for (let loop = count - 1; !element && loop >= 0; loop--) {
                element = this.children[loop].findElement(localX, localY);
            }

            return element || this;
        }

        return null;
    }
}
