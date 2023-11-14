export const setCart = item => {
  return {type: 'SETCART', item};
};
export const resetCart = () => {
  return {type: 'RESETCART'};
};
export const setUser = item => {
  return {type: 'SETUSER', item};
};
export const resetUser = () => {
  return {type: 'RESETUSER'};
};
