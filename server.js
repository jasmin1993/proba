const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "my_custom_token"; // Ovo mora biti isto kao u Meta Developer Console

// Verifikacija webhooka
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Obrada primljenih poruka
app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log("Primljena poruka:", JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server pokrenut na portu 3000"));
