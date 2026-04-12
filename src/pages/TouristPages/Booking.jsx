import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Mail, Phone, User } from "lucide-react";
import { useUnsavedChanges } from "../../hooks/useUnsavedChanges";

export default function Booking() {
    const [formData, setFormData] = useState({ 
        fullName: "", email: "", phone: "", date: "", guests: "2", requests: "" 
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10 text-center">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border max-w-lg w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Request Received!</h2>
                    <p className="text-sm md:text-base text-primary-text-color mb-8 opacity-80">Thank you for choosing Tahak. Our team will review your details and send a personalized quote to your email within 24 hours.</p>
                    <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 md:px-10 max-w-6xl mx-auto">
                {error && <p className="text-red-500 text-center mb-6 bg-red-100 p-3 rounded-xl text-sm">{error}</p>}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
                    {/* Summary Side */}
                    <div className="bg-accent text-white p-6 md:p-10 rounded-3xl shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-primary-title mb-6">Start your journey</h2>
                        <p className="text-sm md:text-base opacity-80 mb-8">Fill out the form to receive a customized itinerary and price quote for your chosen experience.</p>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-white/10 rounded-xl">
                                <Calendar className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm md:text-base">Flexible Planning</p>
                                    <p className="text-xs md:text-sm opacity-70">Adjust your dates based on availability.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-white/10 rounded-xl">
                                <Users className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm md:text-base">Group Customization</p>
                                    <p className="text-xs md:text-sm opacity-70">Tailored packages for any group size.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-border space-y-6">
                        <h3 className="text-xl md:text-2xl font-bold text-accent mb-6">Contact & Booking Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <InputField label="Full Name" icon={<User size={18} />} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                            <InputField label="Email Address" type="email" icon={<Mail size={18} />} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            <InputField label="Phone Number" type="tel" icon={<Phone size={18} />} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                            <div>
                                <label className="block text-xs md:text-sm font-bold text-accent mb-2">Number of Guests</label>
                                <select className="w-full p-4 border border-border rounded-xl bg-background text-sm md:text-base" onChange={(e) => setFormData({...formData, guests: e.target.value})}>
                                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Guests</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-accent mb-2">Travel Date</label>
                            <input type="date" className="w-full p-4 border border-border rounded-xl text-sm md:text-base" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-accent mb-2">Special Requests</label>
                            <textarea rows="4" className="w-full p-4 border border-border rounded-xl text-sm md:text-base" placeholder="Dietary restrictions, special occasions, etc." onChange={(e) => setFormData({...formData, requests: e.target.value})} />
                        </div>
                        <button type="submit" disabled={loading} className="w-full p-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition text-sm md:text-base">
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
                <input type={type} className="w-full p-4 pl-12 border border-border rounded-xl" placeholder={label} onChange={onChange} />
                <div className="absolute left-4 top-4.5 text-gray-400">{icon}</div>
            </div>
        </div>
    );
}