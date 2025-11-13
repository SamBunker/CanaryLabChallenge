# Parking Lot Management System

**Challenge 4**: Object-Oriented Parking Lot System Design
**Developer**: Samuel Bunker
**Submission Date**: November 13th, 2025

---

## Language Used

**JavaScript (Node.js v14+)**
z
---

## Step-by-Step Guide to Run

### Prerequisites
- Node.js (version 14 or higher) installed on your machine
- Download from: https://nodejs.org/

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamBunker/CanaryLabChallenge.git
   cd CanaryLabChallenge
   ```

2. **Install dependencies** (if any)
   ```bash
   npm install
   ```
   *Note: This project uses only Node.js built-in modules, so no external packages are required.*

3. **Run the application**
   ```bash
   npm start
   ```

4. **Interact with the system**
   - The CLI menu will appear with 5 options
   - Enter numbers 1-5 to select actions:
     - `1` - Park a vehicle automatically (finds next available spot)
     - `2` - Park a vehicle manually (choose specific spot)
     - `3` - Unpark a vehicle (enter ticket ID to checkout and pay)
     - `4` - View parking lot status (see available/occupied spots per floor)
     - `5` - Exit the application

---

## Design Choices

### Core Design Patterns

I implemented three key design patterns to ensure clean, maintainable, and extensible code:

1. **Factory Pattern** (`CreateVehicle`, `CreateSpot`)
   - **Why**: Centralizes object creation logic, making it easy to add new vehicle types or spot sizes without modifying existing code
   - **Benefit**: If we need to add motorcycles or electric vehicles, we only update the factory class

2. **Strategy Pattern** (`PricingStrategy`)
   - **Why**: Separates pricing calculation logic from vehicle and ticket classes
   - **Benefit**: Pricing rules can be changed (e.g., add weekend rates, monthly passes, surge pricing) without touching vehicle or parking logic

3. **Singleton Pattern** (`ParkingLot`)
   - **Why**: Ensures only one parking lot instance exists throughout the application
   - **Benefit**: Prevents conflicts and maintains consistent state across all operations

### Architecture Decisions

**Separation of Concerns**
- Each class has a single, well-defined responsibility
- `Ticket` stores data only (no business logic)
- `PricingStrategy` handles all fee calculations
- `ParkingSpot` manages spot state and vehicle fitting logic
- `ParkingLot` orchestrates all operations

**In-Memory Storage**
- Tickets stored in JavaScript `Map` for fast lookups
- No database complexity for this demo
- Could easily be swapped for persistent storage later (NoSQL or SQL)

**Dynamic Configuration**
- Parking lot size (floors, spots per floor) is configurable
- Set in `index.js` line 10: `{small: 6, medium: 10, large: 4}`
- Easy to adjust for different parking lot sizes

**Error Handling**
- Comprehensive validation for:
  - Invalid vehicle types
  - Full parking lot scenarios
  - Wrong spot sizes (e.g., truck in small spot)
  - Occupied spots
  - Invalid ticket IDs
  - Non-existent spot IDs

**Spot Matching Logic**
- Small spots: Bikes only
- Medium spots: Bikes OR Cars
- Large spots: All vehicles (Bikes, Cars, Trucks)
- Optimizes space utilization while preventing oversized vehicles from blocking smaller spots

---

## How I'd Extend It

### Short-Term Extensions (1-2 hours each)

1. **Custom License Plates**
   - Add `licensePlate` parameter to vehicle creation
   - Store in `Vehicle` class
   - Display on tickets and receipts
   - Useful for tracking specific vehicles

2. **View All Active Tickets**
   - New menu option: "View All Parked Vehicles"
   - Displays all current ticket IDs, vehicle types, spots, and entry times
   - Helps attendants see who's currently parked

3. **Export Tickets to JSON**
   - Add `exportTickets()` function
   - Writes all tickets (active + completed) to `tickets.json`
   - Includes entry time, exit time, duration, fees
   - Useful for accounting and record-keeping

4. **Show Available Spots During Manual Parking**
   - Before asking for spot ID, display list of available spots
   - Group by floor and size (e.g., "Floor 1: S1, S3, M2 available")
   - Prevents users from guessing spot IDs

### Medium-Term Extensions (4-8 hours each)

5. **VIP/Reserved Spots**
   - New spot type: `ReservedSpot` with owner/permit ID
   - Check permit before allowing parking
   - Higher pricing tier for reserved spots

6. **Monthly Pass System**
   - Add `Pass` class for subscription-based parking
   - Check for valid pass on entry
   - Different pricing strategy for pass holders vs. hourly

7. **Electric Vehicle Charging Stations**
   - New spot type: `ChargingSpot`
   - Track charging time and electricity costs
   - Add charging fee to parking fee

8. **Multiple Payment Methods**
   - Add payment processing on unpark
   - Support cash, card, mobile payment
   - Generate itemized receipts

9. **Peak/Off-Peak Pricing**
   - Time-based pricing strategy
   - Higher rates during peak hours (9am-6pm weekdays)
   - Lower rates for nights/weekends

10. **Parking Reservation System**
    - Allow users to reserve spots in advance
    - Hold spot for X minutes after reservation time
    - Charge no-show fee if reservation not used

### Long-Term Extensions (16+ hours)

11. **Multi-Location Support**
    - Multiple parking lot instances
    - Central management dashboard
    - Transfer tickets between locations

12. **Web Dashboard**
    - Real-time occupancy visualization
    - Analytics (revenue, peak times, average duration)
    - Admin controls for pricing and configuration
    - ✅ I would LOVE to implement this feature!

13. **Security & Surveillance Integration**
    - Camera system integration
    - Photo capture on entry/exit
    - License plate recognition (OCR)

14. **Mobile App Integration**
    - Find available parking via app
    - Mobile ticket display (QR codes)
    - Contactless payment

---

## Project Structure

```
CanaryLabChallenge/
├── src/
│   ├── core/
│   │   ├── ParkingLot.js       # Singleton - main system orchestration
│   │   ├── Ticket.js            # Data holder for parking sessions
│   │   └── PricingStrategy.js   # Fee calculation logic
│   ├── factory/
│   │   ├── CreateVehicle.js     # Factory for vehicle creation
│   │   └── CreateSpot.js        # Factory for spot creation
│   └── objects/
│       ├── vehicles/
│       │   ├── Vehicle.js       # Base vehicle class
│       │   ├── Bike.js          # $1/hr
│       │   ├── Car.js           # $2/hr
│       │   └── Truck.js         # $3/hr
│       └── spots/
│           ├── ParkingSpot.js   # Base spot class with validation
│           ├── SmallSpot.js     # For bikes only
│           ├── MediumSpot.js    # For bikes & cars
│           └── LargeSpot.js     # For all vehicles
├── index.js                     # Entry point & CLI interface
├── package.json                 # Project configuration
└── README.md                    # This file
```

---

## Testing & Edge Cases Handled

- ✅ Full parking lot (no available spots)
- ✅ Wrong vehicle size for spot (e.g., truck in small spot)
- ✅ Parking in occupied spot
- ✅ Invalid ticket ID on unpark
- ✅ Non-existent spot ID on manual park
- ✅ Invalid vehicle type
- ✅ Case-insensitive input handling
- ✅ Multi-floor parking lot support
- ✅ Time-based fee calculation (rounds up to nearest hour)

---

## Sample Interaction

```
Enter your choice (1-5): 1
Enter vehicle type (bike/car/truck): car

✅ Vehicle parked successfully.
👉 Ticket ID: T0001
👉 Vehicle: car
👉 Spot: 1-M1
👉 Entry Time: 1/12/2025, 3:45:30 PM

Enter your choice (1-5): 3
Enter ticket ID: T0001

✅ Vehicle unparked successfully.
👉 Ticket ID: T0001
👉 Vehicle: car
👉 Spot: 1-M1
👉 Entry Time: 1/12/2025, 3:45:30 PM
👉 Duration: 1 hour(s)
👉 Fee: $2.00
```

---

## Contact

**Samuel Bunker**
For questions or feedback about this project, please reach out via GitHub.

---

*This project was completed as part of the CanaryLabs technical interview challenge. Total development time: Under 6 hours.*
