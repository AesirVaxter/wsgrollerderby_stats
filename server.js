const express = require("express")
const db = require("better-sqlite3")("wsg-stats.db")
db.pragma("journal_mode = WAL")

//database setup here
const createTables = db.transaction(() => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS gamestats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skatername STRING NOT NULL UNIQUE,
        teamname STRING NOT NULL UNIQUE,
        skaterpoints STRING NOT NULL
        )
        `).run()
})

createTables()

//database setup ends here

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public_html"))

app.get("/", (req, res) => {
res.render("homepage")
})

app.get("/upload", (req, res) => {
res.render("uploadPage")
})


//save database
//const newGameStats = db.prepare("INSET INTO gamestats (skatername, teamname, skaterpoints) VALUE (?, ?)")
//newGameStats = run(req.body)



app.listen(3000)

