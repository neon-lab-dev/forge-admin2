import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="px-4 md:px-5 xl:px-0">
            <Outlet/>
        </div>
    );
};

export default Layout;