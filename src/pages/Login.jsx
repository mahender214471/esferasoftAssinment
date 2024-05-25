import { Input, Button, Typography } from "@material-tailwind/react";
import icon from "../assets/icons/icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
export default function Login() {
  const router = useNavigate();
  const [data, setDaat] = useState({
    email: "demon@mail.com",
    password: "123456",
  });
  useEffect(() => {
    setTimeout(() => router("/home") , 3000)
  }, []);
  return (
    <main
      className="w-full h-screen bg-cyan-50 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.esferasoft.com/wp-content/uploads/2022/12/uk-img-1024x543.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 h-auto flex flex-col items-center p-6 bg-white shadow-md rounded-md border-[1px] border-red-200">
        <div className="w-24 h-24 rounded-full shadow-md relative -top-16 bg-white flex items-center justify-center p-4">
          <img src={icon} alt="icon" className="w-full h-full rounded-full" />
        </div>
        <Typography variant="h6" color="blue-gray" className="-mt-14">
          Esferasoft Solutions Pvt. Ltd.
        </Typography>
        <Typography color="gray" className="mt-4 font-normal">
          Please enter your details for login
        </Typography>
        <div className="w-full flex flex-col mt-6">
          <Typography variant="body" color="blue-gray" className="-mb-3">
            Enter your email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={data?.email}
          />
        </div>
        <div className="w-full flex flex-col mt-6">
          <Typography variant="body" color="blue-gray" className="-mb-3">
            Enter your password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-4"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={data?.password}
          />
        </div>
        <Button className="mt-10 bg-red-400" fullWidth disabled>
          <BeatLoader size={10} color="#ffff" />
        </Button>
        <p className="text-[12px] text-gray-600 pt-2">Auto login check ...</p>
      </div>
    </main>
  );
}
