import axios from 'axios';
import { io } from 'socket.io-client';
import { setAlert } from './alert';
import {
  LOBBY_CREATED,
  GET_LOBBIES,
  LOBBY_DISBANDED,
  LOBBY_ERROR,
  GET_LOBBY,
  LEAVE_LOBBY,
  JOIN_LOBBY,
} from './types';

//Get All Lobbies
export const getLobbies = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/room');

    dispatch({
      type: GET_LOBBIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create lobby
export const createLobby = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/room', formData, config);

    dispatch({
      type: LOBBY_CREATED,
      payload: res.data,
    });

    dispatch(setAlert('Lobby Created', 'success'));
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get lobby
export const getLobby = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/room/${id}`);

    dispatch({
      type: GET_LOBBY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Disband lobby
export const disbandLobby = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/room/${id}`);

    dispatch({
      type: LOBBY_DISBANDED,
      payload: id,
    });

    dispatch(setAlert('Lobby Disbanded', 'success'));
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Join lobby
export const joinLobby = (id) => async (dispatch) => {
  try {
    // room information
    const res = await axios.put(`/api/room/join/${id}`);

    dispatch({
      type: JOIN_LOBBY,
      payload: res.data,
    });

    dispatch({
      type: GET_LOBBY,
      payload: res.data,
    });

    dispatch(setAlert('Lobby Joined', 'success'));
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Leave lobby
export const leaveLobby = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/room/leave/${id}`);

    dispatch({
      type: LEAVE_LOBBY,
      payload: res.data,
    });

    dispatch(setAlert('Leave lobby successfully', 'success'));
  } catch (err) {
    dispatch({
      type: LOBBY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
