"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UICheckBox = exports.UISelectBox = exports.UIPasswordInput = exports.UITEmailInput = exports.UITextInput = void 0;
var UITextInput = function (label, placeholder, name, value) {
    if (value === void 0) { value = ""; }
    return { type: "text", label: label, data: placeholder, name: name, value: value };
};
exports.UITextInput = UITextInput;
var UITEmailInput = function (label, placeholder, name, value) {
    if (value === void 0) { value = ""; }
    return { type: "email", label: label, data: placeholder, name: name, value: value };
};
exports.UITEmailInput = UITEmailInput;
var UIPasswordInput = function (label, placeholder, name, value) {
    if (value === void 0) { value = ""; }
    return { type: "password", label: label, data: placeholder, name: name, value: value };
};
exports.UIPasswordInput = UIPasswordInput;
var UISelectBox = function (label, options, name, value) {
    if (value === void 0) { value = ""; }
    return { type: "select", label: label, data: options, name: name, value: value };
};
exports.UISelectBox = UISelectBox;
var UICheckBox = function (label, name, value) {
    if (value === void 0) { value = false; }
    return { type: "checkbox", label: label, name: name, value: value };
};
exports.UICheckBox = UICheckBox;
