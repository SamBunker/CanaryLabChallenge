import readline from 'readline';
import ParkingLot from './src/core/ParkingLot.js';
import CreateVehicle from './src/factory/CreateVehicle.js';

const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

const parkingLot = ParkingLot.getInstance(3, {small: 6, medium: 10, large: 4});

function displayMenu() {
    console.log('██████   █████  ██████  ██   ██ ██ ███    ██  ██████       ██      ██████  ██████');
    console.log('██   ██ ██   ██ ██   ██ ██  ██  ██ ████   ██ ██            ██     ██    ██   ██  ');
    console.log('██████  ███████ ██████  █████   ██ ██ ██  ██ ██   ███      ██     ██    ██   ██  ');
    console.log('██      ██   ██ ██   ██ ██  ██  ██ ██  ██ ██ ██    ██      ██     ██    ██   ██  ');
    console.log('██      ██   ██ ██   ██ ██   ██ ██ ██   ████  ██████       ███████ ██████    ██  ');
    console.log('- Parking Lot Simulator by Samuel Bunker\n\n');
    console.log('Please select from the following options!\n');
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
        console.log(`👉 Ticket ID: ${ticket.id}`);
        console.log(`👉 Vehicle: ${ticket.vehicle.getType()}`);
        console.log(`👉 Spot: ${ticket.spot.getSpotId()}`);
        console.log(`👉 Entry Time: ${ticket.getEntryTimeFormatted()}`);
        console.log('\n');
    } catch (error) {
        console.log('\n❌ Unable to Park Vehicle!');
        console.log(`❌ ${error.message}\n`);
    }
}

async function manualParkVehicle() {
    try {
        const type = await question('Enter vehicle type (bike/car/truck): ');
        const vehicle = CreateVehicle.create(type);

        console.log('Note, bikes are S (small), cars are M (medium), trucks are L (large)');
        const spotId = await question('Enter spot ID (e.g., 1-S1, 2-M3 ): ');

        const ticket = parkingLot.park(spotId, vehicle);

        console.log('\n✅ Vehicle parked successfully.');
        console.log(`👉 Ticket ID: ${ticket.id}`);
        console.log(`👉 Vehicle: ${ticket.vehicle.getType()}`);
        console.log(`👉 Spot: ${ticket.spot.getSpotId()}`);
        console.log(`👉 Entry Time: ${ticket.getEntryTimeFormatted()}`);
        console.log('\n');
    } catch (error) {
        console.log('\n❌ Unable to Park Vehicle!');
        console.log(`❌ ${error.message}\n`);
    }
}

async function unparkVehicle() {
    try {
        const ticketId = await question('Enter ticket ID: ');
        const receipt = parkingLot.unpark(ticketId);

        console.log('\n✅ Vehicle unparked successfully.');
        console.log(`👉 Ticket ID: ${receipt.ticketId}`);
        console.log(`👉 Vehicle: ${receipt.vehicle}`);
        console.log(`👉 Spot: ${receipt.spot}`);
        console.log(`👉 Entry Time: ${receipt.entryTime}`);
        console.log(`👉 Duration: ${receipt.duration} hour(s)`);
        console.log(`👉 Fee: $${receipt.fee.toFixed(2)}`);
        console.log('\n');
    } catch (error) {
        console.log('\n❌ Unable to Unpark Vehicle!');
        console.log(`❌ ${error.message}\n`);
    }
}

function viewStatus() {
    const status = parkingLot.getStatus();

    console.log('\n');
    console.log('🚗 CanaryLabs Parking Lot Status');
    console.log(`Total Spots: ${status.totalSpots}`);
    console.log(`Occupied: ${status.occupied}`);
    console.log(`Available: ${status.available}`);
    console.log('\n--- Each Floor ---');

    for (const [floor, data] of Object.entries(status.byFloor)) {
        console.log(`${floor}: ${data.available}/${data.total} available`);
    }
    console.log('\n');
}

async function main() {
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
                console.log('\nExiting! Hope you enjoyed my project. :)');
                running = false;
                break;
            default:
                console.log('\n❌ Invalid choice. Please enter from 1-5.');
                console.log('\n'); 
        }
    }
    rl.close();
}

main();

