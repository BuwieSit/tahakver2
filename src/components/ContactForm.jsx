import { useState } from "react";

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
        <div className="bg-accent rounded-3xl p-10 text-white shadow-2xl my-16">
            <h3 className="text-3xl font-bold mb-6">Have other inquiries?</h3>
            {status === "sent" ? (
                <p className="text-emerald-400 font-bold">Message sent! We'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input required type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none" />
                        <input required type="email" placeholder="Your Email" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none" />
                    </div>
                    <textarea required placeholder="Your Message" rows="3" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none"></textarea>
                    <button type="submit" className="md:col-span-2 w-full p-4 bg-primary rounded-xl font-bold hover:bg-emerald-600 transition">
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                </form>
            )}
        </div>
    );
}