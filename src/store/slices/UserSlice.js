import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// fetch users
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const request = await axios.get("https://jsonplaceholder.typicode.com/users");
  const response = await request.data;
  return response;
});

// delete user
export const deleteUser = createAsyncThunk("deleteUser", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
    const request = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${obj.id}`,
      axiosConfig
    );
    const response = await request.data;
    console.log(response); // empty object, but in real world api, you might get response
    return {
      successMsg: "User Successfully Deleted!",
      error: null,
      id: obj.id,
    };
  } catch (err) {
    console.log(err);
    return {
      successMsg: null,
      error: "Can not delete the given user",
      id: obj.id,
    };
  }
});

// add user
export const addUser = createAsyncThunk("addUser", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    const request = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      obj,
      axiosConfig
    );

    const response = await request.data;
    response.id = obj.id; // we are setting the response id to obj.id
    console.log(response);
    // action.payload is the returned object
    return {
      data: response,
      successMsg: "User is successfully added!",
      error: null,
    };
  } catch (err) {
    console.log(err); // you can check the response yourself and update error key
    // action.payload is the returned object
    return {
      data: null,
      successMsg: null,
      error: "Can not add the new user record",
    };
  }
});

// update user
export const updateUser = createAsyncThunk("updateUser", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    const request = await axios.patch(
      `https://jsonplaceholder.typicode.com/users/${obj.id}`,
      obj,
      axiosConfig
    );

    const response = await request.data;
    response.id = obj.id; // we are setting the response id to obj.id
    console.log(response);
    // action.payload is the returned object
    return {
      data: response,
      successMsg: "User Updated Successfully!",
      error: null,
      id: obj.id,
    };
  } catch (err) {
    console.log(err); // you can check the response yourself and update error key
    // action.payload is the returned object
    return {
      data: null,
      successMsg: null,
      error: "Can not update the given user record",
      id: obj.id,
    };
  }
});

const userSlice = createSlice({
  name: "Users",
  initialState: {
    // fetch
    loading: true,
    data: null,
    error: null,
    // delete
    deleteUserLoading: false,
    deleteUserData: null,
    // add
    addUserLoading: false,
    addUserData: null,
    // update
    updateUserLoading: false,
    updateUserData: null,
  },
  extraReducers: (builder) => {
    builder
      // fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
        state.deleteUserData = null;
      })
      // the case will be fulfilled with either try returned object or catch returned object, we don't need rejected case, because the function wont get rejected
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.deleteUserData = action.payload;
        const { error, id } = action.payload;
        if (!error) {
          state.data = state.data.filter((data) => data.id !== id);
        }
      })
      // add user
      .addCase(addUser.pending, (state) => {
        state.addUserLoading = true;
        state.addUserData = null;
      })
      // the case will be fulfilled with either try returned object or catch returned object, we don't need rejected case, because the function wont get rejected
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserLoading = false;
        state.addUserData = action.payload;
        const { data } = action.payload;
        // fixing the newly added user at the first index of the array which is state.data
        if (data) {
          state.data.unshift(data);
        }
      })
      // update user
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserData = null;
      })
      // the case will be fulfilled with either try returned object or catch returned object, we don't need rejected case, because the function wont get rejected
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserData = action.payload;
        const { data, id } = action.payload;
        // if we have data not null in the action.payload
        if (data) {
          // find the index in the users array (data)
          const userIndex = state.data.findIndex((user) => user.id === id);
          // if user index is found then update that found object with the new one
          if (userIndex !== -1) {
            state.data[userIndex] = data;
          }
        }
      });
  },
});

export default userSlice.reducer;
