const Bike = require('../objects/vehicles/Bike');
const Car = require('../objects/vehicles/Car');
const Truck = require('../objects/vehicles/Truck');

class CreateVehicle {
    static create(type) {
        const vehicleType = type.toLowerCase().trim();

        switch(vehicleType) {
            case 'bike':
                return new Bike();
            case 'car':
                return new Car();
            case 'truck':
                return new Truck();
            default:
                throw new Error('Invlaid vehicle type: ${type}. Valid types: bike, car, truck');
        }
    }
}

module.exports = CreateVehicle;