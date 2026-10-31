import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Users, Mail, Phone, User, CheckCircle2, ArrowLeft } from "lucide-react";
import { useUnsavedChanges } from "../../hooks/useUnsavedChanges";
import { useData } from "../../contexts/DataContext";

export default function Booking() {
    const navigate = useNavigate();
    const location = useLocation();
    const { packages } = useData();

    // Check for selected package passed via router state or query param
    const selectedPackage = location.state?.selectedPackage || (() => {
        const params = new URLSearchParams(location.search);
        const pkgId = params.get('package');
        return pkgId ? packages.find(p => String(p.id) === String(pkgId)) : null;
    })();

    const [formData, setFormData] = useState({ 
        fullName: "", email: "", phone: "", date: "", guests: "2", requests: "" 
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Block navigation only if not submitted and form is dirty
    const isDirty = !submitted && (formData.fullName !== "" || formData.email !== "" || formData.phone !== "" || formData.requests !== "");
    useUnsavedChanges(isDirty);

    const validate = () => {
        if (!formData.fullName || formData.fullName.length < 3) return "Please enter a valid full name.";
        if (!formData.email.includes("@")) return "Please enter a valid email address.";
        if (!formData.phone || formData.phone.length < 7) return "Please enter a valid phone number.";
        if (!formData.date) return "Please select a travel date.";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) { setError(validationError); return; }

        setLoading(true);
        setError("");
        
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10 text-center font-primary-text">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border max-w-lg w-full">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-primary-title text-accent mb-3">Request Received!</h2>
                    {selectedPackage && (
                        <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-accent font-semibold">
                            Booking inquiry for: <span className="font-bold text-primary">{selectedPackage.title}</span>
                        </div>
                    )}
                    <p className="text-sm md:text-base text-primary-text-color mb-8 opacity-80 leading-relaxed">
                        Thank you for choosing Tahak. Our Dolores coordination team will review your travel details and send a personalized itinerary and quote to your email within 24 hours.
                    </p>
                    <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md cursor-pointer">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-primary-text">
            <Header />
            <main className="pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-10 max-w-6xl mx-auto">
                {error && <p className="text-red-500 text-center mb-6 bg-red-100 p-3 rounded-xl text-sm font-medium">{error}</p>}
                
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
                    {/* Summary Side */}
                    <div className="bg-accent text-white p-6 md:p-10 rounded-3xl shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-primary-title mb-4">Start your journey</h2>
                        <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed">
                            Fill out the form to receive a customized itinerary and price quote for your chosen wellness experience.
                        </p>

                        {/* Selected Package Badge & Info */}
                        {selectedPackage && (
                            <div className="mb-6 p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-300 bg-white/15 px-2.5 py-0.5 rounded-full">
                                        Selected Experience
                                    </span>
                                    <span className="font-bold text-base text-emerald-300">
                                        ₱{Number(selectedPackage.price).toLocaleString()} <span className="text-xs font-normal opacity-75">/ person</span>
                                    </span>
                                </div>
                                <h3 className="font-primary-title text-xl font-bold text-white mb-1.5">{selectedPackage.title}</h3>
                                <p className="text-xs opacity-75 mb-3">{selectedPackage.duration} • {selectedPackage.group}</p>
                                <button 
                                    type="button" 
                                    onClick={() => navigate('/packages')}
                                    className="text-xs text-emerald-200 hover:text-white underline font-medium inline-flex items-center gap-1 cursor-pointer"
                                >
                                    <ArrowLeft size={12} />
                                    <span>Choose a different package</span>
                                </button>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-white/10 rounded-xl">
                                <Calendar className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm md:text-base">Flexible Planning</p>
                                    <p className="text-xs md:text-sm opacity-70">Adjust your dates based on availability and weather.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-white/10 rounded-xl">
                                <Users className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm md:text-base">Group Customization</p>
                                    <p className="text-xs md:text-sm opacity-70">Tailored packages and group pricing for any party size.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-border space-y-6">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-accent mb-1">Contact & Booking Details</h3>
                            {selectedPackage ? (
                                <p className="text-xs text-primary font-semibold">
                                    Reserving: <span className="font-bold">{selectedPackage.title}</span>
                                </p>
                            ) : (
                                <p className="text-xs text-primary-text-color/60">
                                    No package selected? You can also request a general inquiry or custom retreat.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <InputField label="Full Name" icon={<User size={18} />} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                            <InputField label="Email Address" type="email" icon={<Mail size={18} />} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            <InputField label="Phone Number" type="tel" icon={<Phone size={18} />} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                            <div>
                                <label className="block text-xs md:text-sm font-bold text-accent mb-2">Number of Guests</label>
                                <select className="w-full p-4 border border-border rounded-xl bg-background text-sm md:text-base cursor-pointer" onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-accent mb-2">Travel Date</label>
                            <input type="date" className="w-full p-4 border border-border rounded-xl text-sm md:text-base cursor-pointer" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-accent mb-2">Special Requests & Preferences</label>
                            <textarea 
                                rows="4" 
                                className="w-full p-4 border border-border rounded-xl text-sm md:text-base" 
                                placeholder={selectedPackage ? `Dietary restrictions, preferred arrival time for ${selectedPackage.title}, etc.` : "Dietary restrictions, special occasions, activity preferences, etc."} 
                                onChange={(e) => setFormData({...formData, requests: e.target.value})} 
                            />
                        </div>
                        <button type="submit" disabled={loading} className="w-full p-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition text-sm md:text-base shadow-md cursor-pointer disabled:opacity-50">
                            {loading ? "Sending Request..." : "Request a Quote"}
                        </button>
                    </form>
                </div>
            </main>
            <ContactForm />
            <Footer />
        </div>
    );
}

function InputField({ label, type = "text", icon, onChange }) {
    return (
        <div>
            <label className="block text-sm font-bold text-accent mb-2">{label}</label>
            <div className="relative">
                <input type={type} className="w-full p-4 pl-12 border border-border rounded-xl text-sm md:text-base" placeholder={label} onChange={onChange} />
                <div className="absolute left-4 top-4.5 text-gray-400">{icon}</div>
            </div>
        </div>
    );
}
