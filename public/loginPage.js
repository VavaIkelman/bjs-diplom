"use strict"
const userForm = new UserForm();
userForm.loginFormCallback = userForm.getData(userForm.loginForm);
userForm.registerFormCallback = userForm.getData(userForm.registerForm);