const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {

    const isBoughtSqlText = `
        SELECT * FROM items
            WHERE is_bought = TRUE
            ORDER BY name;`;

    const notIsBoughtSqlText = `
        SELECT * FROM items
            WHERE is_bought = FALSE
            ORDER BY name;`;


    pool.query(notIsBoughtSqlText)
        .then((result) => {

            let items = result.rows;
            console.log('bought:', items);
            pool.query(isBoughtSqlText)
                .then((result) => {
                    items = items.concat(result.rows);
                    console.log('unbought:', result.rows);
                    console.log('items: ', items);
                    res.send(items);
                })
                .catch((error) => {
                    console.log('GET /items unbought fail:', error);
                    res.sendStatus(500);
                })
        })
        .catch((error) => {
            console.log('GET /items bought fail:', error);
            res.sendStatus(500);
        })
})


router.post('/', (req, res) => {
    const sqlText = `
    INSERT INTO items
        (name, quantity, unit)
        VALUES
        ($1, $2, $3)
    `;
    const sqlValues = [req.body.name, req.body.quantity, req.body.unit]

    pool.query(sqlText, sqlValues)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('POST /items fail:', error);
            res.sendStatus(500);
        })
})

router.put('/', (req, res) => {
    const sqlText = `
    UPDATE items
	SET is_bought=False;
    `;

    pool.query(sqlText)
        .then((result) => {
            console.log('Put success');
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('PUT /items fail:', error);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res) => {
    console.log('req.params.id:', req.params.id);
    const sqlText = `
    UPDATE items
	SET is_bought=True
	WHERE id = ${req.params.id};
    `;

    pool.query(sqlText)
        .then((result) => {
            console.log('Put success');
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('PUT /items fail:', error);
            res.sendStatus(500);
        })
})

router.delete('/', (req, res) => {
    const sqlText = `
    DELETE FROM items;
    `;

    pool.query(sqlText)
        .then((result) => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('DELETE /items fail:', error);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    const sqlText = `
    DELETE FROM items
    WHERE id = ${req.params.id};
    `;

    pool.query(sqlText)
        .then((result) => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('DELETE /items fail:', error);
            res.sendStatus(500);
        })
})

module.exports = router;
