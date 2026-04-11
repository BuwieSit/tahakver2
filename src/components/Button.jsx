
export function CtaButton({ children, onClick, className }) {
    return (
         <button 
            onClick={onClick}
            className={`p-3 bg-primary text-primary-size font-bold text-surface rounded-sm cursor-pointer shadow-accent shadow-[0px_2px_2px] transition ease-in-out hover:scale-105 ${className || ''}`}
        >
            {children}
        </button>
    )
}