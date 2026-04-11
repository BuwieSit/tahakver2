import { useState } from "react";
import { Send, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("sending");
        setTimeout(() => {
            setStatus("sent");
            e.target.reset();
        }, 1500);
    };

    return (
        <section className="py-20 px-10 max-w-4xl mx-auto">
            <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-border">
                <div className="text-center mb-10">
                    <h3 className="text-4xl font-primary-title text-accent mb-4">Have other inquiries?</h3>
                    <p className="text-primary-text-color opacity-70">We're here to help. Reach out to us with any questions.</p>
                </div>
                
                {status === "sent" ? (
                    <div className="text-center p-8 bg-emerald-50 text-emerald-700 font-bold rounded-2xl">
                        Message sent successfully! We'll be in touch soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative">
                                <User className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input required type="text" placeholder="Your Name" className="w-full p-4 pl-12 rounded-2xl bg-background border border-border outline-none focus:border-primary transition" />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input required type="email" placeholder="Your Email" className="w-full p-4 pl-12 rounded-2xl bg-background border border-border outline-none focus:border-primary transition" />
                            </div>
                        </div>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={20} />
                            <textarea required placeholder="How can we help?" rows="4" className="w-full p-4 pl-12 rounded-2xl bg-background border border-border outline-none focus:border-primary transition"></textarea>
                        </div>
                        <button type="submit" className="w-full p-4 bg-accent text-white rounded-2xl font-bold hover:bg-black transition flex items-center justify-center gap-2">
                            {status === "sending" ? "Sending..." : <><Send size={18} /> Send Message</>}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}