import emailjs from "@emailjs/browser";

export const initEmailService = () => {
  emailjs.init("YOUR_PUBLIC_KEY");
};
