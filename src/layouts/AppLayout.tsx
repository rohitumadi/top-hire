import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

import { GridBackground } from "../components/ui/GridBackground";

const AppLayout = () => {
  return (
    <GridBackground>
      <main className="min-h-screen font-roboto container flex flex-col  ">
        <Toaster position="top-center" />
        <Header />
        <Outlet />
      </main>
    </GridBackground>
  );
};
export default AppLayout;
