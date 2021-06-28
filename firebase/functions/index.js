const mergeAnonymousToExistingUser = require("./app/mergeAnonymousToExistingUser");
const onMenuDelete = require("./app/onMenuDelete");
const onSectionDelete = require("./app/onSectionDelete");
const restoreDeveloperAccount = require("./app/restoreDeveloperAccount");

exports.onSectionDelete = onSectionDelete.onSectionDelete;

exports.restoreDeveloperAccount =
  restoreDeveloperAccount.restoreDeveloperAccount;

exports.onMenuDelete = onMenuDelete.onMenuDelete;

exports.mergeAnonymousToExistingUser =
  mergeAnonymousToExistingUser.mergeAnonymousToExistingUser;
