import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  category: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Spectacled Cobra',
    description:
      "The iconic Indian Spectacled Cobra, displaying its famous hood markings. One of India's 'Big Four' venomous snakes, known for its distinctive spectacle-shaped pattern on the hood.",
    location: 'Kolkata, India',
    image: '/photo/photo1.jpeg',
    category: 'Reptiles',
  },
  {
    id: 2,
    title: 'Hooded Cobra',
    description:
      'A magnificent Indian Cobra in full hood display. These snakes can expand their necks by 30% when threatened, creating an impressive defensive posture.',
    location: 'Kolkata, India',
    image: '/photo/photo2.jpg',
    category: 'Reptiles',
  },
  {
    id: 3,
    title: 'Checkered Keelback',
    description:
      'The beautiful Checkered Keelback snake, a non-venomous water snake with distinctive checkerboard pattern. Often found near water bodies and known for their aquatic lifestyle.',
    location: 'Delhi, India',
    image: '/photo/photo3.jpg',
    category: 'Reptiles',
  },
  {
    id: 4,
    title: 'Indian Peafowl',
    description:
      'A majestic Indian Peafowl displaying its iridescent plumage during courtship. The national bird of India, known for its spectacular tail feather display.',
    location: 'Goa, India',
    image: '/photo/photo4.jpg',
    category: 'Birds',
  },
  {
    id: 5,
    title: 'Bengal Tiger',
    description:
      'A powerful Bengal Tiger in its natural habitat. The largest cat subspecies, these magnificent predators are apex hunters with distinctive orange and black stripes.',
    location: 'Ahmedabad, India',
    image: '/photo/photo5.jpg',
    category: 'Mammals',
  },
  {
    id: 6,
    title: 'Indian Elephant',
    description:
      'An Asian Elephant foraging in the wild. These gentle giants are highly intelligent, with complex social structures and remarkable memory capabilities.',
    location: 'Uttarakhand, India',
    image: '/photo/photo6.jpg',
    category: 'Mammals',
  },
  {
    id: 7,
    title: 'Indian Hornbill',
    description:
      'A magnificent Great Hornbill with its characteristic casque and vibrant plumage. These large birds are important seed dispersers in tropical forests.',
    location: 'Rajasthan, India',
    image: '/photo/photo7.jpg',
    category: 'Birds',
  },
  {
    id: 8,
    title: 'Leopard',
    description:
      'A stealthy Indian Leopard captured in natural light. These elusive big cats are masters of camouflage and solitary hunters of the night.',
    location: 'Pune, India',
    image: '/photo/photo8.jpg',
    category: 'Mammals',
  },
  {
    id: 9,
    title: 'Indian Langur',
    description:
      'A troop of Indian Gray Langurs moving gracefully through the trees. These intelligent primates form complex social groups and are expert climbers.',
    location: 'Jaipur, India',
    image: '/photo/photo9.jpg',
    category: 'Mammals',
  },
  {
    id: 10,
    title: 'Butterfly Swarm',
    description:
      'A mesmerizing display of butterflies in a seasonal migration. These delicate insects play crucial roles in pollination and ecosystem health.',
    location: 'Kashmir, India',
    image: '/photo/photo10.jpg',
    category: 'Insects',
  },
  {
    id: 11,
    title: 'Rhesus Macaque',
    description:
      'A curious Rhesus Macaque observing its surroundings. These adaptable monkeys are found throughout India and have complex social behaviors.',
    location: 'Kashmir, India',
    image: '/photo/photo11.jpg',
    category: 'Mammals',
  },
  {
    id: 12,
    title: 'Oriental Magpie Robin',
    description:
      'A striking Oriental Magpie Robin displaying its black and white plumage. Known for their beautiful songs, these birds are common in urban and rural areas.',
    location: 'Kashmir, India',
    image: '/photo/photo12.jpg',
    category: 'Birds',
  },
  {
    id: 13,
    title: 'Indian Partridge',
    description:
      'A beautifully patterned Painted Francolin in natural habitat. These ground-dwelling birds are known for their elaborate courtship displays and distinctive calls.',
    location: 'Kashmir, India',
    image: '/photo/photo13.jpg',
    category: 'Birds',
  },
  {
    id: 14,
    title: 'Kingfisher',
    description:
      'A vibrant White-throated Kingfisher perched on a branch. These stunning birds are expert fishermen with brilliant blue and orange plumage.',
    location: 'Kashmir, India',
    image: '/photo/photo14.jpg',
    category: 'Birds',
  },
  {
    id: 15,
    title: 'Indian Mongoose',
    description:
      'A sleek Indian Gray Mongoose showing its agility. These clever mammals are known for their immunity to snake venom and fearless nature.',
    location: 'Kashmir, India',
    image: '/photo/photo15.jpg',
    category: 'Mammals',
  },
  {
    id: 16,
    title: 'Common Myna',
    description:
      'A charismatic Common Myna with its distinctive yellow eye patches. These intelligent birds are highly adaptable and known for their mimicry skills.',
    location: 'Kashmir, India',
    image: '/photo/photo16.jpg',
    category: 'Birds',
  },
  {
    id: 17,
    title: 'Indian Monitor Lizard',
    description:
      'A large Indian Monitor Lizard basking in the sun. These impressive reptiles can grow up to 6 feet and are skilled climbers and swimmers.',
    location: 'Kashmir, India',
    image: '/photo/photo17.jpg',
    category: 'Reptiles',
  },
  {
    id: 18,
    title: 'Indian Hare',
    description:
      'An alert Indian Hare in its natural environment. These swift runners have excellent hearing and can reach speeds up to 70 km/h when escaping predators.',
    location: 'Kashmir, India',
    image: '/photo/photo18.jpg',
    category: 'Mammals',
  },
  {
    id: 19,
    title: 'Rose-ringed Parakeet',
    description:
      'A colorful Rose-ringed Parakeet feeding on fruits. These social birds are known for their vibrant green plumage and distinctive rose-colored neck rings.',
    location: 'Kashmir, India',
    image: '/photo/photo19.jpg',
    category: 'Birds',
  },
  {
    id: 20,
    title: 'Nilgai',
    description:
      'The largest antelope in Asia, the Nilgai. These majestic herbivores are known for their distinctive bluish-gray coat and can weigh up to 300 kg.',
    location: 'Kashmir, India',
    image: '/photo/photo20.jpg',
    category: 'Mammals',
  },
  {
    id: 21,
    title: 'Indian Star Tortoise',
    description:
      'A beautifully patterned Indian Star Tortoise with its characteristic star-like markings. These terrestrial reptiles are known for their longevity and can live up to 80 years.',
    location: 'Kashmir, India',
    image: '/photo/photo21.jpg',
    category: 'Reptiles',
  },
  {
    id: 22,
    title: 'Jungle Babbler',
    description:
      'A family of Jungle Babblers foraging together. These social birds live in groups and are known for their cooperative breeding and distinctive calls.',
    location: 'Kashmir, India',
    image: '/photo/photo22.jpg',
    category: 'Birds',
  },
  {
    id: 23,
    title: 'Honey Bee Colony',
    description:
      "A thriving honey bee colony showcasing nature's engineering marvel. These industrious insects play crucial roles in pollination and honey production.",
    location: 'Kashmir, India',
    image: '/photo/photo23.jpg',
    category: 'Insects',
  },
  {
    id: 24,
    title: 'Indian Fox',
    description:
      'An elusive Indian Fox captured in natural light. These desert-adapted canines are nocturnal hunters with exceptional hearing and keen senses.',
    location: 'Kashmir, India',
    image: '/photo/photo24.jpg',
    category: 'Mammals',
  },
  {
    id: 25,
    title: 'Indian Skimmer',
    description:
      "The rare Indian Skimmer with its distinctive bill. These unique birds 'skim' the water surface to catch fish and are critically endangered in India.",
    location: 'Kashmir, India',
    image: '/photo/photo25.jpg',
    category: 'Birds',
  },
];

const categories = [
  'All',
  'Reptiles',
  'Birds',
  'Mammals',
  'Insects',
  'Wildlife',
];

const Photos = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos =
    selectedCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const getVisiblePhotos = () => {
    const photos = [];
    for (let i = -2; i <= 2; i++) {
      const index =
        (currentIndex + i + filteredPhotos.length) % filteredPhotos.length;
      photos.push({
        ...filteredPhotos[index],
        position: i, // -2 = far left, -1 = left, 0 = center, 1 = right, 2 = far right
      });
    }
    return photos;
  };

  const visiblePhotos = getVisiblePhotos();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase">
              GALLERY
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">
            Wildlife Chronicles
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light font-satoshi">
            A visual journey through India's diverse wildlife, capturing the
            beauty and mystery of nature's creatures. Each encounter tells a
            story of survival, adaptation, and the delicate balance of life.
          </p>
        </div>

        {/* Category Pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-16"
          data-aos="fade-up"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-green-900 text-white'
                  : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#333]'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-[#1A1A1A] text-gray-300 hover:bg-[#333] transition-all duration-200">
            View More →
          </button>
        </div>

        {/* Layered Photography Carousel */}
        <div
          className="relative mb-24 px-4 md:px-8 lg:px-12"
          data-aos="fade-up"
        >
          <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[550px] lg:min-h-[600px]">
            {visiblePhotos.map((photo, index) => {
              const isCenter = photo.position === 0;
              const isNearSide = Math.abs(photo.position) === 1;
              const isFarSide = Math.abs(photo.position) === 2;
              const isLeft = photo.position < 0;

              return (
                <div
                  key={`${photo.id}-${index}`}
                  className={`absolute transition-all duration-800 ease-out ${
                    isCenter
                      ? 'w-80 h-[400px] md:w-96 md:h-[480px] lg:w-[420px] lg:h-[525px] z-40 scale-100'
                      : isNearSide
                      ? 'w-72 h-[360px] md:w-80 md:h-[400px] lg:w-[360px] lg:h-[450px] z-20 scale-85'
                      : 'w-64 h-[320px] md:w-72 md:h-[360px] lg:w-[300px] lg:h-[375px] z-10 scale-75'
                  }`}
                  style={{
                    left: isCenter
                      ? '50%'
                      : isNearSide
                      ? isLeft
                        ? '25%'
                        : '75%'
                      : isLeft
                      ? '5%'
                      : '95%',
                    transform: `translateX(${
                      isCenter ? '-50%' : isNearSide ? '-50%' : '-50%'
                    }) ${
                      isCenter
                        ? 'scale(1)'
                        : isNearSide
                        ? 'scale(0.85)'
                        : 'scale(0.75)'
                    }`,
                    filter: isCenter
                      ? 'brightness(1.1) contrast(1.2) saturate(1.1)'
                      : isNearSide
                      ? 'brightness(0.8) contrast(0.9) blur(0.8px) saturate(0.9)'
                      : 'brightness(0.6) contrast(0.7) blur(2px) saturate(0.7)',
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-photo.jpg';
                      }}
                    />

                    {/* Depth gradient overlays for background cards */}
                    {isNearSide && (
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30 rounded-3xl" />
                    )}
                    {isFarSide && (
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50 rounded-3xl" />
                    )}

                    {/* Subtle vignette for center card */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/5 rounded-3xl" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial Navigation */}
        <div className="flex justify-center gap-8 -mt-8" data-aos="fade-up">
          <button
            onClick={prevPhoto}
            className="w-16 h-16 rounded-full border border-gray-300/60 flex items-center justify-center hover:border-gray-400/80 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm"
          >
            <ChevronLeft className="w-7 h-7 text-gray-400" />
          </button>
          <button
            onClick={nextPhoto}
            className="w-16 h-16 rounded-full border border-gray-300/60 flex items-center justify-center hover:border-gray-400/80 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm"
          >
            <ChevronRight className="w-7 h-7 text-gray-400" />
          </button>
        </div>

        {/* Photo Counter */}
        <div className="text-center mt-12">
          <span className="text-sm text-gray-400 font-medium">
            {currentIndex + 1} of {filteredPhotos.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Photos;
