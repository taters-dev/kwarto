# Kwarto

A hotel booking site for Filipinos. Search hotels in the Philippines, see prices in PHP or USD, and book through Klook.

## Getting Started

```bash
npm install
npm run build
```

## Environment Variables

To enable real hotel images and rates (instead of placeholder data), you need a RapidAPI key:

### `RAPIDAPI_KEY`

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the Booking.com API: https://rapidapi.com/apidojo/api/booking
3. Get your API key from the dashboard
4. Set the environment variable:

```bash
# Local development
export RAPIDAPI_KEY=your_key_here

# Or in Vercel Dashboard: Settings > Environment Variables
```

### What the API provides

With a valid `RAPIDAPI_KEY`, the site will:
- Display **real hotel photos** from Booking.com
- Show **live pricing** for the selected dates
- Display **ratings and review counts**
- Support PHP and USD currency conversion

Without the key, the site falls back to placeholder Unsplash images and no prices.

## API Endpoints

### `/api/hotels`

Fetches hotel data with images and rates from Travel Payouts.

**Query Parameters:**
- `location` - Location name or ID (default: "cebu")
- `checkIn` - Check-in date in YYYY-MM-DD format
- `checkOut` - Check-out date in YYYY-MM-DD format  
- `currency` - Currency code: USD or PHP (default: USD)

**Example:**
```
/api/hotels?location=cebu&checkIn=2026-09-12&checkOut=2026-09-15&currency=USD
```

### `/api/dest`

Search destinations for the typeahead autocomplete.

**Query Parameters:**
- `q` - Search query (minimum 2 characters)

## Tech Stack

- Next.js 15
- React 19
- Travel Payouts API (hotels data)
- Klook (booking partner via Travel Payouts affiliate links)