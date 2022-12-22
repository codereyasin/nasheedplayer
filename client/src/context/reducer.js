export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_NASHEED: "SET_ALL_NASHEED",
  SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
  SET_FILTER_TERN: "SET_FILTER_TERN",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_ALERT_TYPE : "SET_ALERT_TYPE",
  SET_ISNASHEED_PLAYING : "SET_ISNASHEED_PLAYING",
  SET_NASHEED_INDEX : "SET_NASHEED_INDEX"
};

const reducer = (state, action) => {

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_NASHEED:
      return {
        ...state,
        allNasheed: action.allNasheed,
      };

    case actionType.SET_ALL_ALBUMNS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
      case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };
      
    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };
      case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
      case actionType.SET_FILTER_TERN:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
      case actionType.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };
      case actionType.SET_ISNASHEED_PLAYING:
      return {
        ...state,
        isNasheedPlaying: action.isNasheedPlaying,
      };
      case actionType.SET_NASHEED_INDEX:
      return {
        ...state,
        NasheedIndex: action.NasheedIndex,
      };


    default:
      return state;
  }
};

export default reducer;