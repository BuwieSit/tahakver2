import logo from '../assets/tahak_logo.png';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

export default function Footer() {
    return (
        <footer className="bg-accent text-white py-12 px-10">
            <div className="max-w-7xl mx-auto">
                <ContactForm />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">
                    <div className="flex flex-col gap-4">
                        <img src={logo} alt="Tahak Logo" className="w-20 invert grayscale brightness-200" />
                        <p className="text-sm opacity-80">
                            Experience the healing power of nature. Tahak is your gateway to the most authentic and sustainable tourism experiences.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/our-story" className="hover:underline">Our Story</Link></li>
                            <li><Link to="/packages" className="hover:underline">Packages</Link></li>
                            <li><Link to="/partners" className="hover:underline">Partners</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
                            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">FB</div>
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">IG</div>
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">TW</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-50">
                <p>&copy; {new Date().getFullYear()} Tahak Tourism. All rights reserved.</p>
            </div>
        </footer>
    );
}