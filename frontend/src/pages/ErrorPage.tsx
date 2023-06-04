import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div className="h-screen w-full flex md:flex-col items-start justify-center relative">
      <div className="absolute right-0 top-0 md:top-[unset] md:h-full w-[30%] md:w-[60%] overflow-hidden">
        <img
          src="static/assets/Gojo.svg"
          alt="gojo"
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="w-[95%] md:w-[40%] flex bg-primary text-secondary font-bold text-3xl flex-col rounded-3xl md:rounded-full p-5 items-center text-center">
        <p className="text-6xl">{error.status }</p>
        <p>Nandaayooo !!!</p>
        <p>You're not suppose to be here, an error must've occured</p>
      </div>
    </div>
  );
}
