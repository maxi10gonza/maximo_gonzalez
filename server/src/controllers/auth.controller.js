import { database } from "../db/database.js";
import { createJwt } from "../helpers/createJwt.js";
import { createUser, getUserByCredentials } from "../models/user.model.js";

export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      const user = database.user.find((user) => user.email === email && user.password === password);

      if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      const token = await generarJwt(user.id);
  
      req.session.token = token;
  
      res.cookie("authToken", token, {
        httpOnly: true, 
        secure: false, 
        maxAge: 3600000, 
      });
  
      return res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error Inesperado" });
    }

    } catch (error) {
        console.error(error);
      return res.status(500).json({ message: "Error Inesperado" });
      }
    };
    

export const signUpCtrl = (req, res) => {
  const { email, password, username } = req.body;

  const existingUser = database.user.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "El email ya está registrado" });
  }

  const newUser = {
    id: crypto.randomUUID(), 
    username,
    email,
    password, 
  };

  database.user.push(newUser);
  const token = createJwt(newUser.id);
  res.status(201).json({ message: "Registro exitoso", token, user: newUser });
};


export const signOutCtrl = async (req, res) => {
  try {
    req.session.token = null;

    res.clearCookie("authToken");

    return res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al cerrar la sesión" });
  }
};


export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
