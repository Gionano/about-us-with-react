import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

// --- Komponen untuk Style Global ---
const GlobalStyles = () => (
    <style>{`
        * {
            cursor: none !important;
        }
        
        body {
            overflow-x: hidden;
        }
        
        .character-path {
            position: absolute;
            width: 2px;
            background: linear-gradient(to bottom, transparent, rgba(0, 242, 255, 0.3), transparent);
            pointer-events: none;
        }
    `}</style>
);

// --- Komponen Karakter Anime yang Bergerak ---
const MovingCharacter = ({ character, index, scrollY }) => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    
    useEffect(() => {
        const updateSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const baseX = (index * windowSize.width * 0.25) % windowSize.width;
    const amplitude = windowSize.width > 768 ? 150 : 80;
    
    const x = useTransform(scrollY, 
        [0, 1000, 2000, 3000], 
        [baseX, baseX + amplitude, baseX - amplitude, baseX + amplitude * 0.4]
    );
    
    const y = useTransform(scrollY, 
        [0, 1000, 2000, 3000], 
        [windowSize.height * 0.1 + index * 140, 
         windowSize.height * 0.4 + Math.sin(index) * 180,
         windowSize.height * 0.7 + Math.cos(index) * 120,
         windowSize.height * 0.2 + index * 100]
    );
    
    const opacity = useTransform(scrollY, [0, 500, 2500, 3000], [0.7, 1, 0.8, 0.4]);
    const size = windowSize.width > 768 ? 100 : 70;

    const colorThemes = {
        ninja: { primary: '#4F46E5', secondary: '#6366F1', accent: '#8B5CF6' },
        samurai: { primary: '#DC2626', secondary: '#EF4444', accent: '#F97316' },
        mage: { primary: '#7C3AED', secondary: '#8B5CF6', accent: '#A855F7' },
        archer: { primary: '#059669', secondary: '#10B981', accent: '#34D399' },
        warrior: { primary: '#B45309', secondary: '#D97706', accent: '#F59E0B' },
        assassin: { primary: '#374151', secondary: '#4B5563', accent: '#6B7280' }
    };

    const theme = colorThemes[character.type] || colorThemes.ninja;

    return (
        <motion.div
            className="fixed pointer-events-none z-0"
            style={{
                x,
                y,
                opacity,
                width: size,
                height: size * 1.8
            }}
        >
            {/* Shadow */}
            <motion.div
                className="absolute bg-black/30 rounded-full blur-sm"
                style={{
                    width: size * 0.6,
                    height: size * 0.15,
                    left: size * 0.2,
                    bottom: -10
                }}
                animate={{
                    scaleX: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Rambut (Hair) */}
            <motion.div
                className="absolute rounded-t-full"
                style={{
                    width: size * 0.45,
                    height: size * 0.35,
                    left: size * 0.275,
                    top: size * 0.05,
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`,
                    clipPath: character.type === 'ninja' ? 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' : 'none'
                }}
                animate={{
                    y: [0, -2, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Kepala (Head) */}
            <motion.div
                className="absolute rounded-full border-2"
                style={{
                    width: size * 0.4,
                    height: size * 0.4,
                    left: size * 0.3,
                    top: size * 0.12,
                    background: 'linear-gradient(145deg, #FBBF24, #F59E0B)',
                    borderColor: theme.primary,
                    boxShadow: `0 0 20px ${theme.primary}40`
                }}
                animate={{
                    y: [0, -3, 0],
                    rotate: [0, 1, -1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Mata Anime (Anime Eyes) */}
                <div className="absolute flex justify-between items-center w-full h-full px-2">
                    {/* Mata Kiri */}
                    <div className="relative">
                        <div 
                            className="w-3 h-4 rounded-full border-2"
                            style={{ 
                                background: `linear-gradient(145deg, ${theme.primary}, ${theme.secondary})`,
                                borderColor: '#1F2937'
                            }}
                        />
                        <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
                    </div>
                    {/* Mata Kanan */}
                    <div className="relative">
                        <div 
                            className="w-3 h-4 rounded-full border-2"
                            style={{ 
                                background: `linear-gradient(145deg, ${theme.primary}, ${theme.secondary})`,
                                borderColor: '#1F2937'
                            }}
                        />
                        <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
                    </div>
                </div>
                {/* Mulut kecil */}
                <div 
                    className="absolute w-2 h-1 rounded-full"
                    style={{ 
                        left: '42%', 
                        bottom: '25%',
                        background: '#DC2626'
                    }} 
                />
            </motion.div>

            {/* Badan (Body) - Kostum Anime */}
            <motion.div
                className="absolute rounded-lg border-2"
                style={{
                    width: size * 0.5,
                    height: size * 0.7,
                    left: size * 0.25,
                    top: size * 0.45,
                    background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`,
                    borderColor: theme.accent,
                    boxShadow: `inset 0 2px 4px rgba(255,255,255,0.3), 0 0 15px ${theme.primary}30`
                }}
                animate={{
                    scaleY: [1, 1.02, 1],
                    rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Detail Kostum */}
                <div 
                    className="absolute w-full h-2 top-2 rounded"
                    style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }}
                />
                <div 
                    className="absolute w-1 h-8 left-1/2 top-4 rounded-full transform -translate-x-1/2"
                    style={{ background: theme.accent }}
                />
            </motion.div>

            {/* Lengan Kiri (Left Arm) */}
            <motion.div
                className="absolute rounded-full border"
                style={{
                    width: size * 0.18,
                    height: size * 0.6,
                    left: size * 0.05,
                    top: size * 0.5,
                    transformOrigin: 'top center',
                    background: `linear-gradient(180deg, ${theme.secondary}, ${theme.primary})`,
                    borderColor: theme.accent,
                    boxShadow: `0 0 10px ${theme.primary}20`
                }}
                animate={{
                    rotate: character.type === 'ninja' ? [0, 25, -15, 0] : [0, 20, -10, 0],
                    x: [0, 3, -1, 0]
                }}
                transition={{
                    duration: character.type === 'assassin' ? 1.2 : 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Lengan Kanan (Right Arm) */}
            <motion.div
                className="absolute rounded-full border"
                style={{
                    width: size * 0.18,
                    height: size * 0.6,
                    right: size * 0.05,
                    top: size * 0.5,
                    transformOrigin: 'top center',
                    background: `linear-gradient(180deg, ${theme.secondary}, ${theme.primary})`,
                    borderColor: theme.accent,
                    boxShadow: `0 0 10px ${theme.primary}20`
                }}
                animate={{
                    rotate: character.type === 'ninja' ? [0, -25, 15, 0] : [0, -20, 10, 0],
                    x: [0, -3, 1, 0]
                }}
                transition={{
                    duration: character.type === 'assassin' ? 1.2 : 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.9
                }}
            />

            {/* Kaki Kiri (Left Leg) */}
            <motion.div
                className="absolute rounded-full border"
                style={{
                    width: size * 0.2,
                    height: size * 0.5,
                    left: size * 0.22,
                    top: size * 1.1,
                    transformOrigin: 'top center',
                    background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`,
                    borderColor: theme.accent,
                    boxShadow: `0 0 8px ${theme.primary}20`
                }}
                animate={{
                    rotate: character.type === 'ninja' ? [0, 30, -20, 0] : [0, 25, -15, 0],
                    y: [0, -8, 0]
                }}
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Kaki Kanan (Right Leg) */}
            <motion.div
                className="absolute rounded-full border"
                style={{
                    width: size * 0.2,
                    height: size * 0.5,
                    right: size * 0.22,
                    top: size * 1.1,
                    transformOrigin: 'top center',
                    background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`,
                    borderColor: theme.accent,
                    boxShadow: `0 0 8px ${theme.primary}20`
                }}
                animate={{
                    rotate: character.type === 'ninja' ? [0, -30, 20, 0] : [0, -25, 15, 0],
                    y: [0, -5, 0]
                }}
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7
                }}
            />

            {/* Senjata/Aksesori berdasarkan tipe */}
            {character.type === 'ninja' && (
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: size * 0.08,
                        height: size * 0.4,
                        right: size * 0.15,
                        top: size * 0.3,
                        background: 'linear-gradient(180deg, #71717A, #3F3F46)',
                        boxShadow: '0 0 10px #71717A'
                    }}
                    animate={{
                        rotate: [0, 10, -5, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {character.type === 'mage' && (
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: size * 0.12,
                        height: size * 0.12,
                        left: size * 0.1,
                        top: size * 0.35,
                        background: `radial-gradient(circle, ${theme.accent}, ${theme.primary})`,
                        boxShadow: `0 0 20px ${theme.accent}`
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Efek Aura Anime */}
            <motion.div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                    background: `radial-gradient(circle, ${theme.primary}20, transparent 70%)`
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Speed lines untuk efek gerakan */}
            <motion.div
                className="absolute"
                style={{
                    width: size * 0.8,
                    height: 2,
                    left: -size * 0.3,
                    top: size * 0.8,
                    background: `linear-gradient(90deg, transparent, ${theme.primary}60, transparent)`
                }}
                animate={{
                    x: [-20, 20, -20],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

// --- Komponen Background Responsif dengan Karakter ---
const ResponsiveCharacterBackground = () => {
    const { scrollY } = useScroll();
    const characters = [
        { type: 'ninja', color: 'indigo' },
        { type: 'samurai', color: 'red' },
        { type: 'mage', color: 'purple' },
        { type: 'archer', color: 'green' },
        { type: 'warrior', color: 'orange' }
    ];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const particleCount = isMobile ? 8 : 15;
    const characterCount = isMobile ? 3 : 5;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient Background dengan tema anime */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
            
            {/* Animated Grid dengan efek futuristik */}
            <motion.div 
                className="absolute inset-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)',
                    backgroundSize: isMobile ? '50px 50px' : '80px 80px',
                    opacity: useTransform(scrollY, [0, 1000], [0.4, 0.1])
                }}
            />
            
            {/* Moving Anime Characters */}
            {characters.slice(0, characterCount).map((character, index) => (
                <MovingCharacter 
                    key={`character-${index}`} 
                    character={character} 
                    index={index} 
                    scrollY={scrollY} 
                />
            ))}
            
            {/* Sakura Petals Effect */}
            {Array.from({ length: particleCount }).map((_, index) => {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                return (
                    <motion.div
                        key={`sakura-${index}`}
                        className="fixed w-2 h-2 rounded-full pointer-events-none z-0"
                        style={{
                            background: 'linear-gradient(45deg, #F8BBD9, #F472B6)',
                            boxShadow: '0 0 10px #F472B6',
                            left: `${randomX}%`,
                            top: `${randomY}%`
                        }}
                        animate={{
                            y: [0, -200],
                            x: [0, (Math.random() - 0.5) * 150],
                            rotate: [0, 360],
                            scale: [0.5, 1, 0.3]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 10
                        }}
                    />
                );
            })}
            
            {/* Magic Orbs dengan tema anime */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 md:w-56 md:h-56 rounded-full blur-xl"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.1))',
                    opacity: useTransform(scrollY, [0, 1500], [0.6, 0.2])
                }}
                animate={{
                    x: [0, 120, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-48 md:h-48 rounded-full blur-xl"
                style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(244, 114, 182, 0.1))',
                    opacity: useTransform(scrollY, [500, 2000], [0.4, 0.7])
                }}
                animate={{
                    x: [0, -100, 0],
                    y: [0, 80, 0],
                    scale: [1, 0.7, 1]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Energy Streams */}
            <motion.div
                className="absolute top-0 left-1/3 w-1 h-full"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.4), transparent)'
                }}
                animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-0 right-1/4 w-1 h-full"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.4), transparent)'
                }}
                animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
        </div>
    );
};

// --- Komponen Efek Kursor ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (isMobile) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const hoverElements = document.querySelectorAll('a, button, [data-hoverable]');
        const addPointer = () => setIsPointer(true);
        const removePointer = () => setIsPointer(false);

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', addPointer);
            el.addEventListener('mouseleave', removePointer);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            hoverElements.forEach(el => {
                el.removeEventListener('mouseenter', addPointer);
                el.removeEventListener('mouseleave', removePointer);
            });
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    if (isMobile) return null;

    const cursorVariants = {
        default: {
            width: 20,
            height: 20,
            border: '2px solid #00f2ff',
            backgroundColor: 'transparent',
        },
        pointer: {
            width: 40,
            height: 40,
            backgroundColor: 'rgba(0, 242, 255, 0.2)',
            border: '2px solid #00f2ff',
        },
    };

    return (
        <>
            <motion.div
                className="fixed rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: position.x, top: position.y }}
                variants={cursorVariants}
                animate={isPointer ? 'pointer' : 'default'}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.div
                className="fixed w-1 h-1 bg-[#00f2ff] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: position.x, top: position.y }}
                transition={{ type: 'spring', stiffness: 800, damping: 30 }}
            />
        </>
    );
};

// --- Komponen untuk Animasi saat di-scroll ---
const AnimatedSection = ({ children, delay = 0 }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !inView) {
                    setInView(true);
                    controls.start('visible');
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.6, 0.05, 0.01, 0.9] } },
                hidden: { opacity: 0, y: 40 },
            }}
        >
            {children}
        </motion.div>
    );
};

// --- Komponen Hero Section ---
const HeroSection = () => {
    const { scrollY } = useScroll();
    const title = "Kekuatan Kolaborasi";
    const subtitle = "Bertemu dengan tim di balik inovasi dan kreativitas.";
    
    const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const titleScale = useTransform(scrollY, [0, 300], [1, 1.1]);

    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20, rotate: 5 },
        visible: { opacity: 1, y: 0, rotate: 0 },
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
            <motion.h1
                className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider"
                style={{ 
                    textShadow: '0 0 8px #00f2ff, 0 0 20px #00f2ff',
                    opacity: titleOpacity,
                    scale: titleScale
                }}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
            >
                {title.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h1>
            <motion.p 
                className="mt-4 text-base md:text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ opacity: titleOpacity }}
                transition={{ duration: 0.8, delay: title.length * 0.05 + 0.2 }}
            >
                {subtitle}
            </motion.p>
        </div>
    );
};

// --- Komponen Tentang Kami ---
const AboutSection = () => (
    <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12" style={{ textShadow: '0 0 8px #00f2ff' }}>
            Tentang Tim Kami
        </h2>
        <div className="max-w-3xl mx-auto bg-black bg-opacity-30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-cyan-500/20">
            <p className="text-gray-300 leading-relaxed text-center text-sm md:text-base">
                Kami adalah sekelompok individu yang bersemangat dengan keahlian beragam, bersatu untuk menciptakan solusi digital yang luar biasa. Dengan fokus pada inovasi, kolaborasi, dan keunggulan, kami mengubah ide-ide kompleks menjadi kenyataan yang elegan dan fungsional. Misi kami adalah mendorong batas-batas teknologi dan memberikan dampak positif melalui setiap proyek yang kami kerjakan.
            </p>
        </div>
    </AnimatedSection>
);

// --- Data Tim dengan 5 Anggota ---
const teamMembers = [
    {
        name: "Rahmat Hidayat",
        role: "Ketua Tim",
        isLeader: true,
        bio: "Visioner dan pemimpin yang menginspirasi tim untuk mencapai tujuan bersama dengan inovasi dan dedikasi tinggi.",
        img: "https://placehold.co/150x150/gold/0a0a0a?text=RH",
        color: "gold",
    },
    {
        name: "Andi Pratama",
        role: "Lead Developer",
        isLeader: false,
        bio: "Penyihir kode yang mengubah kafein menjadi aplikasi web yang fungsional dan elegan.",
        img: "https://placehold.co/150x150/00f2ff/0a0a0a?text=AP",
        color: "cyan",
    },
    {
        name: "Bunga Lestari",
        role: "UI/UX Designer",
        isLeader: false,
        bio: "Arsitek visual yang menciptakan pengalaman pengguna yang intuitif dan tak terlupakan.",
        img: "https://placehold.co/150x150/f200ff/0a0a0a?text=BL",
        color: "pink",
    },
    {
        name: "Candra Setiawan",
        role: "Project Manager",
        isLeader: false,
        bio: "Orkestrator handal yang memastikan setiap proyek berjalan lancar dari awal hingga akhir.",
        img: "https://placehold.co/150x150/f2ff00/0a0a0a?text=CS",
        color: "yellow",
    },
    {
        name: "Devi Sari",
        role: "Quality Assurance",
        isLeader: false,
        bio: "Penjaga kualitas yang memastikan setiap detail produk mencapai standar kesempurnaan.",
        img: "https://placehold.co/150x150/00ff88/0a0a0a?text=DS",
        color: "green",
    },
];

const TeamSection = () => (
    <AnimatedSection delay={0.2}>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16" style={{ textShadow: '0 0 8px #00f2ff' }}>
            Temui Para Jenius
        </h2>
        
        {/* Ketua Tim */}
        <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gold-400" style={{ textShadow: '0 0 8px #FFD700' }}>
                Ketua Tim
            </h3>
            <div className="flex justify-center">
                {teamMembers.filter(member => member.isLeader).map((member, index) => (
                    <TeamMemberCard key={index} member={member} isLeader={true} />
                ))}
            </div>
        </div>

        {/* Anggota Tim */}
        <div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ textShadow: '0 0 8px #00f2ff' }}>
                Anggota Tim
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {teamMembers.filter(member => !member.isLeader).map((member, index) => (
                    <TeamMemberCard key={index} member={member} isLeader={false} />
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const TeamMemberCard = ({ member, isLeader = false }) => {
    const colorMap = {
        gold: { border: 'border-yellow-400', text: 'text-yellow-400', shadow: 'shadow-yellow-500/50', bg: 'from-yellow-500/20 to-orange-500/20' },
        cyan: { border: 'border-cyan-400', text: 'text-cyan-400', shadow: 'shadow-cyan-500/30', bg: 'from-cyan-500/20 to-blue-500/20' },
        pink: { border: 'border-pink-400', text: 'text-pink-400', shadow: 'shadow-pink-500/30', bg: 'from-pink-500/20 to-purple-500/20' },
        yellow: { border: 'border-yellow-400', text: 'text-yellow-400', shadow: 'shadow-yellow-500/30', bg: 'from-yellow-500/20 to-orange-500/20' },
        green: { border: 'border-green-400', text: 'text-green-400', shadow: 'shadow-green-500/30', bg: 'from-green-500/20 to-emerald-500/20' },
    };
    const theme = colorMap[member.color] || colorMap.cyan;
    const cardSize = isLeader ? 'w-80 max-w-sm' : 'w-full max-w-xs';
    const imageSize = isLeader ? 'w-32 h-32 md:w-40 md:h-40' : 'w-24 h-24 md:w-28 md:h-28';

    return (
        <motion.div
            data-hoverable
            className={`${cardSize} mx-auto bg-gradient-to-br ${theme.bg} backdrop-blur-md p-6 md:p-8 rounded-3xl text-center border-2 ${theme.border} relative overflow-hidden`}
            whileHover={{ 
                y: -15, 
                scale: isLeader ? 1.05 : 1.03, 
                boxShadow: `0 0 40px ${theme.shadow}`,
                rotateY: 5
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
                boxShadow: isLeader ? `0 0 30px ${theme.shadow}` : `0 0 15px ${theme.shadow}`
            }}
        >
            {/* Crown untuk Ketua */}
            {isLeader && (
                <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="text-3xl">👑</div>
                </motion.div>
            )}

            {/* Glow Effect */}
            <div 
                className="absolute inset-0 rounded-3xl opacity-20 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${member.color === 'gold' ? '#FFD700' : theme.border.split('-')[1]}, transparent 70%)`
                }}
            />
            
            <div className="relative z-10">
                <img 
                    src={member.img} 
                    alt={`Foto ${member.name}`}
                    className={`${imageSize} rounded-full mx-auto mb-6 border-4 ${theme.border} object-cover ring-4 ring-white/20`}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/333/eee?text=Error'; }}
                />
                <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 ${isLeader ? 'text-2xl md:text-3xl' : ''}`}>
                    {member.name}
                </h3>
                <p className={`${theme.text} font-semibold text-sm md:text-base mb-3 ${isLeader ? 'text-lg md:text-xl' : ''}`}>
                    {member.role}
                </p>
                <p className={`text-gray-300 text-xs md:text-sm leading-relaxed ${isLeader ? 'text-sm md:text-base' : ''}`}>
                    {member.bio}
                </p>
                
                {/* Special badge untuk ketua */}
                {isLeader && (
                    <motion.div
                        className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full"
                        animate={{
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ⭐ LEADER ⭐
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// --- Komponen Footer ---
const Footer = () => (
    <footer className="text-center py-10 mt-16 border-t border-cyan-500/10 relative z-10">
        <p className="text-gray-500 text-sm md:text-base">&copy; 2024 Tim Hebat. Dibuat dengan Penuh Semangat.</p>
    </footer>
);

// --- Komponen Utama Aplikasi ---
export default function App() {
    return (
        <div className="bg-[#0a0a0a] text-gray-200 font-sans antialiased overflow-x-hidden min-h-screen">
            <GlobalStyles />
            <CustomCursor />
            <ResponsiveCharacterBackground />
            <div className="relative z-10">
                <HeroSection />
                <main className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-24 space-y-16 md:space-y-24">
                    <AboutSection />
                    <TeamSection />
                </main>
                <Footer />
            </div>
        </div>
    );
}