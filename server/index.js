const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'MsgPstrDB',
    password: 'WebCS490',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect =
        'SELECT * FROM Users';
    db.query(sqlSelect, (err, result)=> {
            res.send(result);
    });
})

app.post('/api/insert', (req, res) => {
    const Name = req.body.Name;
    const Username = req.body.Username;
    const ProfilePicture = req.body.ProfilePicture;
    const Posts = req.body.Posts;
    const Followers = req.body.Followers;
    const Following = req.body.Following;

    const sqlInsert = "INSERT INTO Users(Name, Username, ProfilePicture, Posts, Followers, Following) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsert, [Name, Username, ProfilePicture, Posts, Followers, Following], (err, result) => {
        console.log(result);
    });
});

app.delete('/api/delete/:Username', (req, res) => {
    const username = req.params.Username;
    const sqlDelete = "DELETE FROM Users WHERE Username = ?";
    db.query(sqlDelete, username, (err, result) => {
        if (err) console.log(err);
    });
})

app.put('/api/update', (req, res) => {
    const username = req.body.Username;
    const name = req.body.Name;
    const sqlUpdate = "UPDATE Users SET Username = ? WHERE Name = ?";
    db.query(sqlUpdate, [username, name], (err, result) => {
        if (err) console.log(err);
    });
})

app.listen(3000, () => {
    console.log("running on port 3000");
});
