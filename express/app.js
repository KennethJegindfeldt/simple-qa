const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());


/****** Configuration *****/
const port = (process.env.PORT || 8081);
app.use(express.static(path.join(__dirname, '../build')));

/****** Database *****/
var mongoose = require('mongoose');


// Online DB// Local DB
mongoose.connect('mongodb+srv://admin:kenneth1992@cluster0-f3idh.mongodb.net/Mandatory?retryWrites=true');


/****** socket.io *****/

const server = app.listen(port,
    () => console.log(`Some app running on port ${port}`));

const  io = require('socket.io').listen(server);

io.of('/my_app').on('connection', function (socket){
    socket.on('hello', function (from, msg) {
        console.log(`I received a private message from '${from}' saying '${msg}'`);
    });
    socket.on('disconnect', () => {
        console.log("Someone disconnected");
    });
});


// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});



/****** Schema - Database *****/

var answerSchema = new mongoose.Schema({
    answers: String,
    votes: Number 
});

var qasSchema = new mongoose.Schema({
    name: String,
    questions: String,
    answers: [answerSchema]
});


var answers = mongoose.model('answers', answerSchema);
var questions = mongoose.model('questions', qasSchema);




// -------- ADD NEW QUESTION
app.post('/api/NewQuestion', (req, res, next) => {
    var NewQuestion = new questions(req.body)
    NewQuestion.save(function (err, NewQuestion) {

        io.of('/my_app').emit('new-data', {
            msg: 'New data is available on /api/my_data'
        });

        if (err) { return next(err) }
        res.json(201, NewQuestion);
        console.log("Et nyt question er tilføjet");
    })
})


// -------- GET ANSWERS BY ID
app.post('/api/answers/:id', async (req, res) => {
    console.log(req.body)
    const answer = {answers:req.body.answers, votes:0};

    console.log(answer)
    const question = await questions.findOne(
        { _id: req.params.id},
        (err, docs) => {
            console.log(docs)
            docs.answers.push(answer)

            io.of('/api/my_app').emit('new-data', {
                msg: 'New data is available on /api/my_data'
            });

            docs.save()
        }

    )
    console.log(question);
    console.log(req.params.id)

    if(question){
        res.status(200);
        res.send(question);
    }
    res.status(404);
    res.send();

});

// -------- GET VOTE BY ID
app.post('/api/votes/:id', async (req, res) => {
    const {answerId, count} = req.body;

    const question = await questions.findOne(
        { _id: req.params.id},
        (err, docs) => {



            docs.answers.find((answer) => {
                if (answerId == answer._id){
                    answer.votes = count
                }

            })



            docs.save()
        }

    )
    console.log(question);
    console.log(req.params.id)

    if(question){
        res.status(200);
        res.send(question);
    }
    res.status(404);
    res.send();

});




// ------- GET QUESTIONS
app.get("/api/questions", (req, res) => {
    questions.find({}, (err, questions) => {
        res.send(questions)
    })
})


// ------- GET ANSWERS
app.get("/api/answers", (req, res) => {
    answers.find({}, (err, answers) => {
        res.send(answers)
    })
})

/****** Routes *****/
app.get('/api/', (req, res) => {
    questions.find(function (err, data) {
        if (err) return console.error(err);
        res.status(200).json(data)

    });
})

app.get('/api/data/:id', (req, res) => {

    const { id } = req.params;
    const question = data.filter((data) => data.id == id)[0];

    if(!question) {
        res.sendStatus(404);
    }
    else {
        res.status(200).json(question);
    }

    res.json({
        msg: `you have sent this id: ${req.params.id}` 
    });

});

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});


// app.listen(port, () => console.log(`Mandatory QA API kører på: ${port}!`))


