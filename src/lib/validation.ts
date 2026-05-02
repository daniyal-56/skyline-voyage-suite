export type ValidationResult<T extends string> = Partial<Record<T, string>>;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values: { email: string; password: string }) {
  const errors: ValidationResult<"email" | "password"> = {};

  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";

  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 6) errors.password = "Password must be at least 6 characters.";

  return errors;
}

export function validateSignup(values: {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}) {
  const errors: ValidationResult<
    "name" | "email" | "phone" | "password" | "confirmPassword" | "acceptedTerms"
  > = {};

  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[+\d\s().-]{7,}$/.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (values.password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords must match.";
  if (!values.acceptedTerms) errors.acceptedTerms = "Accept the terms to continue.";

  return errors;
}

export function validatePayment(values: {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  billingAddress: string;
}) {
  const errors: ValidationResult<
    "cardholder" | "cardNumber" | "expiry" | "cvv" | "billingAddress"
  > = {};
  const digits = values.cardNumber.replace(/\D/g, "");

  if (values.cardholder.trim().length < 2) errors.cardholder = "Cardholder name is required.";
  if (digits.length < 13 || digits.length > 19) errors.cardNumber = "Enter a valid card number.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry.trim())) errors.expiry = "Use MM/YY format.";
  if (!/^\d{3,4}$/.test(values.cvv.trim())) errors.cvv = "Enter a valid CVV.";
  if (values.billingAddress.trim().length < 8)
    errors.billingAddress = "Billing address is required.";

  return errors;
}
