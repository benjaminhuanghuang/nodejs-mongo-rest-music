import axios from "axios";
import _ from "lodash";

import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  CREATE_ERROR,
  CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from "./types";

export const resetArtist = () => {
  return { type: RESET_ARTIST };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export const selectArtist = id => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectArtist = id => {
  return { type: DESELECT_ARTIST, payload: id };
};

export const setRetired = ids => (dispatch, getState) =>
  SetRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));

export const setNotRetired = ids => (dispatch, getState) =>
  SetNotRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));
//
export const setAgeRangeSync = () => dispatch => {
  axios.get("/api/ageRange").then(res => {
    dispatch({ type: SET_AGE_RANGE, payload: res.data });
  });
};
//
export const setAgeRange = () => async dispatch => {
  const res = await axios.get("/api/ageRange");
  dispatch({ type: SET_AGE_RANGE, payload: res.data });
};
//
export const setYearsActiveRangeSync = () => dispatch => {
  axios.get("/api/yearsActiveRange").then(res => {
    dispatch({ type: SET_YEARS_ACTIVE_RANGE, payload: res.data });
  });
};
//
export const setYearsActiveRange = () => async dispatch => {
  const res = await axios.get("/api/yearsActiveRange");
  dispatch({ type: SET_YEARS_ACTIVE_RANGE, payload: res.data });
};
//
export const searchArtistsSync = (
  criteria,
  offset = 0,
  limit = 20
) => dispatch => {
  axios
    .post("/api/searchArtists", { ...criteria, offset, limit })
    .then(res => dispatch({ type: SEARCH_ARTISTS, payload: res.data }));
};
//
export const searchArtists = (
  criteria,
  offset = 0,
  limit = 20
) => async dispatch => {
  const res = await axios.post("/api/searchArtists", {
    ...criteria,
    offset,
    limit
  });
  dispatch({ type: SEARCH_ARTISTS, payload: res.data });
};
//
export const findArtistSync = id => dispatch =>
  axios.get(`/api/artists/${id}`)
  .then(artist =>
    dispatch({ type: FIND_ARTIST, payload: artist })
  );

export const findArtist = id => async dispatch =>
{
  const artist = axios.get(`/api/artists/${id}`).data;
  dispatch({ type: FIND_ARTIST, payload: artist })   
}

export const createArtistSync = (props, jumpTo) => dispatch => {
  axios
    .post("/api/createArtist", props)
    .then((res) => jumpTo(`artists/${res.data._id}`))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });
};

export const createArtist = (props, jumpTo) => async dispatch => {
  try {
    const res = await axios.post("/api/createArtist", props);
    const artist = res.data;
    jumpTo(`artists/${artist._id}`);
  } catch (err) {
    console.log(err);
    dispatch({ type: CREATE_ERROR, payload: err });
  }
};

export const editArtist = (id, props) => dispatch =>
  EditArtistProxy(id, props)
    .then(() => hashHistory.push(`artists/${id}`))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

export const deleteArtist = id => dispatch =>
  DeleteArtistProxy(id)
    .then(() => hashHistory.push("/"))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

//
// Helpers

const refreshSearch = (dispatch, getState) => {
  const { artists: { offset, limit } } = getState();
  const criteria = getState().form.filters.values;

  dispatch(searchArtists(_.extend({}, { name: "" }, criteria), offset, limit));
};
