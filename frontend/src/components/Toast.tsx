import { useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../context/StateContextProvider";

type ToastProps = {
  duration?: number;
};
export default function Toast({ duration = 3000 }: ToastProps) {
  const { state, closeToast } = useStateContext();
  useEffect(() => {
    if (state.showToast) {
      const timeout = setTimeout(() => {
        closeToast();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [state.showToast]);
  const style =
    state.toastTheme === "success"
      ? "border-green-500 text-gray-700 bg-secondary"
      : "border-red-500 text-secondary bg-primary";
  const icon =
    state.toastTheme === "success" ? (
      <CheckCircleOutlineIcon className="scale-[0.7]" />
    ) : (
      <ErrorOutlineIcon className="scale-[0.7]" />
    );
  return (
    <AnimatePresence>
      {state.showToast && (
        <motion.div
          className="fixed w-full flex justify-center bottom-0 md:top-0 z-50"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div
            className={` w-full md:w-[22rem] h-[7vh] flex justify-center items-center border-2 ${style}`}
          >
            <p className="text-lg font-semibold text-center">
              {icon}
              {state.toastText}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
