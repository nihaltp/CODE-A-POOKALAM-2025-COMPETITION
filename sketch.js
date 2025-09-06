// MARK: size variables
let circleSize = 500;
let circleCenter = circleSize / 2;

// MARK: colors
background_color = [255, 255, 255, 255];

layer1 = [189,25,166,255];
layer2 = [255, 179, 71,255];
layer3 = [240,242,35,255];
// layer4 = [102, 0, 153,255];
layer4 = [138, 43, 226,255];
layer5 = [255,149,70,255];
layer6 = [240,242,35,255];
layer7 = layer1;
layer8 = [240,242,35,255];
layer9 = layer1;
layer10 = [255, 255, 255, 255];

square1 = [255, 72, 0];
square2 = [255, 200, 0];

// MARK: setup()
function setup() {
    let canvas = createCanvas(circleSize, circleSize);
    canvas.parent("sketch_container");
    noLoop();
    noStroke();
}

// MARK: draw()
function draw() {
    background(background_color);

    fill(layer1);
    circle(circleCenter, circleCenter, circleSize);

    let { x, y, side } = nearestPointOnCircle(circleCenter, circleCenter, circleSize);
    fill(layer2);
    for (let i = 0; i <= 165; i += 15) {
        lens(x, y, side, i, circleSize / 2);
    }

    let cut = (circleSize / 100) * 13;
    ({ x, y, side } = nearestPointOnCircle(circleCenter, circleCenter, circleSize - cut));
    fill(layer3);
    for (let i = 0; i <= 165; i += 15) {
        lens(x, y, side, i + 7.3, ((circleSize - cut) / 2));
    }

    cut = (circleSize / 100) * 26;
    ({ x, y, side } = nearestPointOnCircle(circleCenter, circleCenter, circleSize - cut));
    fill(layer4);
    for (let i = 0; i <= 165; i += 15) {
        lens(x, y, side, i, (circleSize - cut) / 2);
    }

    cut = (circleSize / 100) * 35;
    ({ x, y, side } = nearestPointOnCircle(circleCenter, circleCenter, circleSize - cut));
    fill(layer5);
    for (let i = 0; i <= 165; i += 15) {
        lens(x, y, side, i + 7.5, (circleSize - cut) / 2);
    }

    translate(circleCenter, circleCenter);
    fill(layer6);
    circle(0, 0, (circleSize / 100) * 56);

    cut = (circleSize / 100) * 45;
    fill(layer7);
    circle(0, 0, cut);

    for (let i = 0; i < 3; i++) {
        fill(square1);
        square(0, 0, cut/2.85);
        rotate(45);
        fill(square2);
        square(0, 0, cut/2.85);
        rotate(45);
    }
    let p1 = pointOnCircle(0, 0, cut/2.8, 10);
    let p2 = pointOnCircle(0, 0, cut/2, 55);
    fill(square1);
    triangle(0, 0, p1.x, p1.y, p2.x, p2.y);

    fill(layer8);
    circle(0, 0, cut/2);

    fill(layer9);
    circle(0, 0, cut/3);

    fill(layer10);
    circle(0, 0, cut/4);
}

/**
 * Draws a lens shape from two opposite arcs.
 *
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 * @param {number} size - size of the lens, w & h of arc
 * @param {number} angle - orientation of the lens in degrees
 * @param {number} radius - radius of the circle
 */
// MARK: lens()
function lens(x, y, size, angle, radius) {
    push();

    if (angle !== 0) {
        ({ x, y } = pointOnCircleAtAngle(circleCenter, circleCenter, radius, x, y, angle));
    }

    translate(x, y);
    rotate(radians(angle));

    arc(0, 0, size, size, 0, HALF_PI, CHORD);
    arc(size / 2 + 0.5, size / 2 + 0.5, size, size, PI, PI + HALF_PI, CHORD);

    pop();
}

/**
 * Finds the nearest point on a circle to a given point.
 *
 * @param {number} cx - x coordinate of the circle center
 * @param {number} cy - y coordinate of the circle center
 * @param {number} d - diameter of the circle
 * @param {number} px - x coordinate of the point
 * @param {number} py - y coordinate of the point
 * @returns {Object} - x, y coordinates of the nearest point on the circle, and the side length of the square inscribed within the circle
 */
// MARK: nearestPointOnCircle
function nearestPointOnCircle(cx, cy, d, px = 0, py = 0) {
    // Calculate radius
    let r = d / 2;

    // Vector from circle center to the point
    let dx = px - cx;
    let dy = py - cy;

    // Normalize (make it unit length)
    let length = sqrt(dx * dx + dy * dy);
    dx /= length;
    dy /= length;

    // Move from circle center along the direction by radius
    let x = cx + dx * r;
    let y = cy + dy * r;

    let side = squareSideLengthFromCircle(d);

    return { x, y, side };
}


/**
 * Calculates the side length of the largest square inscribed within a circle.
 *
 * @param {number} radius - radius of the circle
 * @returns {number} - side length of the inscribed square
 */
// MARK: squareSideLengthFromCircle
function squareSideLengthFromCircle(radius) {
  return Math.sqrt(2) * radius;
}

/**
 * Finds a point on the circumference of a circle at a given angle.
 *
 * @param {number} cx - x coordinate of the circle center
 * @param {number} cy - y coordinate of the circle center
 * @param {number} radius - radius of the circle
 * @param {number} baseX - x coordinate of the base point
 * @param {number} baseY - y coordinate of the base point
 * @param {number} angleOffsetDeg - angle offset in degrees
 * @returns {Object} - x, y coordinates of the point on the circle
 */
// MARK: pointOnCircleAtAngle
function pointOnCircleAtAngle(cx, cy, radius, baseX, baseY, angleOffsetDeg) {
    let angle = Math.atan2(baseY - cy, baseX - cx);
    let newAngle = angle + (angleOffsetDeg * Math.PI / 180);

    return {
        x: cx + radius * Math.cos(newAngle),
        y: cy + radius * Math.sin(newAngle)
    };
}

/**
 * Finds a point on the circumference of a circle at a given angle.
 *
 * @param {number} cx - x coordinate of the circle center
 * @param {number} cy - y coordinate of the circle center
 * @param {number} r - radius of the circle
 * @param {number} angleDeg - angle in degrees
 * @returns {Object} - x, y coordinates of the point on the circle
 */
// MARK: pointOnCircle
function pointOnCircle(cx, cy, r, angleDeg) {
    let angleRad = radians(angleDeg); // convert to radians
    let x = cx + r * cos(angleRad);
    let y = cy + r * sin(angleRad);
    return createVector(x, y);
}
