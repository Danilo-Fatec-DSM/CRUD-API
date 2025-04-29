import { authenticate, sync, close } from "./database.js";
import userController from "./controllers/UserController.js"; // <-- objeto
import User from "./models/Usuario.js";

(async () => {
    try {
        await authenticate();
        console.log('Banco conectado com sucesso!');

        await sync();

        await userController.criar('Maria Elizabeth', 'maria@gmail.com');
        console.log('Usuário criado!');

        const lista = await userController.listarTodos();
        console.log('Usuários:', lista);

        await userController.atualizar('maria@gmail.com', 'Maria Elisa');
        console.log('Tentativa de atualização concluída');

        // await userController.deletar('maria@gmail.com');
        // console.log('Tentativa de exclusão concluída');

    } catch (err) {
        console.error('Erro:', err);
    } finally {
        await close();
    }
})();
