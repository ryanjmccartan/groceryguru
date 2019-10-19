const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('getting meals');
    const queryText = `SELECT * FROM "meal";`;
   pool.query(queryText).then(result => {
       res.send(result.rows)
   }).catch(error => {
       console.log('error with getting meals', error)
       res.sendStatus(500);
   })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const queryMeal = `INSERT INTO "meal" ("meal_name", "recipe")
    VALUES ($1, $2);`;
    const queryIngredient = `INSERT INTO "ingredient" ("ingredient_name") VALUES ($1);`;
    pool.query(queryMeal, [req.body.name, req.body.recipe]).then(
    pool.query(queryIngredient, [req.body.singleIngredient])
    ).then(result => {
        console.log('in post request', req.body);
        res.sendStatus(200);
    }).catch(error => {
        console.log('error with post request', error)
        res.sendStatus(500);
    })
});

module.exports = router;