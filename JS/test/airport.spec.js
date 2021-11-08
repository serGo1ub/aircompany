const assert = require('chai').assert;
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const MilitaryType = require('../models/militaryType');
const ExperimentalType = require('../models/experimentalType');
const ClassificationLevel = require('../models/classificationLevel');

describe('Airport Test', () => {

    const planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalType.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalType.VTOL, ClassificationLevel.TOP_SECRET)
    ];

    const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military planes with transport type', () => {
        const airport = new Airport(planes);
        assert.isTrue(
          airport.getTransportMilitaryPlanes().some(militaryPlane => militaryPlane.getMilitaryType() === MilitaryType.TRANSPORT)
        );
    });

    it('should check passenger plane with max capacity', () => {
        const airport = new Airport(planes);
        assert.isFalse( airport.getPassengerPlaneWithMaxPassengersCapacity() === planeWithMaxPassengerCapacity);
    });

    it('check sort planes by max load capacity', () => {
        let airport = new Airport(planes);
        assert.isTrue(
          !!airport.sortByMaxLoadCapacity().getPlanes().reduce((a,v) =>
            a && a.getMaxLoadCapacity() <= v.getMaxLoadCapacity() ? v : false)
        );
    });

    it('should has at least one bomber in military planes', () => {
        const airport = new Airport(planes);
        assert.isTrue(airport.getBomberMilitaryPlanes().some(plane => plane.getMilitaryType() === MilitaryType.BOMBER));
    });

    it('should check that experimental planes has classification level higher than unclassified', () => {
        const airport = new Airport(planes);
        assert.isFalse(
          airport.getExperimentalPlanes().some(plane => plane.classificationLevel === ClassificationLevel.UNCLASSIFIED)
        );
    });

});



