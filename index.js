// # Create an express app with the following middleware:

// - logging
// - helmet

// Create a single route: `/`

// In the browser, open the network panel and view the request/response headers.

// What is different when you have helmet uncommented?

//****** With helmet uncommented -

// # Create an express app with the following middleware installed:

// - morgan ✅
// - express-es6-template-engine  ✅
// - static ✅

// Create an array of 3-5 pet names ✅

// Create routes that `res.render()` templates for the following: ✅

// - `/`: welcome the user ✅
// - `/pets`: list all the pets ✅
// - `/pets/:name`: show the pet ✅

// Add a stylesheet and create a `<link>` to the stylesheet. ✅

// In your stylesheet, style the following elements: ✅

// - `h1`
// - `li`
// - `p`

const http = require("http");
const express = require("express");
const app = express();
const es6Renderer = require("express-es6-template-engine"); // - express-es6-template-engine
const morgan = require("morgan"); // - morgan
const logger = morgan("tiny");
const helmet = require("helmet");

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

const server = http.createServer(app);
const port = 3000;
const host = "0.0.0.0";

app.use(logger); // - logging
app.use(helmet()); // - helmet
app.use(express.static("public"));

//Create an array of 3-5 pet names

const puppies = [
    {
        name: "Samson",
        breed: "Golden Lab",
    },
    {
        name: "Otto",
        breed: "Boxer",
    },
    {
        name: "Watson",
        breed: "Golden Doodle",
    },
];

// Create routes that `res.render()` templates for the following:

// - `/`: welcome the user
app.get("/", (req, res) => {
    res.render("home", {
        locals: {
            pups: puppies,
        },
    });
});

// - `/pets`: list all the pets
app.get("/puppies", (req, res) => {
    res.render("puppies", {
        locals: {
            pups: puppies,
        },
    });
});

// - `/pets/:name`: show the pet
app.get("/puppies/:name/:breed", (req, res) => {
    const name = req.params.name;
    const breed = req.params.breed;
    res.render("puppies-details", {
        locals: {
            pet: name,
            genre: breed,
        },
    });
});

server.listen(port, host, () => {
    console.log("Running");
});
