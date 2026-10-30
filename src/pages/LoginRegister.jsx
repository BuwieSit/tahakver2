import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import MainScreen from "../layouts/MainScreen";
import AccessForm from "../components/AccessForm";

export default function LandingPage() {
    const { t } = useLanguage();

    return (
        <MainScreen>
            <main className="relative flex min-h-screen items-center justify-center bg-white px-5 py-20 sm:px-8">
                <Link
                    to="/"
                    className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-primary/70 transition-all duration-300 hover:bg-background hover:text-primary sm:left-8 sm:top-8"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span>{t.home}</span>
                </Link>

                <div className="w-full animate__animated animate__fadeIn animate__faster">
                    <AccessForm />
                </div>
            </main>
        </MainScreen>
    );
}
