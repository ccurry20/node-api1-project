// implement your API here
const db = require("./data/db.js");
// bring express into the project
const express = require("express");

// create a "server" object
const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

//
// express.json() is a parser function... if json *text* is in the body, this
// method will parse it into an actual object, so that when we access req.body,
// it will be an actual object.
//
server.use(express.json());
server.use(cors());

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        sucess: false,
        err: "The users information could not be retrieved."
      });
    });
});

server.get("/users/:id", (req, res) => {
  db.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        sucess: false,
        err: "The users information could not be retrieved."
      });
    });
});

server.post("/users", (req, res) => {
  const userInfo = req.body;

  db.add(userInfo)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: "Please provide name and bio for the user."
      });
    });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("yeah");

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, err: "The user could not be removed" });
    });
});

server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  db.update(id, userInfo)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err: "The user information could not be modified"
      });
    });
});
