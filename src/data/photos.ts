export interface Photo {
  id: number;
  title: string;
  description: string;
  location: string;
  image: string;
  category: string;
}

export const categories = [
  'All',
  'Reptiles',
  'Birds',
  'Butterfly',
  'Nature',
  'Wildlife',
];

export const photos: Photo[] = [
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
    category: 'Wildlife',
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
    category: 'Butterfly',
  },
  {
    id: 5,
    title: 'Bengal Tiger',
    description:
      'A powerful Bengal Tiger in its natural habitat. The largest cat subspecies, these magnificent predators are apex hunters with distinctive orange and black stripes.',
    location: 'Ahmedabad, India',
    image: '/photo/photo5.jpg',
    category: 'Butterfly',
  },
  {
    id: 6,
    title: 'Indian Elephant',
    description:
      'An Asian Elephant foraging in the wild. These gentle giants are highly intelligent, with complex social structures and remarkable memory capabilities.',
    location: 'Uttarakhand, India',
    image: '/photo/photo6.jpg',
    category: 'Birds',
  },
  {
    id: 7,
    title: 'Indian Hornbill',
    description:
      'A magnificent Great Hornbill with its characteristic casque and vibrant plumage. These large birds are important seed dispersers in tropical forests.',
    location: 'Rajasthan, India',
    image: '/photo/photo7.jpg',
    category: 'Butterfly',
  },
  {
    id: 8,
    title: 'Leopard',
    description:
      'A stealthy Indian Leopard captured in natural light. These elusive big cats are masters of camouflage and solitary hunters of the night.',
    location: 'Pune, India',
    image: '/photo/photo8.jpg',
    category: 'Butterfly',
  },
  {
    id: 9,
    title: 'Indian Langur',
    description:
      'A troop of Indian Gray Langurs moving gracefully through the trees. These intelligent primates form complex social groups and are expert climbers.',
    location: 'Jaipur, India',
    image: '/photo/photo9.jpg',
    category: 'Birds',
  },
  {
    id: 10,
    title: 'Butterfly Swarm',
    description:
      'A mesmerizing display of butterflies in a seasonal migration. These delicate Nature play crucial roles in pollination and ecosystem health.',
    location: 'Kashmir, India',
    image: '/photo/photo10.jpg',
    category: 'Birds',
  },
  {
    id: 11,
    title: 'Rhesus Macaque',
    description:
      'A curious Rhesus Macaque observing its surroundings. These adaptable monkeys are found throughout India and have complex social behaviors.',
    location: 'Kashmir, India',
    image: '/photo/photo11.jpg',
    category: 'Butterfly',
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
    category: 'Butterfly',
  },
  {
    id: 14,
    title: 'Kingfisher',
    description:
      'A vibrant White-throated Kingfisher perched on a branch. These stunning birds are expert fishermen with brilliant blue and orange plumage.',
    location: 'Kashmir, India',
    image: '/photo/photo14.jpg',
    category: 'Butterfly',
  },
  {
    id: 15,
    title: 'Indian Mongoose',
    description:
      'A sleek Indian Gray Mongoose showing its agility. These clever Butterfly are known for their immunity to snake venom and fearless nature.',
    location: 'Kashmir, India',
    image: '/photo/photo15.jpg',
    category: 'Birds',
  },
  {
    id: 16,
    title: 'Common Myna',
    description:
      'A charismatic Common Myna with its distinctive yellow eye patches. These intelligent birds are highly adaptable and known for their mimicry skills.',
    location: 'Kashmir, India',
    image: '/photo/photo16.jpg',
    category: 'Wildlife',
  },
  {
    id: 17,
    title: 'Indian Monitor Lizard',
    description:
      'A large Indian Monitor Lizard basking in the sun. These impressive reptiles can grow up to 6 feet and are skilled climbers and swimmers.',
    location: 'Kashmir, India',
    image: '/photo/photo17.jpg',
    category: 'Nature',
  },
  {
    id: 18,
    title: 'Indian Hare',
    description:
      'An alert Indian Hare in its natural environment. These swift runners have excellent hearing and can reach speeds up to 70 km/h when escaping predators.',
    location: 'Kashmir, India',
    image: '/photo/photo18.jpg',
    category: 'Birds',
  },
  {
    id: 19,
    title: 'Rose-ringed Parakeet',
    description:
      'A colorful Rose-ringed Parakeet feeding on fruits. These social birds are known for their vibrant green plumage and distinctive rose-colored neck rings.',
    location: 'Kashmir, India',
    image: '/photo/photo19.jpg',
    category: 'Nature',
  },
  {
    id: 20,
    title: 'Nilgai',
    description:
      'The largest antelope in Asia, the Nilgai. These majestic herbivores are known for their distinctive bluish-gray coat and can weigh up to 300 kg.',
    location: 'Kashmir, India',
    image: '/photo/photo20.jpg',
    category: 'Butterfly',
  },
  {
    id: 21,
    title: 'Indian Star Tortoise',
    description:
      'A beautifully patterned Indian Star Tortoise with its characteristic star-like markings. These terrestrial reptiles are known for their longevity and can live up to 80 years.',
    location: 'Kashmir, India',
    image: '/photo/photo21.jpg',
    category: 'Nature',
  },
  {
    id: 22,
    title: 'Jungle Babbler',
    description:
      'A family of Jungle Babblers foraging together. These social birds live in groups and are known for their cooperative breeding and distinctive calls.',
    location: 'Kashmir, India',
    image: '/photo/photo22.jpg',
    category: 'Butterfly',
  },
  {
    id: 23,
    title: 'Honey Bee Colony',
    description:
      "A thriving honey bee colony showcasing nature's engineering marvel. These industrious Nature play crucial roles in pollination and honey production.",
    location: 'Kashmir, India',
    image: '/photo/photo23.jpg',
    category: 'Birds',
  },
  {
    id: 24,
    title: 'Indian Fox',
    description:
      'An elusive Indian Fox captured in natural light. These desert-adapted canines are nocturnal hunters with exceptional hearing and keen senses.',
    location: 'Kashmir, India',
    image: '/photo/photo24.jpg',
    category: 'Wildlife',
  },
  {
    id: 25,
    title: 'Indian Skimmer',
    description:
      "The rare Indian Skimmer with its distinctive bill. These unique birds 'skim' the water surface to catch fish and are critically endangered in India.",
    location: 'Kashmir, India',
    image: '/photo/photo25.jpg',
    category: 'Nature',
  },
];
