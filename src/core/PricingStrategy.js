class PricingStrategy {
    static calculateFee(vehicle, durationMs) {
        const hours = Math.ceil(durationMs / (1000 * 60 * 60));
        const rate = vehicle.getHourlyRate();
        return hours * rate;
    }

    static formatFee(fee) { return `$${fee.toFixed(2)}`; }
}

export default PricingStrategy;