import _ from 'lodash';

export const isValidEmailChars = email => {
  const filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return filter.test(email);
};

export const isValidPasswordRequiredChars = password => {
  const filter = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{0,}$/;
  return filter.test(password);
};

export const isValidPasswordInvalidChars = password => {
  const filter = /^(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{0,}$/;
  return !filter.test(password);
};

export const isValidLoginInvalidChars = password => {
  const filter = /^(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{0,}$/;
  return !filter.test(password);
};

export const isValidLength = (text, minLength, maxLength) => {
  return text
    ? maxLength
      ? text.length >= minLength && text.length <= maxLength
      : text.length >= minLength
    : false;
};

export const isValidLogin = login => {
  return (
    isValidLength(login, 0) &&
    isValidLength(login, 5) &&
    isValidLoginInvalidChars(login)
  );
};

export const helperTextLogin = (
  login,
  errorRequired,
  errorLoginLength,
  errorLoginInvalidChars,
) => {
  return !isValidLoginInvalidChars(login) && isValidLength(login, 0)
    ? errorLoginInvalidChars
    : !isValidLength(login, 5) && isValidLength(login, 0)
    ? errorLoginLength
    : errorRequired;
};

export const isValidEmail = email => {
  return isValidLength(email, 0) && isValidEmailChars(email);
};

export const helperTextEmail = (email, errorRequired, errorEmail) => {
  return !isValidEmailChars(email) && isValidLength(email, 0)
    ? errorEmail
    : errorRequired;
};

export const isValidPassword = password => {
  return (
    isValidLength(password, 0) &&
    isValidLength(password, 8) &&
    isValidPasswordRequiredChars(password) &&
    isValidPasswordInvalidChars(password)
  );
};

export const isValidNewPassword = (oldPassword, newPassword) => {
  return (
    isValidLength(newPassword, 0) &&
    isValidLength(newPassword, 8) &&
    isValidPasswordRequiredChars(newPassword) &&
    isValidPasswordInvalidChars(newPassword) &&
    !_.isEqual(oldPassword, newPassword)
  );
};

export const helperTextPassword = (
  password,
  errorRequired,
  errorPasswordLength,
  errorPasswordInvalidChars,
  errorPasswordRequiredChars,
) => {
  return !isValidPasswordInvalidChars(password) && isValidLength(password, 0)
    ? errorPasswordInvalidChars
    : !isValidLength(password, 8) && isValidLength(password, 0)
    ? errorPasswordLength
    : !isValidPasswordRequiredChars(password) && isValidLength(password, 0)
    ? errorPasswordRequiredChars
    : errorRequired;
};

export const helperTextNewPassword = (
  oldPassword,
  newPassword,
  errorRequired,
  errorPasswordLength,
  errorPasswordInvalidChars,
  errorPasswordRequiredChars,
  errorEqualsPasswords,
) => {
  return !isValidPasswordInvalidChars(newPassword) &&
    isValidLength(newPassword, 0)
    ? errorPasswordInvalidChars
    : !isValidLength(newPassword, 8) && isValidLength(newPassword, 0)
    ? errorPasswordLength
    : !isValidPasswordRequiredChars(newPassword) &&
      isValidLength(newPassword, 0)
    ? errorPasswordRequiredChars
    : _.isEqual(oldPassword, newPassword) && isValidLength(newPassword, 0)
    ? errorEqualsPasswords
    : errorRequired;
};

export const isValidConfirmPassword = (password, confirmPassword) => {
  return (
    _.isEqual(confirmPassword, password) && isValidLength(confirmPassword, 0)
  );
};

export const helperTextConfirmPassword = (
  password,
  confirmPassword,
  errorRequired,
  errorPasswordConfirm,
) => {
  return !_.isEqual(password, confirmPassword) &&
    isValidLength(confirmPassword, 0)
    ? errorPasswordConfirm
    : errorRequired;
};
