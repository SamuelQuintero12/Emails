import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css'; // Importa los estilos aquí

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.user_name.trim()) {
      tempErrors.user_name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.user_email) {
      tempErrors.user_email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      tempErrors.user_email = "Email inválido";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "El mensaje es requerido";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "El mensaje debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      emailjs.sendForm(
        'service_soefsbl',
        'template_78f9kvt',
        form.current,
        'nQ6RosckZL4GJdwIQ'
      )
        .then(() => {
          setSubmitStatus('success');
          setFormData({
            user_name: '',
            user_email: '',
            message: ''
          });
          form.current.reset();
        }, (error) => {
          setSubmitStatus('error');
          console.error('Error al enviar email:', error.text);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Contáctame</h2>

      {submitStatus === 'success' && (
        <div className="success-message">
          ¡Mensaje enviado correctamente!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-message">
          Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo más tarde.
        </div>
      )}

      <form ref={form} onSubmit={sendEmail} className="form">
        <div className="form-group">
          <label htmlFor="user_name">Nombre Completo:</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Tu Nombre"
            value={formData.user_name}
            onChange={handleChange}
            className={errors.user_name ? "input-error" : ""}
          />
          {errors.user_name && <span className="error">{errors.user_name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="user_email">Email:</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            placeholder="Tu Email"
            value={formData.user_email}
            onChange={handleChange}
            className={errors.user_email ? "input-error" : ""}
          />
          {errors.user_email && <span className="error">{errors.user_email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tu Mensaje"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}
            rows="5"
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Enviando...' : 'Send Message'}
        </button>

        <p className="form-footer">Espero que tengas un buen dia, en un momento te responderemos</p>
      </form>
    </div>
  );
};

export default ContactForm;
