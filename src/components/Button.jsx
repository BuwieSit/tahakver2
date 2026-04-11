
export function CtaButton({ children }) {
    return (
         <button className='p-3 bg-primary text-primary-size font-bold text-surface rounded-sm cursor-pointer shadow-accent shadow-[0px_2px_2px] transition ease-in-out hover:scale-105'>
            {children}
        </button>
    )
}