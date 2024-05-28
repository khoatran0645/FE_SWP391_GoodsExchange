// normal
//* highlighted
//? question
//! alert, warning
//TODO task


//* URL for BE local
export const BE_BASE_URL = "https://localhost:7208/api/v1";


//* Category APIs
//TODO create, get, edit, delete categories


//* Product APIs
//TODO create, get by Id, get all, update, delete products, update status and isApproved of products
//? can use only one update for update, update status and isApproved of products
export const API_CREATE_PRODUCT = "/products/create";
export const API_GET_PRODUCTS = "/products/all?PageIndex=1&PageSize=10&Status=true&IsApproved=true&CategoryName=Books%20and%20Materials";


//* Rating APIs
//TODO create, get, update, hide rating

//* Report APIs
//TODO create, get all report , resolve report

//* User APIs
//TODO login, register, update user info, ban account, get seller profile
export const API_LOGIN = "/users/authenticate";
export const API_REGISTER = "/users/register";