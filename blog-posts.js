/* Kwarto blog — hotel deals, guides, and city picks.
   Plain data; blog.js renders it on /blog, /blog/<slug>, and the homepage row.
   Prices are indicative snapshots, not live rates — the CTA always opens Booking.com
   with the reader's own dates so they see today's number. */
window.KWARTO_POSTS = [
  {
    slug: "tokyo-shinjuku-hotels-under-100",
    title: "Tokyo under $100 a night: Shinjuku business hotels that don't feel like a compromise",
    dek: "Walk to the station, sleep in a real bed, eat ramen at 1am. The newer Shinjuku towers are the best value in the city right now.",
    category: "Deals",
    location: "Shinjuku, Tokyo",
    country: "Japan",
    date: "2026-10-16",
    author: "Kwarto Editors",
    featured: true,
    priceFrom: 92,
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Neon signs over a Shinjuku side street at night",
    hotelName: "Hotel Gracery Shinjuku",
    city: "Tokyo",
    citySlug: "tokyo",
    body: [
      { type: "p", text: "Tokyo is not a cheap city to sleep in, but it is a city where the cheap rooms are good. The business-hotel chains that line the east side of Shinjuku Station have rebuilt or refurbished most of their towers in the last five years, and the result is a tier of hotels that run $85–$110 a night mid-week with rooms that are small, spotless, and quiet." },
      { type: "p", text: "Our pick in that tier is Hotel Gracery Shinjuku — the one with the Godzilla head on the terrace. Rooms start at a compact 18 m², the beds are proper Simmons mattresses, and you are three minutes on foot from the east exit of the busiest train station on earth." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "Hotel Gracery Shinjuku, Kabukicho, Tokyo"],
        ["Rates we saw", "From about $92 a night for a Standard Double, mid-week in November"],
        ["Includes", "Wi-Fi, in-room kettle, laundry on-site, 24-hour front desk"],
        ["Best for", "First-timers, late arrivals, anyone doing day trips by rail"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Three-minute walk to Shinjuku Station east exit, and the Narita/Haneda limousine bus stops at the hotel door.",
        "Rooms were refurbished in 2024 — new carpets, USB-C at the bedside, blackout curtains that actually work.",
        "Floors 8 and up face away from Kabukicho's neon, so you get the skyline without the noise.",
        "Konbini inside the building for 6am coffee and onigiri before the first train."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=70", alt: "Compact hotel room with a double bed and city window", caption: "Standard rooms are small by design — you're paying for the location and a very good mattress." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Business-hotel doubles in Tokyo are usually 140 cm wide. If you want a true king, filter for the Deluxe rooms — they run $30–$40 more and are worth it for stays over three nights. Breakfast is sold separately and the buffet is fine, but the station basement food halls are better and cheaper." },
      { type: "cta", label: "Check live rates on Booking.com", note: "Opens Booking.com with your dates already filled in." },
      { type: "h2", text: "If it's sold out" },
      { type: "p", text: "Try the Shinjuku Granbell (Kabukicho, slightly more design-forward) or the Keio Plaza across the tracks on the west side — older, bigger rooms, better pool. Both sit in the same $90–$130 band on quiet dates." }
    ]
  },
  {
    slug: "bali-ubud-private-pool-villa-deal",
    title: "A private pool villa in Ubud for the price of a city hotel room",
    dek: "Rice-terrace views, your own plunge pool, breakfast brought to the deck. Ubud's mid-range villas are the best-value private pools in Southeast Asia.",
    category: "Deals",
    location: "Ubud, Bali",
    country: "Indonesia",
    date: "2026-10-12",
    author: "Kwarto Editors",
    priceFrom: 78,
    heroImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Terraced rice paddies outside Ubud, Bali",
    hotelName: "Alam Puisi Villa Ubud",
    city: "Ubud",
    citySlug: "ubud",
    body: [
      { type: "p", text: "Ubud has a strange and wonderful pricing quirk: a one-bedroom villa with its own pool often costs less than a four-star room in Seminyak or Canggu. The land is cheaper, the villas are family-run, and the competition is fierce. If you've ever wanted to wake up, roll out of bed, and fall into a pool with nobody else in it, this is where you do it." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "Alam Puisi Villa, Tegallalang Road, Ubud"],
        ["Rates we saw", "From about $78 a night for a One-Bedroom Pool Villa, including breakfast"],
        ["Includes", "Private plunge pool, daily breakfast on your deck, free shuttle into central Ubud"],
        ["Best for", "Couples, remote-work weeks, anyone who hates sharing a pool"]
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=70", alt: "Private villa pool deck surrounded by tropical trees", caption: "Most villas in this band have a 4–6 metre plunge pool and a covered outdoor living room." },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "The villas face the Petanu river valley, so you get the rice-terrace view without the Tegallalang crowds.",
        "Breakfast is cooked to order and carried to your deck — the banana pancakes alone justify the booking.",
        "Scooter rental and a free hourly shuttle mean you don't need a car for central Ubud.",
        "Twenty minutes to the Tegallalang terraces and the Tirta Empul water temple."
      ] },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Rates jump 40–60% for Christmas week, Chinese New Year, and July–August. Shoulder months (April–June, September–November) are where the $78 figure lives. Check the cancellation policy — many villas offer free cancellation up to seven days out, which is generous for Bali." },
      { type: "cta", label: "See villa rates on Booking.com", note: "Your check-in and checkout carry over." },
      { type: "h2", text: "Also worth a look" },
      { type: "p", text: "If you can stretch to $150, Bisma Eight in central Ubud is the design-hotel option with a 25-metre infinity pool and one of the best restaurants in town. For a true jungle hideaway, Kamandalu is the splurge." }
    ]
  },
  {
    slug: "bangkok-riverside-or-sukhumvit",
    title: "Riverside or Sukhumvit? Where to sleep in Bangkok, honestly",
    dek: "One is calm and photogenic, the other is where the city actually happens. Here's how to choose, and a hotel we'd book in each.",
    category: "Guides",
    location: "Bangkok",
    country: "Thailand",
    date: "2026-10-08",
    author: "Kwarto Editors",
    heroImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Tuk-tuks and neon signs on Yaowarat Road, Bangkok's Chinatown",
    hotelName: "Riva Surya Bangkok",
    city: "Bangkok",
    citySlug: "bangkok",
    body: [
      { type: "p", text: "Every Bangkok hotel guide tells you the riverside is beautiful and Sukhumvit is convenient. Both things are true, and neither helps you decide. So here's the question that actually does: how many nights do you have, and how much do you mind the BTS?" },
      { type: "h2", text: "Pick the riverside if…" },
      { type: "ul", items: [
        "You have three nights or fewer and want the Grand Palace, Wat Arun and Chinatown within a short boat ride.",
        "You like a hotel pool you'll actually use — the river hotels have the best ones in the city.",
        "You're arriving jet-lagged and want quiet. The river at 6am is the calmest Bangkok gets."
      ] },
      { type: "p", text: "Our riverside pick is Riva Surya, a 68-room boutique on the Phra Athit side near Khao San. It's small, the pool sits right on the water, and it's a $4 Grab ride to the palace. Rates sit around $110–$140, which is roughly half the big-name river resorts." },
      { type: "cta", label: "Check Riva Surya on Booking.com", hotel: "Riva Surya Bangkok", city: "Bangkok", note: "Opens with your stay dates." },
      { type: "h2", text: "Pick Sukhumvit if…" },
      { type: "ul", items: [
        "You're staying four nights or more and want to eat somewhere different every night without a taxi.",
        "You care about the BTS Skytrain — Asok, Phrom Phong and Thong Lo are the stations to aim for.",
        "You want a rooftop bar within walking distance of your bed."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=70", alt: "Hotel pool lit up at dusk with loungers", caption: "Sukhumvit hotels trade river views for rooftop pools and a station at the door." },
      { type: "p", text: "In Sukhumvit, look at the Ad Lib (Soi 1, quiet, excellent breakfast) at around $120, or any of the Hotel Nikko / Ascott towers near Thong Lo if you want apartment-style rooms for a longer stay." },
      { type: "cta", label: "Compare Sukhumvit hotels on Booking.com", hotel: "Sukhumvit", city: "Bangkok", note: "Searches the whole Sukhumvit area with your dates." },
      { type: "h2", text: "The honest answer" },
      { type: "p", text: "First trip, short stay: riverside. Return trip, longer stay, or a work week: Sukhumvit. And if you've got five nights, split them — two on the river, three in Sukhumvit — and you'll have done Bangkok properly." }
    ]
  },
  {
    slug: "mactan-cebu-resorts-two-night-weekend",
    title: "Mactan for a two-night weekend: the resorts that are worth leaving the city for",
    dek: "Fifteen minutes from the airport, sand on your feet by lunch. These are the Mactan resorts we'd book for a short break, and what you'll pay.",
    category: "City picks",
    location: "Mactan, Cebu",
    country: "Philippines",
    date: "2026-10-03",
    author: "Kwarto Editors",
    priceFrom: 140,
    heroImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Resort pool next to the sea with palm trees",
    hotelName: "Crimson Resort and Spa Mactan",
    city: "Cebu",
    citySlug: "cebu",
    body: [
      { type: "p", text: "Mactan's whole pitch is proximity. The airport is on the island, the resorts line its east coast, and you can be in the water within an hour of your bag hitting the carousel. For a Friday-to-Sunday break — from Manila, Singapore, Hong Kong, or anywhere with a direct flight — that matters more than almost anything else." },
      { type: "h2", text: "Our picks" },
      { type: "p", text: "Crimson Resort and Spa is the one we'd book first. Low-rise casitas, a long stretch of real beach, and a pool big enough that it never feels crowded. Garden rooms run $140–$180 on most weekends; the private-pool villas are the splurge at $350+." },
      { type: "cta", label: "Check Crimson Mactan on Booking.com", hotel: "Crimson Resort and Spa Mactan", city: "Cebu", note: "Opens with your dates and guests." },
      { type: "img", src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=70", alt: "Infinity pool looking out to the sea", caption: "The east coast of Mactan faces the Hilutungan Channel — calm, swimmable water most of the year." },
      { type: "ul", items: [
        "Dusit Thani Mactan — newer, bigger pool, slightly further north. $150–$200.",
        "Bluewater Maribago — the classic family option, with a lagoon-style pool and a shuttle to the city. $110–$150.",
        "Solea Mactan — the budget pick with the biggest pool on the island. $70–$95."
      ] },
      { type: "h2", text: "What to know" },
      { type: "p", text: "Weekends sell out two to three weeks ahead during Sinulog (January) and Holy Week. Mid-week rates are 20–30% lower across the board. Most resorts charge a separate day-use fee for non-guests, so booking in — even for one night — is often cheaper than paying for a day pass twice." },
      { type: "cta", label: "See all Mactan resorts on Booking.com", hotel: "Mactan", city: "Cebu", note: "Searches the whole island with your dates." }
    ]
  },
  {
    slug: "lisbon-small-hotels-alfama-chiado",
    title: "Lisbon's small hotels with big views: Alfama and Chiado",
    dek: "Skip the chains on Avenida da Liberdade. The hotels you'll remember are the 20-room ones up the hill with a terrace and a view of the Tagus.",
    category: "City picks",
    location: "Lisbon",
    country: "Portugal",
    date: "2026-09-26",
    author: "Kwarto Editors",
    priceFrom: 165,
    heroImage: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Yellow tram climbing a narrow street in Lisbon",
    hotelName: "Memmo Alfama",
    city: "Lisbon",
    citySlug: "lisbon",
    body: [
      { type: "p", text: "Lisbon is a city of hills, and the hotels that make the trip are the ones that put you on top of one. The two neighbourhoods to aim for are Alfama — the old Moorish quarter below the castle, all stairs and tiled façades — and Chiado, the elegant shopping district with the best restaurants and the easiest metro access." },
      { type: "h2", text: "Alfama: Memmo Alfama" },
      { type: "p", text: "Forty-two rooms hidden behind a plain door on a lane so narrow the tram can't fit. The payoff is the terrace: a red-tiled pool and a bar that looks straight down over the rooftops to the river. Rooms are compact, but you won't spend time in them. From about $165 in shoulder season, $220+ in summer." },
      { type: "cta", label: "Check Memmo Alfama on Booking.com", hotel: "Memmo Alfama", city: "Lisbon", note: "Opens with your dates." },
      { type: "img", src: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1400&q=70", alt: "Hotel courtyard with a long pool and white walls", caption: "The best Lisbon hotels put the pool on the roof and the city at your feet." },
      { type: "h2", text: "Chiado: The Lumiares" },
      { type: "p", text: "A restored 18th-century palace split into 53 suites with kitchenettes, on the hill between Chiado and Bairro Alto. The rooftop restaurant has a 360° view that takes in the castle, the river, and the 25 de Abril bridge. Suites from around $200 — good value for the space, and perfect if you're staying four nights or more and want to cook once." },
      { type: "cta", label: "Check The Lumiares on Booking.com", hotel: "The Lumiares Hotel and Spa", city: "Lisbon", note: "Opens with your dates." },
      { type: "h2", text: "What to know" },
      { type: "ul", items: [
        "Alfama is steep and cobbled — fine with a backpack, miserable with a hard-shell suitcase. Ask the hotel about luggage pick-up from the taxi rank.",
        "Chiado has a metro station (Baixa-Chiado) that connects straight to the airport line. Alfama doesn't.",
        "June is festival month in Alfama — loud, joyful, and not for light sleepers."
      ] }
    ]
  },
  {
    slug: "mexico-city-roma-norte-vs-condesa",
    title: "Roma Norte or Condesa: where to stay in Mexico City",
    dek: "Two leafy neighbourhoods, ten minutes apart, very different moods. Pick the right one and you'll barely need a taxi all week.",
    category: "Guides",
    location: "Mexico City",
    country: "Mexico",
    date: "2026-09-19",
    author: "Kwarto Editors",
    heroImage: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Metropolitan Cathedral on the Zócalo in Mexico City",
    hotelName: "Condesa DF",
    city: "Mexico City",
    citySlug: "mexico-city",
    body: [
      { type: "p", text: "Mexico City is enormous, and where you sleep decides what kind of trip you have. Stay in the Centro Histórico and you'll see the murals and the Zócalo but eat badly at night. Stay in Polanco and you'll have the museums but pay hotel-chain prices. Stay in Roma Norte or Condesa and you'll have the best restaurants, cafés and bars in the country within a ten-minute walk — and the rest of the city a short Uber away." },
      { type: "h2", text: "Roma Norte" },
      { type: "p", text: "Grittier, younger, more going on. Álvaro Obregón is the main avenue, lined with mezcalerías and taco stands; the side streets are full of converted mansions and design shops. Hotels here tend to be small — 10 to 25 rooms — and the best of them feel like staying in a very well-run friend's house." },
      { type: "ul", items: [
        "Ignacia Guest House — nine rooms in a 1913 mansion with a courtyard garden. $220–$280.",
        "Casa Goliana — eight rooms, rooftop terrace, excellent breakfast. $150–$190.",
        "Nima Local House — four rooms, the quietest street in Roma. $250+."
      ] },
      { type: "cta", label: "Compare Roma Norte hotels on Booking.com", hotel: "Roma Norte", city: "Mexico City", note: "Searches the neighbourhood with your dates." },
      { type: "h2", text: "Condesa" },
      { type: "p", text: "Leafier, calmer, more Art Deco. Parque México and Parque España sit in the middle; Amsterdam Avenue circles the old racetrack with a jogging path under the trees. It's the neighbourhood for long breakfasts and dog-watching. Hotels run a little bigger and a little more polished than in Roma." },
      { type: "p", text: "Condesa DF is the one everyone recommends and it's still the right call: a 1928 triangular building wrapped around a courtyard, 40 rooms, and a rooftop bar overlooking Parque España. From around $240." },
      { type: "cta", label: "Check Condesa DF on Booking.com", hotel: "Condesa DF", city: "Mexico City", note: "Opens with your dates." },
      { type: "img", src: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1400&q=70", alt: "Hotel façade with balconies and palm trees", caption: "Condesa's hotels are mostly restored 1920s–30s buildings with courtyards." },
      { type: "h2", text: "The honest answer" },
      { type: "p", text: "Under 35 or travelling with friends: Roma Norte. Couples, families, or anyone who wants to sleep before 1am: Condesa. Either way, altitude is 2,240 metres — go easy on the mezcal the first night." }
    ]
  },
  {
    slug: "seoul-myeongdong-hotels-under-80",
    title: "Seoul under $80: Myeongdong hotels a two-minute walk from the subway",
    dek: "Korea's hotel boom left Myeongdong with more clean, new, mid-range rooms than it can fill. Mid-week, that's your opening.",
    category: "Deals",
    location: "Myeongdong, Seoul",
    country: "South Korea",
    date: "2026-09-12",
    author: "Kwarto Editors",
    priceFrom: 74,
    heroImage: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Shop signs on a busy Seoul street at dusk",
    hotelName: "Nine Tree Premier Hotel Myeongdong 2",
    city: "Seoul",
    citySlug: "seoul",
    body: [
      { type: "p", text: "Myeongdong is Seoul's shopping district and its tourist heart, and in the last decade it has sprouted dozens of 15–25-storey mid-range hotels built for tour groups. Group travel hasn't fully come back. The hotels have. Mid-week in spring and autumn, you can get a brand-new double room with a window, a decent bed and a metro station at the door for less than $80." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "Nine Tree Premier Hotel Myeongdong 2, Jung-gu, Seoul"],
        ["Rates we saw", "From about $74 a night for a Standard Double, Monday–Thursday in November"],
        ["Includes", "Wi-Fi, in-room fridge and kettle, rooftop lounge, luggage storage"],
        ["Best for", "Shoppers, first-timers, anyone planning day trips to the DMZ or Suwon"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Two minutes from Euljiro 3-ga station (lines 2 and 3), which puts Gangnam, Hongdae and Insadong all within 25 minutes.",
        "Rooms are 22–26 m² — generous for the price band — with proper blackout blinds and a window that opens.",
        "The 6am airport bus to Incheon stops a block away.",
        "Myeongdong's street-food market sets up right outside from 4pm."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=70", alt: "Hotel rooftop pool with cabanas at sunset", caption: "Several of the newer Myeongdong towers have rooftop lounges — ask for a high floor facing Namsan." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Prices roughly double on Friday and Saturday and during the autumn-foliage peak (late October to mid-November). Breakfast add-ons are rarely worth it — there's a 24-hour gimbap shop on every corner. Korean hotels are strict about guest count, so set the right number of adults before you search." },
      { type: "cta", label: "Check live rates on Booking.com", note: "Opens Booking.com with your dates and guests." }
    ]
  },
  {
    slug: "siargao-where-to-sleep-near-cloud-9",
    title: "Siargao: five places to sleep within a walk of Cloud 9",
    dek: "Surf at dawn, swim at noon, sleep early. The General Luna strip has gone from huts to boutique in five years. Here's what's good.",
    category: "City picks",
    location: "General Luna, Siargao",
    country: "Philippines",
    date: "2026-09-05",
    author: "Kwarto Editors",
    priceFrom: 65,
    heroImage: "https://images.unsplash.com/photo-1605216663980-b7ca6e9f2451?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "White-sand beach with rocks and palms on Siargao",
    hotelName: "Siargao Bleu Resort and Spa",
    city: "Siargao",
    citySlug: "siargao",
    body: [
      { type: "p", text: "Siargao is the surf island that grew up. The strip from General Luna town to the Cloud 9 boardwalk is now five kilometres of coffee shops, surf schools and small resorts — most of them built in the last five years, most of them owner-run, and almost all of them walkable or a two-minute tricycle from the break." },
      { type: "h2", text: "Our five" },
      { type: "ul", items: [
        "Siargao Bleu Resort and Spa — the polished option, with a big pool, a spa and sea-facing rooms right at Cloud 9. $120–$160.",
        "Kawayan Siargao Resort — six villas in a coconut grove, excellent restaurant, the romantic pick. $180+.",
        "Nay Palad Hideaway — the splurge: ten villas, all-inclusive, private beach. $600+ and worth it once.",
        "Bravo Beach Resort — Spanish-run, beachfront, with the best pizza on the island. $90–$130.",
        "Lampara Siargao — the budget pick with a pool and bikes. $55–$75."
      ] },
      { type: "cta", label: "Check Siargao Bleu on Booking.com", hotel: "Siargao Bleu Resort and Spa", city: "Siargao", note: "Opens with your dates." },
      { type: "img", src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1400&q=70", alt: "Boat on a turquoise lagoon surrounded by palms", caption: "Sugba Lagoon is a 45-minute boat ride from Del Carmen — book a morning slot and be back for lunch." },
      { type: "h2", text: "What to know" },
      { type: "p", text: "Surf season runs September to November, and that's also when the island is busiest — book three to four weeks out. The habagat (southwest monsoon) brings rain from June to August but also the lowest rates of the year. Flights into Sayak airport are small and sell out; many people fly to Cebu and connect." },
      { type: "cta", label: "See all General Luna stays on Booking.com", hotel: "General Luna", city: "Siargao", note: "Searches the whole strip with your dates." }
    ]
  }
];
