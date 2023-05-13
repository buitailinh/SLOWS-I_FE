export function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  }

export function validatePhone(phone) {
    const regex = /^(\+?84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9]|1[2-9][0-9])[0-9]{7}$/;
    return regex.test(phone);
}

export function validateEmail(email) {
    const regex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    return regex.test(email);
}