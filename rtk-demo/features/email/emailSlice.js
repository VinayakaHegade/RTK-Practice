const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const axios = require("axios");

const initialState = {
  loading: false,
  emails: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
const fetchEmails = createAsyncThunk("email/fetchEmails", () => {
  return axios
    .get("https://flipkart-email-mock.now.sh/")
    .then((response) => response?.data?.list?.map((email) => email.id));
});

const emailSlice = createSlice({
  name: "email",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmails.fulfilled, (state, action) => {
      (state.loading = false),
        (state.emails = action.payload),
        (state.error = "");
    });
    builder.addCase(fetchEmails.rejected, (state, action) => {
      (state.loading = false),
        (state.emails = []),
        (state.error = action.error.message);
    });
  },
});

module.exports = emailSlice.reducer;
module.exports.fetchEmails = fetchEmails;
