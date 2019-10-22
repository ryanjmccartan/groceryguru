const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GETs meals and ingredients
router.get('/', (req, res) => {
    console.log('getting meals');
    const queryText = `SELECT * FROM "meal"
    JOIN "ingredient" ON "meal".id = "ingredient".meal_id;`;
    pool.query(queryText).then(result => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch(error => {
        console.log('error with getting meals', error)
        res.sendStatus(500);
    })
});

/// GET ingredients for specific meal
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "ingredient"
    JOIN "meal" ON "meal".id = "ingredient".meal_id
    WHERE "ingredient".meal_id = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        console.log(result);
        res.send(result.rows)
    }).catch(error => {
        console.log('error with getting ingredients', error);
        res.sendStatus(500);
    })
})

// GET route to grab ingredient
// router.get('/:id', (req, res) => {
//     console.log('getting ingredient');
//     const queryText = `SELECT "ingredient".ingredient_name FROM "ingredient" WHERE "meal_id" = $1;`;
//     pool.query(queryText, [req.params.id]).then(result => {
//         res.send(result.rows)
//     }).catch(error => {
//         console.log('error with getting ID', error);
//         res.sendStatus(500);
//     })
// });

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


// POST meals to database
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