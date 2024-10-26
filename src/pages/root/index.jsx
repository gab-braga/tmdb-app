import "./style.css";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default () => {
    return (
        <div className="w-100 min-h-screen flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}