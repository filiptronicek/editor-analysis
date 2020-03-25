const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use(express.static("assets"));
/*
app.get("/", function(req, res) {
  res.render("index");
});
*/
app.get("/", function(req, res) {
  const analyze = require("./analyze");

  const {
    TextAnalyticsClient,
    TextAnalyticsApiKeyCredential
  } = require("@azure/ai-text-analytics");

  let key, endpoint;

  if(typeof process.env.endpoint != "undefined") {
    key = process.env.key;
    endpoint = process.env.endpoint;
  } else {
    key = require("./creds.js").creds.key;
    endpoint = require("./creds.js").creds.endpoint;

  }

  function boldenKeyphrases(text, phrases) {
    var finalText = text;
    phrases.forEach(keyword => {
      finalText = finalText.replace(keyword, `<strong>${keyword}</strong>`);
    });
    return finalText;
  }

  function encodeHTML(text) {
    text = text.replace(new RegExp(/</gi), "&lt;");
    text = text.replace(new RegExp(/>/gi), "&gt;");
    return text;
  }
  function GetAnalyzed(txt) {
    "use strict";
    const textAnalyticsClient = new TextAnalyticsClient(
     endpoint,
      new TextAnalyticsApiKeyCredential(key)
    );
    async function linkedEntityRecognition(client) {
      const linkedEntityInput = [encodeHTML(txt)];
      const entityResults = await client.recognizeLinkedEntities(
        linkedEntityInput
      );
      const keyPhraseResult = await client.extractKeyPhrases(linkedEntityInput);
      entityResults.forEach(document => {
        document.entities.forEach(entity => {
          entity.matches.forEach(match => {
            return txt.substr(match.offset, match.length + match.offset);
          });
        });
      });
      res.render("analyze", { returnStuff: entityResults[0].entities, returnText: boldenKeyphrases(encodeHTML(txt), keyPhraseResult[0].keyPhrases) });
    }

    linkedEntityRecognition(textAnalyticsClient);
  }
  const reply = GetAnalyzed(
   req.query.txt || "This is a Hello World template for GCP, Azure, Watson and AWS"
  );
});
app.listen(port, function() {
  console.log(`Related Pics listening on port ${port}!`);
});
