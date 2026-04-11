import Header from "../../components/Header";

export default function Partners() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 px-10 max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-primary-title text-accent mb-4">Our Partners</h1>
                    <p className="text-lg text-primary-text-color font-primary-text max-w-2xl mx-auto">
                        We collaborate with local communities and eco-friendly organizations to ensure your experience is authentic and sustainable.
                    </p>
                </section>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Placeholder for partner cards */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center">
                            <div className="w-24 h-24 bg-primary/10 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-primary font-bold">Logo {i}</span>
                            </div>
                            <h3 className="text-xl font-bold text-accent">Partner Name {i}</h3>
                            <p className="text-center text-sm mt-2">Brief description of the partnership and its impact.</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}