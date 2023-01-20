const signupErrors = {
    WRONG_EMAIL: "WRONG_EMAIL",
    WRONG_DOMAIN_EMAIL: "WRONG_DOMAIN_EMAIL",
    EMAIL_EXIST: "EMAIL_EXIST",
    TEL_EXIST: "TEL_EXIST",
    PHONE_NUMBER_IS_REQUIRED: "PHONE_NUMBER_IS_REQUIRED",
    FIRSTNAME_IS_REQUIRED: "FIRSTNAME_IS_REQUIRED",
    LASTNAME_IS_REQUIRED: "LASTNAME_IS_REQUIRED",
    PASSWORD_REQUIRED: "PASSWORD_REQUIRED",
    EMAIL_IS_REQUIRED: "EMAIL_IS_REQUIRED",
    ERROR_PASSWORD_INVALID: "ERROR_PASSWORD_INVALID",
    PHONE_NUMBER_ALREADY_EXISTS: "PHONE_NUMBER_ALREADY_EXISTS",
    PHONE_NUMBER_IS_INVALID: "PHONE_NUMBER_IS_INVALID",
};

const loginErrors = {
    WRONG_EMAIL: "WRONG_EMAIL",
    EMAIL_DOES_NOT_EXIST: "EMAIL_DOES_NOT_EXIST",
    PASSWORD_INCORRECT: "PASSWORD_INCORRECT",
    OLD_PASSWORD_INCORRECT: "OLD_PASSWORD_INCORRECT",
    CONFIRM_PASSWORD_INCORRECT: "CONFIRM_PASSWORD_INCORRECT",
    EMAIL_NOT_CONFIRMED: "EMAIL_NOT_CONFIRMED",
    WRONG_TOKEN: "WRONG_TOKEN",
    UNABLE_TO_SEND_EMAIL: "UNABLE_TO_SEND_EMAIL",
    ALREADY_CONNECTED_IN_OTHER_DEVICE: "ALREADY_CONNECTED_IN_OTHER_DEVICE",
};

const updateError = {
    WRONG_ID: "WRONG_ID",
    DUPLICATED_DATA: "DUPLICATED_DATA",
    ELEMENT_DOES_NOT_EXIT: "ELEMENT_DOES_NOT_EXIT",
    USER_DOES_NOT_EXIT: "USER_DOES_NOT_EXIT",
    ACCESS_FORBIDDEN: "ACCESS_FORBIDDEN",
    NOT_AUTHORIZED_ACTION: "NOT_AUTHORIZED_ACTION",
    REQUEST_ALREADY_SENT: "REQUEST_ALREADY_SENT",
    NOT_PERMITTED_ACTION: "THIS ACTIONS IS NOT PERMITTED",
};

const verificationErrors = {
    EMAIL_DOES_NOT_EXIST: "EMAIL_DOES_NOT_EXIST",
    EMAIL_ALREADY_CONFIRMED: "EMAIL_ALREADY_CONFIRMED",
};

const generalErrors = {
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    COULD_NOT_UPLOAD_THE_FILE: "COULD_NOT_UPLOAD_THE_FILE",
    UNAUTHORIZED: "UNAUTHORIZED",
};

const userErrors = {
    USER_HAS_NO_ROLES: "USER_HAS_NO_ROLES",
    FILE_UPLOAD_ONLY_SUPPORTS_THE_FOLLOWING_FILETYPES: "FILE_UPLOAD_ONLY_SUPPORTS_THE_FOLLOWING_FILETYPES",
    WRONG_ROLES: "WRONG_ROLES",
    PLEASE_PROVIDE_AN_IMAGE: "PLEASE_PROVIDE_AN_IMAGE",
};

const adminErrors = {
    YOU_HAVE_NO_ACCESS: "YOU_HAVE_NO_ACCESS",
    WRONG_EMAIL: "WRONG_EMAIL",
};

const updatePassword = {
    ERROR_PASSWORD_CONFIRMATION: "ERROR_PASSWORD_CONFIRMATION",
    PASSWORD_ALREADY_USED_BEFORE: "PASSWORD_ALREADY_USED_BEFORE",
    NEW_PASSWORD_IS_REQUIRED: "NEW_PASSWORD_IS_REQUIRED",
};

module.exports = {
    signupErrors,
    loginErrors,
    updateError,
    verificationErrors,
    generalErrors,
    userErrors,
    adminErrors,
    updatePassword,
};
