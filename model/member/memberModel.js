var dbConObj = require('./../../conf/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var memberList = {
    //멤버리스트
    memberList : function(req, res){
        var mb = req.params.mb;
        var sql = 'SELECT * FROM BOARD_TBL WHERE B_CD = ?'; // 클럽목록
		
		dbconn.query(sql,mb,function(err, results, field){
            //res.render('member/member_list', {data : 'testData list ejs', memberList : results});
            res.send('일단자자');
        });
    }
};

module.exports = memberList;