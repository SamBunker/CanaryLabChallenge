class ParkingSpot {
    constructor(floor, spotNumber, size) {
        this.floor = floor;
        this.spotNumber = spotNumber;
        this.size = size;
        this.isOccupied = false;
        this.currentVehicle = null;
    }

    isAvailable() { return !this.isOccupied; }
    canFit(vehicle) {
        if (this.size === 'small' ) { return vehicle.getSize() === 'small'; }
        else if (this.size === 'medium') { return vehicle.getSize() === 'medium'; }
        else if (this.size === 'large') { return true; }
        return false;
    }

    occupy(vehicle) {
        if (this.isOccupied) { throw new Error('Spot ${this.floor}-${this.spotNumber} is already occupied!'); }
        if (!this.canFit(vehicle)) { throw new Error('Vehicle size ${vehicle.getsize()} cannot fit in ${this.size} spot!'); }
        this.isOccupied = true;
        this.currentVehicle = vehicle;
    }

    vacate() {
        this.isOccupied = false;
        this.currentVehicle = null;
    }

    getSpotID() {
        return '${this.floor}-${this.spotNumber}';
    }
}

module.exports = ParkingSpot;