const { query, text } = require('express')
const {Pool} = require('pg')
const pool = new Pool({
    user:'postgres',
    password:'12345678',
    host:'localhost',
    port:5432,
    database:'HNDB'
})

module.exports = {
    query:(text,params) => pool.query(text,params)
}