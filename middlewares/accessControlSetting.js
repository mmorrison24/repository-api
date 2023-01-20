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
//TODO needs to get more cleaner, and more documentation
let grantsObject = {
  public: {
    ac_user: {
      "create:own": ["*"],
    },
    language: {
      "update:own": ["*"],
    },
  },

  manager: {
    ac_user: crudAny,
    rc_notification: cruAny,
    sa_category: crudAny,
    pr_prospect: cruAny,
    quote_draft: cruAny,
    quote_submitted: cruAny,
    quote_validated: cruAny,
    quote_sent: cruAny,
    sa_agreement: cruAny,
    co_sector: cruAny,
    co_objectif: cruAny,
    pr_activity: cruAny,
    co_team: cruAny,
    agreement_draft: cruAny,
    agreement_submitted: cruAny,
    agreement_validated: cruAny,
    agreement_sent: cruAny,
    statistics: cruAny,
    rc_sales: cruAny,

    co_commercial: cruAny,
    sa_subscription: cruAny,
    sa_subscription_submitted: cruAny,
    sa_discount: cruAny,
    pr_contact: cruAny,
    sa_invoice: cruAny,
    sa_quote: cruAny,
    invoiceDraft: cruAny,
    invoiceSubmitted: cruAny,
    invoiceValidated: cruAny,
    invoiceSent: cruAny,
    invoiceReceivedDraft: cruAny,
    invoiceReceivedDraftSubmitted: cruAny,
    invoiceReceived: cruAny,
    invoicePaidDraftSubmitted: cruAny,
    invoicePaidDraft: cruAny,
    invoicePaid: cruAny,
    pr_reminder: cruAny,
    pr_holding: cruAny,
    re_request: cruAny,

    rc_ticket: cruAny,
    re_request_approved: cruAny,
    rc_connexion: rAny,
    co_company: cruAny,

    rc_copy: crudAny,
    rc_search: crudAny,
    rc_share: crudAny,

    prospects_transfer: cruAny,
  },

  admin: {
    ac_user: crudAny,
    rc_notification: cruAny,
    co_company: cruAny,
    co_subscription: cruAny,
    rc_ticket: crudAny,
    filters: rAny,
    lg_text: crudAny,
    lg_text_type_class_legislation: { "read:any": ["*"] },
    lg_text_type_class_regulations: { "read:any": ["*"] },
    lg_text_type_class_decisions: { "read:any": ["*"] },
    lg_text_type_class_codes: { "read:any": ["*"] },
    lg_sector: crudAny,
    lg_sub_sector: crudAny,
    lg_thematic: crudAny,
    lg_type: crudAny,
    or_organism: crudAny,
    or_country: { ...rAny, ...uAny, ...cAny },
    re_request: crudAny,
    rc_copy: crudAny,
    rc_share: crudAny,
    rc_search: crudAny,
    rc_text: crudAny,
    rc_read: crudAny,
    rc_connexion: crudAny,
    rc_password: crudAny,
    or_sub_organism: crudAny,
    ac_team: cruAny,
    co_commercial: cruAny,
    pr_prospect: cruAny,
    sa_subscription: cruAny,
    sa_discount: cruAny,
    pr_contact: cruAny,
    sa_invoice: cruAny,
    sa_quote: cruAny,
    invoiceDraft: cruAny,
    invoiceSubmitted: cruAny,
    invoiceValidated: cruAny,
    invoiceSent: cruAny,
    invoiceReceivedDraft: cruAny,
    invoiceReceivedDraftSubmitted: cruAny,
    invoiceReceived: cruAny,
    invoicePaidDraftSubmitted: cruAny,
    invoicePaidDraft: cruAny,
    invoicePaid: cruAny,
    co_team: cruAny,
    co_sector: cruAny,
    co_objectif: cruAny,
    pr_activity: cruAny,
    pr_reminder: cruAny,
    pr_holding: cruAny,
    not_active: cruAny,
    deleted: cruAny,
    statistics: cruAny,

    aggregated_report: cruAny,
    //? JTROI
    bu_budget: cruAny,
    br_brouillard_revert_validation: uAny,
  },

  departmentManager: {
    // user
    ac_user: { "update:own": ["*"], "read:own": ["*"] },
    // data
    de_department: { "read:own": ["*"], "update:own": ["*"] },
    pu_purchaseRequest: { "create:own": ["*"], "read:own": ["*"], "update:own": ["*"] },
    pr_product: rAny,
  },
};

const accessControl = new AccessControl(grantsObject);
/**
 * set roles inheritance
 */

accessControl.extendRole("admin", "public");

//Leen roles inheritance logic admin-->manager-->commercialSenior-->commercialJunior
accessControl.extendRole("admin", "manager");

module.exports = accessControl;
