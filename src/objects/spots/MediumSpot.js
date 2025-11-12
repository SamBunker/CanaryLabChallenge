const ParkingSpot = require('./ParkingSpot');

class MediumSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'medium');
    }
}

export default MediumSpot;

