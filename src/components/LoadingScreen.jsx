import { useState, useEffect } from 'react';
import logo from '../assets/tahak_logo.png';

// ── Idle phrases shown after 2 s of loading ──────────────────────────────────
const IDLE_PHRASES = [
    'Blending herbal tea...',
    'Planting trees...',
    'Listening to the forest...',
    'Breathing in mountain air...',
    'Warming up the kawa bath...',
    'Preparing your nature retreat...',
];

// ── Individual falling leaf ───────────────────────────────────────────────────
// Each leaf is a simple SVG shape positioned randomly across the screen width.
function Leaf({ style }) {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={style}
            className="absolute top-0 pointer-events-none select-none"
        >
            {/* Simple organic leaf path */}
            <path
                d="M12 2 C6 2 2 8 4 14 C6 20 12 22 12 22 C12 22 18 20 20 14 C22 8 18 2 12 2 Z"
                fill="currentColor"
            />
            {/* Midrib */}
            <line x1="12" y1="4" x2="12" y2="20" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        </svg>
    );
}

// ── Leaf field (generates N leaves with staggered, randomised params) ─────────
const LEAF_COUNT = 14;

function generateLeaves() {
    return Array.from({ length: LEAF_COUNT }, (_, i) => {
        const duration = 4 + Math.random() * 4;          // 4 – 8 s per fall
        const delay    = Math.random() * 6;               // 0 – 6 s stagger
        const left     = Math.random() * 96;              // 0 – 96 vw
        const size     = 14 + Math.random() * 18;         // 14 – 32 px
        // Alternate between two green shades for depth
        const color    = i % 2 === 0 ? '#15803d' : '#166534';
        const opacity  = 0.35 + Math.random() * 0.5;     // 0.35 – 0.85
        return { duration, delay, left, size, color, opacity, key: i };
    });
}

const LEAVES = generateLeaves();

function LeafField() {
    return (
        <>
            {LEAVES.map(({ key, duration, delay, left, size, color, opacity }) => (
                <Leaf
                    key={key}
                    style={{
                        left: `${left}vw`,
                        width: size,
                        height: size,
                        color,
                        opacity,
                        animation: `leaf-fall ${duration}s ${delay}s infinite linear`,
                    }}
                />
            ))}
        </>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LoadingScreen() {
    const [showPhrase, setShowPhrase]   = useState(false);
    const [phraseIdx, setPhraseIdx]     = useState(0);

    // After 2 s, start cycling through idle phrases every 3 s
    useEffect(() => {
        const showTimer = setTimeout(() => setShowPhrase(true), 2000);
        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (!showPhrase) return;
        const interval = setInterval(() => {
            setPhraseIdx(idx => (idx + 1) % IDLE_PHRASES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [showPhrase]);

    return (
        <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden">

            {/* ── Falling leaves (behind everything) ── */}
            <LeafField />

            {/* ── Centre card ── */}
            <div className="relative z-10 flex flex-col items-center gap-0">

                {/* Decorative pulse rings */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150" />
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse scale-125" />

                    {/* Logo */}
                    <div className="relative bg-white p-6 rounded-full shadow-2xl border-4 border-primary/10">
                        <img
                            src={logo}
                            alt="TahaK Logo"
                            className="w-24 h-24 object-contain animate-pulse"
                        />
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-primary-title text-accent italic tracking-widest animate-pulse">
                        TahaK
                    </h2>

                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]" />
                    </div>

                    {/* Idle phrase — visible only after 2 s */}
                    <div className="h-5 flex items-center justify-center">
                        {showPhrase && (
                            <p
                                key={phraseIdx}
                                className="text-sm font-primary-text text-primary font-semibold uppercase tracking-[0.2em]"
                                style={{ animation: 'phrase-fade 3s ease-in-out forwards' }}
                            >
                                {IDLE_PHRASES[phraseIdx]}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
