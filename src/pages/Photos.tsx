import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { photos, categories } from '../data/photos';

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
                position: i,
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
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === category
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
                                    className={`absolute transition-all duration-800 ease-out ${isCenter
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
                                        transform: `translateX(${isCenter ? '-50%' : isNearSide ? '-50%' : '-50%'
                                            }) ${isCenter
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

                                        {isNearSide && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30 rounded-3xl" />
                                        )}
                                        {isFarSide && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50 rounded-3xl" />
                                        )}

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
