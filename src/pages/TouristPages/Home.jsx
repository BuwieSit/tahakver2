import Header from "../../components/Header";
import Footer from "../../components/Footer";
import mountain from '../../assets/mountain.jpg';
import { CtaButton } from "../../components/Button";
import useInView from "../../hooks/useInView";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import bonfire from "../../assets/pictures/bonfire.jpg";
import falls from "../../assets/pictures/falls.jpg";
import audiovisual from "../../assets/pictures/audiovisual.jpg";
import farm from "../../assets/pictures/farm.jpg";
import forestbath from "../../assets/pictures/forestbath.jpg";
import trek from "../../assets/pictures/trek.jpg";
import { TreePine, Mountain, Map, Users } from 'lucide-react';


export default function Home() {
    const options = useMemo(() => ({
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    }), []);
    const [ref, IsInView] = useInView(options);
    const navigate = useNavigate();

    const experiences = [
        { title: "Forest Bathing", img: forestbath, desc: "Immerse yourself in the healing atmosphere of the woods." },
        { title: "Mountain Trekking", img: trek, desc: "Challenge yourself with breathtaking views and fresh air." },
        { title: "Farm Experience", img: farm, desc: "Connect with nature through organic farming and local life." },
        { title: "Waterfalls Escape", img: falls, desc: "Find peace and rejuvenation at our pristine waterfalls." },
    ];

    return (
        <div className="bg-background min-h-screen">
            <Header />
            
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <img src={mountain} alt="Nature Background" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-0 bg-accent/30 z-10" />
                
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-[10rem] font-primary-title mb-0 drop-shadow-2xl leading-none">Tahak</h1>
                    <p className="text-2xl font-primary-text font-medium mb-12 italic opacity-90 tracking-wide">Tahanan sa Kalikasan</p>
                    <CtaButton 
                        onClick={() => navigate('/packages')}
                        className="bg-primary hover:bg-primary/90 text-white px-12 py-4 text-xl rounded-full transition-all transform hover:scale-105 shadow-xl"
                    >
                        Experience your healing
                    </CtaButton>
                </div>
                
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2 opacity-60">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <TreePine size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-accent mb-2">Sustainable</h3>
                        <p className="text-sm text-primary-text-color opacity-70">Eco-conscious travel that preserves our natural heritage.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Mountain size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-accent mb-2">Authentic</h3>
                        <p className="text-sm text-primary-text-color opacity-70">Real connections with local culture and mountain life.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Map size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-accent mb-2">Guided</h3>
                        <p className="text-sm text-primary-text-color opacity-70">Expert guides to ensure safety and deep exploration.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-accent mb-2">Community</h3>
                        <p className="text-sm text-primary-text-color opacity-70">Support local livelihoods through your visit.</p>
                    </div>
                </div>
            </section>

            {/* Gallery/Experience Section */}
            <section className="bg-white py-24 px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 ref={ref} className={`text-5xl font-primary-title text-accent mb-4 ${IsInView ? "animate__animated animate__fadeInLeft" : "opacity-0"}`}>
                                Healing Experiences
                            </h2>
                            <p className="text-primary-text-color opacity-70 max-w-lg">
                                Discover our curated selections of nature-based activities designed to rejuvenate your spirit.
                            </p>
                        </div>
                        <CtaButton onClick={() => navigate('/packages')} className="hidden md:block">View all Packages</CtaButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {experiences.map((exp, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-3xl shadow-lg transition-all hover:-translate-y-2">
                                <img src={exp.img} alt={exp.title} className="w-full aspect-[3/4] object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                                    <p className="text-sm text-white/80 mb-4">{exp.desc}</p>
                                    <button onClick={() => navigate('/packages')} className="text-primary font-bold text-sm bg-white px-4 py-2 rounded-full w-fit">Learn More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}