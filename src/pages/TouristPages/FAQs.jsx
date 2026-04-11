import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FAQs() {
    const faqs = [
        { q: "What should I bring for a mountain trek?", a: "We recommend comfortable hiking boots, a reusable water bottle, sun protection, and a light rain jacket." },
        { q: "Are the experiences suitable for children?", a: "Most of our experiences are family-friendly, but some treks have age restrictions. Please check the package details." },
        { q: "How do I cancel or reschedule my booking?", a: "You can manage your bookings through your profile or contact our support team at least 48 hours in advance." },
        { q: "Is transportation provided?", a: "Yes, we provide shuttle services from designated pick-up points for most of our packages." },
        { q: "What payment methods do you accept?", a: "We accept GCash, bank transfers, and major credit cards via our secure booking portal." },
        { q: "Are the trails accessible for beginners?", a: "Yes, we offer a range of trails, from gentle forest paths to more challenging mountain treks, suitable for all skill levels." },
        { q: "What if it rains during the scheduled trek?", a: "Safety is our priority. In case of severe weather, we will offer to reschedule your booking or provide a full refund." },
        { q: "Can I bring my pet?", a: "While we love animals, most of our eco-sites prohibit pets to protect the local wildlife. Please check with us for specific exceptions." }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20 px-10 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-primary-title text-accent mb-4">Frequently Asked Questions</h1>
                    <p className="text-primary-text-color opacity-70">Find quick answers to common questions about your Tahak experience.</p>
                </div>
                
                <div className="grid gap-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-border transition hover:shadow-md">
                            <h3 className="text-xl font-bold text-accent mb-3 flex items-start">
                                <span className="text-primary mr-3 text-2xl">Q.</span> 
                                {faq.q}
                            </h3>
                            <p className="text-primary-text-color pl-9">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}