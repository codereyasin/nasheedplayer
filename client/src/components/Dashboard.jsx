import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { IoHome } from "react-icons/io5";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardHome from "./DashboardHome";
import DashboardUser from "./DashboardUser";
import DashboardNasheed from "./DashboardNasheed";
import DashboardArtits from "./DashboardArtits";
import DashboardAlbums from "./DashboardAlbums";
import DashboardnewNasheed from "./DashboardnewNasheed";
import Alert from "./Alert";
import { useStateValue } from "../context/StateProvider";

const Dashboard = () => {
  const [{ alertType }, dispath] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary font-semibold">
      <Header />
      <div className="w-[60%] my-2 p-4 flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoHome className="text-2xl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/user"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/nasheed"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Nasheed
        </NavLink>
        <NavLink
          to={"/dashboard/artits"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Artits
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Albums
        </NavLink>
      </div>

      <div className="my-4 w-full p-4 ">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/nasheed" element={<DashboardNasheed />} />
          <Route path="/artits" element={<DashboardArtits />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/newNasheed" element={<DashboardnewNasheed />} />
        </Routes>
      </div>

     {alertType && (
       <Alert type={alertType} />
     )}
    </div>
  );
};

export default Dashboard;
