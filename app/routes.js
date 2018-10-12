var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todo) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todo); // return all todo in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todo
    app.get('/api/todo', function (req, res) {
        // use mongoose to get all todo in the database
        getTodos(res);
    });


    //update todo
    app.post('/api/Updatetodo', function (req, res) {

    Todo.update({
            "_id": req.body._id}
            ,{
                text: req.body.text
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });
    });

    // create todo and send back all todo after creation
    app.post('/api/todo', function (req, res) {
      console.log(req.body);
        Todo.create({
            text: req.body
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todo after you create another
            getTodos(res);
        });
    });

    // delete a todo
    app.delete('/api/todo/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // delete a todo List
    app.post('/api/deletetodolist', function (req, res) {
        Todo.remove({}, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
