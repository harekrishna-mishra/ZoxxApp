export const GetToken = () => {
  let userDetails = sessionStorage.getItem("userDetails");
  return userDetails;
};
