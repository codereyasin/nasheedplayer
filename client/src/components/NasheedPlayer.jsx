import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import {motion} from 'framer-motion'
import {RiPlayListFill} from 'react-icons/ri'
import {IoMdMusicalNote} from 'react-icons/io'
import { actionType } from "../context/reducer";
import { getAllNasheed } from "../api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoClose } from "react-icons/io5";
const NasheedPlayer = () => {
  const [{ allNasheed, NasheedIndex, isNasheedPlaying }, dispatch] = useStateValue();
  const nextTrack = () =>{
    if(NasheedIndex > allNasheed.length - 1){
      dispatch({
        type: actionType.SET_NASHEED_INDEX,
        NasheedIndex: 0,
      })
    }else{
      dispatch({
        type: actionType.SET_NASHEED_INDEX,
        NasheedIndex: NasheedIndex + 1,
      })
    }
  }
  const previousTrack = () =>{
    if(NasheedIndex === 0){
      dispatch({
        type: actionType.SET_NASHEED_INDEX,
        NasheedIndex: 0,
      })
    }else{
      dispatch({
        type: actionType.SET_NASHEED_INDEX,
        NasheedIndex: NasheedIndex - 1,
      })
    }
  }


  const closePlayer = () =>{
    dispatch({
      type: actionType.SET_ISNASHEED_PLAYING,
      isNasheedPlaying: false,
    })
  }
  const [isPlayList, setIsPlayList] = useState(false)
  return (
    <div className="w-full flex items-center">
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img
          src={allNasheed[NasheedIndex]?.imageURL}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />

        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allNasheed[NasheedIndex]?.name.length > 20
                ? allNasheed[NasheedIndex]?.name.slice(0, 20)
                : allNasheed[NasheedIndex]?.name
            }`}{" "}
            <span className="text-base">
              ({allNasheed[NasheedIndex]?.album})
            </span>
          </p>

          <p className="text-textColor">
            {allNasheed[NasheedIndex]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allNasheed[NasheedIndex]?.category})
            </span>
          </p>
          <motion.i whileTap={{ scale: 0.8 }} onClick={()=> setIsPlayList(!isPlayList)}>
            <RiPlayListFill className="text-textColor hover:text-headingColor text-2xl cursor-pointer"/>
          </motion.i>

        </div>
        <div className="flex-1">
        <AudioPlayer
            src={allNasheed[NasheedIndex]?.nasheedURL}
            onPlay={() => console.log("is playing")}
            autoPlay={false}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        {
          isPlayList && (
            <PlayListCrad/>
          )
        }

        <IoClose onClick={closePlayer} />
      </div>
    </div>
  );
};

export const PlayListCrad = () =>{
  const [{allNasheed, NasheedIndex, isNasheedPlaying}, dispatch] =useStateValue()

  useEffect(() => {
    if(!allNasheed){
      getAllNasheed().then(data =>{
        dispatch({
          type : actionType.SET_ALL_NASHEED,
          allNasheed: data.nasheed,
        })
      })
    }
  }, [])

  const setCurrentPlayNasheed = (index) => {

    if(!isNasheedPlaying){
      dispatch({
        type: actionType.SET_ISNASHEED_PLAYING,
        isNasheedPlaying: true,
      })
    }

    if(NasheedIndex !== index){
      dispatch({
        type: actionType.SET_NASHEED_INDEX,
        NasheedIndex: index,
      })
    }
  };


  return(
     <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allNasheed.length > 0 ? (
        allNasheed.map((nasheed, index) => (
          <motion.div
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}        
          className="grop w-full p-4 hover:cartBg flex gap-3 items-center cursor-pointer bg-transparent"
          onClick={()=> setCurrentPlayNasheed(index)}  
          key={index}
          >
             <IoMdMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
             <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  nasheed?.name.length > 20
                    ? nasheed?.name.slice(0, 20)
                    : nasheed?.name
                }`}{" "}
                <span className="text-base">({nasheed?.album})</span>
              </p>
              <p className="text-textColor">
                {nasheed?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({nasheed?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ): <></>}
    </div>
  )
}

export default NasheedPlayer;
