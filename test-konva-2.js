// Konva uses standard Canvas 2D transform.
// ctx.translate(x, y); ctx.rotate(rad);
// Let's trace [-1, 0] rotated by +90 deg.
// Transform matrix: 
// [ cos(a) -sin(a) ]
// [ sin(a)  cos(a) ]
// X' = x * cos(a) - y * sin(a)
// Y' = x * sin(a) + y * cos(a)
const a = 90 * Math.PI / 180;
const x = -1;
const y = 0;
const X = x * Math.cos(a) - y * Math.sin(a);
const Y = x * Math.sin(a) + y * Math.cos(a);

console.log(X, Y); // Should be X=0, Y=-1

const x2 = 1;
const y2 = 0;
const X2 = x2 * Math.cos(a) - y2 * Math.sin(a);
const Y2 = x2 * Math.sin(a) + y2 * Math.cos(a);

console.log(X2, Y2); // Should be X=0, Y=1
