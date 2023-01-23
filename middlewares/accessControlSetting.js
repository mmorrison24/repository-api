const AccessControl = require("accesscontrol");
/**
 * this is Role Based Access Control configuration
 */
let cAny = {
  "create:any": ["*"],
};
let rAny = {
  "read:any": ["*"],
};
let uAny = {
  "update:any": ["*"],
};
let dAny = {
  "delete:any": ["*"],
};
let cruAny = {
  ...cAny,
  ...rAny,
  ...uAny,
};

let crudAny = {
  ...cruAny,
  ...dAny,
};
let grantsObject = {
  public: {
    ac_user: {
      "create:own": ["*"],
    },
  },

  manager: {
    ac_user: crudAny,
  },

  admin: {
    ac_user: crudAny,
  },
  user: {
    ac_user: crudAny,
  },
  guest: {},
  hotel_manager: {},
};

const accessControl = new AccessControl(grantsObject);
/**
 * set roles inheritance
 */

accessControl.extendRole("admin", "public");
accessControl.extendRole("admin", "user");
accessControl.extendRole("admin", "manager");
accessControl.extendRole("manager", "user");
accessControl.extendRole("manager", "public");
accessControl.extendRole("user", "public");
accessControl.extendRole("guest", "public");
accessControl.extendRole("hotel_manager", "guest");

module.exports = accessControl;
