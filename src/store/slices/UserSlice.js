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

const userSlice = createSlice({
  name: "Users",
  initialState: {
    // fetch
    loading: false,
    data: null,
    error: null,
    // delete
    deleteUserLoading: false,
    deleteUserData: null,
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
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.deleteUserData = action.payload;
        const { error, id } = action.payload;
        if (!error) {
          state.data = state.data.filter((data) => data.id !== id);
        }
      })
  },
});

export default userSlice.reducer;
