import MainScreen from "../layouts/MainScreen"
import bg from "../assets/sta_lucia.jpg";
import AccessForm from "../components/AccessForm";

export default function LandingPage() {

    return(
        <MainScreen>
            <div className="flex justify-center items-center w-full min-h-screen bg-black relative p-4">
                <img src={bg} className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"/>
                <div className="relative z-10 w-full flex justify-center items-center">
                    <AccessForm/>
                </div>
            </div>
        </MainScreen>
    )
}