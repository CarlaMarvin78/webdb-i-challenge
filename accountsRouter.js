const express = require('express');

const db = require('./data/accountsDB');

const router = express.Router();

router.get ('/', (req, res) =>{
   db.get()
   .then (accounts => res.status(200).json(accounts))
   .catch (error => res.status(500).json({error: "The accounts information can not be loaded."}));
});

router.get ('/:id', (req, res) =>{
    db.get(req.params.id)
    .then (account => {
        if(account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({message: "The account with the specified ID count not be loaded."})
        }
    })
    .catch (err => {
        console.log('get', err);
        res.status(500).json({error: "The accounts information can not be loaded."})
    });
 });

 module.exports = router;



router.post('/', (req, res) => {
    if (req.query.name == undefined || req.query.budget == undefined) {
        res.status(400).json({errorMessage: "Please provide name and budget for the account."});
    } else {
        db.getByName(req.query.name)
        .then(accountName => {
            if(accountName) {
                res.status(400).json({errorMessage: "An account exists with this name."})
            } else {
                db.insert({name: req.query.name, budget: req.query.budget})
                .then(account => res.status(201).json(account))
                .catch(err => {
                    console.log('post',err);
                    res.status(500).json({error: "There was an error while saving the account."});
                });
            }
        })
    }
})

router.put('/:id', (req, res) => {
    if (req.query.name == undefined || req.query.budget == undefined) {
        res.status(400).json({errorMessage: "Please provide name and budget for the account."});
    } else {
        db.update(req.params.id, {name: req.query.name, budget: req.query.budget})
        .then(count => {
            if(count<1) {
                res.status(404).json({errorMessage: "There is no account with this ID."});    
            } else {
                db.get(req.params.id)
                .then(account => res.status(200).json(account));
            }
        })
        .catch(err => {
            console.log('put',err);
            res.status(500).json({error: "The account could not be updated."});
        });
    }
})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
        if(count<1) {
            res.status(404).json({errorMessage: "There is no account with this ID."});
        } else {
            res.sendStatus(200);
        }
    })
    .catch(err => {
        console.log('delete',err);
        res.status(500).json({error: "The account could not be deleted."});
    })
})