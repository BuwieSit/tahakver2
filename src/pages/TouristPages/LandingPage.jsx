import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import useInView from "../../hooks/useInView";

// Assets
import mountain from "../../assets/mountain.jpg";
import staLucia from "../../assets/sta_lucia.jpg";
import banahawCircle from "../../assets/banahaw_circle.avif";
import peaceInNature from "../../assets/peace_in_nature.jpg";
import forestbath from "../../assets/pictures/forestbath.jpg";
import trek from "../../assets/pictures/trek.jpg";
import falls from "../../assets/pictures/falls.jpg";
import sound from "../../assets/pictures/sound.jpg";
import tea from "../../assets/pictures/tea.jpg";
import hilot from "../../assets/pictures/hilot.png";
import kalipiImage from "../../assets/KALIPI.jpg";
import labbImage from "../../assets/LABB.jpg";

// Icons
import {
    ArrowRight,
    Award,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Compass,
    Droplets,
    HeartHandshake,
    Leaf,
    MapPin,
    Mountain,
    ShieldCheck,
    Sparkles,
    Sun,
    TreePine,
} from "lucide-react";

const healingExperiences = [
    {
        title: "Forest Bathing (Shinrin-Yoku)",
        tag: "Mental Reset",
        price: "₱2,500",
        duration: "Day Trip",
        desc: "Immerse in ancient pine and hardwood woods. Inhale natural phytoncides to soothe stress and awaken inner calm.",
        img: forestbath,
        icon: <TreePine className="h-3.5 w-3.5 text-primary" />,
    },
    {
        title: "Traditional Ancestral Hilot",
        tag: "Physical Release",
        price: "₱3,200",
        duration: "Full Day",
        desc: "Authentic Filipino touch healing using warm virgin coconut oil, medicinal leaves, and intuitive muscle restoration.",
        img: hilot,
        icon: <Sparkles className="h-3.5 w-3.5 text-primary" />,
    },
    {
        title: "Sacred Mountain Trekking",
        tag: "Adventure & Spirit",
        price: "₱7,200",
        duration: "3D / 2N",
        desc: "Traverse mystical trails along Mount Banahaw guided by local stewards. Discover hidden springs and rock altars.",
        img: trek,
        icon: <Mountain className="h-3.5 w-3.5 text-primary" />,
    },
    {
        title: "Sound Bath & Meditation",
        tag: "Sensory Stillness",
        price: "₱1,800",
        duration: "4 Hours",
        desc: "Resonant therapeutic singing bowls vibrating gently through quiet forest canopy to dissolve mental clutter.",
        img: sound,
        icon: <Sun className="h-3.5 w-3.5 text-primary" />,
    },
    {
        title: "Pristine Waterfalls Cleansing",
        tag: "Vitality",
        price: "₱500 / add-on",
        duration: "Half Day",
        desc: "Plunge into crystal-clear natural mountain springs in Sta. Lucia, washing away fatigue in pure living waters.",
        img: falls,
        icon: <Droplets className="h-3.5 w-3.5 text-primary" />,
    },
    {
        title: "Mountain Tea & Herbal Ritual",
        tag: "Nourishment",
        price: "₱1,200",
        duration: "2 Hours",
        desc: "Sip wild medicinal brews harvested by local elders while learning Banahaw's sacred ethnobotanical traditions.",
        img: tea,
        icon: <Leaf className="h-3.5 w-3.5 text-primary" />,
    },
];

const impactPillars = [
    {
        badge: "Kalikasan",
        badgeColor: "bg-emerald-100 text-emerald-800",
        title: "Benefits to Nature",
        tagline: "Eco-Conservation with LABB",
        icon: <Leaf className="h-7 w-7 text-primary" />,
        desc: "We practice zero-trace regenerative tourism. Every guest footprint nurtures rather than degrades the sacred wilderness of Quezon.",
        points: [
            "Direct proceeds fund Mt. Banahaw biodiversity restoration with LABB (Luntiang Alyansa para sa Bundok Banahaw).",
            "Strict zero-single-use-plastic and leave-no-trace protocols across every trail and campsite.",
            "Protection of natural spring watersheds and ancient forest habitats through active reforestation drives.",
        ],
    },
    {
        badge: "Kapwa at Komunidad",
        badgeColor: "bg-amber-100 text-amber-800",
        title: "Benefits to Local Partners",
        tagline: "Livelihood & Women Empowerment",
        icon: <HeartHandshake className="h-7 w-7 text-amber-700" />,
        desc: "Tourism revenue flows directly into community hands, keeping sacred knowledge alive and families thriving.",
        points: [
            "Equitable livelihood and craft entrepreneurship with KALIPI (Kalipunan ng Liping Pilipina) women's cooperative.",
            "Dignified, above-standard income for local indigenous guides, organic farmers, and certified Hilot practitioners.",
            "Sustaining eco-sanctuaries like Peace in Nature Farm Resort and Banahaw Circle Nature Retreat.",
        ],
    },
    {
        badge: "Ginhawa",
        badgeColor: "bg-sky-100 text-sky-800",
        title: "Benefits to You (The Tourist)",
        tagline: "Deep Healing & Genuine Renewal",
        icon: <Sparkles className="h-7 w-7 text-sky-700" />,
        desc: "Step out of city exhaustion and into a loving space where nature, culture, and care replenish your life energy.",
        points: [
            "Profound relief from burnout, digital overstimulation, and sensory fatigue in uncrowded, pristine spaces.",
            "Direct encounter with genuine Filipino wellness wisdom and authentic mountain hospitality.",
            "Intimate, safe, unhurried group sizes designed for deep personal transformation and lasting peace.",
        ],
    },
];

const partners = [
    {
        name: "Banahaw Circle Retreat",
        location: "Dolores, Quezon",
        description: "Our pilot sanctuary and sacred meditation space at the foot of Mount Banahaw.",
        image: banahawCircle,
        alt: "Banahaw Circle Nature Retreat",
    },
    {
        name: "Peace in Nature Farm",
        location: "Dolores, Quezon",
        description: "Natural spring swimming pools, fruit orchards, and regenerative agriculture.",
        image: peaceInNature,
        alt: "Peace in Nature Farm Resort",
    },
    {
        name: "LABB NGO",
        location: "Environmental Ally",
        description: "Guardians restoring biodiversity and ecological sanctity throughout Mount Banahaw.",
        image: labbImage,
        alt: "LABB environmental partner",
    },
    {
        name: "KALIPI Women's Org",
        location: "Community Cooperative",
        description: "Empowering rural women through traditional crafts, culinary heritage, and sustainable livelihood.",
        image: kalipiImage,
        alt: "KALIPI women's organization",
    },
];

export default function LandingPage() {
    const navigate = useNavigate();

    // Section InView observers
    const storyOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [storyRef, storyInView] = useInView(storyOptions);

    const revealOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [experiencesRef, experiencesInView] = useInView(revealOptions);
    const [impactRef, impactInView] = useInView(revealOptions);
    const [partnersRef, partnersInView] = useInView(storyOptions);

    const ctaOptions = useMemo(() => ({ threshold: 0.2 }), []);
    const [ctaRef, ctaInView] = useInView(ctaOptions);

    return (
        <div className="min-h-screen bg-background text-primary-text-color selection:bg-primary/20 selection:text-primary">
            <Header />

            <main>
                {/* 1. HERO SECTION */}
                <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden md:min-h-screen">
                    <img
                        src={mountain}
                        alt="Mount Banahaw sacred mountain mist"
                        className="absolute inset-0 z-0 h-full w-full scale-105 object-cover transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-accent/50 to-accent/90" />

                    <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-24 text-center text-white md:px-12">
   
               

                        {/* Title in Libre Baskerville */}
                        <h1 className="mb-6 animate__animated animate__fadeIn font-primary-title text-4xl font-normal leading-[1.1] drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
                            A Sanctuary for <br className="hidden sm:inline" />
                            <span className="italic font-light text-emerald-200">Your Healing Soul</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-10 max-w-3xl animate__animated animate__fadeInUp text-base leading-relaxed text-white/90 sm:text-lg md:text-2xl">
                            Slow down, breathe mountain air, and reconnect with yourself through guided ancestral wellness, sacred Banahaw trails, and living nature.
                        </p>

                        {/* Dual CTAs (solid primary + frosted glass secondary) */}
                        <div className="flex w-full animate__animated animate__fadeInUp flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
                            <button
                                onClick={() => navigate("/packages")}
                                className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:w-auto md:text-lg"
                            >
                                <span>Explore Healing Packages</span>
                                <ArrowRight className="h-5 w-5" />
                            </button>

                            <button
                                onClick={() => navigate("/create")}
                                className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/30 bg-white/20 px-8 py-4 text-base font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30 active:scale-95 sm:w-auto md:text-lg"
                            >
                                <Compass className="h-5 w-5 text-emerald-200" />
                                <span>Craft Custom Experience</span>
                            </button>
                        </div>

                        {/* Trust Signals */}
                        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/20 pt-10 text-left text-xs text-white/85 sm:grid-cols-3 sm:text-center md:gap-10 md:text-sm">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                                <span>100% Eco-Regenerative</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                                <span>Women & NGO Partnered</span>
                            </div>
                            <div className="col-span-2 flex items-center justify-center gap-2 sm:col-span-1">
                                <MapPin className="h-4 w-4 shrink-0 text-emerald-300" />
                                <span>Dolores, Quezon Foothills</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated Scroll Down Indicator */}
                    <a
                        href="#story"
                        aria-label="Scroll down to story"
                        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce cursor-pointer opacity-80 transition-opacity hover:opacity-100 sm:block"
                    >
                        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60 pt-2">
                            <span className="h-2.5 w-1.5 rounded-full bg-white animate-pulse" />
                        </span>
                    </a>
                </section>

                {/* 2. THE STORY SUMMARY & ESSENCE */}
                <section
                    id="story"
                    ref={storyRef}
                    className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-16"
                >
                    {/* Left: Image with Overlay & Floating Highlight Card */}
                    <div className={`relative ${storyInView ? "animate__animated animate__fadeInLeft" : "opacity-0"}`}>
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                            <img
                                src={staLucia}
                                alt="Sta. Lucia landscape in Quezon"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                    Sanctuary Ground
                                </span>
                                <h2 className="font-primary-title text-xl md:text-2xl">
                                    Dolores, Quezon
                                </h2>
                                <p className="mt-1 text-xs text-white/80 md:text-sm">
                                    At the blessed foothills of mystical Mount Banahaw
                                </p>
                            </div>
                        </div>

                        {/* Floating Highlight Card on Media Frame */}
                        <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-surface p-5 rounded-3xl shadow-2xl border border-border max-w-xs hidden sm:block animate__animated animate__fadeInUp">
                            <div className="flex items-center gap-3 mb-1.5">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    #1
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                    Official Pioneer
                                </span>
                            </div>
                            <p className="text-xs text-primary-text-color opacity-80 leading-relaxed">
                                Officially Quezon’s 1st registered wellness operator combining cultural rituals with sacred ecology.
                            </p>
                        </div>
                    </div>

                    {/* Right: Narrative & Stats */}
                    <div className={storyInView ? "animate__animated animate__fadeInRight" : "opacity-0"}>
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
                            <Sparkles size={16} /> Our Essence & Origin
                        </span>

                        <h2 className="mb-6 font-primary-title text-3xl leading-tight text-accent sm:text-4xl md:text-5xl">
                            Where Nature Becomes <br className="hidden sm:inline" />
                            <span className="italic font-normal">A Home For Healing</span>
                        </h2>

                        <div className="space-y-4 text-sm leading-relaxed text-primary-text-color opacity-85 md:text-base">
                            <p>
                                <strong className="text-primary">TahaK (Tahanan sa Kalikasan)</strong> was born from a transformative realization: today’s world moves too fast, disconnecting us from our quiet inner center.
                            </p>
                            <p>
                                In Filipino, <strong className="italic text-accent">“Tahanan”</strong> means home, and <strong className="italic text-accent">“Kalikasan”</strong> means nature—a sanctuary where the earth embraces you. It also honors <strong className="italic text-accent">“tahak”</strong>, a meaningful journey of discovery.
                            </p>
                            <p>
                                As the <strong>first wellness-focused tour operator in Quezon Province</strong>, we curate mindful retreats that integrate ancient Hilot touch, forest bathing, organic nourishment, and community empowerment.
                            </p>
                        </div>

                        {/* Fast Stats Row */}
                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                            <div className="rounded-2xl border border-border bg-surface p-4">
                                <p className="font-primary-title text-2xl font-bold text-primary md:text-3xl">1st</p>
                                <p className="mt-1 text-xs text-primary-text-color opacity-70">Wellness Operator in Quezon</p>
                            </div>
                            <div className="rounded-2xl border border-border bg-surface p-4">
                                <p className="font-primary-title text-2xl font-bold text-accent md:text-3xl">100%</p>
                                <p className="mt-1 text-xs text-primary-text-color opacity-70">Regenerative Tourism</p>
                            </div>
                            <div className="col-span-2 rounded-2xl border border-border bg-surface p-4 sm:col-span-1">
                                <p className="font-primary-title text-2xl font-bold text-primary md:text-3xl">4+</p>
                                <p className="mt-1 text-xs text-primary-text-color opacity-70">Protected Partner Sites</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/our-story"
                                className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent md:text-base"
                            >
                                <span>Read our complete story and watch our documentary</span>
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 3. HEALING EXPERIENCES SHOWCASE */}
                <section ref={experiencesRef} className="border-y border-border bg-white px-6 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className={`mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between ${experiencesInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                            <div>
                                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
                                    Rest, reconnect, renew
                                </span>
                                <h2 className="font-primary-title text-3xl text-accent sm:text-4xl md:text-5xl">
                                    Healing Experiences
                                </h2>
                            </div>
                            <p className="max-w-lg text-sm leading-relaxed text-primary-text-color opacity-70 md:text-base">
                                Discover our curated selections of nature-based activities designed to rejuvenate your spirit in Quezon's sacred sanctuaries.
                            </p>
                        </div>

                        {/* 6 Experience Cards with Dual Badges */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                            {healingExperiences.map((experience, index) => (
                                <article
                                    key={experience.title}
                                    className={`group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                                        experiencesInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div>
                                        {/* Image Frame with Dual Badges */}
                                        <div className="relative h-60 overflow-hidden">
                                            <img
                                                src={experience.img}
                                                alt={experience.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                            {/* Top-left category tag badge */}
                                            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold text-accent shadow-sm backdrop-blur-md">
                                                {experience.icon}
                                                <span>{experience.tag}</span>
                                            </div>

                                            {/* Bottom-right price badge */}
                                            <div className="absolute bottom-4 right-4 rounded-full bg-accent/90 px-4 py-1.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                                                {experience.price}
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 md:p-7">
                                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{experience.duration}</span>
                                            </div>
                                            <h3 className="mb-3 font-bold text-accent text-xl transition-colors group-hover:text-primary leading-snug">
                                                {experience.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-primary-text-color opacity-75">
                                                {experience.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Button */}
                                    <div className="px-6 pb-6 pt-2 md:px-7 md:pb-7">
                                        <button
                                            onClick={() => navigate("/packages")}
                                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/30 py-3 px-4 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
                                        >
                                            <span>View in Packages</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Interactive Custom Experience Banner */}
                        <div
                            className={`mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-accent to-primary/90 p-8 text-white shadow-xl transition-all md:flex-row md:p-12 ${
                                experiencesInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                            }`}
                        >
                            <div className="max-w-xl text-center md:text-left">
                                <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-emerald-200">
                                    Personalized Wellness
                                </span>
                                <h3 className="mb-2 font-primary-title text-2xl md:text-3xl">
                                    Want a custom itinerary for your group?
                                </h3>
                                <p className="text-sm text-white/85 md:text-base">
                                    Mix and match Forest Bathing, Hilot, and Organic dining to fit your group's schedule and soul requirements.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/create")}
                                className="shrink-0 cursor-pointer rounded-full bg-white px-8 py-3.5 text-base font-bold text-accent shadow-md transition-all hover:scale-105 hover:bg-emerald-50"
                            >
                                Build Custom Package
                            </button>
                        </div>
                    </div>
                </section>

                {/* 4. THE TRIPLE-IMPACT HARMONIOUS CIRCLE */}
                <section ref={impactRef} className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
                    <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${impactInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
                            The Conscious Circle
                        </span>
                        <h2 className="mb-4 font-primary-title text-3xl text-accent sm:text-4xl md:text-5xl leading-tight">
                            When You Heal, <br className="hidden sm:inline" />
                            Everything Heals Around You
                        </h2>
                        <p className="text-sm leading-relaxed text-primary-text-color opacity-75 md:text-base">
                            Booking with TAHAK creates a regenerative harmony. Every reservation directly enriches the sacred ecosystems of Quezon, uplifts local communities, and transforms your well-being.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8">
                        {impactPillars.map(({ badge, badgeColor, title, tagline, icon, desc, points }, index) => (
                            <article
                                key={title}
                                className={`flex flex-col justify-between rounded-3xl border border-border bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl md:p-10 ${
                                    impactInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                                }`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div>
                                    <div className="mb-6 flex items-center justify-between gap-3">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            {icon}
                                        </div>
                                        <span className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
                                            {badge}
                                        </span>
                                    </div>

                                    <h3 className="mb-1 font-primary-title text-2xl font-bold text-accent">
                                        {title}
                                    </h3>
                                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                                        {tagline}
                                    </p>
                                    <p className="mb-6 text-sm leading-relaxed text-primary-text-color opacity-80">
                                        {desc}
                                    </p>

                                    <ul className="space-y-3.5 border-t border-border pt-6">
                                        {points.map((point) => (
                                            <li key={point} className="flex items-start gap-3 text-xs leading-relaxed text-primary-text-color opacity-85 md:text-sm">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 border-t border-border/60 pt-6 text-xs font-medium italic text-primary-text-color opacity-60">
                                    Verified regenerative commitment
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 5. SANCTUARIES & COMMUNITY PARTNERS */}
                <section ref={partnersRef} className="border-t border-border bg-white px-6 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${partnersInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
                                Grounds of Sanctuary & Community
                            </span>
                            <h2 className="mb-4 font-primary-title text-3xl leading-tight text-accent sm:text-4xl md:text-5xl">
                                Rooted in Real Sanctuaries & People
                            </h2>
                            <p className="text-sm leading-relaxed text-primary-text-color opacity-75 md:text-base">
                                We welcome you as guests into living eco-farms, retreat centers, and community collectives in Quezon.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                            {partners.map(({ name, location, description, image, alt }, index) => (
                                <article
                                    key={name}
                                    className={`flex flex-col items-center rounded-3xl border border-border bg-background p-6 text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-md ${
                                        partnersInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                                    }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-white">
                                        <img src={image} alt={alt} className="h-full w-full object-cover" />
                                    </div>
                                    <h3 className="mb-1 text-base font-bold text-accent">{name}</h3>
                                    <span className="mb-2 text-xs font-semibold text-primary">{location}</span>
                                    <p className="text-xs leading-relaxed text-primary-text-color opacity-75">{description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                to="/partners"
                                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                            >
                                <span>Learn more about our community partners & sanctuaries</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. HIGH-CONVERSION CTA BANNER */}
                <section ref={ctaRef} className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
                    <div
                        className={`relative overflow-hidden rounded-[2.5rem] bg-accent p-8 text-center text-white shadow-2xl transition-all sm:p-12 md:p-20 ${
                            ctaInView ? "animate__animated animate__zoomIn" : "opacity-0"
                        }`}
                    >
                        {/* Radial Texture Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-accent to-accent z-0" />

                        <div className="relative z-10 mx-auto max-w-3xl">
                            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-md md:text-sm">
                                <Sparkles size={16} /> Begin Your Transformation
                            </span>

                            <h2 className="mb-6 font-primary-title text-3xl font-normal leading-tight sm:text-5xl md:text-6xl">
                                Ready to Slow Down <br className="hidden sm:inline" />
                                <span className="italic font-light text-emerald-200">and Return Home to Nature?</span>
                            </h2>

                            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                                Escape the noise of the city. Reserve your healing sanctuary in Dolores, Quezon today and experience the rejuvenating harmony of TAHAK.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                                <button
                                    onClick={() => navigate("/packages")}
                                    className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:w-auto text-base md:text-lg"
                                >
                                    <span>Browse Curated Packages</span>
                                    <ArrowRight size={20} />
                                </button>

                                <button
                                    onClick={() => navigate("/booking")}
                                    className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-10 py-4 font-bold text-accent shadow-xl transition-all hover:scale-105 hover:bg-emerald-50 active:scale-95 sm:w-auto text-base md:text-lg"
                                >
                                    <Calendar size={20} className="text-primary" />
                                    <span>Direct Booking</span>
                                </button>
                            </div>

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70 md:text-sm">
                                <div className="flex items-center justify-center gap-2">
                                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                                    <span>Safe, Accredited Guides</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                                    <span>Zero Carbon-Heavy Logistics</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                                    <span>100% Local Stewardship</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ContactForm />
            <Footer />
        </div>
    );
}
