const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js');

const DB_URL = process.env.DB_URL || "mongodb+srv://notesUser:Notes1234@clusterbreno.w1vvums.mongodb.net/notesDB?retryWrites=true&w=majority&appName=ClusterBreno";
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.use('/', noteRoutes);

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the MongoDB Atlas Server");
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Could not connect to the database. Exiting now...", err);
        process.exit(1);
    });
