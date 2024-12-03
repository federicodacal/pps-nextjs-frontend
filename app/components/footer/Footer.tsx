import {
  BsInstagram,
  BsXCircle,
  BsTiktok,
} from "react-icons/bs";

export default function Footer() {
  return (

    <div className="w-full mt-10 text-center bg-purple-950 text-white" >
      <div className="flex flex-auto  flex-col w-[1000px] p-8 m-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">

          <div>
            <h1>Buscanos en nuestras redes sociales</h1>
            <div className=" flex flex-auto p-2">
              <BsInstagram className="mt-1" />
              <label className="ml-5">@audiolibre</label>


            </div>
            <div className=" flex flex-auto p-2">
              <BsXCircle className="mt-1" />
              <label className="ml-5">@audiolibre</label>
            </div>
            <div className=" flex flex-auto p-2">
              <BsTiktok className="mt-1" />
              <label className="ml-5">@audiolibre</label>
            </div>
          </div>
          <div >

          </div>
          <div>
            <h1>AudioLibre</h1>
            <h1>2024</h1>
          </div>
        </div>
      </div>
    </div>
  );
}