import axios from '../../utils/axios';

export const getUserId = id => {
  return {
    type: 'GET_USER',
    payload: axios.get(`user/${id}`),
  };
};
