class Vehicle {
    constructor(type, size, hourlyRate) {
        this.type = type;
        this.size = size;
        this.hourlyRate = hourlyRate;
    }

    getType() { return this.type; }
    getSize() { return this.size; }
    getHourlyRate() { return this.hourlyRate }
    
}
export default Vehicle;