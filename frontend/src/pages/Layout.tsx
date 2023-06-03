import { useRef } from "react";
import Right from "../components/Right";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import MusicPlayer from "../components/musicPlayer/MusicPlayer";
import { Outlet, useOutletContext } from "react-router-dom";

const Layout = () => {
  const containerDIVRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="w-full h-full overflow-auto overflow-x-hidden"
      ref={containerDIVRef}
    >
      <div className="h-screen w-full relative">
        <Toast />
        <Navbar />
        {/* light shade on the left of the screen */}
        <div className="w-[1rem] bg-[#100e0131] h-screen fixed top-0 left-0 hidden md:block"></div>
        <MusicPlayer />
        <div className="w-full h-full">
          <Outlet context={ containerDIVRef } />
          <Right />
        </div>
      </div>
    </div>
  );
};

export const useContainerRef = () => {
  return useOutletContext<React.RefObject<HTMLDivElement>>();
};
export default Layout;
