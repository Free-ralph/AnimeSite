function Right() {

  return (
    <div className="hidden lg:block h-full w-[30%] bg-primary fixed top-0 right-0 -z-10 isolate">
      <div className="w-full h-full relative">
        {/* Hisoka SVG */}

        <div className="w-full opacity-90 absolute bottom-0 overflow-hidden">
          <img
            src="static/assets/Hisoka3.svg"
            className="object-contain object-center h-fit w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Right;
