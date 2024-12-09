import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { GridBackground } from "../components/ui/GridBackground";
import { BackgroundLines } from "@/components/ui/background-lines";

const AppLayout = () => {
  return (
    <GridBackground>
      <BackgroundLines className="flex items-center   justify-center w-full flex-col px-4">
        <main className="min-h-screen container ">
          <Header />
          <Outlet />
        </main>
      </BackgroundLines>
    </GridBackground>
  );
};
export default AppLayout;
