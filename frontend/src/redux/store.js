import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
//Importing all reducers
import {
  productReducer,
  productDetailReducer,
  latestProductReducer,
  featuredProductReducer,
  searchProductReducer,
  productByCategoryReducer,
  deleteSpecificProductReducer,
  addReviewsReducer,
  adminProductReducer,
  adminAddProductReducer,
  adminEditProductReducer,
} from "./reducers/productReducer";
import {
  registerUserReducer,
  loginUserReducer,
  getAllUsersReducers,
  deleteSpecificUserReducer,
  editMySelfReducer,
  editMyPasswordReducer,
  adminEditUserProfileReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  deleteSpecificOrderReducer,
  adminGetAllOrderReducer,
} from "./reducers/orderReducer";

//Combine Reducers
const rootReducer = combineReducers({
  //Users
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  getAllUsers: getAllUsersReducers,
  deleteSpecificUser: deleteSpecificUserReducer,
  editMySelf: editMySelfReducer,
  editMyPassword: editMyPasswordReducer,
  adminEditUserProfile: adminEditUserProfileReducer,

  //Products
  products: productReducer,
  productDetail: productDetailReducer,
  latestProducts: latestProductReducer,
  featuredProducts: featuredProductReducer,
  searchProduct: searchProductReducer,
  productByCategory: productByCategoryReducer,
  addReviews: addReviewsReducer,
  adminPanelProducts: adminProductReducer,
  adminAddProduct: adminAddProductReducer,
  deleteSpecificProduct: deleteSpecificProductReducer,
  adminEditProduct: adminEditProductReducer,

  //Order
  placeOrder: placeOrderReducer,
  getUserOrders: getUserOrdersReducer,
  adminGetAllOrder: adminGetAllOrderReducer,
  deleteSpecificOrder: deleteSpecificOrderReducer,

  //Cart
  cart: cartReducer,
});

//LocalStorage
const currentUserFromStorage = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const currentUserInfoFromStorage = localStorage.getItem("loggedInUserInfo")
  ? JSON.parse(localStorage.getItem("loggedInUserInfo"))
  : null;

let initialState = {
  loginUser: {
    loggedInUserInfo: currentUserInfoFromStorage,
    currentUser: currentUserFromStorage,
  },
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
