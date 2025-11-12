const readline = require('readline');
const ParkingLot = require('./src/core/ParkingLot');
const CreateVehicle = require('./src/factory/CreateVehicle');

const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

const parkingLot = ParkingLot.getInstance(3, {small: 6, medium: 10, large: 4});

function displayMenu() {
    console.log('===== CanaryLabs Parkinglot Management System =====');
    console.log('1. Park Vehicle (Auto)');
    console.log('2. Park Vehicle (Manual Spot)');
    console.log('3. Unpark Vehicle');
    console.log('4. View Status');
    console.log('5. Exit');
    console.log('\n');
}

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function autoParkVehicle() {
    try {
        const type = await question('Enter vehicle type (bike/car/truck): ');
        const vehicle = CreateVehicle.create(type);
        const ticket = parkingLot.autoPark(vehicle);

        console.log('\n✅ Vehicle parked successfully.');
        console.log(' Ticket ID: ${ticket.id}');
        console.log(' Vehicle: ${ticket.vehicle.getType()}');
        console.log(' Spot: ${ticket.spot.getSpotId()}');
        console.log(' Entry Time: ${ticket.getEntryTimeFormatted()}');
    } catch (error) {
        console.log('\n❌ Unable to Park Vehicle!');
        console.log('${error.message}');
    }
}

async function unparkVehicle() {
    try {
        const ticketId = await question('Enter ticket ID: ');
        const receipt = parkingLot.unpark(ticketId);

        console.log('\n✅ Vehicle unparked successfully.');
        console.log('Ticket ID: ${receipt.ticketId}');
        console.log('Vehicle: ${receipt.vehicle}');
        console.log('Spot: ${receipt.spot}');
        console.log('Entry Time: ${receipt.entryTime}');
        console.log('Duration: ${recipt.duration) hour(s)');
        console.log(' Fee: $${receipt.fee.toFixed(2)}');
    } catch (error) {
        console.log('\n❌ Unable to Park Vehicle!');
        console.log('${error.message}');
    }
}

function viewStatus() {
    const status = parkingLot.getStatus();

        console.log('===== CanaryLabs Parkinglot Status =====');
        console.log('Total Spots: ${status.totalSpots}');
        console.log('Occupied: ${status.occupied}');
        console.log('Available: ${status.available');
        console.log('\n--- Each Floor ---');

        for (const [floor, data] of Object.entries(status.byFloor)) { console.log;('${floor}: ${data.available}/${data.total} available'); }  
}

async function main() {
    console.log('\nWelcome to the Parking Lot!');
    let running = true;

    while (running) {
        displayMenu();
        const choice = await question('Enter your choice (1-5): ');

        switch (choice.trim()) {
            case '1':
                await autoParkVehicle();
                break;
            case '2':
                await manualParkVehicle();
                break;
            case '3':
                await unparkVehicle();
                break;
            case '4':
                viewStatus();
                break;
            case '5':
                console.log('\nExiting!');
                running = false;
                break;
            default:
                console.log('\n❌ Invalid choice. Please enter from 1-5.'); 
        }
    }
    rl.close();
}

main();

