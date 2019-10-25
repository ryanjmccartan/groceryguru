import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import mealReducer from './mealReducer';
import singleMealReducer from './singleMealReducer';
import ingredientReducer from './ingredientReducer';
import listReducer from './listReducer';
import mealIdReducer from './mealIdReducer';
import singleListReducer from './singleListReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  mealReducer, // will store meals created
  singleMealReducer, // reducer for single meal
  ingredientReducer, // reducer for storing ingredients
  listReducer, // reducer for storing lists
  mealIdReducer,
  singleListReducer // reducer for grabbing single list
});

export default rootReducer;
