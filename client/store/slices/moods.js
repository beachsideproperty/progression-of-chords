import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allMoods: [],
  selectedMood: null,
  error: null,
};

export const fetchAllMoods = createAsyncThunk('fetchAllMoods', async () => {
  try {
    const { data } = await axios.get('/api/moods');
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
});

export const createMood = createAsyncThunk(
  'createMood',
  async ({ mood, date, userId }, moodie) => {
    try {
      const { data: newestMood } = await axios.post('/api/moods', {
        mood,
        date,
        userId,
      });
      const fetchAction = await moodie.dispatch(fetchAllMoods());
      if (fetchAllMoods.fulfilled.match(fetchAction)) {
        return { newestMood };
      } else {
        return { error: fetchAction.error };
      }
    } catch (error) {
      console.error('Unable to create mood.', error);
      return { error };
    }
  }
);

export const deleteMood = createAsyncThunk('deleteMood', async ({ id }) => {
  try {
    const { data } = await axios.delete(`/api/moods/${id}`);
    return { id, data };
  } catch (error) {
    console.error('Unable to delete mood.', error);
    return { error };
  }
});

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setError: (state, { payload: error }) => {
      state.error = error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMoods.fulfilled, (state, action) => {
      state.allMoods = action.payload;
    });
    builder.addCase(createMood.fulfilled, (state, { payload }) => {
      if (payload.error) {
        let errorMessage = 'Something went wrong.';
        if (payload.error.response.status === 500) {
          errorMessage = 'Can not create mood.';
        }
        state.error = errorMessage;
      } else {
        const existingMoodIndex = state.allMoods.findIndex(
          (mood) =>
            mood.date === payload.newestMood.date &&
            mood.id === payload.newestMood.id
        );
        if (existingMoodIndex >= 0) {
          state.allMoods[existingMoodIndex] = payload.newestMood;
        } else {
          state.allMoods.push(payload.newestMood);
        }
      }
    });
    builder.addCase(deleteMood.fulfilled, (state, { payload }) => {
      state.allMoods = state.allMoods.filter((mood) => mood.id !== payload.id);
    });
  },
});

export const { setError, selectMood, updateMood } = moodSlice.actions;

export const selectAllMoods = (state) => state.mood.allMoods;
export const selectSelectedMood = (state) => state.mood.selectedMood;

export default moodSlice.reducer;
