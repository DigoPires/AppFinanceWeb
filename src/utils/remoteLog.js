export const remoteLog = async (level, message, data) => {
    try {
        await fetch('/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level, message, data })
        });
    } catch (e) {
        console.error("Falha ao enviar log para o servidor", e);
    }
};