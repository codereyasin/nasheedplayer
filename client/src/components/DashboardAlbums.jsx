import React, { useEffect } from "react";
import { getAllAlbums } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import NasheedCrad from "./NasheedCrad";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispath] = useStateValue();

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispath({
          type: actionType.SET_ALL_ALBUMNS,
          allAlbums: data.album,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col ">
      <div className="relative  w-full my-4 py-16 p-4 border border-gray-300 rounded-md ">
      <AlbumContainer data={allAlbums} />
      </div>
    </div>
  );
};

export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-center">
      {data &&
        data.map((nasheed, i) => (
          <NasheedCrad key={nasheed._id} data={nasheed} index={i} type="album" />
        ))}
    </div>
  );
};

export default DashboardAlbums;
