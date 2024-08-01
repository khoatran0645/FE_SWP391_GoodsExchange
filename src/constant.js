// normal
//* highlighted
//? question
//! alert, warning
//TODO task

//------------------------------------------------------------------------------------------------------------------------------
//* Category APIs
export const API_CREATE_CATEGORY = "/categories"; //need auth
export const API_GET_ALL_CATEGORIES = "/categories";
export const API_UPDATE_CATEGORY = "/categories"; // need auth
export const API_GET_CATEGORY_BY_ID = "/categories/{id}";
//! DANGER
export const API_DELETE_CATEGORY = "/categories/{id}"; //need auth

//------------------------------------------------------------------------------------------------------------------------------
//* Exchange APIs
// Send Trade Request
export const API_SEND_TRADE_REQUEST = "/exchanges/send-request";
// Get Request Trade List
export const API_GET_ALL_REQUEST_TRADE_LIST = "/exchanges/send-request-list";
// Get Receive Trade List
export const API_GET_ALL_RECEIVE_TRADE_LIST = "/exchanges/receive-request-list";
// Get Cancel Trade List
export const API_GET_ALL_CALCEL_REQUEST_TRADE_LIST =
  "/exchanges/status-request-list";
// Approve Trade
export const API_APPROVE_TRADE =
  "/exchanges/confirm-request/?requestid={requestId}";
// Deny Trade
export const API_DENY_TRADE = "/exchanges/deny-request?requestid={requestId}";
// Get Transactions Complete
export const API_GET_TRANSACTIONS_COMPLETE = "/transactions/transactions";

//------------------------------------------------------------------------------------------------------------------------------
//* Product APIs
export const API_CREATE_PRODUCT = "/products/create";
export const API_GET_PRODUCTS_HOMEPAGE =
  "/products/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_SEARCH_PRODUCTS_FOR_USER =
  "/products/all?PageIndex=1&PageSize=10&ProductName={keyword}&IsApproved=true&IsActive=true";
export const API_GET_PRODUCT_BY_ID = "/products/{id}";
export const API_GET_PRODUCT_SELLER = "/products/user?PageIndex=1&PageSize=10";
export const API_UPDATE_PRODUCT = "/products/update";
export const API_GET_OTHER_PRODUCT = "/products/user/{id}";
//! DANGER
export const API_DELETE_PRODUCT = "/products/{id}";

// Moderator manage product
export const API_GET_ALL_PRODUCT_MOD =
  "/products/moderator/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_APPROVE_PRODUCT_MOD = "/products/status/{id}?status=1";
export const API_DENY_PRODUCT_MOD = "/products/status/{id}?status=2";

//------------------------------------------------------------------------------------------------------------------------------
//* Rating APIs
export const API_GET_RATING_STAR = "/ratings/id?id={id}";
export const API_POST_RATING = "ratings/send-rating";

//------------------------------------------------------------------------------------------------------------------------------
//* Report APIs
export const API_POST_REPORT = "/reports/send-report";
export const API_GET_ALL_REPORTS =
  "/reports/all?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_APPROVE_REPORT_MOD = "/reports/status/{id}?status=1";
export const API_DENY_REPORT_MOD = "/reports/status/{id}?status=2";

//------------------------------------------------------------------------------------------------------------------------------
//* User APIs
//TODO login, register, update user info, ban account, get seller profile
export const API_LOGIN = "/users/login";
export const API_REGISTER = "/users/register";
export const API_USER_PROFILE_ID = "/users/{id}";
export const API_UPDATE_PROFILE = "/users/update-account";
export const API_CHANGING_PASSWORD = "/users/Changing-Password";

// Admin manage moderator
export const API_GET_ALL_USER_LIST =
  "/users/list-users?PageIndex={PageIndex}&PageSize={PageSize}";
export const API_CREATE_MODERATOR_ACCOUNT = "/users/CreateAccount";
export const API_PATCH_STATUS_MODERATOR = "/users/status/{id}?status={status}";
