import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-wrap-balancer";

export const Layout = () => {
  return (
    <Provider>
      <div className="relative flex min-h-screen flex-col gap-4 bg-slate-50 text-slate-900">
        <Navbar />
        <div className="flex justify-center p-4 md:p-8">
          <div className="w-full max-w-screen-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
};
