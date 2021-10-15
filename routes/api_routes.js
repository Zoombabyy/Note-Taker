const fs = require("fs");
var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.get("/api/notes/:id", function (req, res) {
    res.json(notes[Number(req.params.id)]);
  });

  app.post("/api/notes", function (req, res) {
    let newNotes = req.body;
    let uniqueIds = notes.length.toString();
    console.log(uniqueIds);
    newNotes.id = uniqueIds;
    notes.push(newNotes);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
    });

    res.json(notes);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let notesId = req.params.id;
    let newIds = 0;
    console.log(`Deleting note with id ${notesId}`);
    notes = notes.filter((currentNote) => {
      return currentNote.id != notesId;
    });
    for (currentNote of notes) {
      currentNote.id = newIds.toString();
      newIds++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
  });
};
