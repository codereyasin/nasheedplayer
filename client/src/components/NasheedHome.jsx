import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../context/StateProvider";
import { getAllNasheed } from "../api";
import { actionType } from "../context/reducer";
import NasheedCrad from './NasheedCrad'
const NasheedHome = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false)
  const [{allNasheed}, dispath] = useStateValue()


  useEffect(() => {
    if(!allNasheed){
      getAllNasheed().then(data =>{
        dispath({
          type : actionType.SET_ALL_NASHEED,
          allNasheed: data.nasheed,
        })
      })
    }
  }, [])
  
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col ">
      <div className="w-full flex justify-center items-center gap-20 ">
        <NavLink to={"/dashboard/newNasheed"} className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>

        <input
          className={`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"}  rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          type="text"
          placeholder="Search Here.."
          value={songFilter || ''}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={()=> setIsFocus(false)}
          onFocus={()=> setIsFocus(true)}
        />


        <i>
          <AiOutlineClear className="text-3xl text-textColor cursor-pointer "/>
        </i>        
      </div>


      <div className="relative  w-full my-4 py-16 p-4 border border-gray-300 rounded-md ">
        <div className="absolute top-4  left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor"> Count : </span>
            {allNasheed?.length}
          </p>
        </div>

        <SongContainer data={allNasheed}/>
      </div>
    </div>
  );
};

export const SongContainer = ( {data} ) => {
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-center">
      {data && data.map((nasheed, i) => (
        <NasheedCrad key={nasheed._id} data={nasheed} index={i} type="nasheed"/>
      ))}
    </div>
  )
}

export default NasheedHome;
