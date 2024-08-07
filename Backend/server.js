const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post("/signup", (req, res) => {

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const sql = "Insert into login (`name`, `email`, `password`, `department`, `mobile`, `companyname`) values (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.department, 
        req.body.mobile,
        req.body.companyname
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json({ message: 'Register successful', data: data });
    })
})


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?';
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', data: results });
    });
})


app.post('/super/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query('SELECT * FROM super_admin WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

        const user = results[0];
        res.json({ message: 'Login successful', data: user });
    });
});

app.listen(8081, () => {
    console.log("listening");
})