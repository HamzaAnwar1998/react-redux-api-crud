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
    console.log(response);

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

// update user
export const updateUser = createAsyncThunk("updateUser", async (obj) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };
    const data = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      username: obj.username,
      phone: obj.phone,
      website: obj.website,
    };
    const request = await axios.patch(
      `https://jsonplaceholder.typicode.com/users/${obj.id}`,
      data,
      axiosConfig
    );
    const response = await request.data;
    response.id = obj.id;
    console.log(response);

    return {
      data: response,
      successMsg: "User Successfully Updated!",
      error: null,
      id: obj.id,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      successMsg: null,
      error: "Can not update the given user",
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
    const data = {
      id: obj.id,
      name: obj.name,
      email: obj.email,
      username: obj.username,
      phone: obj.phone,
      website: obj.website,
    };
    const request = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      data,
      axiosConfig
    );
    const response = await request.data;
    response.id = obj.id;
    console.log(response);

    return {
      data: response,
      successMsg: "User Successfully Added!",
      error: null,
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      successMsg: null,
      error: "Can not add the user",
    };
  }
});

const usersSlice = createSlice({
  name: "Users",
  initialState: {
    // fetch
    loading: false,
    data: null,
    error: null,
    // delete user
    deleteUserLoading: false,
    deleteUserData: null,
    // update user
    updateUserLoading: false,
    updateUserData: null,
    // add user
    addUserLoading: false,
    addUserData: null,
  },
  extraReducers: (builder) => {
    builder
      // fetch
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
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.deleteUserData = action.payload;
        const { error, id } = action.payload;
        if (!error) {
          state.data = state.data.filter((data) => data.id !== id);
        }
      })
      // update user
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserData = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserData = action.payload;
        const { data, id } = action.payload;
        if (data) {
          const userIndex = state.data.findIndex((user) => user.id === id);
          if (userIndex !== -1) {
            state.data[userIndex] = data;
          }
        }
      })
      // add user
      .addCase(addUser.pending, (state) => {
        state.addUserLoading = true;
        state.addUserData = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserLoading = false;
        state.addUserData = action.payload;
        const { data } = action.payload;
        if (data) {
          state.data.unshift(data);
        }
      });
  },
});

export default usersSlice.reducer;
