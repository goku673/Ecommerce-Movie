import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from "@mui/icons-material/Google";
import { useSignUpMutation } from "../../Redux/api/authApi";
import { setUser } from "../../Redux/slice/userSliece";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormSignUp = (props) => {
  const navigate = useNavigate();
  const { handleGotoForm } = props;
  const dispatch = useDispatch();
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const [errors, setErrors] = useState({});
  const [errorResponse, setErrorResponse] = useState("");
  const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image_profile: "",
        confirmPassword: "",
        isGoogle: false,
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
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const response = await signUp(formData);
      setErrorResponse("");
      if (response.error) {
        setErrorResponse(response.error.data.error);
        return;
      }
     
      setFormData({
        name: "",
        email: "",
        password: "",
        image_profile: "",
        confirmPassword: "",
        isGoogle: false,
      });
      
      handleGotoForm("signIn");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfo = await response.json();
      const objUserInfo = {
        name: userInfo.name,
        email: userInfo.email,
        image_profile: userInfo.picture,
        password: "",
        isGoogle: true,
      }
      const responseDB =  await signUp(objUserInfo);
      dispatch(setUser(responseDB?.data));
      
      localStorage.setItem("user", JSON.stringify(responseDB?.data));
      navigate("/main");
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await fetchUserInfo(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Error al iniciar sesión con Google:", error);
    },
  });

  return (
    <div className="">
      <div className="max-w-md w-full space-y-8 p-1 sm:p-10">
        <h2 className="mt-6 text-center text-4xl font-bold text-white tracking-wide">
          Crea tu cuenta
        </h2>
          <h1 className="text-red-500">{isLoading? "Registrando...": ""}</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {errorResponse  && (
              <p className="text-red-600 font-bold">{errorResponse}</p>
            )}
          <div className="rounded-md shadow-sm space-y-4">
            {isError && error?.data?.message && (
              <p className="text-red-600 font-bold">{error.data.message}</p>
            )}

            <div className="mb-4">
              <label htmlFor="username" className="sr-only">
                Nombre de usuario
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-4 pr-8 py-3 bg-purple-900/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  placeholder="Nombre de usuario"
                  value={formData.name}
                  onChange={handleChange}
                />
                <PersonIcon
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                  style={{ fontSize: 20 }}
                />
              </div>
            </div>

            <div>
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
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
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
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
              <span className="px-2 bg-gray-800 text-gray-400">O continúa con</span>
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
