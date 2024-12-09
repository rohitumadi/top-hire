import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { GridBackground } from "../components/ui/GridBackground";

const AppLayout = () => {
  return (
    <GridBackground>
      <main className="min-h-screen container ">
        <Header />
        <Outlet />
      </main>
    </GridBackground>
  );
};
export default AppLayout;
