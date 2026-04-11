import MainScreen from "../layouts/MainScreen"
import bg from "../assets/sta_lucia.jpg";
import AccessForm from "../components/AccessForm";
import { useEffect, useState } from "react";
import { supabase } from "../supaBaseClient";

export default function LandingPage() {

    return(
        <MainScreen>
            <div className="flex justify-center items-center w-full h-screen bg-black">
                <img src={bg} className="w-full h-full object-cover opacity-50"/>
                <AccessForm/>
            </div>
        </MainScreen>
    )
}