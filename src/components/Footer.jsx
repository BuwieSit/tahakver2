import logo from '../assets/tahak_logo.png';
import { Link } from 'react-router-dom';
import fbIcon from '../assets/fb_icon.png';
import emailIcon from '../assets/email_icon.png';
import igIcon from '../assets/ig_icon.png';

export default function Footer() {
    return (
        <footer className="bg-accent text-white py-12 md:py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                    <div className="flex flex-col gap-4">
                        <img src={logo} alt="Tahak Logo" className="w-20" />
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
                            <li><Link to="/our-team" className="hover:underline">Our Team</Link></li>
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
                        <h4 className="font-bold mb-4">Contacts</h4>
                        <ul className="space-y-3 text-sm opacity-80">
                            <li>
                                <a href="mailto:tahak.kalikasan@gmail.com" className="hover:underline flex items-center gap-2">
                                    <img src={emailIcon} alt="Email" className="w-4 h-4" />
                                    <span>tahak.kalikasan@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=61578753895819" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2">
                                    <img src={fbIcon} alt="Facebook" className="w-4 h-4" />
                                    <span>TahaK</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-50">
                <p>&copy; {new Date().getFullYear()} Tahak Tourism. All rights reserved.</p>
            </div>
        </footer>
    );
}