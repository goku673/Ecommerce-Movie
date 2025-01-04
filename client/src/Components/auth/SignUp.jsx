import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import { useSignUpMutation } from "../../Redux/api/authApi";

const FormSignUp = (props) => {
  const { handleGotoForm } = props;
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isGoogle : false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isGoogle : false
    })
    setTimeout(() => {},1000);
    handleGotoForm("signIn");
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userInfo = await response.json();
      await signUp({
        name: userInfo.name,
        email: userInfo.email,
        image_profile : userInfo.picture,
        password : "",
        isGoogle : true
      });
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token recibido:", tokenResponse);
      await fetchUserInfo(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Error al iniciar sesión con Google:", error);
    },
  });

  return (
    <div className="">
      <div className="max-w-md w-full space-y-8  p-1 sm:p-10">
        <h2 className="mt-6 text-center text-4xl font-bold text-white tracking-wide">
          Crea tu cuenta
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                />
                <PersonIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  style={{ fontSize: 20 }}
                />
              </div>
            </div>

            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
              <EmailIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                style={{ fontSize: 20 }}
              />
            </div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <LockIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                style={{ fontSize: 20 }}
              />
            </div>

            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <LockIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                style={{ fontSize: 20 }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">
                O continúa con
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
              onClick={login}
            >
              <GoogleIcon className="mr-2" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
