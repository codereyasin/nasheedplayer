import React, { useEffect } from "react";
import { getAllAlbums, getAllArtists, getAllNasheed, getAllUsers } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { FaUsers } from 'react-icons/fa'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (
    <div
    style={{ background: `${bg_color}` }}
    className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
  >
    {icon}
    <p className="text-xl text-textColor font-semibold">{name}</p>
    <p className="text-sm text-textColor">{count}</p>
  </div>
  );
};

const DashboardHome = () => {
  const [{allUsers, allNasheed, allArtists, allAlbums}, dispatch] = useStateValue()

  useEffect(() => {

    if(!allUsers){
      getAllUsers().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data
        })
      })
    }
    if(!allArtists){
      getAllArtists().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        })
      })
    }
    if(!allAlbums){
      getAllAlbums().then((data)=>{
      dispatch({
        type: actionType.SET_ALL_ALBUMNS,
        allAlbums: data.album
      })
      })
    }
    if(!allNasheed){
      getAllNasheed().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_NASHEED,
          allNasheed: data.nasheed
        })
      })
    }
  }, [])
  
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard icon={<FaUsers className="text-3xl text-textColor"/>} name={"Users"}  count={allUsers?.length > 0 ? allUsers?.length : 0}/>
      <DashboardCard  icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Nasheed"} count={allNasheed?.length > 0 ? allNasheed?.length : 0}/>
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
      <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
