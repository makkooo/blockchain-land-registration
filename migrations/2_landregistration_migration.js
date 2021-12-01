const LandRegistrationMigration = artifacts.require("LandRegistration");

module.exports = function (deployer) {
  deployer.deploy(LandRegistrationMigration);
};
