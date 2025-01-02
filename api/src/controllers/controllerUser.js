const { User } = require("../db");
const { use } = require("../router/userRouter");

    const postUserDB = async (body) => {
      const { isGoogle, name, email, password, image_profile } = body;
      let user = null;
         if (isGoogle) {
           user  = await User.findOne({ where: { email: email } });
              if (!user) {
               user = await User.create({ name, email, password, image_profile });
              }
          }else {
            user = await User.findOne({ where: { email: email } });
            if (!user) {
                if (!password) {
                    throw new Error("Debes ingresar una contraseña");
                }
              user = await User.create({ name, email, password });
            } else {
              throw new Error("El email ya está registrado");
            }
          }
          return user;
    };

const getUserDB = async (body) => {
  // verificar si la contraseña y el email es el mismo
  const userDB = await User.findOne({ where: { email : body.email } });
  if (!userDB || userDB.password != body.password) {
    throw new Error("credenciales incorrectas");
  }
  return userDB;
};

module.exports = {
  postUserDB,
  getUserDB,
};
