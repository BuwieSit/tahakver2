import { useState, cloneElement } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate } from "react-router-dom";
import { Eye, User, User2 } from "lucide-react";

export default function AccessForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [emailClick, setEmailClick] = useState(false);
    const [passwordClick, setPasswordClick] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({email: email, password: password});

        if (error) {
            alert("Login failed: " + error.message)
        }
        else {
            console.log("Logged in user: " + data.user);
            navigate('/', {replace : true});

        }

    }

    
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 aspect-square p-10 rounded-4xl bg-black/30 backdrop-blur-lg text-surface">

            <form className="p-2 w-full h-full flex flex-col gap-3 text-primary-size" onSubmit={handleLogin}>

                    <InputField 
                        icon={<User2/>}
                        type="Email" 
                        clickBehavior={emailClick}
                        onFocus={() => setEmailClick(true)}
                        onBlur={() => hasValue ? setEmailClick(true) : setEmailClick(false)}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmail(value);
                            setHasValue(value.length > 0);
                        }}
                    />
                    <InputField 
                        initialIcon={<Eye/>}
                        type="Password" 
                        clickBehavior={passwordClick}
                        onFocus={() => setPasswordClick(true)}
                        onBlur={() => hasValue ? setPasswordClick(true) : setPasswordClick(false)}
                        onChange={(e) => {
                            const value = e.target.value;
                            setPassword(value);
                            setHasValue(value.length > 0);
                        }}
                    />

                    <button className="w-full p-2 cursor-pointer bg-primary font-bold rounded text-white" type="submit">Login</button>
                </form>
        </div>
    )
}


export function InputField({ type = "Email", onChange, onBlur, onFocus, onClick, initialIcon, secondIcon, clickBehavior }) {

    const [iconClicked, setIconClicked] = useState(false);

    return (
        <div className="flex flex-col gap-3 py-5 relative">
            <label htmlFor={type.toLowerCase()} 
            className={`pointer-events-none absolute top-1/2 transition ease-in-out duration-150 m-0
            ${clickBehavior ? "left-0 -translate-y-[250%] -translate-x-0 text-white" : "left-0 translate-x-1/2 -translate-y-1/2 scale-120 text-gray-800"}`}>{type}</label>
            <input 
                autoComplete={false}
                type={type.toLowerCase()} 
                name={type.toLowerCase()}
                className="border border-accent bg-surface p-2 rounded text-primary-size text-black"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
            />
            {type.toLowerCase() === "password" ? 
                $(iconClicked ? {secondIcon} : {initialIcon}) 
            : 
                (cloneElement(initialIcon, 
                    {className: "absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2", 
                    color:"#059669"
                }))
            }
            
            
        </div>
    )
}