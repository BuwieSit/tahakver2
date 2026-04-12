import logo from '../assets/tahak_logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
    const { scrollY } = useScrollPosition();
    const isScrolled = scrollY > 50;
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const flags = {
        EN: "🇺🇸",
        UK: "🇬🇧",
        FR: "🇫🇷",
        KO: "🇰🇷",
        JA: "🇯🇵"
    };

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
            fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-in-out px-6 md:px-16
            ${isScrolled 
                ? "py-3 bg-white/90 backdrop-blur-xl shadow-lg border-b border-primary/10" 
                : "py-6 bg-transparent"}
        `}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    <div className={`relative overflow-hidden rounded-xl p-1 transition-transform group-hover:scale-110 shadow-sm ${isScrolled || !isHeroPage ? "bg-primary/20" : "bg-white/20"}`}>
                        <img src={logo} alt="TahaK Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                    </div>
                    <span className={`text-xl md:text-2xl font-primary-title font-bold tracking-tight ${textColor} drop-shadow-sm`}>
                        TahaK
                    </span>
                </Link>

                {/* Desktop Navigation Section */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-2">
                        <NavItem link={'/'} active={location.pathname === '/'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.home} />
                        <NavItem link={'/our-story'} active={location.pathname === '/our-story'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.ourStory} />
                        <NavItem link={'/packages'} active={location.pathname === '/packages'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.packages} />
                        <NavItem link={'/create'} active={location.pathname === '/create'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.create} />
                        <NavItem link={'/partners'} active={location.pathname === '/partners'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.partners} />
                        <NavItem link={'/faqs'} active={location.pathname === '/faqs'} idleClass={navItemIdleColor} activeClass={navItemActiveColor} isScrolled={isScrolled} isHeroPage={isHeroPage} label={t.faqs} />
                    </ul>
                </nav>

                {/* Language Switcher & CTA */}
                <div className="flex items-center gap-2 md:gap-4 relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all ${isScrolled || !isHeroPage ? "hover:bg-primary/10" : "hover:bg-white/10"}`}
                    >
                        <span className="text-lg md:text-xl">{flags[language]}</span>
                        <ChevronDown size={14} className={textColor} />
                    </button>

                    {isOpen && (
                        <div className="absolute top-full right-16 mt-2 bg-white rounded-xl shadow-xl p-2 min-w-[120px] z-50">
                            {Object.entries(flags).map(([key, flag]) => (
                                <button 
                                    key={key}
                                    onClick={() => { setLanguage(key); setIsOpen(false); }}
                                    className="flex items-center gap-3 w-full p-2 hover:bg-background rounded-lg text-sm font-bold text-accent"
                                >
                                    {flag} {key === "EN" ? "English" : key === "UK" ? "UK English" : key === "FR" ? "Français" : key === "KO" ? "한국어" : "日本語"}
                                </button>
                            ))}
                        </div>
                    )}

                    <Link to="/access" className="hidden sm:block">
                        <button className={`
                            px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md
                            ${isScrolled || !isHeroPage ? "bg-primary text-white hover:bg-primary/90" : "bg-white text-primary hover:bg-white/90"}
                        `}>
                            {t.signIn}
                        </button>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-lg lg:hidden transition-all ${isScrolled || !isHeroPage ? "hover:bg-primary/10" : "hover:bg-white/10"}`}
                    >
                        {isMenuOpen ? <X className={textColor} /> : <Menu className={textColor} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl animate-in slide-in-from-top duration-300 border-t border-gray-100 overflow-hidden">
                    <nav className="p-6">
                        <ul className="flex flex-col gap-1">
                            <MobileNavItem link={'/'} onClick={() => setIsMenuOpen(false)} label={t.home} active={location.pathname === '/'} />
                            <MobileNavItem link={'/our-story'} onClick={() => setIsMenuOpen(false)} label={t.ourStory} active={location.pathname === '/our-story'} />
                            <MobileNavItem link={'/packages'} onClick={() => setIsMenuOpen(false)} label={t.packages} active={location.pathname === '/packages'} />
                            <MobileNavItem link={'/create'} onClick={() => setIsMenuOpen(false)} label={t.create} active={location.pathname === '/create'} />
                            <MobileNavItem link={'/partners'} onClick={() => setIsMenuOpen(false)} label={t.partners} active={location.pathname === '/partners'} />
                            <MobileNavItem link={'/faqs'} onClick={() => setIsMenuOpen(false)} label={t.faqs} active={location.pathname === '/faqs'} />
                            <li className="mt-4 sm:hidden">
                                <Link to="/access" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20">
                                        {t.signIn}
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

export function NavItem({ link, active, idleClass, activeClass, isScrolled, isHeroPage, label }) {
    return (
        <li>
            <Link 
                to={link} 
                className={`
                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                    ${active ? activeClass : idleClass}
                `}
            >
                {label}
                {active && (
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-sm ${isScrolled || !isHeroPage ? "bg-primary" : "bg-white"}`} />
                )}
            </Link>
        </li>
    );
}

function MobileNavItem({ link, onClick, label, active }) {
    return (
        <li>
            <Link 
                to={link} 
                onClick={onClick}
                className={`
                    flex items-center w-full px-4 py-4 rounded-xl text-lg font-bold transition-all
                    ${active ? "bg-primary/10 text-primary" : "text-accent hover:bg-gray-50"}
                `}
            >
                {label}
            </Link>
        </li>
    );
}