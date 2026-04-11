import logo from '../assets/tahak_logo.png';
import { Link, useLocation } from 'react-router-dom';
import { CtaButton } from './Button';
import { useScrollPosition } from '../hooks/useScrollPosition';


export default function Header() {
    const { scrollY } = useScrollPosition();
    const isScrolled = scrollY > 50;
    const location = useLocation();

    // Define pages that have a dark hero section at the top
    const isHeroPage = location.pathname === '/' || location.pathname === '/our-story';
    
    // Determine text and button colors based on scroll and page type
    const textColor = isScrolled 
        ? "text-accent" 
        : (isHeroPage ? "text-white" : "text-accent");
    
    const navItemActiveColor = isScrolled 
        ? "text-primary bg-primary/10" 
        : (isHeroPage ? "text-white bg-white/20" : "text-primary bg-primary/10");

    const navItemIdleColor = isScrolled 
        ? "text-accent hover:text-primary hover:bg-primary/5" 
        : (isHeroPage ? "text-white/80 hover:text-white hover:bg-white/10" : "text-accent hover:text-primary hover:bg-primary/5");

    return (
        <header className={`
            fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out px-8 md:px-16
            ${isScrolled 
                ? "py-3 bg-white/90 backdrop-blur-xl shadow-lg border-b border-primary/10" 
                : "py-6 bg-transparent"}
        `}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className={`relative overflow-hidden rounded-xl p-1 transition-transform group-hover:scale-110 shadow-sm ${isScrolled || !isHeroPage ? "bg-primary/20" : "bg-white/20"}`}>
                        <img src={logo} alt="TahaK Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <span className={`text-2xl font-primary-title font-bold tracking-tight ${textColor} drop-shadow-sm`}>
                        TahaK
                    </span>
                </Link>

                {/* Navigation Section */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-2">
                        <NavItem link={'/'} active={location.pathname === '/'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                        <NavItem link={'/our-story'} active={location.pathname === '/our-story'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                        <NavItem link={'/packages'} active={location.pathname === '/packages'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                        <NavItem link={'/create'} active={location.pathname === '/create'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                        <NavItem link={'/partners'} active={location.pathname === '/partners'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                        <NavItem link={'/faqs'} active={location.pathname === '/faqs'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} />
                    </ul>
                </nav>

                {/* CTA Section */}
                <div className="flex items-center gap-4">
                    <Link to="/access">
                        <button className={`
                            px-8 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md
                            ${isScrolled || !isHeroPage ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"}
                        `}>
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export function NavItem({ link, active, idleClass, activeClass, isScrolled, isHeroPage }) {
    const labelMap = {
        '/': 'Home',
        '/our-story': 'Our Story',
        '/packages': 'Packages',
        '/create': 'Create',
        '/partners': 'Partners',
        '/faqs': 'FAQs'
    };

    return (
        <li>
            <Link 
                to={link} 
                className={`
                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                    ${active ? activeClass : idleClass}
                `}
            >
                {labelMap[link]}
                {active && (
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-sm ${isScrolled || !isHeroPage ? "bg-primary" : "bg-white"}`} />
                )}
            </Link>
        </li>
    );
}