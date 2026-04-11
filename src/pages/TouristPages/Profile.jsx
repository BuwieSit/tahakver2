import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { Leaf, Award, Target, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Profile() {
    // Mock user data
    const user = { name: "Buhawie Santos", email: "buwie@example.com", seeds: 1250 };
    
    const contributionData = [
        { month: 'Jan', seeds: 150 },
        { month: 'Feb', seeds: 300 },
        { month: 'Mar', seeds: 200 },
        { month: 'Apr', seeds: 450 },
        { month: 'May', seeds: 600 },
        { month: 'Jun', seeds: 350 },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20 px-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* User Profile Sidebar */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-border h-fit">
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-6">
                            {user.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-bold text-accent">{user.name}</h2>
                        <p className="text-primary-text-color opacity-70 mb-6">{user.email}</p>
                        <button className="w-full py-3 bg-background rounded-xl font-bold hover:bg-border transition">Edit Profile</button>
                    </div>

                    {/* Dashboard Content */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Seed Stats & Chart */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold text-accent flex items-center gap-3">
                                    <Leaf className="text-primary" /> Your Seed Balance
                                </h3>
                                <div className="text-4xl font-bold text-primary">{user.seeds}</div>
                            </div>
                            
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={contributionData}>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip cursor={{fill: 'transparent'}} />
                                        <Bar dataKey="seeds" radius={[10, 10, 0, 0]}>
                                            {contributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === contributionData.length - 1 ? '#059669' : '#10b981'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Impact Section */}
                        <div className="bg-accent text-white p-8 rounded-3xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Target className="text-primary" /> Your Impact
                            </h3>
                            <p className="opacity-80 mb-6 leading-relaxed">
                                Every interaction you make earns digital seeds. These seeds power your discounts on wellness experiences while simultaneously donating 100% of ad revenue to the <strong className="text-primary">Luntiang Alyansa para sa Bundok Banahaw (LABB)</strong>, an NGO restoring the biodiversity of Mount Banahaw.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-4 bg-white/10 rounded-xl flex-1 text-center">
                                    <Zap size={24} className="mx-auto mb-2 text-primary" />
                                    <p className="text-sm">Seed conversion ready</p>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl flex-1 text-center">
                                    <Award size={24} className="mx-auto mb-2 text-primary" />
                                    <p className="text-sm">Active Supporter</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
}