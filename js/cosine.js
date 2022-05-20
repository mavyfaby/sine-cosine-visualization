/**
 * @author Maverick Fabroa
 * @date 2022-05-19
 */
class Cosine {
    constructor(amplitude = 75) {
        this.amplitude = amplitude;
        this.ypos = height * .36;
        this.xpos = width < 500 ? 50 : 100;
        this.points = [];
        this.pointColor = [150, 0, 251];
        this.speed = 1;
    }

    show() {
        strokeWeight(2);
        stroke(this.pointColor);
        noFill();

        push();
        translate(0, this.ypos);
        beginShape();

        // For every points
        for (const point of this.points) {
            // Draw the point
            vertex(point.x, point.y);
            // Increment x position of the point based on the speed
            point.x += this.speed;

            // If a point is 100px from the right
            if (point.x >= width - this.xpos) {
                // Remove the last point
                this.points.pop();
            }
        }

        // Show latest point
        if (this.points.length > 0) {
            const point = this.points[0];
            
            push();
            fill(this.pointColor);
            noStroke();
            ellipse(point.x, point.y, 12, 12);
            pop();
        }

        endShape();
        pop();
    }

    update(angle) {
        // Create a new point 
        const newPoint = createVector(
            // The x position of the newly added point
            this.xpos,
            // Cosine of the angle (in radians) multiped by amplitude in px
            Math.cos(angle) * this.amplitude
        );

        // Prepend the new point to the array of points
        this.points.unshift(newPoint);
    }
}