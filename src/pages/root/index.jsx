import "./style.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="hidden dark:block w-full h-[50vh] bg-home-image bg-center bg-no-repeat bg-cover absolute top-0 left-0 -z-10">
                <div className="w-full h-full dark:bg-home-gradient-dark"></div>
            </div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}