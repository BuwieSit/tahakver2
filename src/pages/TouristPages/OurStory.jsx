import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import rocks from "../../assets/rocks.webp";
import sta_lucia from "../../assets/sta_lucia.jpg";

export default function OurStory() {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            
            {/* Hero Section */}
            <section className="relative py-48 px-10 overflow-hidden text-white">
                <img src={rocks} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-primary/40 z-10" />
                
                <div className="max-w-7xl mx-auto relative z-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-primary-title mb-8 italic leading-tight max-w-4xl mx-auto drop-shadow-lg">
                        "TahaK was born to help you slow down, breathe deep, and reconnect with what truly matters—yourself, your culture, your community."
                    </h1>
                </div>
            </section>

            {/* What is TahaK Section */}
            <section className="py-24 px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
                    <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/YAOhrdjmQ74" 
                        title="TahaK Wellness Journey"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Our Essence</span>
                    <h2 className="text-4xl font-primary-title text-accent leading-tight">What is TahaK?</h2>
                    <div className="space-y-4 text-primary-text-color opacity-85 leading-relaxed font-primary-text">
                        <p>
                            <strong className="text-primary">TahaK (Tahanan sa Kalikasan)</strong> is the first wellness-focused tour operator offering curated packages in Quezon, a province in the Philippines, born from a vision to create a sanctuary where nature becomes a home for travelers seeking healing and transformation.
                        </p>
                        <p>
                            The name TahaK is a meaningful fusion of two Filipino words—<strong className="italic">“Tahanan”</strong> (home) and <strong className="italic">“Kalikasan”</strong> (environment), signifying the environment as a home for wellness.
                        </p>
                        <p>
                            It also echoes the Filipino word <strong className="italic">“tahak”</strong>, meaning journey, reinforcing the idea of a path toward healing and self-discovery. Together, these meanings reflect our core mission: guiding travelers on a journey to wellness through a deep connection with oneself, others, and the natural world.
                        </p>
                    </div>
                </div>
            </section>

            {/* Roots Section */}
            <section className="bg-white py-24 px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="order-2 md:order-1">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">The Location</span>
                        <h2 className="text-4xl font-primary-title text-accent mt-4 mb-6 leading-tight">A Sanctuary in Quezon</h2>
                        <p className="text-primary-text-color opacity-80 mb-6 leading-relaxed">
                            Our journey started in the heart of Sta. Lucia, where we saw the need for sustainable travel that benefits both the visitors and the locals. We provide a space where the lush greenery of Quezon becomes your temporary home.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mt-10">
                            <div className="p-6 bg-background rounded-2xl">
                                <p className="text-3xl font-bold text-primary">1st</p>
                                <p className="text-sm opacity-60">Wellness Operator in Quezon</p>
                            </div>
                            <div className="p-6 bg-background rounded-2xl">
                                <p className="text-3xl font-bold text-primary">100%</p>
                                <p className="text-sm opacity-60">Nature Focused</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 rounded-3xl overflow-hidden shadow-2xl">
                        <img src={sta_lucia} alt="Sta Lucia Landscape" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            <ContactForm />
            <Footer />
        </div>
    );
}