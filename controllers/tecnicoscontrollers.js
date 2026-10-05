const db = require('../db');

exports.getAll = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT id, nome, email FROM tecnicos');
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT id, nome, email FROM tecnicos WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Técnico não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) return res.status(400).json({ message: 'Nome e email são obrigatórios' });

        const [result] = await db.query('INSERT INTO tecnicos (nome, email) VALUES (?, ?)', [nome, email]);
        res.status(201).json({ id: result.insertId, nome, email });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        if (!nome || !email) return res.status(400).json({ message: 'Nome e email são obrigatórios' });

        const [result] = await db.query('UPDATE tecnicos SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Técnico não encontrado' });

        res.json({ id, nome, email });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM tecnicos WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Técnico não encontrado' });

        res.json({ message: 'Técnico deletado com sucesso' });
    } catch (error) {
        next(error);
    }
};
