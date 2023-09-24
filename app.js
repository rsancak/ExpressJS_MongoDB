const express = require('express');
const fileUpload = require('express-fileupload');
const ObjectId = require("mongodb").ObjectId
const mongoose = require('mongoose');
const users = require('./public/js/schema');
const app = express();

/* Test Commit */
app.set('view engine', 'ejs'); 
app.set('views', 'views'); 
app.use(
    fileUpload({
        limits: {
            fileSize: 5000000,
        },
        abortOnLimit: true
    })
);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Ready!');
});

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'usersDB';
mongoose.connect(url + dbName).then(function () {
    console.log('connect: success')
}).catch(err => {
    console.log('connect: error')
    throw err
});

app.get('/', async (req, res) => {
    const collectionsList = JSON.stringify(await users.find({}).sort({ "_id": -1 }));
    res.status(200).render('pages/list/index', { pageName: "index", pageDescription: "Index Page", pageTitle: "Index Page", allData: JSON.parse(collectionsList) });
});

app.get('/add', (req, res) => {
    res.status(200).render('pages/add/index', { pageName: "add", pageDescription: "Add Page", pageTitle: "Add Page" });
});

app.post('/add/user', function (req, res) {
    if (req.body.formtype == 'add') {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        } else {
            const file = req.files.photo;
            let new_file_name = new Date().getTime() + '_' + req.files.photo.name;
            const path = __dirname + "/public/img/users/" + new_file_name;

            file.mv(path, (err) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    users.create({ photo: new_file_name, name: req.body.name, surname: req.body.surname, job: req.body.job })
                        .catch(err => {
                            res.status(404).send(err);
                            throw err;
                        })
                        .then(result => {
                            res.send('User Added!');
                        });
                }
            });
        }
    } else if (req.body.formtype == 'update') {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        } else {
            const file = req.files.photo;
            let new_file_name = new Date().getTime() + '_' + req.files.photo.name;
            const path = __dirname + "/public/img/users/" + new_file_name;
            file.mv(path, (err) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    users.updateOne({ _id: new ObjectId(req.body._id) }, {$set:{ photo: new_file_name, name: req.body.name, surname: req.body.surname, job: req.body.job }})
                        .catch(err => {
                            res.status(404).send(err);
                            throw err;
                        })
                        .then(result => {
                            res.status(200).send('User Updated!');
                        });
                }
            });
        }
    }
})

app.get('/remove', async (req, res) => {
    const collectionsList = JSON.stringify(await users.find({}).sort({ "_id": -1 }));
    res.status(200).render('pages/remove/index', { pageName: "remove", pageDescription: "Remove Page", pageTitle: "Remove Page", allData: JSON.parse(collectionsList) });
});

app.get('/remove/:id', (req, res) => {
    console.log(req.params.id);
    users.deleteOne({ _id: new ObjectId(req.params.id) }).then(function () {
        res.status(200).send('User Added!');
    });
});

app.get('/update', async (req, res) => {
    const collectionsList = JSON.stringify(await users.find({}).sort({ "_id": -1 }));
    res.status(200).render('pages/update/index', { pageName: "update", pageDescription: "Update Page", pageTitle: "Update Page", allData: JSON.parse(collectionsList) });
});

app.get('/update/:id', (req, res) => {
    users.findOne({ _id: new ObjectId(req.params.id) }).then(function (user) {
        res.status(200).send(user);
    });
});



