import { passwordListRegexp } from "../constants/passwordCommonList.js";

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const checkNull = (text) => text.length !== 0;

export const checkEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

export const checkNoSpace = (text) => /^\S+$/.test(text);

export const checkLowerCase = (text) => /^[^A-Z]*$/.test(text);

export const checkTextRange = (text, min, max) => {
  const rangeRegex = `^.{${min},${max}}$`;
  return RegExp(rangeRegex).test(text);
};

export const checkPassword = (text) =>
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])(?=.*\d).+$/.test(text);

export const checkUppercase = (text) => /^(.*[A-Z]){2,}.*$/.test(text);
export const checkNumber = (text) => /^(.*\d){2,}.*$/.test(text);
export const checkSpecial = (text) => /^(.*[^a-zA-Z0-9]){2,}.*$/.test(text);
export const checkPasswordList = (text) => !passwordListRegexp.test(text);

export const checkPhoneNumber = (text) => /^0\d{9}$/.test(text);

export const checkDOB = (text) =>
  /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19[0-9]{2}|200[0-7])$/.test(
    text
  );
