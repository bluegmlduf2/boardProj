var express = require('express');
var router = express.Router();
var memberController=require('./../../controller/member/memberController');

router.get('/member/list/:mb',memberController);

module.exports = router;