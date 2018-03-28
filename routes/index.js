
const express = require('express');
let router = express.Router();

router.get('/',(req, res)=>{
    res.send('Hello, We will take to a tour of heroes!!! ');
})
router.use('/api/heroes',require('./heroes'));

module.exports = router;
