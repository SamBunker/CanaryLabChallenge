import SmallSpot from '../objects/spots/SmallSpot.js';
import MediumSpot from '../objects/spots/MediumSpot.js';
import LargeSpot from '../objects/spots/LargeSpot.js';

class CreateSpot {
    static create(size, floor, spotNumber) { 
        const spotSize = size.toLowerCase().trim();

        switch(spotSize) {
            case 'small':
                return new SmallSpot(floor, spotNumber);
            case 'medium':
                return new MediumSpot(floor, spotNumber);
            case 'large':
                return new LargeSpot(floor, spotNumber);
            default:
                throw new Error(`Invalid spot size: ${size}. Valid sizes: small, medium, large`);
        }
    }
}

export default CreateSpot;