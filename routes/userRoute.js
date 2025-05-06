import express from 'express';
const router = express.Router();
import userController from '../controllers/UserController.js';

// Criar usuário
router.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    try {
        await userController.criar(nome, email);
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
    }
});

// Listar todos os usuários
router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await userController.listarTodos();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
    }
});

// Atualizar usuário
router.put('/usuarios/:email', async (req, res) => {
    const { email } = req.params;
    const { nome } = req.body;
    
    if (!nome) {
        return res.status(400).json({ erro: 'Nome é obrigatório para atualização' });
    }

    try {
        await userController.atualizar(email, nome);
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: err.message });
    }
});

// Deletar usuário
router.delete('/usuarios/:email', async (req, res) => {
    const { email } = req.params;

    try {
        await userController.deletar(email);
        res.json({ mensagem: 'Usuário apagado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar o usuário', detalhe: err.message });
    }
});

export default router;
