import React, { useEffect } from "react";
import { getAllArtists } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import NasheedCrad from "./NasheedCrad";

const DashboardArtits = () => {
  const [{ allArtists }, dispath] = useStateValue();
  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispath({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col ">
      <div className="relative  w-full my-4 py-16 p-4 border border-gray-300 rounded-md ">
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  );
};

export const ArtistContainer = ( {data} ) => {
  return(
    <div className="w-full flex flex-wrap gap-3 items-center justify-center">
      {data && data.map((nasheed, i) => (
        <NasheedCrad key={nasheed._id} data={nasheed} index={i} type="artist"/>
      ))}
    </div>
  )
}


export default DashboardArtits;
