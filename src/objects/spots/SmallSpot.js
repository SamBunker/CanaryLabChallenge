const ParkingSpot = require('./ParkingSpot');

class SmallSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'small');
    }
}

module.exports = SmallSpot;