import React from "react";
import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
import icon from "../assets/icons/icon.png";
import { Button, Typography } from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const router = useNavigate();
  return (
    <header className="w-fill h-auto flex items-center justify-between bg-red-100 px-4 py-2">
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2"
        >
          <img src={icon} alt="icon" className="w-full h-full rounded-full" />
        </Link>
        <Typography variant="h6" color="blue-gray" className="hidden sm:hidden md:block lg:block xl:block ml-4">
          Esferasoft Solutions Pvt. Ltd.
        </Typography>
      </div>
      <div className="flex items-center">
        <Button
          className="flex items-center bg-red-300"
          onClick={() => router("/addUser")}
        >
          <MdAdd size={30} />
          Add user
        </Button>
        {/* <Button className="flex items-center bg-red-600 ml-4">
          <CiLogin size={30} />
          Logout
        </Button> */}
      </div>
    </header>
  );
};
const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center py-2 bg-gray-50">
      <Typography color="gray" className="mt-4 font-normal">
        All right reserved @ 2024
      </Typography>
    </div>
  );
};
export default function DefaultLayout() {
  return (
    <main className="w-full h-auto">
      <ToastContainer />
      <Header />
      <div className="w-full h-full flex items-center justify-center p-4 overflow-x-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
