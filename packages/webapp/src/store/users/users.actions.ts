import ApiService from '@/services/ApiService';
import { USERS_LIST_SET, USERS_TABLE_LOADING, USER_DELETE, USER_DETAILS_SET } from '@/store/types';;

export const fetchUsers = () => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      dispatch({
        type: USERS_TABLE_LOADING,
        payload: { loading: true },
      });

      ApiService.get(`users`)
        .then((response) => {
          dispatch({
            type: USERS_LIST_SET,
            payload: {
              users: response.data.users,
            },
          });
          dispatch({
            type: USERS_TABLE_LOADING,
            payload: { loading: false },
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const fetchUser = ({ id }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.get(`users/${id}`)
        .then((response) => {
          dispatch({
            type: USER_DETAILS_SET,
            payload: {
              id,
              user: response.data.user,
            },
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
};

export const deleteUser = ({ id }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.delete(`users/${id}`)
        .then((response) => {
          dispatch({
            type: USER_DELETE,
            payload: {
              id,
            },
          });
          resolve(response);
        })
        .catch((error) => {
          reject(error.response.data.errors || []);
        });
    });
};

export const submitInvite = ({ form }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.patch(`invite`, form)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          const { response } = error;
          const { data } = response;

          reject(data?.errors);
        });
    });
};

export const editUser = ({ form, id }) => {
  return (dispatch) =>
    new Promise((resolve, reject) => {
      ApiService.post(`users/${id}`, form)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          const { response } = error;
          const { data } = response;

          reject(data?.errors);
        });
    });
};

export const inactiveUser = ({ id }) => {
  return (dispatch) => ApiService.put(`users/${id}/inactive`);
};

export const activeUser = ({ id }) => {
  return (dispatch) => ApiService.put(`users/${id}/active`);
};
