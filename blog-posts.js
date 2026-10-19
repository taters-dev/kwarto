/* Kwarto blog — hotel deals, guides, and city picks.
   Plain data; blog.js renders it on /blog, /blog/<slug>, and the homepage row.
   Every post is about one hotel we spotted on nitecrawler.com (sourceUrl links to its listing there),
   plus one Kwarto editor's pick from the Philippines, which nitecrawler doesn't cover yet.
   Rates are indicative snapshots, not live prices — the CTA always opens Booking.com
   with the reader's own dates so they see today's number. */
window.KWARTO_POSTS = [
  {
    slug: "beverly-wilshire-four-seasons-960-a-night",
    title: "$960 a night at the Beverly Wilshire: what the Pretty Woman hotel actually gives you for it",
    dek: "Rodeo Drive at the door, a 1928 landmark wing, a pool that feels like a private club. Nitecrawler had a King Room at $960 — here's whether it's worth it.",
    category: "Deals",
    location: "Beverly Hills, California",
    country: "United States",
    date: "2026-10-18",
    author: "Kwarto Editors",
    featured: true,
    priceFrom: 960,
    sourceUrl: "https://www.nitecrawler.com/destinations/ca/beverly-hills/hotels/101838943/Beverly-Wilshire%2C-Beverly-Hills%2C-A-Four-Seasons-Hotel-Beverly-Hills-California",
    heroImage: "https://images.unsplash.com/photo-1597982087634-9884f03198ce?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Palm-lined road in Los Angeles with the downtown skyline behind",
    hotelName: "Beverly Wilshire, A Four Seasons Hotel",
    city: "Beverly Hills",
    citySlug: "beverly-hills",
    body: [
      { type: "p", text: "There are two Beverly Hills hotels everyone has heard of, and this is the one on the corner of Wilshire and Rodeo. The Beverly Wilshire has been a Four Seasons since the early nineties, it has 395 rooms split between the original 1928 Wilshire Wing and the newer Beverly Wing, and it still gets a steady stream of guests who want to stand on the balcony from the movie. None of that is cheap. When we looked on nitecrawler.com, a King Room was listed at $960 a night — $1,127.56 all-in once taxes and fees were added." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "9500 Wilshire Boulevard, Beverly Hills — the corner of Rodeo Drive"],
        ["Rate we saw", "$960 a night for a King Room on nitecrawler.com; $1,127.56 total with taxes and fees"],
        ["Guest score", "8.9 / 10 \u201cVery Good\u201d from 329 reviews on nitecrawler"],
        ["Includes", "Outdoor pool, full-service spa, fitness centre, 24-hour room service, valet"],
        ["Best for", "A one- or two-night splurge, anniversaries, anyone who wants Rodeo Drive without a car"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "The location is the whole point: Rodeo Drive starts at the hotel\u2019s front door, and the Beverly Hills triangle of shops and restaurants is a flat ten-minute walk in every direction.",
        "Two wings, two moods. The Wilshire Wing is the 1928 landmark with high ceilings and Italian-marble bathrooms; the Beverly Wing is quieter and faces the pool.",
        "The pool is a proper Mediterranean-style courtyard affair with cabanas, which in Beverly Hills is rarer than you\u2019d think.",
        "Four Seasons housekeeping and a concierge desk that can actually get you a table."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1400&q=70", alt: "Palm trees along a Los Angeles street at sunset", caption: "Beverly Hills is flat and walkable — one of the few Los Angeles neighbourhoods where you can leave the car parked." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "$960 buys you the entry-level King. Rooms facing Wilshire Boulevard hear traffic; ask for the Beverly Wing or an upper floor if you\u2019re a light sleeper. Valet parking is extra and expensive, so if you\u2019re flying in, skip the rental and use rideshares. Rates swing hard with awards season and the big conventions — mid-week in late autumn and January is where the lower numbers live." },
      { type: "cta", label: "Check Beverly Wilshire rates on Booking.com", note: "Opens Booking.com with your dates already filled in." },
      { type: "h2", text: "If it\u2019s out of budget" },
      { type: "p", text: "Nitecrawler\u2019s Los Angeles list has two very different alternatives: the Hollywood Roosevelt, a 1927 landmark with a famous pool for a fraction of the price, and Shutters on the Beach in Santa Monica if what you really want is the ocean. We\u2019ve written up both." }
    ]
  },
  {
    slug: "cosmopolitan-las-vegas-centre-strip",
    title: "The Cosmopolitan of Las Vegas: the best-placed hotel on the Strip, and what the resort fee buys",
    dek: "Three thousand rooms, nineteen restaurants, and the Bellagio fountains a five-minute walk away. Nitecrawler calls it the best centrally located hotel in Las Vegas. We agree — with one caveat about the fee.",
    category: "Deals",
    location: "The Strip, Las Vegas",
    country: "United States",
    date: "2026-10-15",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/nv/las-vegas/hotels/100537878/The-Cosmopolitan-Of-Las-Vegas-Las-Vegas-Nevada",
    heroImage: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "The Las Vegas Strip lit up at night with the fountains in the foreground",
    hotelName: "The Cosmopolitan of Las Vegas",
    city: "Las Vegas",
    citySlug: "las-vegas",
    body: [
      { type: "p", text: "Las Vegas hotels are enormous, and the enormous ones are not all equal. The Cosmopolitan sits at 3708 Las Vegas Boulevard South, dead centre of the Strip, between the Bellagio and the Aria. It has 3,041 rooms, which sounds like a convention centre, but it was built in 2010 as a five-star and it still feels like one: the rooms are bigger than the Strip average, most have terraces, and the restaurant floor is the best single block of dining in the city." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "3708 Las Vegas Boulevard South — centre Strip, 5 minutes on foot to the Fountains of Bellagio"],
        ["Rate", "Nightly rates move daily; nitecrawler.com shows the live number for your dates"],
        ["Resort fee", "$62.36 a night, charged at the hotel on top of the room rate"],
        ["Includes", "Spa, multiple pools, fitness centre, 19 restaurants and bars, casino"],
        ["Best for", "First-timers who want to walk everywhere, groups, food-led weekends"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Location is unbeatable: Bellagio, Aria, Paris and the Crystals mall are all a short walk, and the Monorail and Deuce bus are close by.",
        "Rooms with terraces. Almost nowhere else on the Strip lets you open a door and stand outside with a coffee.",
        "Nineteen places to eat under one roof, including Beauty & Essex, so you can have a different dinner every night without leaving the building.",
        "The pool deck and spa are big enough that even at 3,000 rooms you can find a lounger."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1400&q=70", alt: "The Welcome to Fabulous Las Vegas sign under palm trees", caption: "The classic sign is at the south end of the Strip — a short rideshare from centre Strip." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "The resort fee is the thing to budget for. At $62.36 a night it can add a third to a cheap mid-week rate, and it is charged whether or not you use the pool or the gym. Compare the all-in total, not the headline. Weekends and big fight or convention weeks roughly double rates; Sunday to Thursday is where the value is. If you want a terrace, filter for it explicitly — the entry-level rooms don\u2019t all have one." },
      { type: "cta", label: "Check Cosmopolitan rates on Booking.com", note: "Opens with your dates and guests." },
      { type: "h2", text: "Also on nitecrawler\u2019s Las Vegas list" },
      { type: "p", text: "Wynn Las Vegas, at the north end of the Strip, has the same $62.36 resort fee but adds a golf course, three pools and thirteen restaurants including Delilah. It\u2019s the quieter, more polished choice if you don\u2019t mind being a longer walk from the centre." }
    ]
  },
  {
    slug: "bryant-park-hotel-new-york-boutique",
    title: "The Bryant Park Hotel: a 128-room boutique steps from the park and Times Square",
    dek: "Midtown without the Midtown feeling. A black-brick landmark on West 40th with the park across the street, Times Square three blocks away, and a $34 resort fee you should know about.",
    category: "Guides",
    location: "Midtown, New York",
    country: "United States",
    date: "2026-10-11",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/ny/new-york/hotels/101972522/The-Bryant-Park-Hotel-New-York-New-York",
    heroImage: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Manhattan skyline at sunset with the Empire State Building",
    hotelName: "The Bryant Park Hotel",
    city: "New York",
    citySlug: "new-york",
    body: [
      { type: "p", text: "Most Midtown hotels are big, beige and built for conferences. The Bryant Park Hotel is the exception: 128 rooms inside the 1924 American Radiator Building, a black-and-gold Gothic tower on West 40th Street that faces straight onto Bryant Park. You get the park\u2019s lawn in summer and its ice rink and holiday market in winter, and Times Square is 0.3 miles away when you want it." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "40 West 40th Street, Midtown Manhattan — across the street from Bryant Park"],
        ["Rate", "Live nightly rates for your dates are on nitecrawler.com"],
        ["Resort fee", "$34.42 a night, collected at the hotel"],
        ["Guest reviews", "977 reviews on nitecrawler at the time we looked"],
        ["Best for", "Couples, theatre weekends, anyone who wants a small hotel in the middle of everything"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Four-star boutique scale: 128 rooms means a lobby you can cross in ten steps and staff who recognise you by day two.",
        "Bryant Park across the street, the New York Public Library next to it, and Grand Central and Times Square each within a ten-minute walk.",
        "High floors face north over the park with open sky — rare for Midtown.",
        "Fifth Avenue shopping starts one block east."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=70", alt: "Times Square at street level with its billboards lit", caption: "Times Square is three blocks west — close enough to walk to a show, far enough not to hear it." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Two things. First, the $34.42 nightly resort fee: add it to whatever rate you see before you compare. Second, nitecrawler flags a lobby renovation running from 10 August to 30 October 2026 — if you\u2019re arriving before the end of October, expect a temporary check-in setup and some noise during the day. Rooms are not affected. After that, it should be back to normal." },
      { type: "cta", label: "Check Bryant Park Hotel rates on Booking.com", note: "Opens with your stay dates." },
      { type: "h2", text: "If it\u2019s full" },
      { type: "p", text: "Arlo NoMad, a dozen blocks south near the Empire State Building, is the pick if you\u2019d trade room size for a rooftop bar and a lower rate — we\u2019ve written it up separately. For a bigger, more polished downtown option, nitecrawler also lists the Conrad New York Downtown, an all-suite Art Deco tower ten minutes\u2019 walk from One World Trade Center." }
    ]
  },
  {
    slug: "hollywood-roosevelt-los-angeles-pool",
    title: "The Hollywood Roosevelt: the 1927 landmark with the best pool on Hollywood Boulevard",
    dek: "It hosted the first Academy Awards and it still has the pool David Hockney painted. Nitecrawler\u2019s top pick for Los Angeles is a four-star with history you can actually afford.",
    category: "City picks",
    location: "Hollywood, Los Angeles",
    country: "United States",
    date: "2026-10-07",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/ca/los-angeles/hotels/100897902/The-Hollywood-Roosevelt-Los-Angeles-California",
    heroImage: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "The Hollywood sign on the hillside above Los Angeles",
    hotelName: "The Hollywood Roosevelt",
    city: "Los Angeles",
    citySlug: "los-angeles",
    body: [
      { type: "p", text: "If you\u2019re going to stay on Hollywood Boulevard — and plenty of first-time visitors do — stay in the building that made it famous. The Hollywood Roosevelt opened in 1927, hosted the first Academy Awards ceremony in its Blossom Ballroom two years later, and has been renovated enough times since to feel like a proper four-star rather than a museum. It\u2019s the hotel nitecrawler.com puts at the top of its Los Angeles recommendations, and it\u2019s the one we\u2019d book for a first trip." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "7000 Hollywood Boulevard — 3 minutes on foot from the Dolby Theatre and the Walk of Fame"],
        ["Rate", "Nightly rates for your dates are live on nitecrawler.com"],
        ["Includes", "Outdoor pool, fitness centre, on-site restaurants and bars, pet-friendly rooms"],
        ["Best for", "First trips to LA, film buffs, anyone who wants a pool day between sightseeing"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "The Tropicana Pool is the reason to stay: a palm-ringed courtyard with a mural on the pool floor, cabanas, and a bar that runs late.",
        "Three minutes to the Dolby Theatre, the Chinese Theatre and the Hollywood/Highland Metro station — the B Line gets you downtown in 20 minutes without touching a freeway.",
        "Two very different room types: Spanish-Colonial rooms in the historic tower, and poolside cabana rooms that open straight onto the deck.",
        "Pet-friendly, which in a landmark hotel is unusual."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=70", alt: "Hotel pool lit up at dusk with loungers around it", caption: "Book a cabana room if you plan to spend more time by the pool than in the room." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Hollywood Boulevard is loud and touristy at street level; that\u2019s the trade for the location. Tower rooms on higher floors facing away from the boulevard are the quiet ones. The pool bar and the hotel\u2019s club nights can run late on weekends — ask for a room away from the courtyard if you\u2019re an early sleeper. Parking is valet-only and priced like Los Angeles." },
      { type: "cta", label: "Check Hollywood Roosevelt rates on Booking.com", note: "Opens with your dates already filled in." },
      { type: "h2", text: "Also on nitecrawler\u2019s LA list" },
      { type: "p", text: "Petit Ermitage in West Hollywood is the 79-room bohemian alternative — fireplaces, a rooftop pool, and a very different crowd. If you want the beach instead, read our Shutters on the Beach pick." }
    ]
  },
  {
    slug: "mactan-cebu-crimson-resort-editors-pick",
    title: "Editor\u2019s pick: Crimson Resort and Spa Mactan for a two-night weekend",
    dek: "Fifteen minutes from Cebu\u2019s airport, sand on your feet by lunch. Nitecrawler doesn\u2019t list Philippine hotels yet, so this one is ours — the Mactan resort we\u2019d book for a short break, and what you\u2019ll pay.",
    category: "City picks",
    location: "Mactan, Cebu",
    country: "Philippines",
    date: "2026-10-03",
    author: "Kwarto Editors",
    editorsPick: true,
    priceFrom: 140,
    heroImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Resort pool next to the sea with palm trees",
    hotelName: "Crimson Resort and Spa Mactan",
    city: "Cebu",
    citySlug: "cebu",
    body: [
      { type: "p", text: "Mactan\u2019s whole pitch is proximity. The airport is on the island, the resorts line its east coast, and you can be in the water within an hour of your bag hitting the carousel. For a Friday-to-Sunday break — from Manila, Singapore, Hong Kong, or anywhere with a direct flight — that matters more than almost anything else. Crimson Resort and Spa is the one we\u2019d book first." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "Seascapes Resort Town, Mactan Island, Cebu — about 15 minutes from Mactan-Cebu International Airport"],
        ["Rates we saw", "Garden rooms from about $140 a night on most weekends; private-pool villas from $350"],
        ["Includes", "Beachfront, large free-form pool, spa, kids\u2019 club, several restaurants"],
        ["Best for", "Short breaks, families, anyone connecting through Cebu who wants one proper beach day"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Low-rise casitas rather than a tower, and a long stretch of real beach on the Hilutungan Channel — calm, swimmable water most of the year.",
        "A pool big enough that it never feels crowded, even on a sold-out weekend.",
        "Close enough to the airport that a 7am flight home doesn\u2019t mean a 4am alarm.",
        "The private-pool villas are the splurge, but the garden rooms are the value."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=70", alt: "Infinity pool looking out to the sea", caption: "Mactan\u2019s east coast faces the channel, not the open sea — good for swimming, better for island-hopping boats." },
      { type: "h2", text: "What to know" },
      { type: "p", text: "Weekends sell out two to three weeks ahead during Sinulog (January) and Holy Week. Mid-week rates are 20–30% lower across the board. Most Mactan resorts charge a day-use fee for non-guests, so booking in — even for one night — is often cheaper than paying for a day pass twice." },
      { type: "cta", label: "Check Crimson Mactan on Booking.com", note: "Opens with your dates and guests." },
      { type: "h2", text: "Nearby alternatives" },
      { type: "ul", items: [
        "Dusit Thani Mactan — newer, bigger pool, slightly further north. $150–$200.",
        "Bluewater Maribago — the classic family option, with a lagoon-style pool and a shuttle to the city. $110–$150.",
        "Solea Mactan — the budget pick with the biggest pool on the island. $70–$95."
      ] },
      { type: "cta", label: "See all Mactan resorts on Booking.com", hotel: "Mactan", city: "Cebu", note: "Searches the whole island with your dates." }
    ]
  },
  {
    slug: "arlo-nomad-new-york-rooftop",
    title: "Arlo NoMad: small rooms, big rooftop, three minutes from the Empire State Building",
    dek: "New York\u2019s smartest answer to the tiny-room problem. You sleep in a compact, well-designed box and live on a rooftop terrace with the Empire State Building filling the window.",
    category: "Deals",
    location: "NoMad, New York",
    country: "United States",
    date: "2026-09-29",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/ny/new-york/hotels/102721197/Arlo-NoMad-New-York-New-York",
    heroImage: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Aerial view of Midtown Manhattan around the Empire State Building",
    hotelName: "Arlo NoMad",
    city: "New York",
    citySlug: "new-york",
    body: [
      { type: "p", text: "Arlo NoMad is a 249-room hotel on East 31st Street built around a simple trade: the rooms are small, and the shared spaces are excellent. The payoff is a rooftop terrace and bar with the Empire State Building close enough to feel like part of the hotel, and a nightly rate that sits well below what a comparable location in Midtown usually costs. If you plan to be out all day — and in New York you will be — it\u2019s one of the best-value beds in Manhattan." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "11 East 31st Street, NoMad — a 3-minute walk to the Empire State Building"],
        ["Rate", "Live nightly rates for your dates are on nitecrawler.com"],
        ["Includes", "Rooftop terrace and bar, lobby lounge, fitness centre, pet-friendly rooms"],
        ["Best for", "Solo travellers and couples, short city breaks, anyone who values location over square footage"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "The rooftop. It\u2019s the kind of view that other hotels charge $500 a night for, and here it comes with the room.",
        "NoMad is a genuinely good neighbourhood: Koreatown is two blocks away, Madison Square Park and the Flatiron are five minutes south, and the 6, N/R/W and PATH are all close.",
        "Pet-friendly, with proper floor-to-ceiling windows even in the smallest rooms.",
        "No resort fee listed on nitecrawler at the time we looked — a rarity in Manhattan."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=70", alt: "Compact hotel room with a double bed and a city window", caption: "Entry-level rooms are built around the bed and the window. Pack light and you won\u2019t notice." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Standard rooms are around 150 square feet; if you\u2019re two people with two suitcases, pay for the larger king or a corner room. Rooms facing 31st Street are livelier at night than the ones facing the courtyard. The rooftop bar is open to the public and gets busy on Friday and Saturday evenings — go up early if you want the sunset to yourself." },
      { type: "cta", label: "Check Arlo NoMad rates on Booking.com", note: "Opens with your stay dates." },
      { type: "h2", text: "If you want more room" },
      { type: "p", text: "The Bryant Park Hotel, ten blocks north, is the boutique step up with a park across the street. Our write-up covers the resort fee and the current lobby renovation." }
    ]
  },
  {
    slug: "shutters-on-the-beach-santa-monica",
    title: "Shutters on the Beach: the Santa Monica hotel where the sand starts at the terrace",
    dek: "Los Angeles has very few hotels actually on the beach. This is the best of them — 198 rooms, a Cape Cod look, and the pier an eight-minute walk up the boardwalk.",
    category: "City picks",
    location: "Santa Monica, California",
    country: "United States",
    date: "2026-09-24",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/ca/santa-monica/hotels/100927260/Shutters-on-the-Beach-Santa-Monica-California",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Golden sunset over a wide sandy Pacific beach",
    hotelName: "Shutters on the Beach",
    city: "Santa Monica",
    citySlug: "santa-monica",
    body: [
      { type: "p", text: "Shutters sits at 1 Pico Boulevard, which is the address you get when the next thing west of you is the Pacific. It\u2019s a 198-room hotel built in the early nineties to look like a grand New England beach house — white clapboard, grey shutters, a lot of wicker — and it has stayed the Los Angeles beach hotel ever since. The sand is literally on the other side of the terrace railing." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "1 Pico Boulevard, Santa Monica — on the beach, 8 minutes on foot to Santa Monica Pier"],
        ["Rate", "Live nightly rates for your dates are on nitecrawler.com"],
        ["Includes", "Beachfront, outdoor pool, full spa, Coast restaurant and the 1 Pico dining room, fitness centre"],
        ["Best for", "Beach-first LA trips, families with bikes, anyone who wants to skip the freeways entirely"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "Real beachfront. Walk out of the lobby, across the bike path, and you\u2019re on the sand.",
        "The Marvin Braude bike path runs past the door — rent bikes and you can ride to Venice in 15 minutes or Malibu in an hour.",
        "Coast, the casual restaurant on the boardwalk level, is the best breakfast spot in Santa Monica that you don\u2019t have to queue for.",
        "Santa Monica Pier and Third Street Promenade are both walkable, and the Metro E Line to downtown LA is ten minutes away."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=70", alt: "A striped deckchair on the sand under palm trees", caption: "Ocean-view rooms have shuttered doors that open fully to the sea air — ask for the front of the building." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Rooms are classed by view, and the difference between a partial and a full ocean view is real — the full-view rooms on the front of the building are worth the premium. The pool is small by LA standards; the beach is the point. Summer weekends and the week after Christmas book out months ahead. Valet parking is expensive, and you genuinely don\u2019t need a car here." },
      { type: "cta", label: "Check Shutters on the Beach on Booking.com", note: "Opens with your dates already filled in." },
      { type: "h2", text: "Other LA picks from nitecrawler" },
      { type: "p", text: "For the Hollywood end of the city, read our pick of the Hollywood Roosevelt; for the full Beverly Hills experience, the Beverly Wilshire. All three are on nitecrawler.com\u2019s Los Angeles list." }
    ]
  },
  {
    slug: "loews-chicago-hotel-riverwalk",
    title: "Loews Chicago Hotel: a rooftop terrace five minutes from the Riverwalk",
    dek: "Four hundred rooms in Streeterville, big river-and-lake views, and Navy Pier and the Magnificent Mile both on foot. A solid Chicago base — with a resort fee and a pool note you should read first.",
    category: "Guides",
    location: "Streeterville, Chicago",
    country: "United States",
    date: "2026-09-20",
    author: "Kwarto Editors",
    sourceUrl: "https://www.nitecrawler.com/destinations/il/chicago/hotels/100148875/Loews-Chicago-Hotel-Chicago-Illinois",
    heroImage: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "The Chicago River between skyscrapers with a bridge in the foreground",
    hotelName: "Loews Chicago Hotel",
    city: "Chicago",
    citySlug: "chicago",
    body: [
      { type: "p", text: "Chicago rewards hotels that put you near the river, and Loews Chicago is about as near as you can get without sleeping on a boat. It\u2019s a 400-room tower in Streeterville, the neighbourhood wedged between the Magnificent Mile and the lake, a five-minute walk from the Riverwalk and about ten from Navy Pier. The rooms are large, modern and mostly glass, and the upper floors look straight out over Lake Michigan." },
      { type: "deal", title: "The deal", rows: [
        ["Where", "455 North Park Drive, Streeterville — 5 minutes on foot to the Chicago Riverwalk"],
        ["Rate", "Live nightly rates for your dates are on nitecrawler.com"],
        ["Resort fee", "$35.67 a night, charged at the hotel"],
        ["Includes", "Rooftop terrace, fitness centre, spa services, restaurant and bar"],
        ["Best for", "First trips to Chicago, architecture-boat-tour weekends, families heading to Navy Pier"]
      ] },
      { type: "h2", text: "Why we like it" },
      { type: "ul", items: [
        "The rooftop terrace: open-air, with the skyline on one side and the lake on the other. Chicago summers were made for it.",
        "Walk to the Riverwalk for the architecture boat tours, to Michigan Avenue for shopping, and to Navy Pier for the Ferris wheel — no taxis needed.",
        "Rooms are a cut above the Chicago convention-hotel average: floor-to-ceiling windows, proper desks, good blackout blinds.",
        "Lake-view rooms on high floors are genuinely spectacular at sunrise."
      ] },
      { type: "img", src: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1400&q=70", alt: "Cloud Gate sculpture reflecting the Chicago skyline", caption: "Millennium Park and the Bean are a 20-minute walk south along Michigan Avenue." },
      { type: "h2", text: "What to know before you book" },
      { type: "p", text: "Two honest flags from the nitecrawler listing. The resort fee is $35.67 a night, on top of whatever rate you see — add it before you compare. And the indoor pool is closed through 31 December 2026, so if a swim is non-negotiable, look elsewhere until the new year. Streeterville is quiet after dark, which is either a feature or a bug depending on your trip; River North\u2019s restaurants are a ten-minute walk west." },
      { type: "cta", label: "Check Loews Chicago rates on Booking.com", note: "Opens with your stay dates." },
      { type: "h2", text: "Also on nitecrawler\u2019s Chicago list" },
      { type: "p", text: "The Chicago Hotel Collection \u2013 Magnificent Mile is a 216-room Art Deco property a tenth of a mile off Michigan Avenue, with a $49.95 resort fee. It\u2019s the pick if you want to be right on the shopping rather than by the water." }
    ]
  }
];
