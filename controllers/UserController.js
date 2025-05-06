import User from '../models/Usuario.js';

const userController = {
    async criar(nome, email) {
        if (!nome || !email) throw new Error("Nome e email são obrigatórios");
        const usuario = await User.create({ nome, email });
        console.log('Usuário criado:', usuario.toJSON());
        return usuario.toJSON();
    },

    async listarTodos() {
        const usuarios = await User.findAll();
        return usuarios.map(u => u.toJSON());
    },

    async atualizar(emailAntigo, novoNome) {
        await User.update({ nome: novoNome }, {
            where: { email: emailAntigo }
        });
        console.log('Usuário atualizado');
    },

    async deletar(email) {
        await User.destroy({ where: { email } });
        console.log('Usuário apagado');
    }
};

export default userController;
