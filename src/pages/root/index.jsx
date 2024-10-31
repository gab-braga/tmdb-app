import "./style.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Background from "../../assets/backgropund-krists-luhaers-unsplash.png";

export default () => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div style={{ backgroundImage: `url(${Background})` }} className="bg-root hidden dark:block w-full h-[50vh] bg-center bg-no-repeat bg-cover absolute top-0 left-0 -z-10">
                <div className="w-full h-full dark:bg-home-gradient-dark"></div>
            </div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}