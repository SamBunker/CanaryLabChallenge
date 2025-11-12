import Bike from '../objects/vehicles/Bike.js';
import Car from '../objects/vehicles/Car.js';
import Truck from '../objects/vehicles/Truck.js';

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
                throw new Error(`Invalid vehicle type: ${type}. Valid types: bike, car, truck`);
        }
    }
}

export default CreateVehicle;