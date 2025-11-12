class Ticket {
    constructor(id, vehicle, spot) {
        this.id = id;
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = Date.now();
    }

    getDuration() { return Date.now() - this.entryTime; }
    getEntryTimeFormatted() { return new Date(this.entryTime).toLocaleString(); }    
}

export default Ticket;