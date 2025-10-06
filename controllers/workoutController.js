const connection = require("../db/connection");

function index(req, res) {
  const sql =
    "SELECT id, nome, id_utente, data_creazione, obiettivo, durata, note FROM `cards`";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      status: "OK",
      cards: results,
    });
  });
}

function show(req, res) {
  const cardId = req.params.id;
  const sqlCard =
    "SELECT id, nome, id_utente, data_creazione, obiettivo, durata, note FROM `cards` WHERE id = ?";

  connection.query(sqlCard, [cardId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    const [card] = results;

    if (!card) {
      return res.status(404).json({
        status: "KO",
        message: "Card Not Found",
      });
    }

    // opzionale: carica anche gli esercizi associati alla scheda
    const sqlExercises = "SELECT * FROM exercise_card WHERE id_scheda = ?";
    connection.query(sqlExercises, [cardId], (err, exercises) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query failed" });
      }
      card.exercises = exercises;

      res.json({
        status: "OK",
        card: card,
      });
    });
  });
}

// Funzione per creare una nuova scheda di allenamento
function store(req, res) {
  const { nome, id_utente, obiettivo, durata, note } = req.body;
  const sql = `INSERT INTO cards (nome, id_utente, obiettivo, durata, note) VALUES (?, ?, ?, ?, ?)`;
  const params = [nome, id_utente, obiettivo, durata, note];

  connection.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.status(201).json({
      status: "OK",
      message: "Scheda creata con successo",
      card_id: result.insertId,
    });
  });
}

function listUsers(req, res) {
  const sql =
    "SELECT id, nome, cognome, email, ruolo, data_nascita, data_registrazione FROM users";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: "OK", users: results });
  });
}

module.exports = {
  index,
  show,
  store,
  listUsers,
};
