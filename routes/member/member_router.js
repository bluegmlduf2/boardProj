var express = require('express');
var router = express.Router();

/**
* 실제 업무처리 로직이 명시된 router import
*/
var memberMain = require('./member_main');    //멤버컨트롤러 객체
var clubDetail = require('./clubDetail');    //클럽상세

/* clubList 출력. 담당개발자 A */
//해당 url을 받으면 (member)/list을 받으면 아래의 이벤트핸들러를 맵핑-->memberMain.list(req, res);
//RESTful API --> 리소스/메소드/메세지 형태로 : 메소드는 GET(조회)/POST(생성)/PUT(수정)/DELETE(삭제)
router.get('/list', function (req, res) {
    memberMain.list(req, res);
});

/* 클럽상세. 담당개발자 B */
router.get('/detail/:clubSn', function (req, res) {
    clubDetail.detail(req, res);
});

module.exports = router;