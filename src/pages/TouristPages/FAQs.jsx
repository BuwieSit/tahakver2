import Header from "../../components/Header";

export default function FAQs() {
    const faqs = [
        { q: "What should I bring for a mountain trek?", a: "We recommend comfortable hiking boots, a reusable water bottle, sun protection, and a light rain jacket." },
        { q: "Are the experiences suitable for children?", a: "Most of our experiences are family-friendly, but some treks have age restrictions. Please check the package details." },
        { q: "How do I cancel or reschedule my booking?", a: "You can manage your bookings through your profile or contact our support team at least 48 hours in advance." },
        { q: "Is transportation provided?", a: "Yes, we provide shuttle services from designated pick-up points for most of our packages." },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 px-10 max-w-4xl mx-auto">
                <h1 className="text-5xl font-primary-title text-accent text-center mb-12">Frequently Asked Questions</h1>
                
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
                            <h3 className="text-xl font-bold text-accent mb-2">{faq.q}</h3>
                            <p className="text-primary-text-color">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}