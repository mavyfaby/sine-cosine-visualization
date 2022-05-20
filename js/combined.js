/**
 * @author Maverick Fabroa
 * @date 2022-05-19
 */
class Combined {
    constructor(r) {
        this.radius = r;
        this.points = [];
        this.xpos = width / 2;
        this.ypos = height * 0.85;
        this.pointColor = [150, 0, 251];
        this.maxPoints = width < 500 ? 150 : 300;
        this.speed = 1;

        this.cosColor = [ 200, 25, 25 ];
        this.sinColor = [ 25, 25, 230 ];

        this.sinPoints = [];
        this.cosPoints = [];
    }

    show() {
        strokeWeight(2);
        noFill();

        /**
         * Draw cosine values
         */
        
        // Show only sin and cos values if showSinCos is checked
        if (showSinCos) {
            push();
            beginShape();
            stroke(this.cosColor);
    
            for (const point of this.cosPoints) {
                vertex(point.x, point.y);
                point.y -= this.speed;
            }
    
            if (this.cosPoints.length > 0 && this.cosPoints[this.cosPoints.length - 1].y < this.ypos - this.radius) {
                this.cosPoints.pop();
            }
    
            endShape();
            pop();
    
            /**
             * Draw sine values
             */
    
            push();
            beginShape();
            stroke(this.sinColor);
    
            for (const point of this.sinPoints) {
                vertex(point.x, point.y);
                point.x += this.speed;
            }
    
            if (this.sinPoints.length > 0 && this.sinPoints[this.sinPoints.length - 1].x > (width / 2) + this.radius) {
                this.sinPoints.pop();
            }
    
            endShape();
            pop();
        }

        /**
         * Draw the shape
         */

        push();
        stroke(this.pointColor);
        translate(0, this.ypos);
        beginShape();

        // For every points
        for (const point of this.points) {
            // Draw the point
            vertex(point.x, point.y);
        }

        // If a point is 100px from the right
        if (this.points.length > 150) {
            // Remove the last point
            this.points.pop();
        }

        endShape();
        pop();
    }

    update(radians) {
        // Get cosine value of the radians
        const cosValue = Math.cos(radians);
        // Get sine value of the radians
        const sinValue = Math.sin(radians);
        
        // Get the position with radius
        const x = this.xpos + (cosValue * this.radius);
        const y = sinValue * this.radius;

        // Create a point
        const point = createVector(x, y);

        // Update only if showing sin cos
        if (showSinCos) {
            noStroke();
            
            // Cosine head
            fill(this.cosColor);
            ellipse(x, this.ypos, 12, 12);
            
            // Sine head
            fill(this.sinColor);
            ellipse(width / 2, this.ypos + y, 12, 12);
            
            // Create point or position where the sin and cos head is positioned
            const cosPoint = createVector(x, this.ypos);
            const sinPoint = createVector(width / 2, this.ypos + y);
            
            // Prepend points
            this.cosPoints.unshift(cosPoint);
            this.sinPoints.unshift(sinPoint);
        } else {
            // Remove cos points
            if (this.cosPoints.length > 0) {
                this.cosPoints = [];
            }

            // Remove sin points
            if (this.sinPoints.length > 0) {
                this.sinPoints = [];
            }
        }

        // Add the points to the points array
        this.points.unshift(point);
    }
} 