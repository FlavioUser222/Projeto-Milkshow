import express from "express"
import sqlite3 from "sqlite3"
import cors from "cors"
import bodyParser from "body-parser"
import { dirname } from "path"
import { fileURLToPath } from "url"


const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())

const db = new sqlite3.Database("./db.sqlite")

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS pesticidas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome varchar(100) NOT NULL,
        valor FLOAT NOT NULL,
        dataCompra TEXT NOT NULL,
        validade TEXT NOT NULL
    )`)
})

app.get("/pesticidas", (req, res) => {
    db.all(`SELECT * FROM pesticidas `, [], (err, rows) => {
        res.json(rows)
    })
})

app.post("/pesticida", (req, res) => {
    const { nome, valor, dataCompra, validade } = req.body

    db.run(`INSERT INTO pesticidas(nome,valor,dataCompra,validade) VALUES(?,?,?,?)`, [nome, valor, dataCompra, validade])
    res.send('Pesticida cadastrado')
})


app.listen(8080, () => {
    console.log("Servidor aberto na porta 8080")
})
