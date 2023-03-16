const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// enable CORS
app.use(cors());

// connect to the database
mongoose.connect('mongodb+srv://sagardey:sagardey@cluster0.rpaesbl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

// define a simple schema for our Todo model
const todoSchema = mongoose.Schema({
  projectname: String,
  taskname: String,
  taskdescription: String,
  acceptancecriteria: String,
  deadline: Date,
  assigne: String,
}, {
  timestamps: true
});

// create a Todo model from the schema
const Todo = mongoose.model('Todo', todoSchema);

// define the routes for our API
app.get('/api/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send(todos);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos."
      });
    });
});

app.post('/api/todos', (req, res) => {
  const todo = new Todo(req.body);

  todo.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the todo."
      });
    });
});

// start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
