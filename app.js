import express, { json } from 'express';
import sequelize from './database.js';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';

const app = express();

// Libera o acesso CORS
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

app.use(json()); 
app.use('/api', userRoutes); 


(async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conectado com o banco com sucesso');
        await sequelize.sync();
        console.log(' Tabelas sincronizadas');
        
        // Só inicia o servidor se o banco conectar
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(` Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error(' Erro ao conectar com o banco:', err.message);
    }
})();

export default app;
