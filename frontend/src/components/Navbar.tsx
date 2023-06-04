import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const NavVariant = {
  initial: { height: 0 },
  animate: {
    height: "13rem",
    transition: { when: "beforeChildren", delayChildren: 0.2 },
  },
  exit: {
    height: 0,
    transition: { when: "afterChildren", delayChildren: 0.2 },
  },
};

const NavChildVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function Navbar() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);
  const activeStyle =
    "border-b-8 py-1 px-4 bg-primary  border-gray-800 text-secondary";
  const inActiveStyle =
    "py-1 px-4 bg-primary text-secondary border-gray-800 opacity-95 hover:opacity-100";
  const isNewsPage = location.pathname === "/news";
  return (
    <div className="h-[8vh] w-screen flex items-center justify-center">
      <div className=" gap-[0.1rem] mt-3 hidden md:flex">
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          to={"/"}
        >
          Discover
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          to={"/news"}
        >
          News
        </NavLink>
      </div>
      {/* These are fixed */}
      <Link
        to={"/"}
        className="pl-5 lg:pl-20 flex justify-start items-center fixed top-3 left-0 z-50"
      >
        <motion.div
          className="bg-primary  px-3 py-2 text-secondary font-bold border border-secondary"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Bankai-News
        </motion.div>
      </Link>
      <div className="pr-5 lg:pr-20 flex justify-end items-center fixed top-3 right-0 z-50">
        <motion.div
          className="bg-primary lg:bg-secondary px-3 py-2 text-secondary lg:text-primary font-bold border border-secondary"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="http://okosa.pythonanywhere.com/"
            target="blank"
            className="hidden md:inline-block"
          >
            About Me
          </a>
          <span className="md:hidden" onClick={() => setShowNav(!showNav)}>
            {showNav ? <CloseIcon /> : <MenuIcon />}
          </span>
        </motion.div>
      </div>
      <AnimatePresence>
        {showNav && (
          <motion.div
            variants={NavVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="border border-secondary fixed top-[3.4rem] bg-primary w-full text-secondary md:hidden z-[25]"
          >
            <motion.div
              variants={NavChildVariant}
              className="w-full h-full flex flex-col items-center justify-between font-semibold text-lg p-3"
            >
              <div className="flex flex-col gap-2 items-center">
                {isNewsPage ? (
                  <NavLink to={"/"} onClick={() => setShowNav(false)}>
                    Discover
                  </NavLink>
                ) : (
                  <NavLink to={"/news"} onClick={() => setShowNav(false)}>
                    News
                  </NavLink>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div
                  onClick={() => setShowNav(false)}
                  className="border border-secondary py-2 px-5"
                >
                  <GitHubIcon /> GitHub
                </div>
                <a
                  href="http://okosa.pythonanywhere.com/"
                  target="blank"
                  onClick={() => setShowNav(false)}
                  className="border border-secondary py-2 px-5"
                >
                  About Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
