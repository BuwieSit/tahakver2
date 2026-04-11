import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { useNavigate } from "react-router-dom";
import bonfire from "../../assets/pictures/bonfire.jpg";
import falls from "../../assets/pictures/falls.jpg";
import audiovisual from "../../assets/pictures/audiovisual.jpg";
import farm from "../../assets/pictures/farm.jpg";
import forestbath from "../../assets/pictures/forestbath.jpg";
import trek from "../../assets/pictures/trek.jpg";
import tea from "../../assets/pictures/tea.jpg";
import sound from "../../assets/pictures/sound.jpg";
import hilot from "../../assets/pictures/hilot.png";
import { Star, Clock, Users } from 'lucide-react';

export default function Packages() {
    const navigate = useNavigate();
    const packages = [
        {
            title: "Ugnayan: The Connection",
            price: "₱2,500",
            img: forestbath,
            duration: "Day Trip",
            group: "2-4 persons",
            desc: "A full day of forest bathing, guided meditation, and organic lunch."
        },
        {
            title: "Sama: Community Stay",
            price: "₱4,800",
            img: farm,
            duration: "2 Days, 1 Night",
            group: "Max 6 persons",
            desc: "Immerse in local farm life, learn traditional crafts, and sleep under the stars."
        },
        {
            title: "Kapwa: Shared Journey",
            price: "₱7,200",
            img: trek,
            duration: "3 Days, 2 Nights",
            group: "Group of 10",
            desc: "Multi-day mountain trek with professional guides and tribal storytelling."
        },
        {
            title: "The Sound of Silence",
            price: "₱1,800",
            img: sound,
            duration: "4 Hours",
            group: "Max 12 persons",
            desc: "A therapeutic sound bath session in the middle of a pine forest."
        },
        {
            title: "Ancestral Healing (Hilot)",
            price: "₱3,200",
            img: hilot,
            duration: "Full Day",
            group: "Private",
            desc: "Traditional Hilot massage and herbal bath experience at the falls."
        },
        {
            title: "Mountain Tea Ritual",
            price: "₱1,200",
            img: tea,
            duration: "2 Hours",
            group: "Open Group",
            desc: "Taste various mountain teas and learn about local medicinal plants."
        }
    ];

    return (
        <div className="bg-background min-h-screen">
            <Header />
            
            <main className="py-24 px-10 max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-6xl font-primary-title text-accent mb-4">Our Experiences</h1>
                    <p className="text-lg text-primary-text-color opacity-70 max-w-2xl">
                        Choose from our carefully crafted experiences or mix and match to create your own unique journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {packages.map((pkg, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group">
                            <div className="relative h-64 overflow-hidden">
                                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-primary shadow-sm">
                                    {pkg.price}
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4 text-xs font-medium text-primary uppercase tracking-wider">
                                    <div className="flex items-center gap-1"><Clock size={14}/> {pkg.duration}</div>
                                    <div className="flex items-center gap-1"><Users size={14}/> {pkg.group}</div>
                                </div>
                                <h3 className="text-2xl font-bold text-accent mb-4 leading-tight">{pkg.title}</h3>
                                <p className="text-sm text-primary-text-color opacity-70 mb-8 line-clamp-2">
                                    {pkg.desc}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <div className="flex text-amber-500">
                                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor"/>)}
                                    </div>
                                    <button onClick={() => navigate('/booking')} className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <ContactForm />
            <Footer />
        </div>
    );
}