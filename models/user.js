'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {type: DataTypes.STRING, unique: true},
    is_active: {type: DataTypes.BOOLEAN, defaultValue: true},
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    return values;
  }
  return User;
};