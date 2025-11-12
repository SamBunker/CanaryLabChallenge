import ParkingSpot from './ParkingSpot.js';

class SmallSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'small');
    }
}

export default SmallSpot;
