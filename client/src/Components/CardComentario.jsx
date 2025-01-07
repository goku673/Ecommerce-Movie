const Comentario = ({ comentario, idUser }) => {
    const fecha = new Date(comentario.date);
    const esAutor = idUser == comentario.user.id;

    return (
        <div
            key={comentario.id}
            className="flex flex-col sm:flex-row items-start bg-gray-900/70 p-4 sm:p-5 rounded-xl shadow-md hover:shadow-blue-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
            <img
                src={comentario.user.image_profile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s"}
                alt={comentario.user.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-3 sm:mb-0 sm:mr-4 border-2 border-blue-400 shadow-md"
            />
            <div className="flex-grow w-full sm:w-auto">
                <div className="flex flex-wrap items-center mb-2">
                    <span className="font-semibold text-blue-300 mr-3 text-xs sm:text-sm">{comentario.user.name}</span>
                    <span className="text-gray-500 text-xs sm:text-sm">{fecha.toLocaleDateString()}</span>
                    {esAutor && (
                        <span className="ml-auto mt-1 sm:mt-0 px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                            Autor
                        </span>
                    )}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{comentario.comentario}</p>
            </div>
        </div>
    );
};

export default Comentario;
