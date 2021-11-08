const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');
const MilitaryType = require('./models/militaryType');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        return this.getPassengerPlanes().reduce((planeWithMaxCapacity, currentPlaneWithMaxCapacity) => {
            if (currentPlaneWithMaxCapacity.getPassengersCapacity() > planeWithMaxCapacity.getPassengersCapacity()) {
                return currentPlaneWithMaxCapacity;
            }
            return planeWithMaxCapacity;
        });
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TRANSPORT);
    }
    
    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.BOMBER);
    }
    
    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => a.getMaxFlightDistance() > b.getMaxFlightDistance() ? 1 : -1);
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => a.getMaxSpeed() > b.getMaxSpeed() ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => a.getMaxLoadCapacity() > b.getMaxLoadCapacity() ? 1 : -1);
        return this;
    }

    getPlanes() {
        return this.planes;
    }
}

module.exports = Airport;
