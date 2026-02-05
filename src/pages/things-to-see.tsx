import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import PlaceCard, { type Place } from "../components/PlaceCard";

// Category data structure
interface Category {
  title: string;
  subtitle?: string;
  description: string;
  places: Place[];
}

// Colombo places
const colomboPlaces: Place[] = [
  {
    title: "Gangaramaya Temple",
    description:
      "A beautiful Buddhist temple blending Sri Lankan, Thai, Indian, and Chinese architecture with a fascinating museum of ancient relics.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Gangaramaya Temple"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Seema Malaka Temple",
    description:
      "A serene temple on Beira Lake, designed by Geoffrey Bawa, perfect for quiet reflection and stunning photos.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Seema Malaka Temple"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Colombo National Museum",
    description:
      "The largest museum in Sri Lanka, displaying ancient artifacts, royal regalia, and colonial-era exhibits.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Colombo National Museum"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Independence Memorial Hall",
    description:
      "A national monument celebrating Sri Lanka's independence from British rule in 1948. The surrounding park and statues make it a peaceful place for a stroll.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Independence Memorial Hall"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Old Dutch Hospital",
    description:
      "One of the oldest buildings in Colombo, now turned into a trendy shopping and dining complex with cafes, boutiques, and restaurants.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Old Dutch Hospital"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Galle Face Green",
    description:
      "A popular oceanfront park where locals gather to enjoy street food, and watch epic sunsets over the Indian Ocean.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Galle Face Green"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Colombo Lotus Tower",
    description:
      "The tallest structure in South Asia, offering panoramic views of the city skyline and coastline.",
    travelTime: "30-45 minutes from Moratuwa",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Colombo Lotus Tower"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
];

// National Parks places
const nationalParksPlaces: Place[] = [
  {
    title: "Yala National Park",
    description:
      "Famous for having one of the highest leopard densities in the world. Elephants, sloth bears, crocodiles, and colorful bird species also thrive here.",
    travelTime: "5-6 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/parks/yala.png"
        alt="Yala National Park"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Wilpattu National Park",
    description:
      "The largest national park in Sri Lanka, known for its natural lakes called \"villus.\" It is a quieter, less crowded alternative to Yala but also offers sightings of leopards and sloth bears.",
    travelTime: "3.5-4 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/parks/wilpattu.png"
        alt="Wilpattu National Park"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Udawalawe National Park",
    description:
      "One of the best places in Asia to see wild elephants up close. The park is centered around the Udawalawe Reservoir, attracting herds of elephants year-round.",
    travelTime: "4-5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/parks/udawalawe.png"
        alt="Udawalawe National Park"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Minneriya National Park",
    description:
      "Most famous for the \"Elephant Gathering,\" where hundreds of elephants congregate during the dry season. It's a heaven for birdlife and other mammals too.",
    travelTime: "4-5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/parks/minneriya.png"
        alt="Minneriya National Park"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
];

// Nature Trails places
const natureTrailsPlaces: Place[] = [
  {
    title: "Pekoe Trail",
    description:
      "A scenic long-distance trail through Sri Lanka's Central Highlands, offering fantastic views of tea plantations, mountains, and valleys.",
    image: (
      <StaticImage
        src="../images/places/hiking/pekoe.png"
        alt="Pekoe Trail"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Ella Rock",
    description:
      "Offers one of the best views in Sri Lanka, with panoramic views of surrounding valleys and mountains, including the famous Nine Arches Bridge.",
    image: (
      <StaticImage
        src="../images/places/hiking/ella_rock.png"
        alt="Ella Rock"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Horton Plains",
    description:
      "Features the World's End trek with a dramatic cliff drop of nearly 1,000 meters and beautiful Baker's Falls.",
    image: (
      <StaticImage
        src="../images/places/hiking/horton_plain.png"
        alt="Horton Plains"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Knuckles Mountain Range",
    description:
      "A UNESCO World Heritage Site offering various hiking trails through rugged terrain, dense forests, and stunning views.",
    image: (
      <StaticImage
        src="../images/places/hiking/knuckles.png"
        alt="Knuckles Mountain Range"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
];

// Pristine Beaches places
const beachesPlaces: Place[] = [
  {
    title: "Unawatuna",
    description:
      "Famous for golden sandy shores and crystal-clear waters, perfect for swimming and snorkeling. Located near the historic Galle Fort.",
    travelTime: "1-2 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Unawatuna Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Mirissa",
    description:
      "Known for whale watching and beautiful crescent-shaped beach with peaceful atmosphere.",
    travelTime: "1-2 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/mirissa.png"
        alt="Mirissa Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Weligama",
    description:
      "A popular beach destination for both beginners and experienced surfers, with beachfront cafes and eateries.",
    travelTime: "1-2 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/weligama.png"
        alt="Weligama Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Bentota",
    description:
      "Offers a wide stretch of golden sand and clear blue waters, perfect for water sports like jet-skiing, windsurfing, and kite surfing.",
    travelTime: "1-2 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/bentota.png"
        alt="Bentota Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Arugam Bay",
    description:
      "A heaven for surfers, famous for its long, sandy beach and perfect waves, with a relaxed vibe.",
    travelTime: "6-7 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/arugam_bay.png"
        alt="Arugam Bay"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Nilaveli",
    description:
      "A quieter beach destination with white sand and turquoise waters, perfect for a relaxing beach day.",
    travelTime: "6-7 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/nilaweli.png"
        alt="Nilaveli Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Pasikudah",
    description:
      "Well known for its shallow, warm waters and pristine beaches, making it ideal for swimming and relaxing by the sea.",
    travelTime: "6-7 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/beaches/pasikudah.png"
        alt="Pasikudah Beach"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
];

// Cultural Sites places
const culturalSitesPlaces: Place[] = [
  {
    title: "Ancient City of Anuradhapura",
    description:
      "One of the oldest continuously inhabited cities in the world, famous for its giant stupas, sacred Bo Tree (Sri Maha Bodhi), and ancient monasteries.",
    travelTime: "4.5-5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Ancient City of Anuradhapura"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Ancient City of Polonnaruwa",
    description:
      "The second capital of Sri Lanka after Anuradhapura, filled with impressive ruins of palaces, temples, and colossal Buddha statues.",
    travelTime: "5-6 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Ancient City of Polonnaruwa"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Sacred City of Kandy",
    description:
      "Home to the Temple of the Sacred Tooth Relic, one of the most sacred Buddhist sites in the world, surrounded by misty hills.",
    travelTime: "3-3.5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Sacred City of Kandy"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Old Town of Galle and its Fortifications",
    description:
      "A beautifully preserved fortified city built by the Portuguese and later expanded by the Dutch, with colonial architecture and vibrant art scene.",
    travelTime: "1-1.5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Old Town of Galle"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Dambulla Cave Temple",
    description:
      "A vast cave complex housing over 150 statues and stunning murals of Buddha, a sacred pilgrimage site for over 2,000 years.",
    travelTime: "3.5-4 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Dambulla Cave Temple"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
  {
    title: "Sigiriya (Lion Rock)",
    description:
      "Often called the \"Eighth Wonder of the World,\" featuring ancient frescoes, gardens, and royal palaces built by King Kashyapa in the 5th century AD.",
    travelTime: "4-4.5 hours from Colombo",
    image: (
      <StaticImage
        src="../images/places/unawatuna.png"
        alt="Sigiriya"
        className="w-full h-full"
        objectFit="cover"
        placeholder="blurred"
      />
    ),
  },
];

// All categories
const categories: Category[] = [
  {
    title: "Colombo (30-45 minutes from Moratuwa)",
    description:
      "Colombo, the vibrant capital of Sri Lanka, offers a mix of colonial architecture, modern attractions, and cultural landmarks. Don't miss trying Sri Lanka's iconic dishes like Hoppers, Kottu Roti, and Rice and Curry, available at local restaurants and street food stalls.",
    places: colomboPlaces,
  },
  {
    title: "National Parks (Safari)",
    description:
      "If you're a nature lover, Sri Lanka is an ideal destination for exploring its rich wildlife and diverse ecosystems. Here are a few national parks that offer a great safari experience and a glimpse into the island's incredible biodiversity.",
    places: nationalParksPlaces,
  },
  {
    title: "Nature Trails (Hiking)",
    description:
      "If you are a hiker, Sri Lanka is a great place to explore breathtaking landscapes, lush forests, and scenic mountain trails. The island offers a variety of hiking opportunities, from challenging mountain treks to serene nature walks.",
    places: natureTrailsPlaces,
  },
  {
    title: "Pristine Beaches",
    description:
      "Sri Lanka is home to some of the most stunning and pristine beaches in the world, offering the perfect escape to enjoy the sea breeze and unwind by the ocean. Whether you're seeking relaxation, adventure, or simply the beauty of nature, the beaches of Sri Lanka offer something for everyone.",
    places: beachesPlaces,
  },
  {
    title: "Cultural Sites/Cities",
    description:
      "Sri Lanka features several UNESCO World Heritage Sites that highlight its rich cultural heritage, ancient architecture, and historical importance.",
    places: culturalSitesPlaces,
  },
];

// Category Section Component
const CategorySection: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div className="w-full mb-16">
      {/* Category Header */}
      <div className="bg-dark-800/80 backdrop-blur-sm border border-secondary-500/30 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white topic text-center uppercase tracking-wider mb-4">
          {category.title}
        </h2>
        <p className="text-gray-400 para text-center max-w-4xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Places Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {category.places.map((place, idx) => (
          <PlaceCard key={`${place.title}-${idx}`} place={place} />
        ))}
      </div>
    </div>
  );
};

const ThingsToSeePage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Green Background */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgb(14, 46, 32) 0%,
              rgb(8, 26, 18) 45%,
              rgb(2, 6, 4) 80%
            )
          `,
        }}
      />

      {/* Decorative Lines */}
      <div className="fixed top-0 left-0 w-full h-16 -z-10">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent" />
        <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary-500/30 to-transparent" />
      </div>

      {/* Content */}
      <section className="relative w-full py-24 px-6 overflow-hidden z-40">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center my-16">
            <SectionHeader
              headerText="Things To See In Sri Lanka"
              textClass="text-white"
            />
            <p className="text-gray-400 text-lg max-w-4xl para mx-auto mt-4">
              Discover the stunning beauty, rich culture, and incredible
              wildlife of Sri Lanka during your visit for MERCon 2026.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-8">
            {categories.map((category, idx) => (
              <CategorySection key={`${category.title}-${idx}`} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThingsToSeePage;

export const Head = () => <title>MERCon 2026 - Things to See in Sri Lanka</title>;
