import { Router } from "express";
import {
  createOrderCtrl,
  getOrdersCtrl,
} from "../controllers/order.controller.js";
import {getOrderByIdCtrl,
  deleteOrderByIdCtrl} from "../models/order.model.js"
import { validateJwt } from "../middlewares/validateJwt.js"; 
import {
  createOrderValidation,
} from "../validations/auth.validations.js"; 
import { applyValidations } from "../validations/apply.validations.js"; 

const ordersRouter = Router();

ordersRouter.get("/", validateJwt, getOrdersCtrl);
ordersRouter.post("/", validateJwt, createOrderValidation, applyValidations, createOrderCtrl);
ordersRouter.get("/:id", validateJwt, createOrderValidation, applyValidations, getOrderByIdCtrl);
ordersRouter.delete("/:id", validateJwt, createOrderValidation, applyValidations, deleteOrderByIdCtrl);


export { ordersRouter };

