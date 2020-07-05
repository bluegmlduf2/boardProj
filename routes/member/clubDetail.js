var dbConObj = require('../../conf/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var clubDetail = {
    //클럽상세
    detail : function(req, res){
        //var pwd = req.body.password; //parser-body사용
        var clubSn = req.params.clubSn;
        res.send('club detail'+clubSn);

        var clubSn = req.params.clubSn;
        var clubNm = req.params.clubNm;
        var sql = 'SELECT * FROM CLUB WHERE CLUB_SN = ? AND CLUB_NM = ?'; // 클럽목록
		
		dbconn.query(sql, function(err, results, field){
			
			res.render('member/member_main',[clubSn, clubNm], {data : 'testData list ejs', memberList : results});
        });

        //SQL 인젝션 방지 escape()
        //var sql = 'SELECT * FROM CLUB WHERE CLUB_SN = ' + mysql.escape(clubSn) + '; ';

        //INSERT다중매핑
        // var clubMberObj = {
        //     CLUB_SN : clubSn,
        //     MBER_NM : mberNm,
        //     MBER_SN : mberSn,
        //     MNGR_YN : 'Y',
        //     PROFILE_IMAGE : profileImage
        //   };
          
        //   //클럽회원 저장
        //   var sql = "INSERT INTO CLUB_MBER SET ? "
          
        //   dbconn.query(sql, clubMberObj, function(err, result){
        //       ...
        //   });
    }
};

module.exports = clubDetail;