# Kwarto

A hotel booking site for Filipinos. Search hotels in the Philippines, see prices in PHP or USD, and book through Booking.com.

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
- List **only hotels available on Booking.com** for those dates
- Display **ratings and review counts**
- Support PHP and USD currency conversion

Without the key, the site falls back to placeholder Unsplash images and no prices.

## API Endpoints

### `/api/hotels`

Fetches hotels that are available on Booking.com for the selected stay.

**Query Parameters:**
- `city` or `location` - City name (default: "Cebu")
- `checkIn` / `checkin` - Check-in date in YYYY-MM-DD format
- `checkOut` / `checkout` - Check-out date in YYYY-MM-DD format
- `guests` - Number of adults (default: 2)
- `children` - Number of children (default: 0)
- `currency` - Currency code: USD or PHP (default: USD)

Hotels without a bookable Booking.com rate for those dates are omitted.

**Example:**
```
/api/hotels?city=cebu&checkIn=2026-09-12&checkOut=2026-09-15&currency=USD
```

### `/api/dest`

Search destinations for the typeahead autocomplete.

**Query Parameters:**
- `q` - Search query (minimum 2 characters)

## Tech Stack

- Next.js 15
- React 19
- Booking.com via RapidAPI (hotel availability, photos, and rates)
- Booking.com (booking partner)