const db = require('../db');

exports.getAll = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Categoria não encontrada' });
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ message: 'O nome é obrigatório' });
        
        const [result] = await db.query('INSERT INTO categorias (nome) VALUES (?)', [nome]);
        res.status(201).json({ id: result.insertId, nome });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        if (!nome) return res.status(400).json({ message: 'O nome é obrigatório' });

        const [result] = await db.query('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoria não encontrada' });
        
        res.json({ id, nome });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoria não encontrada' });
        
        res.json({ message: 'Categoria deletada com sucesso' });
    } catch (error) {
        next(error);
    }
};
