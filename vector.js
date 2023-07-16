class Vector{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(newVect){
        const newX = this.x + newVect.x;
        const newY = this.y + newVect.y;
        return new Vector(newX, newY);
    }

    subtract(newVect) {
        const newX = newVect.x - this.x;
        const newY = newVect.y - this.y;
        return new Vector(newX, newY);
    }

    div(scalar) {
        const newX = this.x / scalar;
        const newY = this.y / scalar;
        return new Vector(newX, newY);
    }

    mult(scalar) {
        const newX = this.x * scalar;
        const newY = this.y * scalar;
        return new Vector(newX, newY);
    }

    mag() {
        return Math.sqrt(this.x ** 2 + this.y **2);
    }

    limit(scalar) {
        let magnitude = this.mag();
        if (magnitude > scalar) {
            // console.log(Math.sqrt(this.div(magnitude).x**2 + this.div(magnitude).y**2))
            return this.div(magnitude).mult(scalar);
        }
        return this;
    }
}