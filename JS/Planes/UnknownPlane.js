const Plane = require('./Plane');

class UnknownPlane extends Plane {

    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);

    }
}
