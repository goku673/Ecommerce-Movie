
import Comentario from './CardComentario';
import FormularioComentario from './formComentario';
import { useGetReseniasQuery, usePostReseniasMutation } from '../Redux/api/ReseniasApi';
import { useSelector } from 'react-redux';
import Button from './common/Button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Resenias = () => {
   const navigate = useNavigate();
   const { data: reseniasData, refetch } = useGetReseniasQuery();
   const [newResenia] = usePostReseniasMutation();
   const idUser = useSelector((state) => state.userState.user.id);

  const agregarComentario = async (nuevoComentario) => {
     await newResenia(nuevoComentario);
     refetch();
  };
  const handleOnClick = () => {
       navigate('/main')
  }
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl border border-blue-500/20">
        <Button 
            onClick={handleOnClick}
        >
        <X className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white hover:w-7 hover:h-7 hover:from-purple-300"/>
        </Button>
      <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Reseñas 
      </h2>
      <div className="max-h-96 overflow-y-auto space-y-4 border border-blue-500/30 rounded-xl p-6 bg-gray-800/50 backdrop-blur-sm shadow-inner">
        {reseniasData?.map((resena) => (
          <Comentario key={resena.id} comentario={resena} idUser={idUser} />
        ))}
      </div>
      <FormularioComentario onSubmit={agregarComentario} idUser={idUser}/>
    </div>
  );
};

export default Resenias;