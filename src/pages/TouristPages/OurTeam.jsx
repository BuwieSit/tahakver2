import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useInView from "../../hooks/useInView";

// assets
import sdg_three from "../../assets/SDG/sdg3.webp";
import sdg_eight from "../../assets/SDG/sdg8.webp";
import sdg_eleven from "../../assets/SDG/sdg11.webp";
import tahak_team from "../../assets/tahak_team.png";

// Icons
import {
    Leaf,
    Laptop,
    Globe,
    GraduationCap,
    Star,
    ArrowRight,
    BookOpen,
    HeartHandshake,
    Compass,
} from "lucide-react";

// ─── Team Data ────────────────────────────────────────────────────────────────

const teamMembers = [
    {
        name: "Jovit C. Camata",
        field: "Tourism Management",
        icon: <Globe className="w-6 h-6 text-primary" />,
        badge: "Tourism & Experience Design",
        badgeColor: "bg-amber-100 text-amber-800",
        story:
            "Jovit anchors TahaK's experience design with a deep understanding of how travelers connect with a destination. His tourism lens ensures every itinerary is both culturally grounded and visitor-ready—balancing authentic local heritage with the expectations of curious, conscious travelers.",
        contributions: [
            "Designing wellness, cultural, and nature-based tour experiences",
            "Shaping the overall visitor journey and customer touchpoints",
            "Exploring destination development for Dolores, Quezon",
        ],
    },
    {
        name: "Jiezel P. Costuna",
        field: "Tourism Management",
        icon: <Compass className="w-6 h-6 text-primary" />,
        badge: "Destination & Visitor Strategy",
        badgeColor: "bg-amber-100 text-amber-800",
        story:
            "Jiezel brings thoughtful perspective on how communities and travelers intersect. She helps TahaK craft experiences that are responsible and enriching—ensuring that every booking is a step toward genuine cultural exchange, not just sightseeing.",
        contributions: [
            "Connecting tourism activities with local practitioners and artisans",
            "Considering visitor expectations and responsible presentation",
            "Supporting destination promotion strategies for Quezon Province",
        ],
    },
    {
        name: "Mark Alfred M. Ella",
        field: "Tourism Management",
        icon: <HeartHandshake className="w-6 h-6 text-primary" />,
        badge: "Community & Culture Liaison",
        badgeColor: "bg-amber-100 text-amber-800",
        story:
            "Mark Alfred's expertise in tourism is the bridge between TahaK's vision and the local communities it serves. He ensures that the experiences we create are not only engaging for visitors but also empowering for the Hilot masters, KALIPI women, and farmers who make those experiences possible.",
        contributions: [
            "Linking tourism packages with real community livelihoods",
            "Ensuring cultural integrity in all experience offerings",
            "Helping organize and structure the full wellness program lineup",
        ],
    },
    {
        name: "Buhawie F. Santos",
        field: "Information Technology",
        icon: <Laptop className="w-6 h-6 text-primary" />,
        badge: "Platform & Digital Systems",
        badgeColor: "bg-sky-100 text-sky-800",
        story:
            "Buhawie translates TahaK's mission into a digital reality. He built the booking platform you're navigating right now—designing every interface with usability and accessibility in mind, so that discovering Filipino wellness is as seamless as the experiences themselves.",
        contributions: [
            "Planning and developing the TAHAK digital booking platform",
            "Organizing package information, experiences, and community partner listings",
            "Considering usability and accessibility for prospective travelers",
            "Exploring scalable systems for booking management as TahaK grows",
        ],
    },
    {
        name: "Eliza Rose R. Margallo",
        field: "Biology",
        icon: <Leaf className="w-6 h-6 text-primary" />,
        badge: "Ecology & Conservation",
        badgeColor: "bg-emerald-100 text-emerald-800",
        story:
            "Eliza Rose is TahaK's ecological conscience. Her biology background ensures that our nature-based tourism never comes at the cost of the environment that makes it possible. She champions conservation awareness and responsible interaction with Mt. Banahaw's rich biodiversity.",
        contributions: [
            "Promoting awareness of local ecosystems and natural heritage",
            "Ensuring environmental responsibility in all nature-based experiences",
            "Connecting TahaK's environmental goals with LABB's conservation mission",
        ],
    },
];

const mentor = {
    name: "Prof. David John D. Apigo",
    role: "Faculty Mentor & Guide",
    story:
        "Professor Apigo serves as the team's guiding light, offering mentorship and direction as the members continue developing and refining the TahaK concept. Under his guidance, the team bridges academic disciplines into a cohesive, mission-driven social enterprise.",
};

const sdgs = [
    { code: "SDG 3", label: "Good Health & Well-being", color: "bg-green-100 text-green-800", image: sdg_three },
    { code: "SDG 8", label: "Decent Work & Economic Growth", color: "bg-yellow-100 text-yellow-800", image: sdg_eight },
    { code: "SDG 11", label: "Sustainable Cities & Communities", color: "bg-blue-100 text-blue-800", image: sdg_eleven},
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OurTeam() {
    const introOptions = useMemo(() => ({ threshold: 0.1 }), []);
    const [introRef, isIntroInView] = useInView(introOptions);

    const missionOptions = useMemo(() => ({ threshold: 0.1 }), []);
    const [missionRef, isMissionInView] = useInView(missionOptions);

    const teamOptions = useMemo(() => ({ threshold: 0.05 }), []);
    const [teamRef, isTeamInView] = useInView(teamOptions);

    const mentorOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [mentorRef, isMentorInView] = useInView(mentorOptions);

    const sdgOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const [sdgRef, isSdgInView] = useInView(sdgOptions);

    return (
        <div className="bg-background min-h-screen text-primary-text-color selection:bg-primary/20 selection:text-primary">
            <Header />

            {/* 1. HERO / TEAM IMAGE */}
            <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end justify-center overflow-hidden bg-accent">
                {/* Team Photo Background */}
                <img
                    src={tahak_team}
                    alt="TahaK Founding Team"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/95 via-accent/60 to-black/40 z-10" />

                {/* Hero Text */}
                <div className="relative z-20 text-center text-white px-6 md:px-12 max-w-4xl mx-auto pb-16 md:pb-20 flex flex-col items-center">

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-primary-title font-normal leading-tight mb-6 drop-shadow-2xl animate__animated animate__fadeIn">
                        The Minds Behind{" "}
                        <span className="italic font-light text-emerald-200">TahaK</span>
                    </h1>

                    <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed animate__animated animate__fadeInUp font-primary-text">
                        Five students. Three disciplines. One shared mission — to build a wellness tourism platform
                        that celebrates Filipino heritage and empowers local communities.
                    </p>
                </div>
            </section>

            {/* 2. ORIGIN & MISSION */}
            <section
                ref={introRef}
                className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
            >
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
                        isIntroInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                    }`}
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                        How It Started
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-4">
                        Born from a Gap Worth Filling
                    </h2>
                    <p className="text-sm md:text-base text-primary-text-color/75 leading-relaxed">
                        When people think of wellness tourism in Thailand, they think of Thai massage. In Japan, onsen
                        and forest bathing. But in the Philippines — it's always beaches. TahaK was born to change
                        that narrative.
                    </p>
                </div>

                {/* Problem → Solution Flow */}
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 transition-all duration-700 ${
                        isIntroInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                    }`}
                >
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-4">
                            The Problem
                        </span>
                        <p className="text-sm md:text-base text-primary-text-color/80 leading-relaxed">
                            Our country has rich healing traditions, cultural heritage, and beautiful natural environments.
                            Yet Filipino wellness is rarely recognized as a signature tourism experience. Meanwhile,
                            local healers, women, farmers, and artisans lack platforms to earn from their knowledge.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-emerald-50 px-3 py-1 rounded-full mb-4">
                            The Answer
                        </span>
                        <p className="text-sm md:text-base text-primary-text-color/80 leading-relaxed">
                            TahaK — <em>Tahanan sa Kalikasan</em> — is a wellness tourism booking platform that connects
                            travelers with authentic Filipino wellness, culture, and nature, while creating real
                            livelihood opportunities for the communities of Dolores, Quezon.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. SDGs / IMPACT */}
            <section
                ref={missionRef}
                className="bg-white py-16 md:py-24 px-6 md:px-12 border-y border-border"
            >
                <div className="max-w-7xl mx-auto">
                    <div
                        className={`text-center mb-12 transition-all duration-700 ${
                            isMissionInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                        }`}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                            Guided by Global Goals
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-primary-title text-accent leading-tight mb-4">
                            Our Impact Targets
                        </h2>
                        <p className="text-sm md:text-base text-primary-text-color/70 max-w-2xl mx-auto leading-relaxed">
                            TahaK's three-year roadmap is grounded in measurable impact aligned with the United Nations
                            Sustainable Development Goals.
                        </p>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${
                            isMissionInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                        }`}
                    >
                        {sdgs.map((sdg, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-3 items-center text-center p-6 bg-background rounded-3xl border border-border"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${sdg.color}`}>
                                    {sdg.code}
                                </span>

                                <img src={sdg.image} alt="sdg" className="w-1/2 object-fit"/>
                                <p className="text-xl font-semibold text-primary-text-color/85">{sdg.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Milestone Cards */}
                    <div
                        ref={sdgRef}
                        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 ${
                            isSdgInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                        }`}
                    >
                        <div className="p-6 bg-background rounded-3xl border border-border flex flex-col gap-2">
                            <p className="text-3xl font-bold text-primary font-primary-title">Year 1</p>
                            <p className="text-sm text-primary-text-color/80">
                                Engage <strong>10 community members</strong> in paid work and complete{" "}
                                <strong>50 bookings</strong>. Allocate <strong>5% of revenue</strong> to LABB's
                                conservation initiatives.
                            </p>
                        </div>
                        <div className="p-6 bg-background rounded-3xl border border-border flex flex-col gap-2">
                            <p className="text-3xl font-bold text-accent font-primary-title">Year 3</p>
                            <p className="text-sm text-primary-text-color/80">
                                Grow to <strong>20 community members</strong> and <strong>110 bookings</strong>.
                                Scale LABB allocation to <strong>10% of revenue</strong>, supporting deeper
                                environmental stewardship.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TEAM MEMBERS */}
            <section
                ref={teamRef}
                className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
            >
                <div
                    className={`text-center max-w-3xl mx-auto mb-16 md:mb-20 transition-all duration-700 ${
                        isTeamInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                    }`}
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                        Our Multidisciplinary Team
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-primary-title text-accent leading-tight mb-4">
                        Five Perspectives, One Vision
                    </h2>
                    <p className="text-sm md:text-base text-primary-text-color/75 leading-relaxed">
                        TahaK is built by students from Tourism Management, Information Technology, and Biology —
                        each contributing a distinct lens to shape a more complete and responsible platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                                isTeamInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${idx * 120}ms` }}
                        >
                            {/* Header */}
                            <div>
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                            {member.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-accent font-primary-title leading-tight">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-primary mt-0.5">
                                                {member.field}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0 ml-2 hidden sm:inline ${member.badgeColor}`}
                                    >
                                        {member.badge}
                                    </span>
                                </div>

                                {/* Story */}
                                <p className="text-sm text-primary-text-color/80 leading-relaxed mb-5">
                                    {member.story}
                                </p>

                                {/* Contributions */}
                                <ul className="space-y-2.5 border-t border-border pt-5">
                                    {member.contributions.map((item, cIdx) => (
                                        <li
                                            key={cIdx}
                                            className="flex items-start gap-2.5 text-xs md:text-sm text-primary-text-color/85 leading-relaxed"
                                        >
                                            <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. MENTOR */}
            <section
                ref={mentorRef}
                className="bg-white py-16 md:py-24 px-6 md:px-12 border-t border-border"
            >
                <div className="max-w-4xl mx-auto">
                    <div
                        className={`text-center mb-10 transition-all duration-700 ${
                            isMentorInView ? "animate__animated animate__fadeInUp" : "opacity-0"
                        }`}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 inline-block">
                            Shared Direction
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-primary-title text-accent leading-tight mb-4">
                            Our Mentor
                        </h2>
                    </div>

                    <div
                        className={`bg-background rounded-3xl p-8 md:p-12 border border-border flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 transition-all duration-700 ${
                            isMentorInView ? "animate__animated animate__zoomIn" : "opacity-0"
                        }`}
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-accent font-primary-title mb-1 text-center md:text-left">
                                {mentor.name}
                            </h3>
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4 text-center md:text-left">
                                {mentor.role}
                            </p>
                            <p className="text-sm md:text-base text-primary-text-color/80 leading-relaxed">
                                {mentor.story}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CLOSING CTA — Link back to Our Story / Explore */}
            <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm md:text-base text-primary-text-color/70 leading-relaxed mb-8">
                        Curious about the mission and vision that drives this team? Read the full story behind TahaK —
                        our philosophy, values, and the community we're building together.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/our-story"
                            className="inline-flex items-center gap-2.5 bg-primary text-white hover:bg-primary/90 px-8 py-3.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md"
                        >
                            <span>Read Our Story</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/packages"
                            className="inline-flex items-center gap-2.5 bg-white text-accent border border-border hover:bg-background px-8 py-3.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-sm"
                        >
                            <span>Explore Packages</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
