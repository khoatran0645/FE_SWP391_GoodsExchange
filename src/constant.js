// normal
//* highlighted
//? question
//! alert, warning
//TODO task

//* Category APIs
//DONE
export const API_CREATE_CATEGORY = "/categories"; //need auth
export const API_GET_ALL_CATEGORIES = "/categories";
export const API_UPDATE_CATEGORY = "/categories"; // need auth
export const API_GET_CATEGORY_BY_ID = "/categories/{id}";
//! DANGER
export const API_DELETE_CATEGORY = "/categories"; //ne

//* Product APIs
//TODO create, get by Id, get all, update, delete products, update status and isApproved of products
//? can use only one update for update, update status and isApproved of products
export const API_CREATE_PRODUCT = "/products/create";
export const API_GET_PRODUCTS_HOMEPAGE =
  "/products/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_SEARCH_PRODUCTS_FOR_USER =
  "/products/all?PageIndex=1&PageSize=10&ProductName={keyword}&IsApproved=true&IsActive=true";
export const API_GET_PRODUCT_BY_ID = "/products/{id}";

// Admin
export const API_GET_ALL_MODERATOR_LIST =
  "/users/list-moderators?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_CREATE_MODERATOR_ACCOUNT = "/users/CreateAccount";
export const API_PATCH_STATUS_MODERATOR = "users/status";
// Moderator

export const API_GET_ALL_PRODUCT_MOD =
  "/products/moderator/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_APPROVE_PRODUCT_MOD = "/products/approve/{id}";
export const API_DENY_PRODUCT_MOD = "products/deny/{id}";

//! DANGER
export const API_DELETE_PRODUCT = "/products/id?id={id}";

//* Rating APIs
//TODO create, get, update, hide rating
export const API_GET_RATING_STAR = "/ratings/id?id={id}";
export const API_POST_RATING = "ratings/send-rating";


//* Report APIs
//TODO create, get all report , resolve report
export const API_POST_REPORT = "/reports/send-report";

export const API_GET_ALL_REPORTS =
  "/reports/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_APPROVE_REPORT_MOD = "reports/approve/{id}";
export const API_DENY_REPORT_MOD = "reports/deny/{id}";

//* User APIs
//TODO login, register, update user info, ban account, get seller profile
export const API_LOGIN = "/users/login";
export const API_REGISTER = "/users/register";
export const API_USER_PROFILE_ID = "/users/{id}";
export const API_UPDATE_PROFILE = "/users/update-Profile";
export const API_CHANGING_PASSWORD = "/users/Changing-Password";
