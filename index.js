const express = require('express');
const books = require('./books'); // Importar las funciones desde books.js
const app = express();
const PORT = 8001;

app.use(express.json());

app.get('/books', async (req, res) => {
    try {
        const allBooks = await books.getAllBooks();
        res.json(allBooks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await books.getBookById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await books.addBook(title, author, year);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const updatedBook = await books.updateBook(req.params.id, title, author, year);
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        await books.deleteBook(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
