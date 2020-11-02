const cidrValidator = RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(/([0-9]|[1-2][0-9]|3[0-2]))?$');

const isValidCIDR = (value) => cidrValidator.test(value);

export const cidrValidation = (value) => ({ valid: isValidCIDR(value), message: 'Not valid CIDR format'});
