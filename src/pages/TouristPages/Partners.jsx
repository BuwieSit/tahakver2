import Header from "../../components/Header";
import Footer from "../../components/Footer";
import KALIPI_IMG from "../../assets/KALIPI.jpg";
import LABB_IMG from "../../assets/LABB.jpg";
import PEACENATURE_IMG from "../../assets/peace_in_nature.jpg";
import BANAHAW_IMG from "../../assets/banahaw_circle.avif";

export default function Partners() {
    const operations = [
        {
            name: "Peace in Nature Farm Resort",
            desc: "Provides private swimming pools, farms, and naturally grown local fruits for our wellness experiences, offering the physical space needed for our activities.",
            img: PEACENATURE_IMG
        },
        {
            name: "Banahaw Circle Nature Retreat",
            desc: "Located in Dolores, Quezon, this retreat serves as our pilot site and sanctuary, offering a peaceful, nature-integrated environment for our wellness programs.",
            img: BANAHAW_IMG
        }
    ];

    const ngos = [
        {
            name: "LABB (Luntiang Alyansa para sa Bundok Banahaw)",
            desc: "An NGO dedicated to protecting and restoring the biodiversity of Mount Banahaw, committed to ecological preservation and spiritual stewardship.",
            img: LABB_IMG
        },
        {
            name: "KALIPI (Kalipunan ng Liping Pilipina)",
            desc: "A local women’s organization committed to empowerment, livelihood, and sustainable development within the community.",
            img: KALIPI_IMG
        }
    ];

    const PartnerCard = ({ partner }) => (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center">
            <img src={partner.img} alt={partner.name} className="w-48 h-48 object-contain rounded-full mb-6 border-4 border-primary/20 bg-gray-50" />
            <h3 className="text-2xl font-bold text-accent mb-4">{partner.name}</h3>
            <p className="text-primary-text-color">{partner.desc}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 px-10 max-w-7xl mx-auto mb-20">
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-primary-title text-accent mb-4">Our Partners</h1>
                    <p className="text-lg text-primary-text-color font-primary-text max-w-2xl mx-auto">
                        We collaborate with local communities and eco-friendly organizations to ensure your experience is authentic and sustainable.
                    </p>
                </section>
                
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-accent mb-10 text-center">Operations & Ecotourism Sites</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {operations.map((p, i) => <PartnerCard key={i} partner={p} />)}
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-accent mb-10 text-center">NGOs & Community Partners</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {ngos.map((p, i) => <PartnerCard key={i} partner={p} />)}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}