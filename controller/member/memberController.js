var express = require('express');
var router = express.Router();
var memberModel=require('./../../model/member/memberModel');

router.get('/member/list/:mb',memberModel.memberList);

module.exports = router;