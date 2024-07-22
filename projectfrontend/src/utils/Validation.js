export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return emailPattern.test(email);
  };
  
  export const validateName = (name) => {
    const namePattern = /^[A-Za-z]+(([' -][A-Za-z])?[A-Za-z]*)*$/;
    return namePattern.test(name);
  };

  export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return passwordPattern.test(password);
  };