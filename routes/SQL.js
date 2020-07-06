//컬럼별로 가져오기
for (var i = 0; i < results.length; i++) {
    for ( var keyNm in results[i]) {
        console.log("key : " + keyNm + ", value : " + results[i][keyNm]);//컬럼네임입력
    }
  }

//수행된 sql보기
var execSql = dbconn.query(sql, function(err, results){
	//...
});

console.log(execSql.sql); //실제 수행된 SQL 확인

//insert정상처리 확인
if(result.affectedRows > 0){
    //정상 처리됨
    
   }else{
       //에러 처리
   }
 
//insert Id가져와서 디테일쿼리 호출 
dbconn.query(insertQuery, paramObj, function(err, result){
    var clubSn = result.insertId; //성공한 insertId가져와서
    res.redirect("/club/" + clubSn);//다른 url재호출해서 디테일등록함
  });


//res.render('member/member_main', {data : 'testData list ejs'});
//clubList.ejs에 DB에서 조회한 클럽목록을 넘기는 예제소스
var execSql = dbconn.query(sql1 + sql2, function(err, results, field){
    res.render('club/clubList', {clubList : results[0], cnfrncList : results[1], resultCd : resultCd});
});

//클럽목록
/**
 * es.send(): 문자열로 응답
res.json(): 제이슨(Json) 객체로 응답
res.render():  html 변환 템플릿을 렌더링(ejs)
res.sendfile(): 파일 다운로드 */

//Ejs렌더링
//render( 'ejs파일 경로', 'json 형태 데이터');//앞에 views생략됨
//res.send('club list');

//다중조건
var clubSn = req.params.clubSn;
var clubNm = req.params.clubNm;
var sql = 'SELECT * FROM CLUB WHERE CLUB_SN = ? AND CLUB_NM = ?'; // 클럽목록

dbconn.query(sql, function(err, results, field){
    
    res.render('member/member_main',[clubSn, clubNm], {data : 'testData list ejs', memberList : results});
});

//포맷매핑예제
var  mysql = require('mysql');

var sql = "UPDATE CNFRNC_GG SET A_TEAM_SCORE = ?, B_TEAM_SCORE = ? WHERE CNFRNC_SN = ?";
var item = [aTeamScore, bTeamScore, cnfrncSn];
sql = mysql.format(sql, item);

//포맷매핑 실사례
var updateValArr = [];
for (var i = 0; i < aTeamScoreArr.length; i++) {
  var updateVal = [aTeamScore, bTeamScore, cnfrncSn, groupNmArr[i], ggOrdrArr[i]];
  updateValArr.push(updateVal);
}

var sql = "UPDATE CNFRNC_GG SET A_TEAM_SCORE = ?, B_TEAM_SCORE = ? WHERE CNFRNC_SN = ? AND GROUP_NM = ? AND GG_ORDR = ?;";
var sqls = "";
updateValArr.forEach(function(item){
	sqls += mysql.format(sql, item);
});

dbconn.query(sqls, function(err, result){
	//...
});

//인서트 쉽게하기
var clubMberObj = {
    CLUB_SN : clubSn,//DB칼럼명 일치
    MBER_NM : mberNm,
    MBER_SN : mberSn,
    MNGR_YN : 'Y',
    PROFILE_IMAGE : profileImage
  };
  
  //클럽회원 저장
  var sql = "INSERT INTO CLUB_MBER SET ? "
  
  dbconn.query(sql, clubMberObj, function(err, result){
      //...
  });

  //실제예제
  //대회생성
function insert(req, res){

    var cnfrncInfo = req.body.cnfrncInfo;	//대회정보
    var partcptMberArr = req.body.partcptMberArr; //대회참가자정보
    var cnfrncGgArr = req.body.cnfrncGgArr;	//대회경기정보
  
    var sql1 = 'INSERT INTO CNFRNC SET ? ;';
    var sql1s = mysql.format(sql1, cnfrncInfo); 
  
    var sql2 = 'INSERT INTO CNFRNC_PARTCPT_MBER SET ?;';
    var sql2s = "";
    partcptMberArr.forEach(function(item){
        sql2s += mysql.format(sql2, item);
    });  
  
    var sql3 = 'INSERT INTO CNFRNC_GG SET ?;';
    var sql3s = "";
    cnfrncGgArr.forEach(function(item){
        sql3s += mysql.format(sql3, item);
    });  
  
    dbconn.query(sql1s + sql2s + sql3s, function(err, result){
  
      if(err){
        console.error(err);
        res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 대회 생성에 실패하였습니다."});
        throw err;
      }
  
      if(result[0].affectedRows > 0){
        res.send({resultCd:'S', msg:'정상적으로 대회가 만들어졌습니다.'});
        
      }else{
        console.error(result.message);
        res.send({resultCd:'E', msg: "예기치 않은 오류가 발생하여 대회 생성에 실패하였습니다. " + result.message});
      }
  
    });
  
  }


//모든 url요청에 app.use(function(){//내용}) //내용부분을 실행함
var express = require('express');
var app = express();

app.use(function(req, res, next){
	//..공통로직 처리..
    next();
});

// 해당 url (/admin/:id)에만 function(){}을 실행한다
app.use('/admin/:id', function (req, res, next) {
  
    //..관리자 권한 체크...
    next();
    
  });


  //공통함수사용
  app.use(function(req, res, next){
	
	var cookieLoginObj = req.signedCookies.loginObj;
	
	if(cookieLoginObj && cookieLoginObj.mberSn !== ''){
		res.locals.loginObj = cookieLoginObj;
		res.locals.isLogin = true;
	}else{
		var loginObj = {
			mberNm : "",
			mberSn : "",
			profileImage : "",
			isTest : ""
		};
		res.locals.loginObj = loginObj;//res.locals.변수명=값 //해당 변수를 ejs에서 공통으로 사용한다
		res.locals.isLogin = false;
	}
	
	res.locals.clubSn = '';
	
	next();
});