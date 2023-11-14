import {combineReducers} from 'redux';

const cartState = {
  detail: [],
  message: {
    minOrderAmount: '0',
  },
  coupon: {
    couponMessage: '',
    couponDiscountStr: '',
  },
  basket: {
    totalPrice: 0.0,
    generalTotalPrice: 0.0,
    basketBagQuantity: 0,
    basketBagPrice: 0,
    couponDiscountAmount: 0,
    cargoPrice: 0,
  },
};

const userState = {
  firstName: '',
  lastName: '',
  email: 'test@mail.com',
  isLoggedIn: false,
};

export const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case 'SETCART':
      return action.item;
    case 'RESETCART':
      return userState;
    default:
      return state;
  }
};
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.item;
    case 'RESETUSER':
      return userState;
    default:
      return state;
  }
};
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
