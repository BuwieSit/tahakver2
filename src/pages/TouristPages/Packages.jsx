import { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { useNavigate } from "react-router-dom";
import { 
    Clock, 
    Users, 
    Star, 
    Search, 
    X, 
    Check, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    Utensils, 
    Compass, 
    CalendarCheck, 
    ChevronDown, 
    ChevronUp,
    SlidersHorizontal,
    HeartHandshake,
    Flame,
    TreePine
} from 'lucide-react';
import { useData } from "../../contexts/DataContext";
import samasama1 from "../../assets/TOUR_PACKAGES/samasama1.png";

// Helper to determine category tags for packages
export const getPackageCategory = (pkg) => {
    const text = `${pkg?.title || ""} ${pkg?.duration || ""} ${pkg?.desc || ""}`.toLowerCase();
    if (text.includes("3 days") || text.includes("3d2n")) return "3D2N Retreat";
    if (text.includes("2 days") || text.includes("2d1n")) return "2D1N Sanctuary";
    if (text.includes("day tour") || text.includes("day trip") || text.includes("full day")) return "Day Tour";
    return "Wellness Tour";
};

// Preset authentic inclusions from TOUR_PACKAGES.md
export const getPackageInclusions = (pkg) => {
    const presetInclusions = {
        // Kapwa Package (3D2N)
        1: [
            "Mt. Banahaw guided trek with Pamumuwesto",
            "Banahaw Circle Nature Retreat stay (2 Nights)",
            "Sta. Lucia Falls water cleansing & coconut treat",
            "FarmKO organic farm-to-table tour & lunch",
            "Tuob with coconut charcoal & traditional Hilot",
            "Restorative Kawa bath & Tacsyapo reflection",
            "All wholesome meals & welcome herbal/charcoal detox"
        ],
        // Ugnayan Package (2D1N)
        2: [
            "Banahaw Circle Nature Retreat stay (1 Night)",
            "Arnis stick yoga & Mt. Banahaw forest bathing",
            "Sta. Lucia Falls meditation with coconut treat",
            "Tuob with coconut charcoal & traditional Hilot",
            "Farm-to-table lunch & bonfire cultural story circle",
            "Kawa bath & Tacsyapo reflection activity"
        ],
        // Sama-Sama Package (Day Tour)
        3: [
            "Mt. Banahaw guided trek with folklore storytelling",
            "Arnis stick yoga & guided forest bathing",
            "Wholesome local farm-to-table lunch",
            "Kawa bath with complimentary coconut treat",
            "Tuob with coconut charcoal & Hilot + tea tasting",
            "Tacsyapo wall reflection activity"
        ],
    };

    if (pkg?.id && presetInclusions[pkg.id]) {
        return presetInclusions[pkg.id];
    }

    return [
        "Accredited local eco-guide & safety steward",
        "Quezon conservation & entry fees included",
        "Farm-to-table refreshments & herbal detox"
    ];
};

// Preset detailed itineraries strictly matching TOUR_PACKAGES.md
export const getPackageItinerary = (pkg) => {
    const presetItineraries = {
        // Kapwa Package (3D2N)
        1: [
            { 
                time: "Day 1", 
                title: "Tangan ni Ama (Grounding & Cleansing)", 
                desc: "7 AM Herbal Tea / Coconut Charcoal Detox Drink • Mt. Banahaw Guided Trek with Folklore Storytelling and Pamumuwesto • Wholesome Lunch • Forest Bathing • 2 PM Sta. Lucia Falls Water Meditation & Cleansing with Coconut Treat • 3:30 PM Transfer to Banahaw Circle Nature Retreat • Nature Sound Bathing & Meditation • Dinner • Bonfire Gathering & Pakikipagkapwa Circle." 
            },
            { 
                time: "Day 2", 
                title: "Kalinga ni Inay (Nurturing & Cultural Healing)", 
                desc: "Audio-Visual Cultural Immersion with Herbal Detox • Arnis Stick Yoga with Nature Dawn Chorus • Immersive Organic Farm to Table Day Tour Activity with Lunch at FarmKO • Tuob with Coconut Charcoal & Traditional Hilot Session • Herbal Tea & Cultural Story Circle with Sound Bathing • Dinner • Stargazing Activity (or Rain Meditation / Seasonal Firefly Watching)." 
            },
            { 
                time: "Day 3", 
                title: "Yapak ni Bunso (Integration & Release)", 
                desc: "Banahaw Sunrise Breakfast • Restorative Kawa Bath • Tacsyapo Wall Reflection Activity • Optional: Baybayin Affirmation & Tree Planting Activity." 
            }
        ],
        // Ugnayan Package (2D1N)
        2: [
            { 
                time: "Day 1", 
                title: "Sandigan kay Kuya (Protection & Connection)", 
                desc: "7 AM Herbal Tea / Coconut Charcoal Detox Drink • Arnis Stick Yoga • Mt. Banahaw Guided Forest Bathing with Folklore Storytelling & Pamumuwesto • Lunch • 2 PM Sta. Lucia Falls Water Meditation & Cleansing with Coconut Treat • Tuob with Coconut Charcoal and Traditional Hilot • 4 PM Transfer to Banahaw Circle Nature Retreat • Dinner • Bonfire Gathering & Cultural Story Circle (Alternatives: Stargazing, Rain Meditation, Firefly Watching)." 
            },
            { 
                time: "Day 2", 
                title: "Paghilom kay Ate (Healing & Renewal)", 
                desc: "Audio-Visual Cultural Immersion with Herbal Detox Drink • Restorative Kawa Bath • Tacsyapo Wall Reflection Activity • Immersive Organic Farm to Table Activity & Lunch • Optional: Baybayin Affirmation & Tree Planting Activity." 
            }
        ],
        // Sama-Sama Package (Day Tour)
        3: [
            { 
                time: "Morning", 
                title: "Sulyap ng Tahanan: Arrival & Forest Immersion", 
                desc: "7 AM Herbal Tea or Coconut Charcoal Detox Welcome Drink • Mt. Banahaw Guided Trek with Folklore Storytelling • Arnis Stick Yoga Session • Forest Bathing • Wholesome Farm Lunch." 
            },
            { 
                time: "Afternoon", 
                title: "Banahaw Circle Retreat & Ancestral Hilot", 
                desc: "Transfer to Banahaw Circle Nature Retreat • Kawa Bath with Complimentary Coconut Treat • Tuob with Coconut Charcoal and Traditional Hilot Session + Tea Tasting • Tacsyapo Wall Reflection Activity • Optional: Baybayin Affirmation & Tree Planting." 
            }
        ]
    };

    if (pkg?.id && presetItineraries[pkg.id]) {
        return presetItineraries[pkg.id];
    }

    return [
        { time: "Start", title: "Basecamp Arrival & Briefing", desc: `Welcome to Sta. Lucia/Dolores, Quezon and preparation for ${pkg?.title || "your journey"}.` },
        { time: "Core Experience", title: "Guided Immersion", desc: pkg?.desc || "Experience the natural healing of Mount Banahaw." },
        { time: "Conclusion", title: "Integration & Send-Off", desc: "Closing moments, local refreshments, and assistance with return travel." }
    ];
};

export default function Packages() {
    const navigate = useNavigate();
    const { packages } = useData();

    // Search and filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("recommended");
    
    // Quick-view modal state
    const [activeModalPackage, setActiveModalPackage] = useState(null);

    // FAQ Accordion state
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setActiveModalPackage(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter categories definitions based on official packages
    const categories = [
        { id: "all", label: "All Packages (3)" },
        { id: "day", label: "Day Tour" },
        { id: "overnight", label: "Multi-Day & Overnight (2D1N / 3D2N)" },
    ];

    // Filter and sort packages
    const filteredPackages = useMemo(() => {
        return packages
            .filter((pkg) => {
                // Search filter
                const query = searchQuery.trim().toLowerCase();
                const matchesSearch = 
                    !query ||
                    pkg.title?.toLowerCase().includes(query) ||
                    pkg.desc?.toLowerCase().includes(query) ||
                    pkg.duration?.toLowerCase().includes(query) ||
                    pkg.group?.toLowerCase().includes(query);

                if (!matchesSearch) return false;

                // Category filter
                if (selectedCategory === "all") return true;

                if (selectedCategory === "day") {
                    return pkg.duration?.toLowerCase().includes("day tour") || pkg.duration?.toLowerCase().includes("day trip") || pkg.duration?.toLowerCase().includes("hour");
                }
                if (selectedCategory === "overnight") {
                    return pkg.duration?.toLowerCase().includes("night") || pkg.duration?.toLowerCase().includes("days");
                }
                return true;
            })
            .sort((a, b) => {
                if (sortBy === "price-asc") {
                    return Number(a.price) - Number(b.price);
                }
                if (sortBy === "price-desc") {
                    return Number(b.price) - Number(a.price);
                }
                if (sortBy === "duration") {
                    return (a.duration || "").localeCompare(b.duration || "");
                }
                return (a.id || 0) - (b.id || 0); // Recommended order
            });
    }, [packages, searchQuery, selectedCategory, sortBy]);

    // Handle direct booking
    const handleBookNow = (pkg) => {
        navigate('/booking', { state: { selectedPackage: pkg } });
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "What makes Tahak's three core packages unique?",
            a: "Our three official packages—Sama-Sama (Day Tour), Ugnayan (2D1N), and Kapwa (3D2N)—are centered around authentic Filipino healing (Tuob, Hilot, Kawa Bath, and Arnis Yoga), community storytelling, and sacred nature immersion on the tranquil slopes of Mount Banahaw in Dolores and Sta. Lucia, Quezon."
        },
        {
            q: "How does the package booking process work?",
            a: "Submitting a booking inquiry reserves your desired dates with zero immediate payment required. Our Dolores guide team checks accommodation availability at Banahaw Circle Nature Retreat, coordinates with organic farming partners, and returns a personalized itinerary and quote within 24 hours."
        },
        {
            q: "Are the optional activities (Baybayin Affirmation & Tree Planting) included?",
            a: "Baybayin Affirmation and native Tree Planting can be added to any of our 3 packages upon request during booking. Our guides will ensure seedlings and calligraphy materials are prepared for your group."
        },
        {
            q: "What should I pack for our Mount Banahaw retreat?",
            a: "We recommend comfortable walking or trail shoes with good grip, light breathable cotton wear, a swimwear/change of clothes for Sta. Lucia Falls and Kawa baths, a refillable water flask, and a light jacket for cool mountain evenings."
        }
    ];

    return (
        <div className="bg-background min-h-screen flex flex-col font-primary-text">
            <Header />

            {/* Main Content Area — No Hero Section as requested for direct booking access */}
            <main className="flex-1 pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto w-full">
                
                {/* Clean, Elegant Header Title Section */}
                <div className="mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-3">
                        <Sparkles size={13} className="shrink-0" />
                        <span>Official Tour Packages • Dolores, Quezon</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-primary-title text-accent tracking-tight mb-3">
                                Our Sacred Journeys
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-primary-text-color/75 max-w-2xl leading-relaxed">
                                Choose from our three signature retreats—crafted with ancestral Hilot, Tuob cleansing, Arnis stick yoga, and Mount Banahaw nature stewardship.
                            </p>
                        </div>

                        {/* Quick Action: Custom builder link */}
                        <div className="shrink-0">
                            <button
                                onClick={() => navigate('/create')}
                                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-accent bg-white hover:bg-primary/10 border border-border px-4 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
                            >
                                <Compass size={16} className="text-primary" />
                                <span>Prefer custom activities? Build your own</span>
                                <ArrowRight size={14} className="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust & Booking Assurance Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
                    <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-accent text-xs md:text-sm">Banahaw Stewards</p>
                            <p className="text-[11px] text-primary-text-color/65">Accredited cultural guides</p>
                        </div>
                    </div>
                    <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Utensils size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-accent text-xs md:text-sm">Farm-to-Table</p>
                            <p className="text-[11px] text-primary-text-color/65">FarmKO organic harvests</p>
                        </div>
                    </div>
                    <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <CalendarCheck size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-accent text-xs md:text-sm">24h Confirmation</p>
                            <p className="text-[11px] text-primary-text-color/65">Direct quote confirmation</p>
                        </div>
                    </div>
                    <div className="bg-white p-3.5 md:p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <HeartHandshake size={18} />
                        </div>
                        <div>
                            <p className="font-bold text-accent text-xs md:text-sm">Flexible Reschedule</p>
                            <p className="text-[11px] text-primary-text-color/65">Zero-fee date changes</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Search, Filter & Sort Hub */}
                <div className="bg-white p-4 sm:p-6 rounded-3xl border border-border shadow-sm mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, duration, or ritual (e.g. Kapwa, Hilot, Tuob, 3D2N)..."
                                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-2xl text-xs sm:text-sm text-primary-text-color placeholder:text-primary-text-color/45 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition p-1 cursor-pointer"
                                    aria-label="Clear search"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 shrink-0">
                            <label htmlFor="package-sort" className="text-xs font-bold text-accent whitespace-nowrap flex items-center gap-1.5">
                                <SlidersHorizontal size={14} className="text-primary" />
                                <span>Sort by:</span>
                            </label>
                            <select
                                id="package-sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-accent focus:outline-none focus:ring-2 focus:ring-primary/40 transition cursor-pointer"
                            >
                                <option value="recommended">Featured Order</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="duration">Duration</option>
                            </select>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? "bg-primary text-white shadow-md shadow-primary/20 scale-102"
                                            : "bg-background text-accent/80 hover:text-accent hover:bg-primary/10 border border-border"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results Count & Reset row */}
                <div className="flex items-center justify-between mb-6 px-1">
                    <p className="text-xs md:text-sm text-primary-text-color/70 font-medium">
                        Showing <span className="font-bold text-accent">{filteredPackages.length}</span> of {packages.length} official packages
                    </p>
                    {(searchQuery || selectedCategory !== "all" || sortBy !== "recommended") && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setSortBy("recommended");
                            }}
                            className="text-xs font-bold text-primary hover:text-accent underline flex items-center gap-1 cursor-pointer"
                        >
                            Reset all filters
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {filteredPackages.length === 0 && (
                    <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-border shadow-sm max-w-xl mx-auto my-12">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={28} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-primary-title text-accent mb-2">No matching packages</h3>
                        <p className="text-sm text-primary-text-color/70 mb-6">
                            We couldn't find any packages matching "{searchQuery}". Try searching for Kapwa, Ugnayan, or Sama-Sama.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-primary/90 transition shadow-md cursor-pointer"
                            >
                                Clear filters
                            </button>
                            <button
                                onClick={() => navigate('/create')}
                                className="bg-background text-accent border border-border px-6 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-white transition cursor-pointer"
                            >
                                Build a custom package
                            </button>
                        </div>
                    </div>
                )}

                {/* Packages Grid */}
                {filteredPackages.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9 mb-16">
                        {filteredPackages.map((pkg, i) => {
                            const inclusions = getPackageInclusions(pkg);
                            const categoryTag = getPackageCategory(pkg);

                            return (
                                <div 
                                    key={pkg.id || i} 
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-border flex flex-col group hover:-translate-y-1.5"
                                >
                                    {/* Card Image with Floating Badges */}
                                    <div 
                                        className="relative h-64 overflow-hidden cursor-pointer bg-primary/5"
                                        onClick={() => setActiveModalPackage(pkg)}
                                    >
                                        <img 
                                            src={pkg.img || samasama1} 
                                            alt={pkg.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                                        {/* Category Badge */}
                                        <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {categoryTag}
                                        </div>

                                        {/* Price Tag */}
                                        <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full font-bold text-primary shadow-md border border-primary/10 flex items-baseline gap-1">
                                            <span className="text-base md:text-lg">₱{Number(pkg.price).toLocaleString()}</span>
                                            <span className="text-[10px] font-normal text-primary-text-color/70">/ pax</span>
                                        </div>

                                        {/* Bottom Quick Look overlay on image */}
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                            <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                                                Tap to view full itinerary
                                            </span>
                                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 font-bold">
                                                <Star size={12} fill="currentColor" />
                                                <span>4.9</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Card Content Body */}
                                    <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                                        <div>
                                            {/* Meta details row: Duration & Group */}
                                            <div className="flex flex-wrap items-center gap-3.5 mb-3 text-xs font-semibold text-primary">
                                                <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-lg">
                                                    <Clock size={13} className="shrink-0" />
                                                    <span>{pkg.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-lg">
                                                    <Users size={13} className="shrink-0" />
                                                    <span>{pkg.group}</span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 
                                                onClick={() => setActiveModalPackage(pkg)}
                                                className="text-xl font-primary-title font-bold text-accent mb-2.5 leading-snug group-hover:text-primary transition-colors cursor-pointer"
                                                title={pkg.title}
                                            >
                                                {pkg.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs sm:text-sm text-primary-text-color/75 mb-5 line-clamp-2 leading-relaxed">
                                                {pkg.desc}
                                            </p>

                                            {/* Key Inclusions preview for ease of decision */}
                                            <div className="space-y-1.5 mb-6 pt-4 border-t border-border/80">
                                                <p className="text-[11px] uppercase font-bold text-primary/90 tracking-wider mb-2">Package Inclusions:</p>
                                                {inclusions.slice(0, 3).map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-xs text-primary-text-color/80">
                                                        <Check size={13} className="text-primary mt-0.5 shrink-0" />
                                                        <span className="line-clamp-1">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Bar — Quick View & Direct Book Now */}
                                        <div className="pt-4 border-t border-border flex items-center gap-2.5">
                                            <button 
                                                type="button"
                                                onClick={() => setActiveModalPackage(pkg)} 
                                                className="flex-1 py-2.5 px-3 border border-border hover:border-primary/40 bg-background hover:bg-white text-accent font-bold rounded-full text-xs transition-colors text-center cursor-pointer"
                                            >
                                                Full Itinerary
                                            </button>
                                            
                                            <button 
                                                type="button"
                                                onClick={() => handleBookNow(pkg)} 
                                                className="flex-1 py-2.5 px-4 bg-primary hover:bg-accent text-white font-bold rounded-full text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 transform active:scale-95 cursor-pointer"
                                            >
                                                <span>Book Now</span>
                                                <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* "Need a Custom Itinerary?" Section */}
                <div className="bg-accent text-white rounded-3xl p-8 sm:p-10 md:p-14 relative overflow-hidden shadow-xl mb-16">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-3">
                            <Compass size={13} />
                            <span>Bespoke Journeys</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-primary-title font-bold mb-4 leading-tight">
                            Want to curate your own wellness experience?
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base opacity-80 leading-relaxed mb-8">
                            Select the exact rituals you crave—combine traditional Hilot, cold waterfall swims, mountain tea rituals, and FarmKO organic meals. Our dynamic creator calculates live pricing for any group size.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => navigate('/create')}
                                className="bg-primary hover:bg-white hover:text-accent text-white px-7 py-3 rounded-full font-bold text-xs sm:text-sm transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 cursor-pointer"
                            >
                                <span>Build Custom Package</span>
                                <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => navigate('/booking')}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition cursor-pointer"
                            >
                                Request Custom Group Quote
                            </button>
                        </div>
                    </div>

                    {/* Aesthetic background glow */}
                    <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                    <div className="absolute right-1/4 -top-16 w-60 h-60 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
                </div>

                {/* FAQ Accordion Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-primary-title text-accent mb-2">Frequently Asked Questions</h2>
                        <p className="text-xs sm:text-sm text-primary-text-color/70">Everything you need to know about preparing and booking your Tahak experience.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div 
                                    key={idx} 
                                    className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-accent text-sm sm:text-base hover:bg-background/50 transition cursor-pointer"
                                    >
                                        <span>{faq.q}</span>
                                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-primary-text-color/80 leading-relaxed border-t border-border/50 animate__animated animate__fadeIn">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>

            {/* Quick-View / Itinerary Modal */}
            {activeModalPackage && (
                <div 
                    className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate__animated animate__fadeIn"
                    onClick={() => setActiveModalPackage(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="relative h-56 sm:h-64 shrink-0 bg-accent overflow-hidden">
                            <img 
                                src={activeModalPackage.img || samasama1} 
                                alt={activeModalPackage.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
                            
                            {/* Close button */}
                            <button
                                onClick={() => setActiveModalPackage(null)}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition z-10 cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>

                            {/* Title & Price on Image */}
                            <div className="absolute bottom-4 left-6 right-6 text-white">
                                <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                                    {getPackageCategory(activeModalPackage)}
                                </span>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-primary-title font-bold leading-tight">
                                    {activeModalPackage.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-xs sm:text-sm opacity-90">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {activeModalPackage.duration}</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> {activeModalPackage.group}</span>
                                    <span className="font-bold text-emerald-300 text-base">₱{Number(activeModalPackage.price).toLocaleString()} / person</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-8 space-y-6 flex-1">
                            <div>
                                <h4 className="text-xs uppercase font-bold text-primary tracking-wider mb-2">Retreat Overview</h4>
                                <p className="text-sm text-primary-text-color/80 leading-relaxed">
                                    {activeModalPackage.desc}
                                </p>
                            </div>

                            {/* Inclusions */}
                            <div>
                                <h4 className="text-xs uppercase font-bold text-primary tracking-wider mb-3">What's Included</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {getPackageInclusions(activeModalPackage).map((inc, idx) => (
                                        <div key={idx} className="flex items-start gap-2 bg-background p-2.5 rounded-xl border border-border text-xs text-primary-text-color">
                                            <Check size={14} className="text-primary mt-0.5 shrink-0" />
                                            <span>{inc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Daily Itinerary Breakdown */}
                            <div>
                                <h4 className="text-xs uppercase font-bold text-primary tracking-wider mb-3">Daily Breakdown & Rituals</h4>
                                <div className="space-y-4 border-l-2 border-primary/20 pl-4 ml-2">
                                    {getPackageItinerary(activeModalPackage).map((step, sIdx) => (
                                        <div key={sIdx} className="relative">
                                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                                            <p className="text-xs font-bold text-primary uppercase tracking-wide">{step.time}</p>
                                            <p className="text-sm font-bold text-accent mb-1">{step.title}</p>
                                            <p className="text-xs text-primary-text-color/75 leading-relaxed">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Optional Activities Note */}
                            <div className="p-3.5 bg-primary/5 rounded-2xl border border-primary/15 text-xs text-primary-text-color/80 flex items-center gap-3">
                                <Sparkles size={18} className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-accent">Optional Enrichments Available</p>
                                    <p className="text-[11px] text-primary-text-color/70">Baybayin Affirmation & Tree Planting can be added upon request during your booking.</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div className="p-4 sm:p-6 bg-background border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                            <div>
                                <p className="text-xs text-primary-text-color/60">Starting rate per person</p>
                                <p className="text-xl font-bold text-accent">
                                    ₱{Number(activeModalPackage.price).toLocaleString()} <span className="text-xs font-normal opacity-70">/ pax</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveModalPackage(null);
                                        navigate('/create');
                                    }}
                                    className="flex-1 sm:flex-initial px-4 py-2.5 border border-border bg-white hover:bg-background text-accent font-bold rounded-full text-xs transition cursor-pointer"
                                >
                                    Customize
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const pkg = activeModalPackage;
                                        setActiveModalPackage(null);
                                        handleBookNow(pkg);
                                    }}
                                    className="flex-1 sm:flex-initial px-6 py-2.5 bg-primary hover:bg-accent text-white font-bold rounded-full text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
                                >
                                    <CalendarCheck size={16} />
                                    <span>Proceed to Book</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ContactForm />
            <Footer />
        </div>
    );
}
