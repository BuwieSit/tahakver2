import logo from '../assets/tahak_logo.png';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center">
            <div className="relative">
                {/* Decorative pulses */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150"></div>
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse scale-125"></div>
                
                {/* Logo */}
                <div className="relative bg-white p-6 rounded-full shadow-2xl border-4 border-primary/10">
                    <img 
                        src={logo} 
                        alt="TahaK Logo" 
                        className="w-24 h-24 object-contain animate-pulse"
                    />
                </div>
            </div>
            
            <div className="mt-12 flex flex-col items-center gap-4">
                <h2 className="text-3xl font-primary-title text-accent italic tracking-widest animate-pulse">
                    TahaK
                </h2>
                <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]"></div>
                </div>
                <p className="text-sm font-primary-text text-primary font-bold uppercase tracking-[0.3em] opacity-60">
                    Finding your way home
                </p>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); width: 30%; }
                    50% { width: 60%; }
                    100% { transform: translateX(250%); width: 30%; }
                }
            `}} />
        </div>
    );
}