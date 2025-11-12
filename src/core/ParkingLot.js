const CreateSpot = require('../factory/CreateSpot');
const Ticket = require('./Ticket');
const PricingStrategy = require('./PricingStrategy');

class ParkingLot {
    static instance = null;

    constructor(floors, spotsPerFloor) {
        if (ParkingLot.instance) { return ParkingLot.instance; }
        this.floors = this.floors;
        this.spotsPerFloor = this.spotsPerFloor;
        this.spots = [];
        this.activeTickets = new Map();
        this.ticketCounter = 1;

        this.initalizeSpots();
        ParkingLot.instance = this;
    }

    static getInstance(floors = 3, spotsPerFloor = { small: 6, medium: 10, large: 4}) {
        if (!ParkingLot.instance) { ParkingLot.instance = new ParkingLot(floors, spotsPerFloor); }
        return ParkingLot.instance;
    }

    initalizeSpots() {
        this.spots = Array.from({ length: this.floors }, (_, floorIndex) => {
            const floor = floorIndex + 1;

            return Object.entries(this.spotsPerFloor).flatMap(([type, count]) => 
                Array.from({ length: count }, (_, i) => {
                    const prefix = type[0].toUpperCase(); //S, M, or L
                    const spotId = '${prefix}${i + 1}';
                    return CreateSpot.create(type, floor, spotId);
                })
            );
        }).flat();
    }

    findAvilableSpot(vehicle) {
        return this.spots.find(spot => spot.isAvailable() && spot.canFit(vehicle));
    }

    autoPark(vehicle) {
        const spot = this.findAvilableSpot(vehicle);
        if (!spot) {
            throw new Error('No available spots for ${vehicle.getType}');
        }

        spot.occupy(vehicle);
        const ticketId = 'T${String(this.ticketCounter++).padStart(4, "0")}';
        const ticket = new Ticket(ticketId, vehicle, spot);
        this.activeTickets.set(ticketId, ticket);

        return ticket;
    }

    park(spotId, vehicle) {
        const spot = this.spots.find(s => s.getSpotId() === spotId);
        if (!spot) {
            throw new Error('Spot ${spotId} does not exist');
        }
        spot.occupy(vehicle);
        const ticketId = 'T${String(this.ticketCounter++).padStart(4, "0")}';
        const ticket = new Ticket(ticketId, vehicle, spot);
        this.activeTickets.set(ticketId, ticket);

        return ticket;
    }

    unpark(ticketId) {
        const ticket = this.activeTickets.get(ticketId);

        if (!ticket) {
            throw new Error('Invalid ticket: ${ticketId}');
        }
        const duration = ticket.getDuration();
        const fee = PricingStrategy.calculateFee(ticket.vehicle, duration);

        ticket.spot.vacate();
        this.activeTickets.delete(ticketId);

        return {
            ticketId: ticket.id,
            vehicle: ticket.vehicle.getType(),
            spot: ticket.spot.getSpotId(),
            entryTime: ticket.getEntryTimeFormatted(),
            duration: Math.ceil(duration / 60),
            fee: fee
        };
    }

    getStatus() {
        const status = {
            totalSpots: this.spots.length,
            occupied: this.spots.filter(s => !s.isAvailable()).length,
            available: this.spots.filter(s => s.isAvailable()).length,
            byFloor: {}
        };

        const byFloor = Object.fromEntries(
            Array.from({ length: this.floors }, (_, i) => {
                const floor = i + 1;
                const floorSpots = this.spots.filter(s => s.floor === floor);
                const total = floorSpots.length;
                const occupied = floorSpots.filter(s => !s.isAvailable()).length;
                const available = total - occupied;
                reutrn ['Floor ${floor}', { total, occupied, available }];
            })
        );

        return { totalSpots: total, occupied, available, byFloor };
    }
}

module.exports = ParkingLot;