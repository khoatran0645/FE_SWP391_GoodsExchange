// normal
//* highlighted
//? question
//! alert, warning
//TODO task

//* URL for BE local
export const BE_BASE_URL = "http://localhost:5000/api/v1";
// export const BE_BASE_URL = "https://goodexchange-swp.azurewebsites.net/api/v1";

//* Category APIs
//DONE
export const API_CREATE_CATEGORY = "/categories";
export const API_GET_ALL_CATEGORIES = "/categories";
export const API_UPDATE_CATEGORY = "/categories";
export const API_GET_CATEGORY_BY_ID = "/categories/{id}";
//! DANGER
export const API_DELETE_CATEGORY = "/categories";

//* Product APIs
//TODO create, get by Id, get all, update, delete products, update status and isApproved of products
//? can use only one update for update, update status and isApproved of products
export const API_CREATE_PRODUCT = "/products/create";
export const API_GET_PRODUCT_BY_ID = "/products/{id}";
export const API_GET_PRODUCTS_HOMEPAGE =
  "/products/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_SEARCH_PRODUCTS_FOR_USER =
  "/products/all?PageIndex=1&PageSize=10&ProductName={keyword}&IsApproved=true&IsActive=true";
//! DANGER
export const API_DELETE_PRODUCT = "/products/id?id={id}";

//* Rating APIs
//TODO create, get, update, hide rating

//* Report APIs
//TODO create, get all report , resolve report
export const API_POST_REPORT = "/reports/sendreport";

export const API_GET_ALL_REPORTS = "/reports/all?PageIndex=1&PageSize=10";

//* User APIs
//TODO login, register, update user info, ban account, get seller profile
export const API_LOGIN = "/users/login";
export const API_REGISTER = "/users/register";
