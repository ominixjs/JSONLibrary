//============= configs
import logger from "../configs/logger.js";

// Busca pelo JSON e retorna uma resposta
export default async function FetchJSON(url) {
    try {
        // Solicaita dados da biblioteca
        const response = await fetch(url);
        if (!response.ok) {
            return {
                approved: false,
                msg: "Falha ao solicitar dados da biblioteca",
            };
        }

        // Cria modelo para validar alguns campos como Nome interno do JSON
        const data = await response.json();
        if (typeof data === Object && Array.isArray(data)) {
            return {
                approved: false,
                msg: "Estrutura de biblioteca inválida",
            };
        }

        return { approved: true, data };
    } catch (err) {
        logger.error(`${err.name} : ${err.message}`);
        return [];
    }
}
