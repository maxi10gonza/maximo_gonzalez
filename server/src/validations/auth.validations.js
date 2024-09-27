import { body } from "express-validator";

export const signUpValidation = [
  body("username").isString(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const signInValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];


export const createOrderValidation = [
  body("productId")
    .isString().withMessage("El ID del producto debe ser una cadena de texto")
    .notEmpty().withMessage("El ID del producto es obligatorio"),
  body("quantity")
    .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo")
    .notEmpty().withMessage("La cantidad es obligatoria"),
  body("address")
    .isString().withMessage("La dirección debe ser una cadena de texto")
    .notEmpty().withMessage("La dirección es obligatoria"),
];

export const updateOrderValidation = [
  body("status")
    .isIn(["pending", "shipped", "delivered", "canceled"]).withMessage("El estado de la orden no es válido")
    .notEmpty().withMessage("El estado es obligatorio"),
];

