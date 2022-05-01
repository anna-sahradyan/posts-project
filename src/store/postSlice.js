import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchAsyncGetPosts = createAsyncThunk('post/fetchAsyncGetPosts', async function (_, {rejectWithValue}) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
        if (!response.ok) {
            throw new Error('Server Error!');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }

});

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}
const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchAsyncGetPosts.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAsyncGetPosts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.post = action.payload;
        },

        [fetchAsyncGetPosts.rejected]: setError,
    }


});

export const selectPost = state => state.post.post;
export default postSlice.reducer;
