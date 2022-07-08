const http = require("http");
const express = require("express");
const app = express();
const main = require("./js/main");
console.log({ main });
app.use(express.json());

let timezonesObj = [
  (JST = {
    regionName: "Japan",
    abbr: "JST",
    offset: 9,
  }),
  (HST = {
    regionName: "Hawaiian-Aleutian",
    abbr: "HST",
    offset: -10,
  }),
  (AKDT = {
    regionName: "Alaska",
    abbr: "AKDT",
    offset: -8,
  }),
  (PST = {
    regionName: "Pacific",
    abbr: "PST",
    offset: -7,
  }),
  (MDT = {
    regionName: "Mountain",
    abbr: "MDT",
    offset: -6,
  }),
  (EST = {
    regionName: "Eastern",
    abbr: "EST",
    offset: -5,
  }),
  (UTC = {
    regionName: "Universal",
    abbr: "UTC",
    offset: 0,
  }),
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/timezones", (request, response) => {
  response.render("index.ejs", {});
  response.json(timezonesObj);
});

app.get("/api/timezones/:id", (request, response) => {
  const id = request.params.id;
  console.log({ id });
  const timezoneInfo = timezonesObj.find(
    (timezoneInfo) => timezoneInfo.regionName === id
  );
  console.log({ timezoneInfo });
  if (timezoneInfo) {
    response.json(timezoneInfo);
  } else {
    response.status(404).end();
  }
});

app.set("view engine", "ejs");

app.post("/api/notes", (request, response) => {
  const note = request.body;
  console.log(note);
  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
