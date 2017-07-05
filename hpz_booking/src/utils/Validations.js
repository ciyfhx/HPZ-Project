var Validator = require('validator');
var isEmpty = require('lodash/isEmpty')

var validateInputLogin = function(data){
    var errors = {};

    if(Validator.isEmpty(data.username)){
      errors.username = "This field is required"
    }

    if(Validator.isEmpty(data.password)){
      errors.password = "This field is required"
    }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}


var validateInputCreateUser = function(data){
    var errors = {};

    if(Validator.isEmpty(data.username)){
      errors.username = "This field is required"
    }

    if(Validator.isEmpty(data.password)){
      errors.password = "This field is required"
    }

    if(Validator.isEmpty(data.confirmPassword)){
      errors.confirmPassword = "This field is required"
    }else if(data.confirmPassword!==data.password){
      errors.confirmPassword = "Confirm password is different from the password"
    }

    if(Validator.isInt(data.privilege.toString())){
      //errors.privilege = "This field is required"
    }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}

module.exports = {validateInputLogin, validateInputCreateUser};
