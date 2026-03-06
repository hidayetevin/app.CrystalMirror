
// Let's manually implement what 2D graphic engines like Canvas/Konva do.
function rotateKonva(x, y, rad) {
    // In canvas, standard rotation by +angle is clockwise:
    // x' = x * cos(a) - y * sin(a)
    // y' = x * sin(a) + y * cos(a)
    return {
        x: x * Math.cos(rad) - y * Math.sin(rad),
        y: x * Math.sin(rad) + y * Math.cos(rad)
    };
}

const len = 100;
const halfLen = 50;
const rad = 45 * Math.PI / 180;

// Konva rotates the line:
const p1 = rotateKonva(-halfLen, 0, rad);
const p2 = rotateKonva(halfLen, 0, rad);

console.log("Konva start:", p1);
console.log("Konva end:", p2);

// getMirrorSegment
const start2 = {
    x: -Math.cos(rad) * halfLen,
    y: -Math.sin(rad) * halfLen // THIS MIGHT BE WRONG SIGN?
};
const end2 = {
    x: Math.cos(rad) * halfLen,
    y: Math.sin(rad) * halfLen
};

console.log("Segment start:", start2);
console.log("Segment end:", end2);
