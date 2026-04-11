import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { Plus, Minus, Check } from "lucide-react";

export default function Create() {
    const [step, setStep] = useState(1);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [guests, setGuests] = useState(1);

    const activities = [
        { id: 1, name: "Forest Bathing", price: 500, icon: "🌲" },
        { id: 2, name: "Mountain Trekking", price: 800, icon: "⛰️" },
        { id: 3, name: "Traditional Hilot", price: 1200, icon: "👐" },
        { id: 4, name: "Farm-to-Table Lunch", price: 600, icon: "🥗" },
        { id: 5, name: "Waterfalls Swim", price: 300, icon: "🌊" },
        { id: 6, name: "Tea Ritual", price: 400, icon: "🍵" },
    ];

    const toggleActivity = (id) => {
        setSelectedActivities(prev => 
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const totalPrice = selectedActivities.reduce((acc, id) => {
        const activity = activities.find(a => a.id === id);
        return acc + (activity ? activity.price : 0);
    }, 0) * guests;

    return (
        <div className="bg-background min-h-screen">
            <Header />
            
            <main className="py-24 px-10 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-primary-title text-accent mb-4">Create Your Experience</h1>
                    <p className="text-lg text-primary-text-color opacity-70">
                        Design a journey that perfectly fits your soul's needs.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border">
                    {/* Stepper Header */}
                    <div className="bg-accent text-white px-12 py-6 flex justify-between items-center">
                        <div className="flex gap-8">
                            <div className={`flex items-center gap-2 ${step >= 1 ? "opacity-100" : "opacity-40"}`}>
                                <span className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center font-bold">1</span>
                                <span className="font-medium">Activities</span>
                            </div>
                            <div className={`flex items-center gap-2 ${step >= 2 ? "opacity-100" : "opacity-40"}`}>
                                <span className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center font-bold">2</span>
                                <span className="font-medium">Guests</span>
                            </div>
                            <div className={`flex items-center gap-2 ${step >= 3 ? "opacity-100" : "opacity-40"}`}>
                                <span className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center font-bold">3</span>
                                <span className="font-medium">Summary</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold">₱{totalPrice.toLocaleString()}</div>
                    </div>

                    <div className="p-12">
                        {step === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate__animated animate__fadeIn">
                                {activities.map(activity => (
                                    <button
                                        key={activity.id}
                                        onClick={() => toggleActivity(activity.id)}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all flex justify-between items-center group
                                            ${selectedActivities.includes(activity.id) 
                                                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                                                : "border-border hover:border-primary/50"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl">{activity.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-accent">{activity.name}</h3>
                                                <p className="text-sm opacity-60">₱{activity.price} / person</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                            ${selectedActivities.includes(activity.id) 
                                                ? "bg-primary border-primary text-white" 
                                                : "border-border"}`}>
                                            {selectedActivities.includes(activity.id) && <Check size={14}/>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex flex-col items-center justify-center py-20 animate__animated animate__fadeIn">
                                <h3 className="text-2xl font-bold text-accent mb-8">How many people are coming?</h3>
                                <div className="flex items-center gap-12">
                                    <button 
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                        <Minus size={24}/>
                                    </button>
                                    <span className="text-6xl font-bold text-accent w-20 text-center">{guests}</span>
                                    <button 
                                        onClick={() => setGuests(guests + 1)}
                                        className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                        <Plus size={24}/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate__animated animate__fadeIn">
                                <h3 className="text-2xl font-bold text-accent mb-8">Package Summary</h3>
                                <div className="space-y-4 mb-12">
                                    {selectedActivities.map(id => {
                                        const activity = activities.find(a => a.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center py-4 border-b border-border">
                                                <div className="flex items-center gap-3">
                                                    <span>{activity.icon}</span>
                                                    <span className="font-medium text-accent">{activity.name}</span>
                                                </div>
                                                <span className="opacity-60">₱{activity.price} × {guests}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="flex justify-between items-center py-6 text-2xl font-bold text-accent">
                                        <span>Total Amount</span>
                                        <span className="text-primary">₱{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="bg-primary/5 p-8 rounded-3xl border-2 border-dashed border-primary/20 text-center">
                                    <p className="text-primary-text-color opacity-70 mb-2">Ready for your healing journey?</p>
                                    <button className="bg-primary text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-primary/90 transition-all shadow-lg">
                                        Confirm and Book
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mt-12 flex justify-between items-center border-t border-border pt-8">
                            {step > 1 ? (
                                <button 
                                    onClick={() => setStep(step - 1)}
                                    className="text-accent font-bold hover:underline">
                                    Back
                                </button>
                            ) : <div/>}
                            
                            {step < 3 ? (
                                <button 
                                    disabled={step === 1 && selectedActivities.length === 0}
                                    onClick={() => setStep(step + 1)}
                                    className="bg-accent text-white px-10 py-3 rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/90">
                                    Next Step
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </main>

            <ContactForm />
            <Footer />
        </div>
    );
}