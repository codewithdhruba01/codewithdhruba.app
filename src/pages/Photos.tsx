import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, categories } from '../data/photos';
import { commentService } from '../lib/supabase';

const Photos = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [photoLoveCounts, setPhotoLoveCounts] = useState<Record<number, number>>({});
    const [userLovedPhotos, setUserLovedPhotos] = useState<Set<number>>(new Set());
    const [lovingPhoto, setLovingPhoto] = useState(false);

    // Swipe functionality
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isSwiping, setIsSwiping] = useState(false);

    const userId = 'photos-user-' + Math.random().toString(36).substr(2, 9);

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

    const handleImageLoad = (imageSrc: string) => {
        setLoadedImages(prev => new Set(prev).add(imageSrc));
    };

    // Swipe handlers
    const minSwipeDistance = 50;

    // Touch events for mobile
    const onTouchStart = (e: React.TouchEvent) => {
        setIsSwiping(true);
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isSwiping || !touchStart) return;
        e.preventDefault(); // Prevent scrolling
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !isSwiping) {
            setIsSwiping(false);
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextPhoto();
        } else if (isRightSwipe) {
            prevPhoto();
        }

        setIsSwiping(false);
        setTouchStart(null);
        setTouchEnd(null);
    };

    // Mouse events for desktop
    const onMouseDown = (e: React.MouseEvent) => {
        setIsSwiping(true);
        setTouchEnd(null);
        setTouchStart(e.clientX);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isSwiping || !touchStart) return;
        e.preventDefault(); // Prevent text selection
        setTouchEnd(e.clientX);
    };

    const onMouseUp = () => {
        if (!touchStart || !touchEnd || !isSwiping) {
            setIsSwiping(false);
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextPhoto();
        } else if (isRightSwipe) {
            prevPhoto();
        }

        setIsSwiping(false);
        setTouchStart(null);
        setTouchEnd(null);
    };

    const onMouseLeave = () => {
        if (isSwiping) {
            setIsSwiping(false);
            setTouchStart(null);
            setTouchEnd(null);
        }
    };

    // Load photo love data from Supabase and localStorage on component mount
    useEffect(() => {
        const loadPhotoLoveData = async () => {
            // Load user love history from localStorage immediately
            const loadUserLoveHistory = () => {
                const loved = JSON.parse(localStorage.getItem('lovedPhotos') || '[]');
                setUserLovedPhotos(new Set(loved));
            };

            // Initialize all photo love counts to 0
            const loveCounts: Record<number, number> = {};
            photos.forEach(photo => {
                loveCounts[photo.id] = 0;
            });

            // Load all love counts from Supabase in a single call
            try {
                const allCounts = await commentService.getAllPhotoLovesCounts();
                // Merge the Supabase counts with the initialized counts
                Object.keys(allCounts).forEach(photoId => {
                    loveCounts[Number(photoId)] = allCounts[Number(photoId)];
                });
            } catch (error) {
                console.warn('Supabase not available for photo love counts:', error);
                // Keep the default 0 counts
            }

            setPhotoLoveCounts(loveCounts);
            loadUserLoveHistory();
        };

        loadPhotoLoveData();
    }, []);

    const saveUserPhotoLove = (photoId: number) => {
        const existing = JSON.parse(localStorage.getItem('lovedPhotos') || '[]');
        if (!existing.includes(photoId)) {
            existing.push(photoId);
            localStorage.setItem('lovedPhotos', JSON.stringify(existing));
        }
    };

    const handleLoveClick = async (photoId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering carousel navigation

        if (userLovedPhotos.has(photoId) || lovingPhoto) return;

        try {
            setLovingPhoto(true);
            await commentService.lovePhoto(photoId, userId);
            saveUserPhotoLove(photoId);
            setPhotoLoveCounts(prev => ({
                ...prev,
                [photoId]: (prev[photoId] || 0) + 1
            }));
            setUserLovedPhotos(prev => new Set(prev).add(photoId));
        } catch (error) {
            console.error('Error adding photo love:', error);
        } finally {
            setLovingPhoto(false);
        }
    };

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
                </div>


                <div
                    className="relative mb-24 px-4 md:px-8 lg:px-12"
                    data-aos="fade-up"
                >
                    <div
                        className="relative flex items-center justify-center min-h-[450px] md:min-h-[550px] lg:min-h-[600px] transition-transform duration-800 ease-out"
                        style={{
                            touchAction: 'pan-y pinch-zoom',
                            userSelect: 'none',
                            cursor: isSwiping ? 'grabbing' : 'grab'
                        }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onTouchCancel={() => {
                            setIsSwiping(false);
                            setTouchStart(null);
                            setTouchEnd(null);
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseLeave}
                    >
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
                                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${loadedImages.has(photo.image) ? 'filter-none' : 'blur-sm scale-110'
                                                }`}
                                            onLoad={() => handleImageLoad(photo.image)}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-photo.jpg';
                                                handleImageLoad(photo.image);
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

                                        {/* Love Icon - positioned after overlays to ensure it's clickable */}
                                        <motion.button
                                            whileTap={{ scale: 0.8 }}
                                            onClick={(e) => handleLoveClick(photo.id, e)}
                                            onTouchStart={(e) => e.stopPropagation()}
                                            onTouchMove={(e) => e.stopPropagation()}
                                            onTouchEnd={(e) => e.stopPropagation()}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onMouseMove={(e) => e.stopPropagation()}
                                            onMouseUp={(e) => e.stopPropagation()}
                                            disabled={userLovedPhotos.has(photo.id) || lovingPhoto}
                                            className={`absolute top-3 left-3 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm transition-colors duration-200 group flex items-center gap-1 ${userLovedPhotos.has(photo.id)
                                                ? 'cursor-default'
                                                : 'hover:bg-black/40 cursor-pointer'
                                                }`}
                                            aria-label={userLovedPhotos.has(photo.id) ? "Already loved" : "Add to favorites"}
                                        >
                                            <div className="relative">
                                                <AnimatePresence>
                                                    {userLovedPhotos.has(photo.id) && (
                                                        <motion.div
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1.5, opacity: 0 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                                            className="absolute inset-0 z-10"
                                                        >
                                                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        scale: userLovedPhotos.has(photo.id) ? [1, 1.4, 1] : 1,
                                                        color: userLovedPhotos.has(photo.id) ? "#ef4444" : "rgba(255, 255, 255, 0.7)"
                                                    }}
                                                    transition={{
                                                        duration: 0.4,
                                                        ease: [0.175, 0.885, 0.32, 1.275] // spring-like easing
                                                    }}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 ${userLovedPhotos.has(photo.id)
                                                            ? 'fill-red-500 drop-shadow-lg'
                                                            : 'group-hover:text-white'
                                                            }`}
                                                    />
                                                </motion.div>
                                            </div>
                                            <span className={`text-xs font-medium transition-all duration-200 ${userLovedPhotos.has(photo.id)
                                                ? 'text-white/70'
                                                : 'text-white/70 group-hover:text-white'
                                                }`}>
                                                {photoLoveCounts[photo.id] || 0}
                                            </span>
                                        </motion.button>
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
