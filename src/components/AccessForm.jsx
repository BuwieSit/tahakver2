import { useState } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Leaf } from "lucide-react";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

export default function AccessForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", fullName: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const isDirty = formData.email !== "" || formData.password !== "" || formData.fullName !== "";
    useUnsavedChanges(isDirty, loading);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
// ... rest of component
    const validate = () => {
        if (!formData.email.includes("@")) return "Invalid email address.";
        if (formData.password.length < 6) return "Password must be at least 6 characters.";
        if (isSignUp && formData.password !== formData.confirmPassword) return "Passwords do not match.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) { setError(validationError); return; }

        setLoading(true);
        setError("");

        // Check for hardcoded admin account
        if (!isSignUp && formData.email === "admin@tahak.com" && formData.password === "admin123") {
            setLoading(false);
            navigate('/admin');
            return;
        }

        const { error: authError } = isSignUp 
            ? await supabase.auth.signUp({ email: formData.email, password: formData.password, options: { data: { full_name: formData.fullName } } })
            : await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });

        if (authError) setError(authError.message);
        else navigate('/');
        setLoading(false);
    };

    return (
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-white p-6 text-primary-text-color shadow-sm sm:p-8 md:p-10">
            <div className="mb-6 flex items-center justify-center gap-2 text-primary">
                <Leaf size={18} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">TahaK</span>
            </div>
            <div className="mb-7 grid grid-cols-2 rounded-2xl bg-background p-1.5" role="tablist" aria-label={isSignUp ? "Sign Up" : "Login"}>
                <button type="button" role="tab" aria-selected={!isSignUp} onClick={() => { setIsSignUp(false); setError(""); }} className={`rounded-xl px-3 py-3 text-sm font-bold transition-all ${!isSignUp ? "bg-white text-primary shadow-sm" : "text-primary-text-color/60 hover:text-accent"}`}>
                    Login
                </button>
                <button type="button" role="tab" aria-selected={isSignUp} onClick={() => { setIsSignUp(true); setError(""); }} className={`rounded-xl px-3 py-3 text-sm font-bold transition-all ${isSignUp ? "bg-white text-primary shadow-sm" : "text-primary-text-color/60 hover:text-accent"}`}>
                    Sign Up
                </button>
            </div>
            <div id="access-form-panel" role="tabpanel" key={isSignUp ? "signup" : "login"} className="animate__animated animate__fadeInUp animate__faster motion-reduce:animate-none">
                <h2 className="mb-7 text-center font-primary-title text-2xl text-accent md:text-3xl">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">{error}</p>}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} icon={<User size={18} />} />
                    )}
                    <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} icon={<Mail size={18} />} />
                    <InputField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        icon={showPassword ? <EyeOff size={18} onClick={() => setShowPassword(false)} className="cursor-pointer" /> : <Eye size={18} onClick={() => setShowPassword(true)} className="cursor-pointer" />}
                    />
                    {isSignUp && (
                        <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} icon={<Lock size={18} />} />
                    )}
                    <button disabled={loading} className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary p-4 font-bold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-accent hover:shadow-md active:scale-[0.98] disabled:opacity-50" type="submit">
                        {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
                    </button>
                </form>
            </div>
        </div>
    );
}

function InputField({ label, name, type = "text", value, onChange, icon }) {
    return (
        <div className="relative group">
            <input 
                required
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={label}
                className="w-full rounded-2xl border border-border bg-white p-4 pl-12 text-primary-text-color outline-none transition-all duration-300 placeholder:text-primary-text-color/40 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
            />
            <div className="absolute left-4 top-4.5 text-primary/60 transition-colors group-focus-within:text-primary">{icon}</div>
        </div>
    );
}
