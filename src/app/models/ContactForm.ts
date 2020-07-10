export interface ContactForm {
  email: string;
  phone: string;
  title: string;
  content: string;
}

export const EMPTY_CONTACT_FORM: ContactForm = {
  email: '',
  phone: '',
  title: '',
  content: '',
};
