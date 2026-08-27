import z from "zod";

// Validação aprofundada de dados de entrada
export default class ValidationDataInput {
    static ValidateName(name) {
        // Validar entrada da string
        const validate = z
            .string({
                required_error: "O nome é obrigatório.",
                invalid_type_error: "O tipo deve ser um texto.",
            })
            .min(2, "O nome deve ter no mínimo 2 caracteres.")
            .max(50, "O nome deve ter no máximo 30 caracteres.")
            .regex(
                /^[A-Za-zÀ-ÿ\s]+$/,
                "O nome não pode conter símbolos ou números."
            );

        return validate.safeParse(name);
    }

    static ValidateUrl(url) {
        const validate = z.string().url({ message: "URL inválida" });
        return validate.safeParse(url);
    }

    static ValidateEmail(email) {
        // Validar entrada da string
        const validate = z.string().email({ message: "E-mail inválido" });
        return validate.safeParse(email);
    }

    static ValidatePassword(password) {
        const validate = z
            .string()
            .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
            .refine((val) => /[A-Z]/.test(val), {
                message: "A senha precisa ter ao menos uma letra maiúscula",
            })
            .refine((val) => /[a-z]/.test(val), {
                message: "A senha precisa ter ao menos uma letra minúscula",
            })
            .refine((val) => /[0-9]/.test(val), {
                message: "A senha precisa ter ao menos um número",
            })
            .refine((val) => /[^A-Za-z0-9]/.test(val), {
                message: "A senha precisa ter ao menos um caractere especial",
            });

        return validate.safeParse(password);
    }
}
