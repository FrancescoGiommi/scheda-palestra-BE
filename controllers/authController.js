const bcrypt = require("bcrypt");

function login(req, res) {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Login fallito" });

    if (results.length === 0)
      return res.status(404).json({ error: "Utente non trovato" });

    const user = results[0];

    // Confronta password hash
    bcrypt.compare(password, user.password, (err, same) => {
      if (err || !same)
        return res.status(401).json({ error: "Password errata" });

      // In app reale, qui generi un JWT/token/session
      res.json({
        status: "OK",
        user: {
          id: user.id,
          nome: user.nome,
          cognome: user.cognome,
          email: user.email,
          ruolo: user.ruolo,
        },
        // token: jwtToken
      });
    });
  });
}

function register(req, res) {
  const { nome, cognome, email, password, ruolo, data_nascita } = req.body;

  // Hash della password (sicurezza!)
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Hashing fallito" });

    const sql =
      "INSERT INTO users (nome, cognome, email, password, ruolo, data_nascita) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [nome, cognome, email, hash, ruolo, data_nascita];

    connection.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: "Registrazione fallita" });
      res.status(201).json({ status: "OK", user_id: result.insertId });
    });
  });
}

module.exports = { login, register };
