// src/App.jsx
import { useEffect } from "react";
import { initEmailService } from "./services/emailService";
import ContactForm from "./components/ContactForm";
import "./App.css"; // Asegúrate de tener un archivo CSS para estilos
// src/App.jsx

function App() {
  useEffect(() => {
    initEmailService(); // Inicializa EmailJS
  }, []);

  return (
    <div className="app-container">
      <h1>Formulario de Contacto</h1>
      <ContactForm />
    </div>
  );
}

export default App;
