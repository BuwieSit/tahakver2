import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20 px-10 max-w-4xl mx-auto">
                <h1 className="text-5xl font-primary-title text-accent mb-10">Privacy Policy</h1>
                <div className="prose prose-lg text-primary-text-color">
                    <p className="mb-4">At Tahak, we respect your privacy and are committed to protecting your personal information.</p>
                    <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Information We Collect</h2>
                    <p className="mb-4">We collect information you provide directly, such as your name, email, and booking details when you request a quote or sign up.</p>
                    <h2 className="text-2xl font-bold text-accent mt-8 mb-4">How We Use Your Information</h2>
                    <p className="mb-4">We use your data to process your bookings, send you quotes, and improve our services.</p>
                    <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Data Protection</h2>
                    <p>We implement security measures to ensure your data is safe and never shared with unauthorized third parties.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}