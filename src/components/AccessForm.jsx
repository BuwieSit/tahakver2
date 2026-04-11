import { useState } from "react";
import { supabase } from "../supaBaseClient";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

export default function AccessForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", fullName: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const isDirty = formData.email !== "" || formData.password !== "" || formData.fullName !== "";
    useUnsavedChanges(isDirty);

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
        const { error: authError } = isSignUp 
            ? await supabase.auth.signUp({ email: formData.email, password: formData.password, options: { data: { full_name: formData.fullName } } })
            : await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });

        if (authError) setError(authError.message);
        else navigate('/');
        setLoading(false);
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 rounded-3xl bg-black/60 backdrop-blur-2xl text-white shadow-2xl border border-white/10">
            <h2 className="text-3xl font-semibold mb-6 text-center">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-950/50 p-2 rounded">{error}</p>}
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
                <button disabled={loading} className="w-full p-3.5 mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition font-bold rounded-xl flex items-center justify-center gap-2" type="submit">
                    {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-300">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <span className="text-emerald-400 cursor-pointer hover:underline font-semibold" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Login" : "Sign Up"}
                </span>
            </p>
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
                className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-emerald-500 focus:bg-white/10 transition-all placeholder:text-gray-500"
            />
            <div className="absolute left-4 top-4.5 text-gray-500 group-focus-within:text-emerald-500 transition-colors">{icon}</div>
        </div>
    );
}