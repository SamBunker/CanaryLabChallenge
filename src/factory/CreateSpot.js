const SmallSpot = require('../objects/spots/SmallSpot');
const MediumSpot = require('../objects/spots/MediumSpot');
const LargeSpot = require('../objects/spots/LargeSpot');

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
                throw new Error('Invlaid spot size: ${size}. Valid sizes: small, medium, large');
        }
    }
}

export default CreateSpot;