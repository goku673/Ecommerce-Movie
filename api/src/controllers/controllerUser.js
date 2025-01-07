const { User } = require("../db");


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
            if (!image_profile) {
              var newUser = {
                        name,
                        email,
                        password,
                        image_profile : ""
                  };
              }
            
            user = await User.create(newUser);
          } else {
            throw new Error("El email ya está registrado");
          }
        }
        return user;
  };

  const getUserDB = async (body) => {
    const userDB = await User.findOne({ where: { email : body.email } });
    if (!userDB || userDB.password != body.password) {
      throw new Error("credenciales incorrectas");
    }
    return userDB;
  };

  const getAllUsersDB = async () => {
    const users = await User.findAll();
    return users;
  }

module.exports = {
  postUserDB,
  getUserDB,
  getAllUsersDB,
};
