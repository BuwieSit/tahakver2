import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { useNavigate } from "react-router-dom";
import { Star, Clock, Users } from 'lucide-react';
import { useData } from "../../contexts/DataContext";
import forestbath from "../../assets/pictures/forestbath.jpg";

export default function Packages() {
    const navigate = useNavigate();
    const { packages } = useData();

    return (
        <div className="bg-background min-h-screen">
            <Header />
            
            <main className="py-16 md:py-24 px-6 md:px-10 max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-primary-title text-accent mb-4">Our Experiences</h1>
                    <p className="text-base md:text-lg text-primary-text-color opacity-70 max-w-2xl">
                        Choose from our carefully crafted experiences or mix and match to create your own unique journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {packages.map((pkg, i) => (
                        <div key={pkg.id || i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group">
                            <div className="relative h-56 md:h-64 overflow-hidden">
                                <img src={pkg.img || forestbath} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-primary shadow-sm">
                                    ₱{Number(pkg.price).toLocaleString()}
                                </div>
                            </div>
                            
                            <div className="p-6 md:p-8">
                                <div className="flex flex-wrap items-center gap-4 mb-4 text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">
                                    <div className="flex items-center gap-1"><Clock size={14}/> {pkg.duration}</div>
                                    <div className="flex items-center gap-1"><Users size={14}/> {pkg.group}</div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-accent mb-4 leading-tight">{pkg.title}</h3>
                                <p className="text-sm text-primary-text-color opacity-70 mb-6 md:mb-8 line-clamp-2">
                                    {pkg.desc}
                                </p>
                                
                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <div className="flex text-amber-500">
                                        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor"/>)}
                                    </div>
                                    <button onClick={() => navigate('/booking')} className="bg-primary text-white px-5 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-primary/90 transition-colors">
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