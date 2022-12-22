import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import { deleteAlbumByID, deleteArtistById, deleteNasheedById, getAllAlbums, getAllArtists, getAllNasheed } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { storage } from "../config/firebase.config";
import { ref } from "firebase/storage";
const NasheedCrad = ({ data, index, type }) => {
  const [isDelate, setIsDelate] = useState(false);
  const [{alertType, allAlbums, allArtists, allNasheed, NasheedIndex, isNasheedPlaying},dispath] = useStateValue()
  const deleteData = (data) => {

      deleteNasheedById(data._id).then((res)=>{
        if(res.data){
          getAllNasheed().then((data)=>{
            dispath({
              type: actionType.SET_ALL_NASHEED,
              allNasheed: data.nasheed
            })
          })
        }
      })

      deleteAlbumByID(data._id).then((res)=>{
        getAllAlbums().then((data)=>{
          dispath({
            type: actionType.SET_ALL_ALBUMNS,
            allAlbums: data.album
          })
        })
    })

    deleteArtistById(data._id).then((res)=>{
        getAllArtists().then((data) => {
          dispath({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artist,
          });
        })
      })

    }
    

    const addToContext =()=>{

        if(!isNasheedPlaying){
          dispath({
            type: actionType.SET_ISNASHEED_PLAYING,
            isNasheedPlaying: true,
          })
        }

        if(NasheedIndex !== index){
          dispath({
            type: actionType.SET_NASHEED_INDEX,
            NasheedIndex: index,
          })
        }
    }



  return (
    <motion.div className="relative shadow-md rounded-lg flex-col items-center w-40 min-w-210 py-4 px-2 cursor-pointer hover:bg-card bg-gray-100" onClick={type === "nasheed" && addToContext}>
      <motion.div className="min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden"
      
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          className="w-full h-full rounded-lg object-cover"
          src={data.imageURL}
        />
      </motion.div>

      <p className="text-base flex flex-col text-center text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}...`
              : data.artist}
          </span>
        )}
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4 ">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-base text-red-400 drop-shadow-md hover:text-red-600 "
          onClick={() => setIsDelate(true)}
        >
          <IoTrash />
        </motion.i>
      </div>
      {isDelate && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure you want to delate it?
          </p>
          <div className="flex items-center gap-4 ">
            <motion.button
              className="bg-red-300 rounded-md hover:bg-red-500 cursor-pointer px-2 py-1 text-sm uppercase"
              onClick={()=> deleteData(data)}
              whileTap={{ scale: 0.7 }}
            >
              Yes
            </motion.button>
            <motion.button
              className="bg-green-300 rounded-md hover:bg-green-500 cursor-pointer px-2 py-1 text-sm uppercase"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelate(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NasheedCrad;
