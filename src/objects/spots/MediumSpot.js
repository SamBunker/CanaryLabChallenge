import ParkingSpot from './ParkingSpot.js';

class MediumSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'medium');
    }
}

export default MediumSpot;

