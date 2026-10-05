const express = require('express');
const router = express.Router();
const pool = require('./db'); // Supondo que você tem um arquivo de conexão com o banco

// 1. GET /solicitantes (Listar todos)
router.get('/solicitantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM solicitantes ORDER BY id ASC');
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor ao buscar solicitantes.' });
    }
});

// 2. GET /solicitantes/:id (Buscar por ID)
router.get('/solicitantes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM solicitantes WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Solicitante não encontrado.' });
        }
        
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
});

// 3. POST /solicitantes (Cadastrar)
router.post('/solicitantes', async (req, res) => {
    const { nome, email, telefone } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !telefone) {
        return res.status(400).json({ erro: 'Os campos nome, email e telefone são obrigatórios.' });
    }

    try {
        // Consulta parametrizada ($1, $2, $3) protege contra SQL Injection
        const query = 'INSERT INTO solicitantes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [nome, email, telefone]);
        
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Código de erro do Postgres para Unique Constraint (E-mail já existe)
            return res.status(409).json({ erro: 'O e-mail informado já está cadastrado.' });
        }
        return res.status(500).json({ erro: 'Erro ao cadastrar solicitante.' });
    }
});

// 4. PUT /solicitantes/:id (Alterar completo)
router.put('/solicitantes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({ erro: 'Os campos nome, email e telefone são obrigatórios.' });
    }

    try {
        const query = 'UPDATE solicitantes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
        const result = await pool.query(query, [nome, email, telefone, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Solicitante não encontrado para atualização.' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar solicitante.' });
    }
});

// 5. DELETE /solicitantes/:id (Excluir)
router.delete('/solicitantes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM solicitantes WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ erro: 'Solicitante não encontrado para exclusão.' });
        }

        return res.status(204).send(); // 204 No Content (Sucesso sem corpo de resposta)
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao excluir solicitante.' });
    }
});

module.exports = router;
