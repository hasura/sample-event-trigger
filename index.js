const express = require('express');
const bodyParser = require('body-parser');

const app = express();

function echo(event) {
   let responseBody = '';
    if (event.op === "INSERT") {
        responseBody = `New user ${event.data.new.id} inserted, with data: ${event.data.new.name}`;
    }
    else if (event.op === "UPDATE") {
        responseBody = `User ${event.data.new.id} updated, with data: ${event.data.new.name}`;
    }
    else if (event.op === "DELETE") {
        responseBody = `User ${event.data.old.id} deleted, with data: ${event.data.old.name}`;
    }

    return responseBody;
};

app.use(bodyParser.json());

app.post('/echo', function (req, res) {
    try{
        var result = echo(req.body.event);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e.toString());
    }
});

var server = app.listen(process.env.PORT, function () {
    console.log("server listening");
});

