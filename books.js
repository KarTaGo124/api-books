const db = require('./db');

// Función para obtener todos los libros
function getAllBooks() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM books";
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Función para obtener un libro por ID
function getBookById(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM books WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Función para agregar un nuevo libro
function addBook(title, author, year) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO books (title, author, year) VALUES (?, ?, ?)";
        db.run(query, [title, author, year], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: this.lastID,
                    title,
                    author,
                    year
                });
            }
        });
    });
}

// Función para actualizar un libro
function updateBook(id, title, author, year) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?";
        db.run(query, [title, author, year, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id,
                    title,
                    author,
                    year
                });
            }
        });
    });
}

// Función para eliminar un libro
function deleteBook(id) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM books WHERE id = ?";
        db.run(query, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};
