//필요한 모듈 선언
var express = require('express');
var http = require('http');
var app = express();

//html 템플릿 엔진 ejs 설정
app.set('views', __dirname + '/views');//views, 템플리트가 있는 디렉토리. 예: app.set('views', './views')
app.set('view engine', 'ejs');//view engine, 사용할 템플리트 엔진. 예: app.set('view engine', 'pug')

//bodyParser설정 -->'req.query.파라미터명' 사용하기 위함 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

//express 서버 포트 설정(cafe24 호스팅 서버는 8001 포트 사용)
app.set('port', process.env.PORT || 8001);

//서버 생성
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var memberRouter = require('./routes/member/member_routes');
app.get('/member/list/:mb', memberRouter);
