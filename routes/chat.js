const express = require('express')
const router = express.Router()
var mysql = require('mysql');
//router.use(express.static(path.join('../client')));

// Router works like an app u can fit into the parent app
router.get('/', (req, res) => {
    var con

    con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'gwo4life',
        database: 'names',
        
    });

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM people", function (err, result, fields) {
            if (err) throw err;
            res.render('chatroom/chatroom', { allData: result})
        });
        con.end()
    });
})

module.exports = router