import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { GridBackground } from "../components/ui/GridBackground";

const AppLayout = () => {
  return (
    <GridBackground>
      <main className="min-h-screen font-roboto container flex flex-col  ">
        <Header />
        <Outlet />
      </main>
    </GridBackground>
  );
};
export default AppLayout;
