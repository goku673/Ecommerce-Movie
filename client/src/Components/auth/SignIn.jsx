import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from '@mui/icons-material/Lock'; 
import { useLogInMutation } from "../../Redux/api/authApi";

const FormSignIn = (props) => {
  const [login, { isLoading, isError, error }] = useLogInMutation();

  const { handleGotoForm } = props;
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    // Resetear los valores del formulario
     await login(credentials);
    setCredentials({ email: "", password: "" });
    // Redireccionar a la página principal o al dashboard según sea el caso
  };

  return (
    <div >  
    <form onSubmit={handleOnSubmit}>
      <div className="flex flex-col space-y-6">
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={handleOnChange}
            className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <EmailIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
            style={{ fontSize: 20 }}
          />
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleOnChange}
            className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <LockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400" style={{ fontSize: 20 }} />
        </div>
        <button type="submit"  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium transition-all duration-200 flex items-center justify-center">
          Iniciar sesión
          </button>
      </div>
    </form>
      {/* Link para ir a la página de registro */}
      <p className="text-center text-sm text-gray-500">
        ¿No tienes una cuenta? <button onClick={() => handleGotoForm("signUp")}>registrate</button>
      </p>
    </div>
  );
};

export default FormSignIn;
