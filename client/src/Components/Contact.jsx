import Swal from "sweetalert2";
import { useState } from "react";

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    description: '',
  });

  const handleContact = (event) => {
    setContact({
      ...contact,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (contact.name === '' || contact.description === '') {
      Swal.fire({
        title: "Error",
        text: "Completa los campos",
        icon: 'error',
      });
    } else {
      Swal.fire({
        title: "Envío exitoso",
        text: "¡Gracias por comunicarte con nosotros!",
        icon: 'success',
      });

      setContact({
        name: '',
        description: '',
      });
    }
  };

  return (
    <form className="w-2/3 max-w-lg p-8 bg-white rounded-lg shadow-md mx-auto mt-10" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre:</label>
        <input type="text" id="name" value={contact.name} onChange={handleContact} className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción:</label>
        <textarea id="description" rows={4} value={contact.description} onChange={handleContact} className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"></textarea>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-gradient-to-tl from-purple-500 to-indigo-600 text-white font-bold py-2 px-8 rounded">Enviar</button>
      </div>
    </form>
  );
};

export default Contact;