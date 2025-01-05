import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <main className=" min-h-screen font-roboto    ">
      <Toaster position="top-center" />
      <Header />
      <Outlet />
    </main>
  );
};
export default AppLayout;
