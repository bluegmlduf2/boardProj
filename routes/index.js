var express = require('express');
var router = express.Router();//서버에 넘어온 url 정보를 router를 통해서 받음

/**
 * GET(조회): router.get()
POST(저장): router.post()
PUT(수정): router.put()
DELETE(삭제): router.delete()
 */


//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get('/', function(req, res, next) {
    res.send('index page');
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
// app.js 에서 사용한 app.use()에 router값을 넘겨줌
module.exports = router;