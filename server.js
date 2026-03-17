const express = require("express");
const db = require("./database");

const app = express();
app.use(express.json());

// serve frontend files
app.use(express.static("public"));

/*
GET all notes
*/
app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

/*
Create new note
*/
app.post("/notes", (req, res) => {
  const text = req.body.text;

  db.run(
    "INSERT INTO notes(text) VALUES(?)",
    [text],
    function (err) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.json({
        id: this.lastID,
        text: text
      });
    }
  );
});

/*
Delete note
*/
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM notes WHERE id=?",
    id,
    function (err) {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.json({ deleted: true });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});