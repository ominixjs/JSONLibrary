//============ Utils
import ValidationDataInput from "../utils/ValidationDataInput.js";
import AppError from "../utils/AppError.js";

// Validar campos de entrada
export default function ValidateInputs(array) {
    // Valida propriedades
    Object.entries(array).forEach(([field, value]) => {
        switch (field) {
            case "name":
                {
                    const validName = ValidationDataInput.ValidateName(value);
                    if (!validName.success) {
                        throw new AppError(
                            validName.error.issues[0].message,
                            422
                        );
                    }
                }
                break;

            case "url":
                {
                    const validUrl = ValidationDataInput.ValidateUrl(value);
                    if (!validUrl.success) {
                        throw new AppError(
                            validUrl.error.issues[0].message,
                            422
                        );
                    }
                }
                break;

            case "email":
                {
                    const validEmail = ValidationDataInput.ValidateEmail(value);
                    if (!validEmail.success) {
                        throw new AppError(
                            validEmail.error.issues[0].message,
                            422
                        );
                    }
                }
                break;

            case "role":
                {
                    if (!value) {
                        throw new AppError(
                            "Campo de autorização inválido",
                            422
                        );
                    }
                }
                break;

            case "password":
                {
                    const validPassword =
                        ValidationDataInput.ValidatePassword(value);
                    if (!validPassword.success) {
                        throw new AppError(
                            validPassword.error.issues[0].message,
                            422
                        );
                    }
                }
                break;

            case "categoryId":
                {
                    if (!value) {
                        throw new AppError("Categoria inválida", 422);
                    }
                }

                break;

            case "termsOfUseAndPrivacy":
                {
                    // Valida status do campo de termo
                    if (!value) {
                        throw new AppError(
                            "Para continuar é necessário aceitar os termos",
                            422
                        );
                    }
                }
                break;

            default:
                break;
        }
    });
}
