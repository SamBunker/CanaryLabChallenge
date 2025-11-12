import ParkingSpot from "./ParkingSpot.js";

class LargeSpot extends ParkingSpot {
    constructor(floor, spotNumber) {
        super(floor, spotNumber, 'large');
    }
}

export default LargeSpot;