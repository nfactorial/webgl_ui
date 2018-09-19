import * as WebGLHelper from '@nfactorial/webgl_helper';
import * as WebGLDisplay from '@nfactorial/webgl_display';

const DEFAULT_CAPACITY = 1024 * 16;
const DRAW_COMMAND_CAPACITY = 1024;

/**
 * This object is used to manage direct rendering of primitives to a two-dimensional display.
 *
 * The render instructions are built dynamically on-demand and thus, this does not present the most optimum
 * construction of the 2D rendering layer.
 *
 * @property {number} capacity
 * @property {DataView} dataView
 * @property {ArrayBuffer} arrayBuffer
 * @property {WebGLHelper.ArrayBuffer} gpuBuffer
 * @property {number} commandCount
 * @property {DrawCommand[]} drawCommands
 */
export default class Canvas {
    constructor() {
        this.capacity = 0;
        this.dataView = null;
        this.arrayBuffer = null;
        this.gpuBuffer = null;

        this.commandCount = 0;
        this.drawCommands = [];

        for (let loop = 0; loop < DRAW_COMMAND_CAPACITY; loop++) {
            this.drawCommands.push(new WebGLDisplay.DrawCommand());
        }
    }

    /**
     * Releases all resources currently referenced by this object.
     */
    dispose() {
        if (this.gpuBuffer) {
            this.gpuBuffer.dispose();
            this.gpuBuffer = null;
        }

        this.dataView = null;
        this.arrayBuffer = null;
        this.capacity = 0;
        this.commandCount = 0;
    }

    /**
     * Prepares the Canvas object for use by the application.
     * @param {WebGLState} state - The object that manages the WebGL state for the renderer.
     * @param {number=} capacity - The size (in bytes) of the canvas' rendering buffer.
     * @returns {Canvas} Reference to self, to allow for call chaining.
     */
    initialize(state, capacity = DEFAULT_CAPACITY) {
        if (capacity > this.capacity) {
            this.arrayBuffer = new ArrayBuffer(capacity);
            this.dataView = new DataView(this.arrayBuffer, 0, capacity);

            this.gpuBuffer = new WebGLHelper.ArrayBuffer();
            this.gpuBuffer.initialize(state.context, state.context.DYNAMIC_DRAW);
            state.bindArrayBuffer(this.gpuBuffer.id);
            this.gpuBuffer.reserve(capacity);

            this.capacity = capacity;
        }

        return this;
    }

    /**
     * Executes all draw commands currently queued for rendering on this canvas.
     * @param {RenderArgs} renderArgs
     */
    execute(renderArgs) {
        let lastMaterial = null;

        renderArgs.state.bindArrayBuffer(this.arrayBuffer.id);
        //renderArgs.state.bindIndexBuffer(this.indexBuffer.id);

        const count = this.commandCount;
        for (let loop = 0; loop < count; loop++) {
            const drawCommand = this.drawCommands[loop];

            if (drawCommand.material !== lastMaterial) {
                if (lastMaterial) {
                    lastMaterial.onEndRender(renderArgs);
                }

                lastMaterial = drawCommand.material;
                lastMaterial.onBeginRender(renderArgs);
            }

            // TODO: Commit instance uniforms
            // TODO: Commit attribute array

            renderArgs.renderer.drawPrimitive(
                drawCommand.primitiveType,
                drawCommand.start,
                drawCommand.primitiveCount
            );
        }

        if (lastMaterial) {
            lastMaterial.onEndRender(renderAgrs);
        }
    }

    /**
     * Removes all draw commands currently queued within this canvas object.
     */
    flush() {
        this.commandCount = 0;
    }

    /**
     * Draws a solid rectangle.
     */
    drawRect() {

    }

    /**
     * Draws a two-dimensional bezier curve.
     * @param controlPoints
     */
    drawBezier(controlPoints) {

    }
}
