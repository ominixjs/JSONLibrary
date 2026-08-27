// Calcula a última modificação e retorna em detalhes
export default function TimeElapsedSince(date) {
    const lastModified = new Date(date);
    const now = new Date();
    const diff = now - lastModified;

    const secs = Math.floor(diff / 1000);
    const mins = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const month = Math.floor(days / 30);

    if (secs < 60) return "agora mesmo";

    if (mins < 60) {
        return `há ${mins} minuto${mins !== 1 ? "s" : ""}`;
    }

    if (hours < 24) {
        return `há ${hours} hora${hours !== 1 ? "s" : ""}`;
    }

    if (days <= 7) {
        return `há ${days} dia${days !== 1 ? "s" : ""}`;
    }

    if (weeks <= 4) {
        return `há ${weeks} dia${weeks !== 1 ? "s" : ""}`;
    }

    return `há ${month} ${month !== 1 ? "meses" : "mês"}`;
}
