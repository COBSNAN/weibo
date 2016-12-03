
/*
 * GET home page.
 */
 var request=require('request');
 var cheerio=require("cheerio");
 var utils = require('../lib').utils;
 exports.index = function(req, res){
 	var header = {
		    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 BIDUBrowser/7.6 Safari/537.36',
		    'Cookie': '_T_WM=610df7129810eac7db59b45b5c02b278; SUB=_2A2548LKuDeTxGeRJ4lYZ9C_NzTuIHXVYGt7mrDV6PUJbvNAKLWH1kW0jen1I3qV4kZFCCpTFDTt061KYWw..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhrM2NiyBVfz28loEHm05ZX5JpX5K-t; SUHB=0ftoInWlCT-T6s; SSOLoginState=1442104062',
		    'Connection': 'keep-alive'
	  		}
	 /*找到最新微博，予以评论
	  *url :评论地址
	  *form：评论内容和其他一些必须的东西
	 */
	var comment=function(url,CTform){
		request.post({
					url:url,
					headers:header,
					form:CTform
				},function (error, response, body) {
				  if (!error) {
				    console.log("评论完毕") // Show the HTML for the Google homepage. 
				  }
		})
	}
	/* 刷新明星微博，争取第一时间获得明星发微博时间*/
	var search=function(id){
		console.log("addr");
		request({url:"http://weibo.cn"+id,headers:header},function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		     // Show the HTML for the Google homepage. 
			    $ = cheerio.load(body);
			    var Stickie=$('.kt').length-1;
			    var htm=$('.ct').eq(Stickie);
				var time=htm.text();
			    console.log(time);
			    var judge=time.match('\[0-9]+分钟前');
			    if(judge)
			    {
			    	var number=parseInt(judge[0]);
			    	console.log(number);
			    	if(number<2)
			    	{
			    		console.log("是最新发布微博");
						var addr=htm.prev().prev().attr('href');
						console.log(addr);
						set(addr);
					}
				}
		  }
		})
	}
	//search("chuangyejia");
	/*评论前所需的过程*/
	var set=function(url){
		request({url:url,headers:header},function (error, response, body) {
				if (!error && response.statusCode == 200) {
					$ = cheerio.load(body);
					var	commenturl="http://weibo.cn"+$('form','#cmtfrm').attr('action');
					console.log(commenturl);
					var formct=$('input[type="hidden"]','#cmtfrm');
					var form={};
					form.srcuid=formct[0].attribs.value,form.id=formct[1].attribs.value,form.rl=formct[2].attribs.value,form.content="赞";
					console.log(form);
					comment(commenturl,form);
				};
		})
	}
	/*获取明星微博id号*/
	var starid=function(name){
		request.post({url:"http://weibo.cn/find/user",headers:header,form:{keyword:name,suser:'2'}},function (error, response, body) {
				if (!error && response.statusCode == 200) {
					$ = cheerio.load(body);
					console.log('33333333333333333333333');
					var name=$('a','table').eq(0).attr('href');
					console.log(name);
					res.send(body);
				};
		})
	}
	//starid('王凯');
	//测试cookie是否能用
	// request({url:"http://weibo.cn",headers:header},function (error, response, body) {
	// 			if (!error && response.statusCode == 200) {
	// 				$ = cheerio.load(body);
	// 				res.send(body);
	// 			};
	// })
	//var time=setInterval(function(){search('/5702557150');},50000);
	res.send('body');

	
}
exports.fans = function(req, res){
	var header = {
		    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 BIDUBrowser/7.6 Safari/537.36',
		    'Cookie': 'Apache=221.238.197.72_1455963760.274324;		Apache=3820295848418.0273.1455963767951;	SGUID=1435504526203_80581050;	SINAGLOBAL=124.239.196.250_1430224374.99836;	SINAGLOBAL=5202636518515.646.1430224374554;SSOLoginState=1455953342;	SUB=_2A257zGXuDeRxGeRJ4lYZ9C_NzTuIHXVYuNAmrDV8PUNbvtAPLVTykW9LHesUBDPYDW0Ri4dwY6ciiwgZzIHrpg..	;SUB=_2A257zGXrDeRxGeRJ4lYZ9C_NzTuIHXVYuNAjrDV_PUNbvtBeLRDYkW9LHettnNQUsBs5VwWBxnLDSQVy-YJfHw..;SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhrM2NiyBVfz28loEHm05ZX5JpX5KMt;	SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhrM2NiyBVfz28loEHm05ZX;		SUE=es%3Db0f1ff563674de2c15b811bd8988c2fb%26ev%3Dv1%26es2%3D1c542549010691b1fa24e808f9f61a24%26rs0%3DUPrX5WBMPnBx%252FgsiQm1QYYGZZ28%252F8c6kSagTxta8%252BWCX%252F2%252FbSyy8yUkLQOzCrix6LC3iQbY8rHE6rkcp7i8svg3vAP8QDD3wQ2TigM6JJ%252Fom3%252BseAOcgqP1yLIblMBI5ZBG8g0uE7Owr%252FKuOf5k45X%252BB2sCd9f2%252BTvXIaAiwM6Y%253D%26rv%3D0;SUE=es%3D1a5f4615cc27ee41bdeca62516e2b19e%26ev%3Dv1%26es2%3Da9483dd963625674d44d8d1859f86776%26rs0%3DFi6TZ7RvY4FysnWXC5XerQ%252BtlcLCmWPUvd6BnAMcLGZ2YNq4yrpP1xoqJ65ffUKGhGj494xFcR49CNsenpusRUXcNfi7FeMunKT8RV8%252FSpCltZbXEVJvWe6EeRzlfX6dIJz6MWCi3UyM%252B3ckGqmlCh8ocHkA%252F11rrfBeg8e1Zj4%253D%26rv%3D0;SUHB=0h1IrdLF--xZ_m;SUP=cv%3D1%26bt%3D1455953342%26et%3D1456039742%26d%3Dc909%26i%3D1e1c%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D2794841167%26name%3Dnanyi58%2540sina.cn%26nick%3D%25E7%2594%25A8%25E6%2588%25B72794841167%26fmp%3D%26lcp%3D2015-03-20%252016%253A30%253A56;SUP=cv%3D1%26bt%3D1455953339%26et%3D1456039739%26d%3D40c3%26i%3D1e1c%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26lt%3D7%26uid%3D2794841167%26user%3Dnanyi58.cn%26ag%3D8%26name%3Dnanyi58%2540sina.cn%26nick%3D%25E7%2594%25A8%25E6%2588%25B72794841167%26sex%3D%26ps%3D0%26email%3Dnanyi58%2540sina.cn%26dob%3D%26ln%3D%26os%3D%26fmp%3D%26lcp%3D2015-03-20%252016%253A30%253A56;SUS=SID-2794841167-1455953339-GZ-g1moj-e82f6671c118829b43a61315ad3e1e1c	;	SUS=SID-2794841167-1455953342-XD-kgypr-015c566b7ac8c027a4cc9d15f1971e1c;TC-Page-G0=4c4b51307dd4a2e262171871fe64f295;		TC-Ugrow-G0=370f21725a3b0b57d0baaf8dd6f16a18;	TC-V5-G0=ac3bb62966dad84dafa780689a4f7fc3;	ULV=1455963768049:96:2:1:3820295848418.0273.1455963767951:1454411687152;ULV=1451909679687:18:1:1::1450964756801;lxlrtst=1448114575_o	;lxlrttp=1448114575;sso_info=v02m6alo5qztKWRk5yljpOQpZCToKWRk5iljoOgpZCjnLKNs6S0joOQsYyTmLeJp5WpmYO0so2zpLSOg5CxjJOYtw==	;		vjlast=1448116309.1451909689.11;vjuids=-206ff8e2.14e3abccb14.0.8628d7db;wb_feed_unfolded_2794841167=1	;wvr=6',
		    'Connection': 'keep-alive'
	  		}	
	var star='王凯kkw';
	if (req.param('name') && (utils.trim(req.param('name')) !== "")) {
		star = utils.trim(req.param('name'));
	}
	request.post({url:"http://weibo.cn/find/user",headers:header,form:{keyword:star,suser:'2'}},function (error, response, body) {
				if (!error && response.statusCode == 200) {
					$ = cheerio.load(body);
					var nameurl=$('a','table').eq(0).attr('href');
					console.log(nameurl);console.log(star);
					res.render('fans',{name:star,url:nameurl});
				};
		})
}
exports.fanscount = function(req, res){
	var header = {
		    'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 BIDUBrowser/7.6 Safari/537.36',
		    'Cookie': 'Apache=221.238.197.72_1455963760.274324;		Apache=3820295848418.0273.1455963767951;	SGUID=1435504526203_80581050;	SINAGLOBAL=124.239.196.250_1430224374.99836;	SINAGLOBAL=5202636518515.646.1430224374554;SSOLoginState=1455953342;	SUB=_2A257zGXuDeRxGeRJ4lYZ9C_NzTuIHXVYuNAmrDV8PUNbvtAPLVTykW9LHesUBDPYDW0Ri4dwY6ciiwgZzIHrpg..	;SUB=_2A257zGXrDeRxGeRJ4lYZ9C_NzTuIHXVYuNAjrDV_PUNbvtBeLRDYkW9LHettnNQUsBs5VwWBxnLDSQVy-YJfHw..;SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhrM2NiyBVfz28loEHm05ZX5JpX5KMt;	SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhrM2NiyBVfz28loEHm05ZX;		SUE=es%3Db0f1ff563674de2c15b811bd8988c2fb%26ev%3Dv1%26es2%3D1c542549010691b1fa24e808f9f61a24%26rs0%3DUPrX5WBMPnBx%252FgsiQm1QYYGZZ28%252F8c6kSagTxta8%252BWCX%252F2%252FbSyy8yUkLQOzCrix6LC3iQbY8rHE6rkcp7i8svg3vAP8QDD3wQ2TigM6JJ%252Fom3%252BseAOcgqP1yLIblMBI5ZBG8g0uE7Owr%252FKuOf5k45X%252BB2sCd9f2%252BTvXIaAiwM6Y%253D%26rv%3D0;SUE=es%3D1a5f4615cc27ee41bdeca62516e2b19e%26ev%3Dv1%26es2%3Da9483dd963625674d44d8d1859f86776%26rs0%3DFi6TZ7RvY4FysnWXC5XerQ%252BtlcLCmWPUvd6BnAMcLGZ2YNq4yrpP1xoqJ65ffUKGhGj494xFcR49CNsenpusRUXcNfi7FeMunKT8RV8%252FSpCltZbXEVJvWe6EeRzlfX6dIJz6MWCi3UyM%252B3ckGqmlCh8ocHkA%252F11rrfBeg8e1Zj4%253D%26rv%3D0;SUHB=0h1IrdLF--xZ_m;SUP=cv%3D1%26bt%3D1455953342%26et%3D1456039742%26d%3Dc909%26i%3D1e1c%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D2794841167%26name%3Dnanyi58%2540sina.cn%26nick%3D%25E7%2594%25A8%25E6%2588%25B72794841167%26fmp%3D%26lcp%3D2015-03-20%252016%253A30%253A56;SUP=cv%3D1%26bt%3D1455953339%26et%3D1456039739%26d%3D40c3%26i%3D1e1c%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26lt%3D7%26uid%3D2794841167%26user%3Dnanyi58.cn%26ag%3D8%26name%3Dnanyi58%2540sina.cn%26nick%3D%25E7%2594%25A8%25E6%2588%25B72794841167%26sex%3D%26ps%3D0%26email%3Dnanyi58%2540sina.cn%26dob%3D%26ln%3D%26os%3D%26fmp%3D%26lcp%3D2015-03-20%252016%253A30%253A56;SUS=SID-2794841167-1455953339-GZ-g1moj-e82f6671c118829b43a61315ad3e1e1c	;	SUS=SID-2794841167-1455953342-XD-kgypr-015c566b7ac8c027a4cc9d15f1971e1c;TC-Page-G0=4c4b51307dd4a2e262171871fe64f295;		TC-Ugrow-G0=370f21725a3b0b57d0baaf8dd6f16a18;	TC-V5-G0=ac3bb62966dad84dafa780689a4f7fc3;	ULV=1455963768049:96:2:1:3820295848418.0273.1455963767951:1454411687152;ULV=1451909679687:18:1:1::1450964756801;lxlrtst=1448114575_o	;lxlrttp=1448114575;sso_info=v02m6alo5qztKWRk5yljpOQpZCToKWRk5iljoOgpZCjnLKNs6S0joOQsYyTmLeJp5WpmYO0so2zpLSOg5CxjJOYtw==	;		vjlast=1448116309.1451909689.11;vjuids=-206ff8e2.14e3abccb14.0.8628d7db;wb_feed_unfolded_2794841167=1	;wvr=6',
		    'Connection': 'keep-alive'
	  		}
	var id='/kaikai0818';
	
	if (req.param('id') && (utils.trim(req.param('id')) !== "")) {
		id = utils.trim(req.param('id'));
	}
	request({url:"http://weibo.cn"+id,headers:header},function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		     // Show the HTML for the Google homepage. 
			    $ = cheerio.load(body);
			    var number=parseInt($('a','.tip2').eq(1).text().split('[')[1]);
			    console.log(number);
			    res.send({num:number});
			    
		  }else
		  	res.send({num:false});
		})
}	
exports.shousuo = function(req, res){
	res.render('shousuo');
}			