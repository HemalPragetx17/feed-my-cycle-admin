// API END Points
import * as constants from "../utils/constants";
/**---------------Authentication------------------------------ */
export const LOGIN = "admin/login" + " " + constants.POST_RAW;
export const LOGOUT = "admin/logout" + " " + constants.POST_RAW;
export const AUTH = {
    FORGOT_PASSWORD: "admin/password/forgot" + " " + constants.POST_RAW,
    RESET_PASSWORD: "admin/password/reset" + " " + constants.POST_RAW,
    CHANGE_PASSWORD: "admin/password/change" + " " + constants.PATCH,
};

export const DASHBOARD = {
    GET_STATISTICS: "admin/dashboard" + " " + constants.GET,
};

export const USERMANAGEMENT = {
    GET_USERS: "admin/manage-buyers/list" + " " + constants.GET_URL_PARAMS,
    GET_USER_DETAILS: "admin/manage-buyers/details" + " " + constants.GET_ID_PARAMS,
    UPDATE_STATUS: "admin/manage-users/activate-deactivate" + " " + constants.PATCH_ID,
};

export const BLOG = {
    GET_BLOGS: "admin/blog" + " " + constants.GET_URL_PARAMS,
    GET_BLOG_DETAILS: "admin/blog" + " " + constants.GET_ID_PARAMS,
    ADD_BLOG: 'admin/blog/create' + ' ' + constants.POST_FORM,
    EDIT_BLOG: 'admin/blog/update' + ' ' + constants.PATCH_FORM_ID,
    DELETE_BLOG: 'admin/blog/delete' + ' ' + constants.DELETE_ID_PARAMS,
    UPDATE_STATUS: 'admin/blog/update-status' + ' ' + constants.PATCH_ID,
};

export const CMS = {
    GET_TERMS_AND_CONDITIONS: "default/terms-conditions" + " " + constants.GET,
    ADD_TERMS_AND_CONDITIONS: "admin/terms-conditions" + " " + constants.POST_RAW,
    GET_PRIVACY_POLICY: "default/privacy-policy" + " " + constants.GET,
    ADD_PRIVACY_POLICY: "admin/privacy-policy" + " " + constants.POST_RAW,
    GET_ABOUT_US: "default/about-us" + " " + constants.GET,
    ADD_ABOUT_US: "admin/about-us" + " " + constants.POST_RAW,
    GET_OVERVIEW: "default/overview" + " " + constants.GET,
    ADD_OVERVIEW: "admin/overview" + " " + constants.POST_RAW,
    GET_INSTRUCTION: "default/instruction" + " " + constants.GET,
    ADD_INSTRUCTION: "admin/instruction" + " " + constants.POST_RAW,
    GET_CYCLE_STAGES: "default/cycle-stage" + " " + constants.GET,
    ADD_CYCLE_STAGES: "admin/cycle-stage" + " " + constants.POST_RAW,
    GET_CONTACT_US: "admin/contact-us" + " " + constants.GET_URL_PARAMS,
    GET_FAQ: 'default/faq/list' + ' ' + constants.GET_URL_PARAMS,
    ADD_FAQ: 'admin/faq/add' + ' ' + constants.POST_RAW,
    EDIT_FAQ: 'admin/faq/update' + ' ' + constants.PATCH_ID,
    DELETE_FAQ: 'admin/faq/delete' + ' ' + constants.DELETE_ID_PARAMS,
};

export const DEFAULT_OPTIONS = {
    GET_DEFAULT_OPTIONS: 'admin/list-default-option' + ' ' + constants.GET_URL_PARAMS,
    ADD_DEFAULT_OPTION: 'admin/add-default-option' + ' ' + constants.POST_RAW,
    EDIT_DEFAULT_OPTION: 'admin/update-default-option' + ' ' + constants.PATCH_ID,
    DELETE_DEFAULT_OPTION: 'admin/delete-default-option' + ' ' + constants.DELETE_ID_PARAMS,
};

export const MOTIVATIONAL_QUOTES = {
    GET_MOTIVATIONAL_QUOTES: 'admin/motivational-quotes' + ' ' + constants.GET_URL_PARAMS,
    IMPORT_MOTIVATIONAL_QUOTES: 'admin/motivational-quotes' + ' ' + constants.POST_RAW,
    ADD_MOTIVATIONAL_QUOTES: 'admin/motivational-quotes/create' + ' ' + constants.POST_FORM,
    EDIT_MOTIVATIONAL_QUOTES: 'admin/motivational-quotes/update' + ' ' + constants.PATCH_ID,
    DELETE_MOTIVATIONAL_QUOTES: 'admin/motivational-quotes/delete' + ' ' + constants.DELETE_ID_PARAMS,
};