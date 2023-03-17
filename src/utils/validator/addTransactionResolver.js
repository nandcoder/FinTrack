import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const addTransactionSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Title is required field";
                } else if (err.code === "string.min") {
                    err.message = "Title must be at least 3 characters long";
                } else if (err.code === "string.max") {
                    err.message = "Title must be less than or equal to 30 characters long";
                }
            });
            return errors;
        }),
    desc: Joi.string().optional()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Add a description";
                }
            });
            return errors;
        }),
    amount: Joi.number()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Amount is required"
                }
            })
        }),
    payer: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "dev", "co", "in"] },
        })
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Email is required field";
                } else if (err.code === "string.email") {
                    err.message = "Please Enter a valid email";
                }
            });
            return errors;
        }),
    involved: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "dev", "co", "in"] },
        })
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Email is required field";
                } else if (err.code === "string.email") {
                    err.message = "Please Enter a valid email";
                }
            });
            return errors;
        }),
});

export const addTransactionResolver = joiResolver(addTransactionSchema);
