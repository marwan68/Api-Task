# Task API

A simple CRUD API built with Node.js and Express.

## Installation

```bash
npm install
```

## Run

```bash
node index.js
```

Server runs at:

```
http://localhost:3000
```

## Swagger

```
http://localhost:3000/docs
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API Information |
| GET | /health | Health Check |
| GET | /tasks | Get All Tasks |
| GET | /tasks/:id | Get Task By ID |
| POST | /tasks | Create New Task |
| PUT | /tasks/:id | Update Task |
| DELETE | /tasks/:id | Delete Task |

## Example

```bash
curl -i http://localhost:3000/tasks
```
