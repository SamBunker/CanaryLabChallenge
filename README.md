# CanaryLabChallenge

Challenge 4. Parking Lot System (OOP Design)

Multi-floor lot with:
Spots: Small, Medium, Large
✅ Vehicles: Bike ($1/hr), Car ($2/hr), Truck ($3/hr)
✅ Actions: park, unpark (with ticket + fee), status
Usage:
✅ Factory → create vehicles/spots
Strategy → pricing rules
Singleton (optional, e.g., ParkingLot)
Focus: Class design, extensibility, edge cases (full lot, wrong spot)
----- END RULES -----

## Pesdeucode notes for challenge before development
JavaScript -> Run the Application through CLI, unless specified for a web interface.

-- Thoughts --
How many spaces for the parking lot on each layer? Since no answer, let's make this a dynamic variable that can change
We need variables for each bike, car and truck
Each object/file should handle one specific type of logic. i.e. the Ticket class shouldn't handle the payment amount, just data
-- Thoughts --

Functions for spots, that being parking, unparking (captures the initial time minus current time to = the total time parked, + fee), and the status to see if a parking spot is active or open

## Scenario
1. A car approaches the parkinglot/garage
2. The car enters and is issued a ticket # (capture ticket ID -> spot, vehicle type, start date/time)
3. The vehicle parks
4. The vehicle leaves (checks out, unpark(ticketID))

## Parking
├─ We can build parking into two different methods
1. Automated Parking assuming the next available parking spot
2. Manual parking into spots

For this project, we'll assume the first however, we'll make a function called park(vehicle, spot)

autoPark(vehicle) -> issues ticketID, vehicle size, and starting time
park(spot, vehicle) -> issues ticketID, and documents starting time
├─ Incorrect Parking Spot
├─ Parking in a spot already occupied 
unpark(spot)
status(spot)

## Vehicles
Create classes for each vehicle
├─ Vehicle.js (vehicle name, vehicle size, vehicle hourly rate)
├─── Bike.js (spot size, hourly rate)
├─── Car.js (spot size, hourly rate)
├─── Truck.js (spot size, hourly rate)

## Parking Garage/Parking Lot
├─ Parking.js (number of floors, number of spots)

## Manufacturing
├─ CreateVehicle.js (unsure right now)
├─ CreateSpot.js (floor)

## Strategy/Rules
Calculates the vehicle's pricing based off the size of the vehicle and it's parking time
├─ PricingStrategy.js (spot)

## Tickets
├─ Ticket.js (parking ticket with timestamp) -> Appended to a .json file to see different parking tickets, payout, and timestamps from vehicle parking
