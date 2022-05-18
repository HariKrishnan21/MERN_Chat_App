import * as types from "../constant/actionTypes";

const getUser = (singleUser) => ({
  type: types.GET_USER,
  payload: singleUser,
});

const selectedUser = (userSelected) => ({
  type: types.SELECTED_USER,
  payload: userSelected,
});

export const getSingleUser = () => {
  return function (dispatch) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    dispatch(getUser(userInfo));
  };
};

export const getSelectedUser = (userSelected) => {
  return function (dispatch) {
    dispatch(selectedUser(userSelected));
  };
};
