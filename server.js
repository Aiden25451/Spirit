var express = require('express');
var app = express();

var server = require('http').createServer(app);
var mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('client'));

const io = require('socket.io')(server, {
    cors: {
        origin: ["https://onlinewebsite.herokuapp.com"],
        methods: ["GET", "POST"],
    }
})

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

io.on("connection", async socket => {
    
    socket.on('add-name', async (name) => {
        var data = animalNames[Math.round(Math.random() * 104)]
        
        const dbResult = await getAllData();
        console.log(dbResult)

        for(var i = 0; i < dbResult.length; i++) {
            if(dbResult[i].name == name) {
                console.log("NAME ALREADY THERE")
                updateName(name, data)
                io.emit('update-name', name, data)
                return
            }
        }
        
        insertIntoDatabase(name, data)
        io.emit('receive-name', name, data)
        

    })
})

function setConnection() {
    var connection = mysql.createConnection({
        // Run Locally
        host: 'localhost',
        user: 'root',
        password: 'gwo4life',
        database: 'names',
        
    });
    return connection
}

// Update person
function updateName(name, data) {
    var con = setConnection()

    con.connect(function(err) {
        if (err) throw err;
        
        var sql = "UPDATE people SET address = '" + data + "' WHERE name = '" + name + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
        con.end()
    });
}

// Insert person
function insertIntoDatabase(name, data) {
    var con = setConnection()

    con.connect(function(err) {
        if (err) throw err;
        
        var sql = "INSERT INTO people (name, address) VALUES ('" + name + "', '" + data + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        con.end()
    });
}

// get data as a promise
function getAllData(){
    var con = setConnection()

    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM people", function(err, result, fields) {
            if (err) {
                // Returning the error
                reject(err);
                con.end();
            }
   
            resolve(result);
            con.end();
        });
    });
}

// Server start
const chatRouter = require('./routes/chat')
app.use('/', chatRouter)

console.log("Server started.");

server.listen(process.env.PORT || 3000);


animalNames = [
"Dog",
"Cow",
"Cat",
"Horse",
"Donkey",
"Tiger",
"Lion",
"Panther",
"Leopard",
"Cheetah",
"Bear",
"Elephant",
"Polar bear",
"Turtle",
"Tortoise",
"Crocodile",
"Rabbit",
"Porcupine",
"Hare",
"Hen",
"Pigeon",
"Albatross",
"Crow",
"Fish",
"Dolphin",
"Frog",
"Whale",
"Alligator",
"Eagle",
"Flying squirrel",
"Ostrich",
"Fox",
"Goat",
"Jackal",
"Emu",
"Armadillo",
"Eel",
"Goose",
"Arctic fox",
"Wolf",
"Beagle",
"Gorilla",
"Chimpanzee",
"Monkey",
"Beaver",
"Orangutan",
"Antelope",
"Bat",
"Badger",
"Giraffe",
"Hermit Crab",
"Giant Panda",
"Hamster",
"Cobra",
"Hammerhead shark",
"Camel",
"Hawk",
"Deer",
"Chameleon",
"Hippopotamus",
"Jaguar",
"Chihuahua",
"King Cobra",
"Ibex",
"Lizard",
"Koala",
"Kangaroo",
"Iguana",
"Llama",
"Chinchillas",
"Dodo",
"Jellyfish",
"Rhinoceros",
"Hedgehog",
"Zebra",
"Possum",
"Wombat",
"Bison",
"Bull",
"Buffalo",
"Sheep",
"Meerkat",
"Mouse",
"Otter",
"Sloth",
"Owl",
"Vulture",
"Flamingo",
"Racoon",
"Mole",
"Duck",
"Swan",
"Lynx",
"Monitor lizard",
"Elk",
"Boar",
"Lemur",
"Mule",
"Baboon",
"Mammoth",
"Blue whale",
"Rat",
"Snake",
"Peacock",
]

//Delete Database
// var sql = "DELETE FROM people";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) deleted");
    
// });
// con.end();