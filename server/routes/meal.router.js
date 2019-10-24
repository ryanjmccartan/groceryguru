const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST meals and ingredients to database
router.post('/', (req, res) => {
    const queryMeal = `INSERT INTO "meal" ("meal_name", "recipe")
    VALUES ($1, $2) RETURNING "meal".id;`;
    const queryIngredient = `INSERT INTO "ingredient" ("ingredient_name", "meal_id") VALUES ($1,$2);`;
    pool.query(queryMeal, [req.body.name, req.body.recipe])
        .then((result) =>{
            let [one] = result.rows
            pool.query(queryIngredient, [req.body.singleIngredient, one.id])
                .then(result => {
                    console.log('in post request', req.body);
                    res.sendStatus(200);
                }).catch(error => {
                    console.log('error with post request', error)
                    res.sendStatus(500);
                });
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        })
});

// POST new list and tie into ingredients
router.post('/', (req, res) => {
    const queryList = `INSERT INTO "list" ("list_name")
    VALUES ($1) RETURNING "list".id;`;
    const queryIngredient = `INSERT INTO "ingredient" ("list_id") VALUES ($1);`;
    pool.query(queryList, [req.body.listName])
        .then(result => {
            let [one] = result.rows
            pool.query(queryIngredient, [one.id])
                .then(reuslt => {
                    console.log('posting into list and ingredient', req.body);
                    res.sendStatus(200);
                }).catch(error => {
                    console.log('error with posting to list/ingredient', error)
                    res.sendStatus(500);
                });
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })
});

// GETs meals and ingredients
router.get('/', (req, res) => {
    console.log('getting meals');
    const queryText = `SELECT * FROM "meal";`;
    // JOIN "ingredient" ON "meal".id = "ingredient".meal_id;`;
    pool.query(queryText).then(result => {
        // console.log(result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.log('error with getting meals', error)
        res.sendStatus(500);
    })
});

/// GET ingredients for specific meal
router.get('/:id', (req, res) => {
    const queryText = `SELECT "ingredient".id, "ingredient".ingredient_name FROM "ingredient"
    JOIN "meal" ON "meal".id = "ingredient".meal_id
    WHERE "meal".id = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        console.log('this is ingredient', result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.log('error with getting ingredients', error);
        res.sendStatus(500);
    })
})

// GET single meal
router.get('/details/:id', (req, res) =>{
    const queryText = `SELECT * FROM "meal" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows)
        console.log(result.rows)
    }).catch(error => {
        console.log('error with getting specific meal', error);
        res.sendStatus(500);
    })
})

// PUT request to update meal
router.put('/', (req, res) => {
    const updatedMeal = req.body;
    const queryText = `UPDATE "meal" SET "meal_name" = $1, "recipe" = $2 WHERE "id" = $3;`;
    const queryValues = [
        updatedMeal.newName,
        updatedMeal.newRecipe,
        updatedMeal.id
    ]
    console.log(queryValues);
    pool.query(queryText, queryValues).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error updating meal', error);
        res.sendStatus(500);
    })
})

// DELETE meal
router.delete('/:id', (req, res) => {
    const queryMeal = `DELETE FROM "meal" "ingredient" WHERE "id" = $1;`;
    console.log('in delete', req.params.id);
    pool.query(queryMeal, [req.params.id]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error with delete request', error);
        res.sendStatus(500);
    })
})

module.exports = router;