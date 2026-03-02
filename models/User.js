class User {
    constructor({ id, name, username, email, phone, website }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
    }

    static fromDbRow(row) {
        return new User({
            id: row.id,
            name: row.name,
            username: row.username,
            email: row.email,
            phone: row.phone,
            website: row.website
        });
    }
}

module.exports = User;