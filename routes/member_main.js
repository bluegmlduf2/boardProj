var dbConObj = require('../../conf/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var memberMain = {

    list : function(req, res){

        var clubSn = req.params.clubSn;
        var clubNm = req.params.clubNm;
        var sql = 'SELECT * FROM CLUB WHERE CLUB_SN = ? AND CLUB_NM = ?'; // 클럽목록
		
		dbconn.query(sql, function(err, results, field){
			
			res.render('member/member_main',[clubSn, clubNm], {data : 'testData list ejs', memberList : results});
		});
    }
};

module.exports = memberMain; //require할시 해당 객체를 반환함