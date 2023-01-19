const redux = require("redux");
const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;

// middleware
const applyMiddleware = redux.applyMiddleware
const  reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTORED = "ICECREAM_RESTORED";

// Action creator is function which return an object
function orderCake() {
  // Action is a object with type property
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function restockCakes(qty) {
  return {
    type: CAKE_RESTORED,
    payload: qty,
  };
}

function orderIceCream() {
  return {
    type: ICECREAM_ORDERED,
    quantity: 1,
  };
}

function restockIceCream(qty) {
  return {
    type: ICECREAM_RESTORED,
    payload: qty,
  };
}

// States
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// Reducers
// (previousState, action ) => newState

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTORED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// Combining reducers before providing to store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// Store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState()); // access state via getState()


// registering listener via subscribe(listener)
const unsubscribe = store.subscribe(() => {
  // console.log("Updated State", store.getState());
});

// updating state using dispatch
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCakes(4));

store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(restockIceCream(5))

// unregistered listener via function returned by subscribe(listener)
unsubscribe();

// state gets updated, but won't log the updated state in console bcz listener is unregistered above
store.dispatch(orderCake());
