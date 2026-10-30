import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import useInView from "../../hooks/useInView";

import mountain from "../../assets/mountain.jpg";
import peaceInNature from "../../assets/peace_in_nature.jpg";
import staLucia from "../../assets/sta_lucia.jpg";
import banahawCircle from "../../assets/banahaw_circle.avif";
import forestbath from "../../assets/pictures/forestbath.jpg";
import trek from "../../assets/pictures/trek.jpg";
import falls from "../../assets/pictures/falls.jpg";
import sound from "../../assets/pictures/sound.jpg";
import tea from "../../assets/pictures/tea.jpg";
import hilot from "../../assets/pictures/hilot.png";
import kalipiImage from "../../assets/KALIPI.jpg";
import labbImage from "../../assets/LABB.jpg";

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
        icon: TreePine,
    },
    {
        title: "Traditional Ancestral Hilot",
        tag: "Physical Release",
        price: "₱3,200",
        duration: "Full Day",
        desc: "Authentic Filipino touch healing using warm virgin coconut oil, medicinal leaves, and intuitive muscle restoration.",
        img: hilot,
        icon: Sparkles,
    },
    {
        title: "Sacred Mountain Trekking",
        tag: "Adventure & Spirit",
        price: "₱7,200",
        duration: "3D / 2N",
        desc: "Traverse mystical trails along Mount Banahaw guided by local stewards. Discover hidden springs and rock altars.",
        img: trek,
        icon: Mountain,
    },
    {
        title: "Sound Bath & Meditation",
        tag: "Sensory Stillness",
        price: "₱1,800",
        duration: "4 Hours",
        desc: "Resonant therapeutic singing bowls vibrating gently through quiet forest canopy to dissolve mental clutter.",
        img: sound,
        icon: Sun,
    },
    {
        title: "Pristine Waterfalls Cleansing",
        tag: "Vitality",
        price: "₱500 / add-on",
        duration: "Half Day",
        desc: "Plunge into crystal-clear natural mountain springs in Sta. Lucia, washing away fatigue in pure living waters.",
        img: falls,
        icon: Droplets,
    },
    {
        title: "Mountain Tea & Herbal Ritual",
        tag: "Nourishment",
        price: "₱1,200",
        duration: "2 Hours",
        desc: "Sip wild medicinal brews harvested by local elders while learning Banahaw's sacred ethnobotanical traditions.",
        img: tea,
        icon: Leaf,
    },
];

const impactPillars = [
    {
        badge: "Kalikasan",
        title: "Benefits to Nature",
        tagline: "Eco-Conservation with LABB",
        icon: Leaf,
        desc: "We practice zero-trace regenerative tourism. Every guest footprint nurtures rather than degrades the sacred wilderness of Quezon.",
        points: [
            "Direct proceeds fund Mt. Banahaw biodiversity restoration with LABB (Luntiang Alyansa para sa Bundok Banahaw).",
            "Strict zero-single-use-plastic and leave-no-trace protocols across every trail and campsite.",
            "Protection of natural spring watersheds and ancient forest habitats through active reforestation drives.",
        ],
    },
    {
        badge: "Kapwa at Komunidad",
        title: "Benefits to Local Partners",
        tagline: "Livelihood & Women Empowerment",
        icon: HeartHandshake,
        desc: "Tourism revenue flows directly into community hands, keeping sacred knowledge alive and families thriving.",
        points: [
            "Equitable livelihood and craft entrepreneurship with KALIPI (Kalipunan ng Liping Pilipina) women's cooperative.",
            "Dignified, above-standard income for local indigenous guides, organic farmers, and certified Hilot practitioners.",
            "Sustaining eco-sanctuaries like Peace in Nature Farm Resort and Banahaw Circle Nature Retreat.",
        ],
    },
    {
        badge: "Ginhawa",
        title: "Benefits to You (The Tourist)",
        tagline: "Deep Healing & Genuine Renewal",
        icon: Sparkles,
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
        location: "Sta. Lucia, Quezon",
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
    const storyOptions = useMemo(() => ({ threshold: 0.2 }), []);
    const revealOptions = useMemo(() => ({ threshold: 0.15 }), []);
    const ctaOptions = useMemo(() => ({ threshold: 0.25 }), []);
    const [storyRef, storyInView] = useInView(storyOptions);
    const [experiencesRef, experiencesInView] = useInView(revealOptions);
    const [impactRef, impactInView] = useInView(revealOptions);
    const [partnersRef, partnersInView] = useInView(storyOptions);
    const [ctaRef, ctaInView] = useInView(ctaOptions);

    return (
        <div className="min-h-screen bg-background text-primary-text-color selection:bg-primary/20 selection:text-primary">
            <Header />

            <main>
                <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden md:min-h-screen">
                    <img src={mountain} alt="Mount Banahaw sacred mountain mist" className="absolute inset-0 z-0 h-full w-full scale-105 object-cover transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-accent/50 to-accent/90" />

                    <div className="relative z-20 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-24 text-center text-white md:px-12">
                        <div className="mb-6 inline-flex animate__animated animate__fadeInDown items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-xs font-semibold tracking-wide shadow-lg backdrop-blur-md md:text-sm">
                            <Award className="h-4 w-4 shrink-0 text-emerald-300" />
                            <span>The 1st Wellness Tour Operator in Quezon Province</span>
                        </div>
                        <h1 className="mb-6 animate__animated animate__fadeIn font-primary-title text-4xl font-normal leading-[1.1] drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
                            A Sanctuary for <span className="italic font-light text-emerald-200">Your Healing Soul</span>
                        </h1>
                        <p className="mb-10 max-w-3xl animate__animated animate__fadeInUp text-base leading-relaxed text-white/90 sm:text-lg md:text-2xl">
                            Slow down, breathe mountain air, and reconnect with yourself through guided ancestral wellness, sacred Banahaw trails, and living nature.
                        </p>
                        <div className="flex w-full animate__animated animate__fadeInUp flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
                            <button onClick={() => navigate("/packages")} className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-2xl transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 sm:w-auto md:text-lg">
                                <span>Explore Healing Packages</span><ArrowRight className="h-5 w-5" />
                            </button>
                            <button onClick={() => navigate("/create")} className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/30 bg-white/20 px-8 py-4 text-base font-bold text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30 active:scale-95 sm:w-auto md:text-lg">
                                <Compass className="h-5 w-5 text-emerald-200" /><span>Craft Custom Experience</span>
                            </button>
                        </div>

                        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/20 pt-10 text-left text-xs text-white/85 sm:grid-cols-3 sm:text-center md:gap-10 md:text-sm">
                            <TrustSignal icon={CheckCircle2} label="100% Eco-Regenerative" />
                            <TrustSignal icon={CheckCircle2} label="Women & NGO Partnered" />
                            <TrustSignal icon={MapPin} label="Sta. Lucia, Quezon Foothills" className="col-span-2 sm:col-span-1" />
                        </div>
                    </div>

                    <a href="#story" aria-label="Scroll to our story" className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce cursor-pointer opacity-80 transition-opacity hover:opacity-100 sm:block">
                        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60 pt-2"><span className="h-2.5 w-1.5 rounded-full bg-white" /></span>
                    </a>
                </section>

                <section id="story" ref={storyRef} className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-16">
                    <div className={storyInView ? "animate__animated animate__fadeInLeft" : "opacity-0"}>
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                            <img src={staLucia} alt="Sta. Lucia landscape in Quezon" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">Sanctuary Ground</span>
                                <h2 className="font-primary-title text-xl md:text-2xl">Sta. Lucia & Dolores, Quezon</h2>
                                <p className="mt-1 text-xs text-white/80 md:text-sm">At the blessed foothills of mystical Mount Banahaw</p>
                            </div>
                        </div>
                    </div>

                    <div className={storyInView ? "animate__animated animate__fadeInRight" : "opacity-0"}>
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary md:text-sm"><Sparkles size={16} /> Our Essence & Origin</span>
                        <h2 className="mb-6 font-primary-title text-3xl leading-tight text-accent sm:text-4xl md:text-5xl">Where Nature Becomes <span className="italic font-normal">A Home For Healing</span></h2>
                        <div className="space-y-4 text-sm leading-relaxed text-primary-text-color/85 md:text-base">
                            <p><strong className="text-primary">TahaK (Tahanan sa Kalikasan)</strong> was born from a transformative realization: today’s world moves too fast, disconnecting us from our quiet inner center.</p>
                            <p>In Filipino, <strong className="italic text-accent">“Tahanan”</strong> means home, and <strong className="italic text-accent">“Kalikasan”</strong> means nature—a sanctuary where the earth embraces you. It also honors <strong className="italic text-accent">“tahak”</strong>, a meaningful journey of discovery.</p>
                            <p>As the <strong>first wellness-focused tour operator in Quezon Province</strong>, we curate mindful retreats that integrate ancient Hilot touch, forest bathing, organic nourishment, and community empowerment.</p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                            <Stat value="1st" label="Wellness Operator in Quezon" />
                            <Stat value="100%" label="Regenerative Tourism" />
                            <Stat value="4+" label="Protected Partner Sites" className="col-span-2 sm:col-span-1" />
                        </div>
                        <Link to="/our-story" className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent md:text-base">
                            <span>Read our complete story and watch our documentary</span><ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </section>

                <section ref={experiencesRef} className="bg-white px-6 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className={`mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between ${experiencesInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                            <div>
                                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">Rest, reconnect, renew</span>
                                <h2 className="font-primary-title text-3xl text-accent sm:text-4xl md:text-5xl">Healing Experiences</h2>
                            </div>
                            <p className="max-w-lg text-sm leading-relaxed text-primary-text-color/70 md:text-base">Discover our curated selections of nature-based activities designed to rejuvenate your spirit.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
                            {healingExperiences.map((experience, index) => (
                                <article key={experience.title} className={`group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${experiencesInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`} style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="relative h-56 overflow-hidden md:h-64">
                                        <img src={experience.img} alt={experience.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-primary shadow-sm backdrop-blur-sm">{experience.price}</span>
                                    </div>
                                    <div className="p-6 md:p-7">
                                        <div className="mb-4 flex items-center justify-between gap-3 text-xs text-primary-text-color/60">
                                            <span className="flex items-center gap-2"><experience.icon className="h-4 w-4 text-primary" />{experience.tag}</span>
                                            <span>{experience.duration}</span>
                                        </div>
                                        <h3 className="mb-3 font-primary-title text-xl text-accent">{experience.title}</h3>
                                        <p className="mb-6 min-h-16 text-sm leading-relaxed text-primary-text-color/70">{experience.desc}</p>
                                        <Link to="/packages" className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-accent">Learn More <ArrowRight size={16} /></Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="mt-10 text-center">
                            <button onClick={() => navigate("/create")} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-primary/90">Create your own experience <ArrowRight size={17} /></button>
                        </div>
                    </div>
                </section>

                <section ref={impactRef} className="px-6 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${impactInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">Kalikasan • Kapwa • Ginhawa</span>
                            <h2 className="mb-4 font-primary-title text-3xl text-accent sm:text-4xl md:text-5xl">The Harmonious Circle</h2>
                            <p className="text-sm leading-relaxed text-primary-text-color/75 md:text-base">Every journey supports the natural world, our local partners, and the wellbeing of each guest.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8">
                            {impactPillars.map(({ badge, title, tagline, icon: Icon, desc, points }, index) => (
                                <article key={title} className={`flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md md:p-8 ${impactInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`} style={{ animationDelay: `${index * 150}ms` }}>
                                    <div className="mb-6 flex items-center justify-between gap-3">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={27} /></span>
                                        <span className="rounded-full bg-background px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">{badge}</span>
                                    </div>
                                    <h3 className="mb-1 font-primary-title text-xl text-accent md:text-2xl">{title}</h3>
                                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">{tagline}</p>
                                    <p className="mb-6 text-sm leading-relaxed text-primary-text-color/80">{desc}</p>
                                    <ul className="flex-1 space-y-3.5 border-t border-border pt-6">
                                        {points.map((point) => <li key={point} className="flex items-start gap-3 text-xs leading-relaxed text-primary-text-color/85 md:text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{point}</span></li>)}
                                    </ul>
                                    <div className="mt-8 border-t border-border/60 pt-6 text-xs font-medium italic text-primary-text-color/60">Verified regenerative commitment</div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={partnersRef} className="border-t border-border bg-white px-6 py-20 md:px-10 md:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${partnersInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}>
                            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary md:text-sm">Grounds of Sanctuary & Community</span>
                            <h2 className="mb-4 font-primary-title text-3xl leading-tight text-accent sm:text-4xl md:text-5xl">Rooted in Real Sanctuaries & People</h2>
                            <p className="text-sm leading-relaxed text-primary-text-color/75 md:text-base">We welcome you as guests into living eco-farms, retreat centers, and community collectives in Quezon.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                            {partners.map(({ name, location, description, image, alt }, index) => (
                                <article key={name} className={`flex flex-col items-center rounded-3xl border border-border bg-background p-6 text-center transition-all hover:shadow-md ${partnersInView ? "animate__animated animate__fadeInUp" : "opacity-0"}`} style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-white"><img src={image} alt={alt} className="h-full w-full object-cover" /></div>
                                    <h3 className="mb-1 text-base font-bold text-accent">{name}</h3>
                                    <span className="mb-2 text-xs font-semibold text-primary">{location}</span>
                                    <p className="text-xs leading-relaxed text-primary-text-color/75">{description}</p>
                                </article>
                            ))}
                        </div>
                        <div className="mt-10 text-center">
                            <Link to="/partners" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white">Learn more about our community partners & sanctuaries <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </section>

                <section ref={ctaRef} className="px-6 py-20 md:px-10 md:py-28">
                    <div className={`relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-accent p-8 text-center text-white shadow-2xl transition-all sm:p-12 md:p-20 ${ctaInView ? "animate__animated animate__zoomIn" : "opacity-0"}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent to-accent" />
                        <div className="relative z-10 mx-auto max-w-3xl">
                            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-200 backdrop-blur-md md:text-sm"><Sparkles size={16} /> Begin Your Transformation</span>
                            <h2 className="mb-6 font-primary-title text-3xl font-normal leading-tight sm:text-5xl md:text-6xl">Ready to Slow Down <span className="italic font-light text-emerald-200">and Return Home to Nature?</span></h2>
                            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">Escape the noise of the city. Reserve your healing sanctuary in Sta. Lucia, Quezon today and experience the rejuvenating harmony of TAHAK.</p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                                <button onClick={() => navigate("/packages")} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-10 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto"><span>Browse Curated Packages</span><ArrowRight size={20} /></button>
                                <button onClick={() => navigate("/booking")} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-10 py-4 font-bold text-accent shadow-xl transition-all hover:scale-105 hover:bg-emerald-50 sm:w-auto"><Calendar size={20} className="text-primary" /><span>Direct Booking</span></button>
                            </div>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/70 md:text-sm">
                                <TrustSignal icon={ShieldCheck} label="Safe, Accredited Guides" />
                                <TrustSignal icon={ShieldCheck} label="Zero Carbon-Heavy Logistics" />
                                <TrustSignal icon={ShieldCheck} label="100% Local Stewardship" />
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

function TrustSignal({ icon: Icon, label, className = "" }) {
    return <div className={`flex items-center justify-center gap-2 ${className}`}><Icon className="h-4 w-4 shrink-0 text-emerald-300" /><span>{label}</span></div>;
}

function Stat({ value, label, className = "" }) {
    return <div className={`rounded-2xl border border-border bg-surface p-4 ${className}`}><p className="font-primary-title text-2xl font-bold text-primary md:text-3xl">{value}</p><p className="mt-1 text-xs text-primary-text-color/70">{label}</p></div>;
}
