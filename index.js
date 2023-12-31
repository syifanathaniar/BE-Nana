require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { prisma } = require("./config/prisma");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get("/", async(req, res) => {
    res.send("here is the response");
});


// catalog Routes

//get all catalog
app.get("/catalogs", async(req, res) => {
    const catalog = await prisma.catalog.findMany();
    res.status(200).send(catalog);
});

// get catalog by id
app.get("/catalogs/:id", async(req, res) => {
    const catalog = await prisma.catalog.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!catalog) res.status(404).send("Catalog not Found");
    else res.status(200).send(catalog);
});

// end  catalog routes
// product Routes
// end product routes
// message Routes
// end message routes

app.all("*", async(req, res) => {
    res.json({
        message: "Routes you're looking is not found",
    });
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is already running at ${PORT}`);
});