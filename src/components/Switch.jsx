
export default function Switch({ onActive }) {
    return (
        <>
            <div className="flex w-1/2 text-[1.2rem] border-gray border rounded-4xl overflow-hidden font-bold">
                <button value={"register"} className={`w-1/2 cursor-pointer bg-primary p-3`}>
                    Register
                </button>
                <button value={"login"} className="w-1/2 cursor-pointer">
                    Login
                </button>
            </div>
        </>
    )
}