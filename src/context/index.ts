import { Context } from "../interfaces";
import { models } from "../models";

export const context: Context = {
    models,
    secret: `${process.env.JWT_SECRET}`
}