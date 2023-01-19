const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const FETCH_EMAILS_REQUESTED = "FETCH_EMAILS_REQUESTED";
const FETCH_EMAILS_SUCCEEDED = "FETCH_EMAILS_SUCCEEDED";
const FETCH_EMAILS_FAILED = "FETCH_EMAILS_FAILED";

const initialState = {
  loading: false,
  emails: [],
  error: "",
};

const fetchEmailsRequest = () => {
  return {
    type: FETCH_EMAILS_REQUESTED,
  };
};

const fetchEmailsSuccess = (emails) => {
  return {
    type: FETCH_EMAILS_SUCCEEDED,
    payload: emails,
  };
};

const fetchEmailsFailure = (error) => {
  return {
    type: FETCH_EMAILS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMAILS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMAILS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        emails: action.payload,
        error: "",
      };
    case FETCH_EMAILS_FAILED:
      return {
        ...state,
        loading: false,
        emails: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchEmails = () => {
  return function (dispatch) {
    dispatch(fetchEmailsRequest());
    axios
      .get("https://flipkart-email-mock.vercel.app/?id=3")
      .then((response) => {
        const email = response;
        dispatch(fetchEmailsSuccess(email.data));
      })
      .catch((error) => {
        dispatch(fetchEmailsFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchEmails());
