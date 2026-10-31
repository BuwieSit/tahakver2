import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import useInView from "../../hooks/useInView";

// Assets
import rocks from "../../assets/rocks.webp";
import sta_lucia from "../../assets/sta_lucia.jpg";
import tahak_team from "../../assets/tahak_team.png";
import mt_cristobal from "../../assets/mt_cristobal.webp";
import rocks_shore from "../../assets/rocks.webp";


// Icons
import {
    Sparkles,
    Award,
    HeartHandshake,
    TreePine,
    Mountain,
    ShieldCheck,
    ArrowRight,
    Compass,
    Users,
    Leaf,
    CheckCircle2,
    Quote,
    MapPin
} from "lucide-react";

export default function OurStory() {
    const navigate = useNavigate();

    // Section Animation Observers
    const storyOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [essenceRef, isEssenceInView] = useInView(storyOptions);

    const valuesOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [valuesRef, isValuesInView] = useInView(valuesOptions);

    const geoOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [geoRef, isGeoInView] = useInView(geoOptions);

    const ctaOptions = useMemo(() => ({ threshold: 0.2 }), []);
    const [ctaRef, isCtaInView] = useInView(ctaOptions);

    // The 3 Etymological Pillars
    const namePillars = [
        {
            word: "Tahanan",
            meaning: "Home & Sanctuary",
            desc: "A warm, embracing refuge where you feel completely safe, cared for, and accepted. Here, nature becomes your home to rest and let down heavy burdens.",
            icon: <HeartHandshake className="w-6 h-6 text-primary" />,
            badge: "Warmth & Care"
        },
        {
            word: "Kalikasan",
            meaning: "The Living Environment",
            desc: "The ancient forests, mineral waterfalls, and sacred mountain air of Quezon that serve as the ultimate healer and restorative medicine for tired spirits.",
            icon: <TreePine className="w-6 h-6 text-primary" />,
            badge: "Natural Medicine"
        },
        {
            word: "Tahak",
            meaning: "The Sacred Journey",
            desc: "An intentional Filipino verb meaning to traverse a path with purpose. A journey away from city noise and toward deep self-discovery and reconnection.",
            icon: <Mountain className="w-6 h-6 text-primary" />,
            badge: "Path to Renewal"
        }
    ];

    // Core Values / Pillars of Stewardship
    const guidingValues = [
        {
            title: "Sacred Stewardship (Pangangalaga)",
            tagline: "Eco-Conservation with LABB",
            badge: "Kalikasan First",
            badgeColor: "bg-emerald-100 text-emerald-800",
            icon: <Leaf className="w-7 h-7 text-primary" />,
            desc: "We believe travel should restore rather than deplete. Together with LABB (Luntiang Alyansa para sa Bundok Banahaw), our eco-tours fund indigenous reforestation, leave-no-trace trail upkeep, and protect clean mountain springs.",
            highlights: [
                "Zero-single-use-plastic policy across all journeys",
                "Direct proceeds allocated to Mt. Banahaw biodiversity protection",
                "Trail maintenance adhering strictly to leave-no-trace ethics"
            ]
        },
        {
            title: "Cultural Wisdom (Katutubong Dunong)",
            tagline: "Ancestral Filipino Healing",
            badge: "Authentic Heritage",
            badgeColor: "bg-amber-100 text-amber-800",
            icon: <Sparkles className="w-7 h-7 text-amber-700" />,
            desc: "Quezon holds timeless wellness wisdom. We work closely with respected local Hilot masters and ethnobotanical elders to preserve ancestral massage, natural leaf infusions, and meditative rituals in their purest, most respectful forms.",
            highlights: [
                "Certified, native practitioners of traditional Hilot touch",
                "Organic mountain teas brewed from indigenous medicinal herbs",
                "Preservation of oral healing traditions and sacred mountain lore"
            ]
        },
        {
            title: "Shared Prosperity (Kapwa at Ginhawa)",
            tagline: "Community & Women Empowerment",
            badge: "Community Flourishing",
            badgeColor: "bg-sky-100 text-sky-800",
            icon: <Users className="w-7 h-7 text-sky-700" />,
            desc: "Tourism must directly uplift those whose land we visit. We partner proudly with KALIPI (Kalipunan ng Liping Pilipina) to provide sustainable culinary and handicraft livelihoods for women, and dignified income for native guides.",
            highlights: [
                "Direct employment for local women through KALIPI cooperative",
                "Above-standard compensation for mountain guides and retreat staff",
                "Support for local organic farming at Peace in Nature Farm Resort"
            ]
        }
    ];

    return (
        <div className="bg-background min-h-screen text-primary-text-color selection:bg-primary/20 selection:text-primary">
            <Header />

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
                <img
                    src={rocks}
                    alt="Mount Banahaw sacred rock landscape"
                    className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-accent/60 to-accent/90 z-10" />

                <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-5xl mx-auto pt-24 pb-16 flex flex-col items-center">


                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-primary-title font-normal leading-tight mb-8 drop-shadow-2xl animate__animated animate__fadeIn">
                        Returning Home to Nature, <br />
                        <span className="italic font-light text-emerald-200">Reviving the Spirit of Quezon</span>
                    </h1>

                    {/* Evocative Ethos Quote */}
                    <div className="relative max-w-3xl mx-auto my-4 p-6 sm:p-8 rounded-3xl  backdrop-blur-md shadow-xl animate__animated animate__fadeInUp">
                        <Quote className="w-8 h-8 text-emerald-300/40 absolute top-4 left-4 -scale-x-100" />
                        <p className="text-base sm:text-sm md:text-xl font-primary-title italic text-white/95 leading-relaxed z-10 relative">
                            "TahaK was born to help you slow down, breathe deep, and reconnect with what truly matters—yourself, your culture, your community."
                        </p>
                    </div>
                </div>
                
            </section>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 w-full font-primary-text">

                <div className="relative overflow-hidden h-48 md:h-64 group">
                    <img src={tahak_team} alt="tahak team" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/45" />
                    <span className="absolute inset-0 flex items-center justify-center text-white md:text-2xl font-semibold text-center px-4 leading-snug drop-shadow-lg ">1st Wellness Operator in Quezon</span>
                </div>
                <div className="relative overflow-hidden h-48 md:h-64 group">
                    <img src={mt_cristobal} alt="Mt. Cristobal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/45" />
                    <span className="absolute inset-0 flex items-center justify-center text-white md:text-2xl font-semibold text-center px-4 leading-snug drop-shadow-lg">Regenerative Community Tourism</span>
                </div>
                <div className="relative overflow-hidden h-48 md:h-64 group col-span-2 sm:col-span-1">
                    <img src={rocks_shore} alt="Rocks Shore" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-black/45" />
                    <span className="absolute inset-0 flex items-center justify-center text-white md:text-2xl font-semibold text-center px-4 leading-snug drop-shadow-lg">Dolores, Quezon Foothills</span>
                </div>
            </div>

            {/* 2. THE ESSENCE & ORIGIN STORY (WITH VIDEO & ETYMOLOGY) */}
            <section
                ref={essenceRef}
                className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
            >
                {/* Top Section Intro */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-700 ${
                        isEssenceInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                    }`}
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                        The Meaning Behind Our Name
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-4">
                        What is TahaK?
                    </h2>
                    <p className="text-sm md:text-base text-primary-text-color/75 leading-relaxed">
                        A mindful fusion of three profound Filipino concepts that define our purpose and promise to every traveler.
                    </p>
                </div>

                {/* 3 Etymological Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20">
                    {namePillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between  ${
                                isEssenceInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                                        {pillar.icon}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                                        {pillar.badge}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-accent font-primary-title mb-1">
                                    {pillar.word}
                                </h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                                    {pillar.meaning}
                                </p>
                                <p className="text-sm text-primary-text-color/80 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Video & Narrative Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-border">
                    {/* Left: Video Showcase with Floating Badge */}
                    <div
                        className={`lg:col-span-6 relative transition-all duration-700 ${
                            isEssenceInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
                        }`}
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video border-4 border-white bg-black">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/YAOhrdjmQ74"
                                title="TahaK Wellness Journey Documentary"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>

                        {/* Floating Highlight Card */}
                        <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-surface p-5 rounded-3xl shadow-2xl border border-border max-w-xs hidden sm:block animate__animated animate__fadeInUp">
                            <div className="flex items-center gap-3 mb-1.5">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    #1
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                    Official Pioneer
                                </span>
                            </div>
                            <p className="text-xs text-primary-text-color/80 leading-relaxed">
                                Recognized as Quezon’s first accredited wellness tour operator.
                            </p>
                        </div>
                    </div>

                    {/* Right: Narrative */}
                    <div
                        className={`lg:col-span-6 flex flex-col justify-center transition-all duration-700 ${
                            isEssenceInView ? "animate__animated animate__fadeInRight" : "opacity-0"
                        }`}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Our Founding Vision
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-6">
                            Born from the Need <br />
                            <span className="italic font-normal">To Breathe and Reconnect</span>
                        </h2>

                        <div className="space-y-4 text-sm md:text-base text-primary-text-color/85 leading-relaxed font-primary-text">
                            <p>
                                <strong className="text-primary">TahaK (Tahanan sa Kalikasan)</strong> was founded on a simple yet revolutionary truth: modern living forces our nervous systems into a constant state of hyper-alertness, stripping away our natural rhythm.
                            </p>
                            <p>
                                Rather than offering fleeting superficial sightseeing, we envisioned a sanctuary where nature is experienced as a healing home. By uniting ancient Filipino touch therapies with immersive forest bathing and sacred mountain pilgrimages, we provide a structured pathway back to balance.
                            </p>
                            <p>
                                As the <strong>first wellness-focused tour operator in Quezon Province</strong>, we hold a sacred responsibility to our guests, our partners, and the delicate mountain ecology that shelters us all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE SACRED GEOGRAPHY: SANCTUARY IN QUEZON */}
            <section
                ref={geoRef}
                className="bg-white py-20 md:py-32 px-6 md:px-12 border-y border-border"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Text and Stats */}
                        <div
                            className={`lg:col-span-7 transition-all duration-700 ${
                                isGeoInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
                            }`}
                        >
                            <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                                The Sacred Soil
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-6">
                                The Foothills of Banahaw: <br />
                                <span className="italic font-normal">Dolores, Quezon</span>
                            </h2>
                            <p className="text-sm md:text-base text-primary-text-color/80 mb-8 leading-relaxed">
                                Our home rests at the serene foothills of Mount Banahaw—a mountain revered for generations as a mystical spiritual sanctuary. Here, subterranean spring waters flow pure, volcanic mineral rocks radiate calm, and thick tree canopies generate rich phytoncides that naturally lower cortisol levels.
                            </p>

                            {/* 4 Fast Stat Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
                                <div className="p-6 bg-background rounded-3xl border border-border">
                                    <p className="text-3xl md:text-4xl font-bold text-primary font-primary-title">1st</p>
                                    <p className="text-xs md:text-sm text-primary-text-color/70 mt-1 font-semibold">
                                        Registered Wellness Operator in Quezon
                                    </p>
                                </div>
                                <div className="p-6 bg-background rounded-3xl border border-border">
                                    <p className="text-3xl md:text-4xl font-bold text-accent font-primary-title">100%</p>
                                    <p className="text-xs md:text-sm text-primary-text-color/70 mt-1 font-semibold">
                                        Regenerative & Eco-Conscious
                                    </p>
                                </div>
                                <div className="p-6 bg-background rounded-3xl border border-border">
                                    <p className="text-3xl md:text-4xl font-bold text-primary font-primary-title">2</p>
                                    <p className="text-xs md:text-sm text-primary-text-color/70 mt-1 font-semibold">
                                        Pilot Sanctuaries (Peace in Nature & Banahaw Circle)
                                    </p>
                                </div>
                                <div className="p-6 bg-background rounded-3xl border border-border">
                                    <p className="text-3xl md:text-4xl font-bold text-accent font-primary-title">2</p>
                                    <p className="text-xs md:text-sm text-primary-text-color/70 mt-1 font-semibold">
                                        Pillar NGO & Cooperative Allies (LABB & KALIPI)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Showcase */}
                        <div
                            className={`lg:col-span-5 transition-all duration-700 ${
                                isGeoInView ? "animate__animated animate__fadeInRight" : "opacity-0"
                            }`}
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
                                <img
                                    src={sta_lucia}
                                    alt="Sta Lucia natural scenery in Quezon"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="inline-block bg-primary text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full mb-2">
                                        Protected Eco-Sanctuary
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-primary-title">
                                        Dolores, Quezon Natural Groves
                                    </h3>
                                    <p className="text-xs md:text-sm text-white/80 mt-1">
                                        Where pristine mountain water and living earth meet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. GUIDING PILLARS: OUR VALUES & STEWARDSHIP */}
            <section
                ref={valuesRef}
                className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
            >
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-700 ${
                        isValuesInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                    }`}
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                        The Core of Our Work
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-4">
                        Pillars of Sacred Stewardship
                    </h2>
                    <p className="text-sm md:text-base text-primary-text-color/75 leading-relaxed">
                        Every package, trail walk, and healing session is guided by a commitment to the land, traditional heritage, and human flourishing.
                    </p>
                </div>

                {/* 3 Pillar Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                    {guidingValues.map((pillar, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                                isValuesInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        {pillar.icon}
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${pillar.badgeColor}`}>
                                        {pillar.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-accent mb-1 font-primary-title">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                                    {pillar.tagline}
                                </p>

                                <p className="text-sm text-primary-text-color/80 leading-relaxed mb-6">
                                    {pillar.desc}
                                </p>

                                {/* Highlights with CheckCircle2 */}
                                <ul className="space-y-3.5 border-t border-border pt-6">
                                    {pillar.highlights.map((item, hIdx) => (
                                        <li key={hIdx} className="flex items-start gap-3 text-xs md:text-sm text-primary-text-color/85 leading-relaxed">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/60">
                                <span className="text-xs font-medium text-primary-text-color/60 italic">
                                    Core ethical commitment
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. ALLIES & SANCTUARIES LINK */}
            <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
                            Collaborative Sanctuary
                        </span>
                        <h3 className="text-2xl md:text-3xl font-primary-title text-accent mb-3">
                            Meet Our Operations Sites & Community Allies
                        </h3>
                        <p className="text-sm md:text-base text-primary-text-color/75">
                            Learn more about how we work alongside Banahaw Circle Nature Retreat, Peace in Nature Farm Resort, LABB, and KALIPI to sustain our mission.
                        </p>
                    </div>
                    <Link
                        to="/partners"
                        className="shrink-0 inline-flex items-center gap-3 bg-primary text-white hover:bg-primary/90 px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all transform hover:scale-105 shadow-md"
                    >
                        <span>Explore Our Partners</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* 6. CALL TO ACTION BANNER */}
            <section
                ref={ctaRef}
                className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto"
            >
                <div
                    className={`relative rounded-[2.5rem] overflow-hidden bg-accent text-white p-10 sm:p-14 md:p-20 shadow-2xl text-center flex flex-col items-center transition-all duration-700 ${
                        isCtaInView ? "animate__animated animate__zoomIn" : "opacity-0"
                    }`}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-accent to-accent z-0" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide text-emerald-200 mb-6">
                            <Sparkles className="w-4 h-4" />
                            Live the Experience
                        </span>

                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-primary-title font-normal leading-tight mb-6">
                            Be Part of the <br />
                            <span className="italic font-light text-emerald-200">TAHAK Healing Story</span>
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl text-white/85 mb-10 leading-relaxed font-primary-text max-w-2xl mx-auto">
                            Don't just read about our sanctuary. Step into the lush forests, receive traditional Hilot care, and let Mount Banahaw restore your spirit.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                            <button
                                onClick={() => navigate("/packages")}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary/90 px-10 py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-xl cursor-pointer"
                            >
                                <span>Explore Curated Packages</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => navigate("/create")}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-accent hover:bg-emerald-50 px-10 py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-xl cursor-pointer"
                            >
                                <Compass className="w-5 h-5 text-primary" />
                                <span>Build Custom Itinerary</span>
                            </button>
                        </div>

                        {/* Assurance Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-xs md:text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                                <span>Pioneering Certified Operator</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                                <span>100% Nature-Immersed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                                <span>Regenerative Community Impact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. MEET OUR TEAM — Subtle Link */}
            <section className="py-10 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <Link
                    to="/our-team"
                    className="inline-flex items-center gap-2 text-sm text-primary-text-color/50 hover:text-primary transition-colors duration-200 group"
                >
                    <Users className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="underline underline-offset-4 decoration-dotted">
                        More info about our team
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
            </section>

            {/* 8. CONTACT & INQUIRY FORM */}
            <ContactForm />

            {/* 8. FOOTER */}
            <Footer />
        </div>
    );
}
