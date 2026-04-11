import logo from '../assets/tahak_logo.png';
import { Link, useLocation } from 'react-router-dom';
import { CtaButton } from './Button';
import { useScrollPosition } from '../hooks/useScrollPosition';


export default function Header() {
    const { scrollY } = useScrollPosition();
    const isScrolled = scrollY > 50;
    const location = useLocation();

    return (
        <header className={`
            fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out px-8 md:px-16
            ${isScrolled 
                ? "py-3 bg-white/80 backdrop-blur-lg shadow-lg border-b border-primary/5" 
                : "py-6 bg-transparent"}
        `}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative overflow-hidden rounded-xl bg-white/10 p-1 transition-transform group-hover:scale-110">
                        <img src={logo} alt="TahaK Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <span className={`text-2xl font-primary-title font-bold tracking-tight transition-colors ${isScrolled ? "text-accent" : "text-white drop-shadow-md"}`}>
                        TahaK
                    </span>
                </Link>

                {/* Navigation Section */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-2">
                        <NavItem link={'/'} active={location.pathname === '/'} isScrolled={isScrolled}>Home</NavItem>
                        <NavItem link={'/our-story'} active={location.pathname === '/our-story'} isScrolled={isScrolled}>Our Story</NavItem>
                        <NavItem link={'/packages'} active={location.pathname === '/packages'} isScrolled={isScrolled}>Packages</NavItem>
                        <NavItem link={'/create'} active={location.pathname === '/create'} isScrolled={isScrolled}>Create</NavItem>
                        <NavItem link={'/partners'} active={location.pathname === '/partners'} isScrolled={isScrolled}>Partners</NavItem>
                        <NavItem link={'/faqs'} active={location.pathname === '/faqs'} isScrolled={isScrolled}>FAQs</NavItem>
                    </ul>
                </nav>

                {/* CTA Section */}
                <div className="flex items-center gap-4">
                    <Link to="/access">
                        <button className={`
                            px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95
                            ${isScrolled 
                                ? "bg-primary text-white shadow-md hover:bg-primary/90" 
                                : "bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30"}
                        `}>
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export function NavItem({ children, link, active, isScrolled }) {
    return (
        <li>
            <Link 
                to={link} 
                className={`
                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                    ${active 
                        ? (isScrolled ? "text-primary bg-primary/5" : "text-white bg-white/20") 
                        : (isScrolled ? "text-accent/70 hover:text-primary hover:bg-primary/5" : "text-white/80 hover:text-white hover:bg-white/10")}
                `}
            >
                {children}
                {active && (
                    <span className={`
                        absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                        ${isScrolled ? "bg-primary" : "bg-white"}
                    `} />
                )}
            </Link>
        </li>
    );
}