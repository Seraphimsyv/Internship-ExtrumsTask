import express from "express";
import { database } from "./database.js";

const PORT = 3001;
const app = express();

function log(message) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
  return `[${today.toLocaleTimeString("en-US", options)}] ${message}`
}

app.get("/api/get-templates-ideas", (req, res) => {
  console.log(log(`${req.url} - Loading templates ideas`));
  database.getTemplatesIdeas().then(
    data => {
      res.json({ideas: data})
    }
  );
})

app.get("/api/get-types-ideas", (req, res) => {
  console.log(log(`${req.url} - Loading types ideas`));
  database.getIdeasTypes().then(
    data => {
      res.json({types: data})
    }
  );
})

app.get("/api/get-ideas", (req, res) => {
  console.log(log(`${req.url} - Loading ideas`));
  database.getIdeas().then(
    data => {
      res.json({ideas: data})
    }
  );
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/api/upload-data', (req, res) => {
  console.log(log(`${req.url} - Uploading data`));
  database.uploadActiveIdeas(req.body.to_do_list);
  res.json({status: true});
})

app.listen(PORT, () => {
  console.log(log(`Server is starting on port ${PORT}`));
});