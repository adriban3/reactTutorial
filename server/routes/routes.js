const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Tickets = require("../../models/tix");

router.get("/", function(req, res) {
    res.render("index")
});

router.route('/update')
.post(function(req, res) {
    const doc = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        asset: req.body.asset,
        date: req.body.date 
    }; //need to fix date line, should default to today's date in schema
    console.log(doc);
    Tickets.update({_id: req.body.id}, doc, function(err, result) {
        if (err)
            res.send(err);
        res.send("Ticket successfully updated!");
    });
});

router.get("/getAll", function(req, res) {
    var dateRec = req.query.date;
    if (dataRec != "All") {
        Tickets.find({date: dateRec}, function(err, tix) {
            if (err)
                res.send(err);
            res.json(tix);
        })
    }

    else {
        Expense.find({date: dateRec}, function(err, tix) {
            if (err)
                res.send(err);
            res.json(tix);
        });
    }
});

module.exports = router;