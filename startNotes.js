let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;
let collection;

/* Defining the directory to express live server */
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* Creating a MongoClient with defualt arguments*/
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/* Connecting to the DB test> collection Notes */
async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Notes');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

/* Displaying Notes.html */
app.get('/', function (req,res) {
    res.render('Notes.html');
});

/* Getting all notes in the db*/
app.get('/api/Notes', (req,res) => {
    getAllNotes((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'Get Notes successful'});
        }
    });
});

/* Posting notes to the db*/
app.post('/api/Notes', (req,res)=>{
    let Notes = req.body;
    postNote(Notes, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postNote(Notes,callback) {
    collection.insertOne(Notes,callback);
}

function getAllNotes(callback){
    collection.find({}).toArray(callback);
}

/* Commanding app to listen to the mentioned port and running the function which connects the DB*/
app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});