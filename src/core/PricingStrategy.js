class PricingStrategy {
    static calculateFee(vehicle, durationMinutes) {
        const hours = Math.ceil(durationMinutes / 60);
        const rate = vehicle.getHourlyRate();
        return hours * rate;
    }
    
    static formatFee(fee) { return '$${fee.toFixed(2)}'; }
}

module.exports = PricingStrategy;