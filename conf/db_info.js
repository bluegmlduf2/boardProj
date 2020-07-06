var  mysql = require('mysql');
var os = require('os');  //호스트 이름을 가져오기 위한 모듈

var dbconnInfo = {
	dev:{
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '',
		database: '', 
		multipleStatements : true
	},
	real:{
		host     : '1.1.1.1',
		port: '11111111111',
		user     : 'cafe24',
		password : 'cafe24',
		database : 'cafe24DB',
		multipleStatements : true
	}	
};

var dbconnection = {
	init : function(){
		var hostname = os.hostname();
		if(hostname === 'S1621N14'){
			return mysql.createConnection(dbconnInfo.dev);	//로컬개발환경
		}else{
			return mysql.createConnection(dbconnInfo.real);	//cafe24 서버환경
		}
	},
	
	dbopen : function(con){
		con.connect(function(err){
			if(err){
				console.error("mysql connection error : " + err);
			}else{
				console.info("mysql connection successfully.");
			}
		});
	}
};


module.exports = dbconnection;//dbconnection()을 보냄