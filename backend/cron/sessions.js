import cron from 'node-cron';
// Ejecutar cada hora
cron.schedule('0 * * * *', async () => {
    try {
        const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
        
        const result = await Session.updateMany(
            { 
                status: 'Activa',
                lastAccessed: { $lt: twentyMinutesAgo }
            },
            { status: 'Expirada' }
        );

        console.log(`Sesiones expiradas: ${result.modifiedCount}`);
    } catch (error) {
        console.error('Error en cron job:', error);
    }
});