/**
 * Created by chan on 11/22/16.
 */
const express = require('express');
const app = new express();
const path = require('path');

const port = process.env.PORT || 3000;

app.use(express.static('frontend'));

/**
 * Note: Generally we don't need an application server for serving
 * static files; instead we can use a web server such as nginx for static resources.
 */
app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'app.html'));
});

app.listen(port, function() {
    console.log(`server listening on port ${port}`);
});