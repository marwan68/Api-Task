const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const app = express();

app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Study Node.js",
        done: false
    },
    {
        id: 2,
        title: "Go to Gym",
        done: true
    },
    {
        id: 3,
        title: "Learn Express",
        done: false
    }
];

// Home
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: [
            "/tasks"
        ]
    });
});

// Health
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// Get All Tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Get Task By ID
app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    res.json(task);

});

// Create Task
app.post("/tasks", (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        done: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);

});

// Update Task
app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    if (!req.body.title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    task.title = req.body.title;
    task.done = req.body.done;

    res.json(task);

});

// Delete Task
app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();

});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log("Server Running...");
});