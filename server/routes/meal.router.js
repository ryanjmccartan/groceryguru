const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// POST REQUESTS //

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

// POST new list
router.post('/list', (req, res) => {
    const queryText = `INSERT INTO "list" ("list_name")
    VALUES ($1)`
    pool.query(queryText, [req.body.listName]).then(result => {
        console.log('posting list', req.body);
        res.sendStatus(200);
    }).catch( error => {
        console.log('error with posting list', error);
        res.sendStatus(500);
    })
})

// POST new ingredients from list
router.post('/fromlist', (req, res) => {
    const queryList = `INSERT INTO "ingredient" ("ingredient_name", "list_id")
    VALUES ($1, $2);`;
    pool.query(queryList, [req.body.ingredients, req.body.id])
        .then(result => {
            console.log('in post request', req.body);
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with post request', error)
            res.sendStatus(500);
        });
});

router.post('/fromMeal', (req, res) => {
    const queryList = `INSERT INTO "ingredient" ("ingredient_name", "list_id")
    VALUES ($1, $2);`;
    pool.query(queryList, [req.body.ingredients, req.body.id])
        .then(result => {
            console.log('in post request', req.body);
            res.sendStatus(200);
        }).catch(error => {
            console.log('error with post request', error)
            res.sendStatus(500);
        });
});



//!! END POST REQUESTS !!//

// GET REQUESTS //

// GET specific list
router.get('/list/:id', (req, res) =>{
    const queryText = `SELECT * FROM "list" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows)
        console.log(result.rows)
    }).catch(error => {
        console.log('error with getting specific list', error);
        res.sendStatus(500);
    })
})

// GETs lists
router.get('/list', (req, res) => {
    console.log('getting lists');
    // update queryText to get all list data
    const queryText = `SELECT * FROM "list";`;
    // const queryText = `SELECT "ingredient".ingredient_name FROM "ingredient" JOIN "list" ON "list".id = "ingredient".list_id;`;
    pool.query(queryText).then(result => {
        console.log('here are the lists', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('error with getting list', error)
        res.sendStatus(500);
    })
});

// GET ingredients from specific list
router.get('/list/ingredients/:id', (req, res) => {
    const queryText = `SELECT "ingredient".ingredient_name from "ingredient" 
    JOIN "list" ON "ingredient".list_id = "list".id WHERE "list".id = $1`;
    pool.query(queryText, [req.params.id]).then(result => {
        console.log('getting ingredients for specific list', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('error with getting ingredients from specific list', error);
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

// GET ingredients for specific meal
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

//!! END GET REQUESTS !!//

// PUT REQUESTS //

// PUT request to update ingredients table with list id
router.put('/:id', (req, res) => {
    const queryText = `UPDATE "ingredient" SET "list_id" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [req.params])
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

//!! END PUT REQUESTS !!//

// DELETE REQUESTS //

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

//!! END DELETE REQUESTS !!//





// POST new list and tie into ingredients
// router.post('/list', (req, res) => {
//     const queryList = `INSERT INTO "list" ("list_name")
//     VALUES ($1) RETURNING "list".id;`;
//     const queryIngredient = `INSERT INTO "ingredient" ("list_id") VALUES ($1);`;
//     pool.query(queryList, [req.body.listName])
//         .then(result => {
//             let [one] = result.rows
//             pool.query(queryIngredient, [one.id])
//                 .then(result => {
//                     console.log('posting into list and ingredient', req.body);
//                     res.sendStatus(200);
//                 }).catch(error => {
//                     console.log('error with posting to list/ingredient', error)
//                     res.sendStatus(500);
//                 });
//         }).catch(error => {
//             console.log(error);
//             res.sendStatus(500);
//         })
// });

module.exports = router;