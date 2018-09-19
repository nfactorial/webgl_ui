/**
 * Defines which axis an element treats as the major axis.
 * When the display's size is changed, the major axis defines how the element will resize itself.
 *
 * None
 * If the major axis is set to none, the element will not resize with the display.
 *
 * Horizontal
 * The element will scale its horizontal axis in relation to the displays horizontal axis. The vertical axis will
 * be updated to maintain its aspect ratio.
 *
 * Vertical
 * The element will scale its vertical axis in relation to the displays vertical axis. The horizontal axis will
 * be updated to maintain its aspect ratio.
 *
 * Both
 * The element will scale its horizontal axis in relation to the displays horizontal axis. The vertical axis will
 * be scaled in relation to the displays vertical axis. The aspect ratio of the element will not be maintained.
 */
export const MajorAxis = {
    None: 'none',
    Horizontal: 'horz',
    Vertical: 'vert',
    Both: 'both',
};

export const Alignment = {
    Left: 'left',
    Right: 'right',
    Center: 'center'
};

/**
 * Specifies the available anchor locations for an element.
 *
 * None
 * The element has no anchor and floats at its specified location.
 *
 * Near
 * The element attempts to maintain its distance from the near side of the axis. When referencing the horizontal
 * alignment, the near anchor is to the left of its container. For vertical axis, the near anchor is towards the
 * top of the display.
 *
 * Middle
 * The element attempts to maintain its distance from the center of the display.
 *
 * Far
 * The element attempts to maintain its distance from the far side of the axis. When referencing the horizontal
 * alignment, the far anchor is to the right of its container. For vertical axis, the far anchor is towards the
 * bottom of the display.
 */
export const Anchor = {
    None: 'none',
    Near: 'near',
    Middle: 'middle',
    Far: 'far',
};
