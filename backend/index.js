const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;


app.use(express.json());
app.use(cors());

const db = mysql.createConnection( {
    host: 'database-1.c1m4ekg4o6v6.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Eea12190!',
    database: 'reelRepoDB'
});

db.connect(err => {
    if(err){
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/api/books', (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(query, [values], (error, results) => {
        if (error) return res.json(err);
        return res.json("Book has been created successfully");
    });
            
    
});

app.delete('/api/books/:id', (req,res)=> {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (error, results) => {
        if (error) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
});

app.put('/api/books/:id', (req,res)=> {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title`=?,`desc`=?, `price`=?,`cover`=? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(query, [...values, bookId], (error, results) => {
        if (error) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});