const pool = require('../config/database');
const User = require('../models/User');

class UserService {
    async getAllUsers() {
        const query = `
            SELECT id, username, name, email, phone
            FROM users
            ORDER BY id
        `;
        const [rows] = await pool.execute(query);
        return rows.map(row => User.fromDbRow(row));
    }

    async getUserById(id) {
        const query = `
            SELECT id, username, name, email, phone
            FROM users
            WHERE id = ?
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows.length > 0 ? User.fromDbRow(rows[0]) : null;
    }

    async getUserByUsername(username) {
        const query = `
            SELECT id, username, name, email, phone
            FROM users
            WHERE username = ?
        `;
        const [rows] = await pool.execute(query, [username]);
        return rows.length > 0 ? User.fromDbRow(rows[0]) : null;
    }

    async getUserByEmail(email) {
        const query = `
            SELECT id, username, name, email, phone
            FROM users
            WHERE email = ?
        `;
        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0 ? User.fromDbRow(rows[0]) : null;
    }

    async createUser(userData) {
        const [result] = await pool.execute(
            'INSERT INTO users (username, name, email, phone) VALUES (?, ?, ?, ?)',
            [userData.username, userData.name, userData.email, userData.phone]
        );
        return this.getUserById(result.insertId);
    }

    async updateUser(id, userData) {
        await pool.execute(
            'UPDATE users SET username = ?, name = ?, email = ?, phone = ? WHERE id = ?',
            [userData.username, userData.name, userData.email, userData.phone, id]
        );
        return this.getUserById(id);
    }

    async deleteUser(id) {
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = new UserService();