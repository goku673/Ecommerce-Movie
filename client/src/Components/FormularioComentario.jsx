import React, { useState } from 'react';

const FormularioComentario = ({ onSubmit, idUser }) => {
  const [nuevoComentario, setNuevoComentario] = useState('');

  const manejarComentario = (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() === '') return;

    const nuevoComentarioObj = {
      comentario: nuevoComentario,
      user_id: idUser
    };

    onSubmit(nuevoComentarioObj);
    setNuevoComentario('');
  };

  return (
    <form onSubmit={manejarComentario} className="mt-8 space-y-4">
      <textarea
        className="w-full p-4 border border-blue-500/30 bg-gray-800/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out resize-none"
        rows="4"
        placeholder="Escribe tu comentario ... :)"
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
      />
      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
      >
        Enviar Comentario
      </button>
    </form>
  );
};

export default FormularioComentario;


