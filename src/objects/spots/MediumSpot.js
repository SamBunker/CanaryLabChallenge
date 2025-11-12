const ParkingSpot = require('./ParkingSpot');

class MediumSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'medium');
    }
}

module.exports = MediumSpot;
