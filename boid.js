class Boid {
    constructor() {
        this.position = new Vector(
            Math.random()*window.innerWidth, 
            Math.random()*window.innerHeight
        );
        this.velocity = new Vector(
            1.5 - Math.random()*3,
            1.5 - Math.random()*3,
        );
        this.acceleration = new Vector(
            0,
            0
        );
        this.maxVelocity = 3;
        this.maxRadius = 75;
        this.maxAlignmentForce = 1.6;
        this.maxSeparationForce = 1.3;
        this.maxCohesionForce = 1;
    }

    edges() {
        if (this.position.x >= window.innerWidth) {
            this.position.x = 0;
        } else if (this.position.x <= 0) {
            this.position.x = window.innerWidth;
        }
        if (this.position.y >= window.innerHeight) {
            this.position.y = 0;
        } else if (this.position.y <= 0) {
            this.position.y = window.innerHeight;
        }
    } 

    align(boids) {
        let avgVelocity = new Vector(0, 0);
        let nearbyCount = 0;

        for (let nearby of boids) {
            let dist = Math.sqrt((this.position.x - nearby.position.x)**2 + (this.position.y - nearby.position.y)**2);

            if (nearby != this && dist < this.maxRadius) {
                avgVelocity = avgVelocity.add(nearby.velocity);
                nearbyCount += 1;
            }
        }

        if (nearbyCount > 0) {
            avgVelocity = avgVelocity.div(nearbyCount);
            let steering = avgVelocity.subtract(this.velocity);
            
            steering = steering.limit(this.maxAlignmentForce);
            (this.velocity.mag() <= this.maxVelocity) ? 
                this.velocity = this.velocity.add(steering) : 
                this.velocity = this.velocity.limit(this.maxVelocity);
        }
    }

    cohesion(boids) {
        let avgPosition = new Vector(0,0);
        let nearbyCount = 0;

        for (let nearby of boids) {
            let dist = Math.sqrt((this.position.x - nearby.position.x)**2 + (this.position.y - nearby.position.y)**2);
            
            if (nearby != this && dist < this.maxRadius) {
                avgPosition = avgPosition.add(nearby.position);
                nearbyCount += 1;
            }
        }

        if (nearbyCount > 0) {
            avgPosition = avgPosition.div(nearbyCount);
            let steering = avgPosition.subtract(this.position);

            steering = steering.limit(this.maxCohesionForce);
            (this.velocity.mag() <= this.maxVelocity) ? 
                this.velocity = this.velocity.add(steering) : 
                this.velocity = this.velocity.limit(this.maxVelocity);
        }
    }

    separation(boids) {
        let avgPosition = new Vector(0,0);
        let nearbyCount = 0;

        for (let nearby of boids) {
            let dist = Math.sqrt((this.position.x - nearby.position.x)**2 + (this.position.y - nearby.position.y)**2);
            
            if (nearby != this && dist < this.maxRadius) {
                avgPosition = avgPosition.add(nearby.position);
                nearbyCount += 1;
            }
        }

        if (nearbyCount > 0) {
            avgPosition = avgPosition.div(nearbyCount);
            let steering = avgPosition.mult(-1);
            steering = steering.subtract(this.position);

            steering = steering.limit(this.maxSeparationForce);
            (this.velocity.mag() <= this.maxVelocity) ? 
                this.velocity = this.velocity.add(steering) : 
                this.velocity = this.velocity.limit(this.maxVelocity);
        }

    }

    // update velocity and position
    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    // use canvas context to update position on canvas
    show(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI); 
        ctx.closePath();
        ctx.fill();
    }
}