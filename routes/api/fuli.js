var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var axios = require('axios');
var mmURL = "http://www.dbmeinv.com/dbgroup/show.htm";

/**
 * -request
 * 	--params
 * 		@cid : 请求分类
 * 		@page_offset : 请求页数
 * 
 * -response
 * 	--body
 * 		@error : 0(成功) 1(失败)
 * 		@data : 返回数据(json)
 */

/* GET cheerio page. */
router.get('/', function (req, res, next) {
	/**
	 * 准备请求参数
	 */
	var params = {};
	//判断请求参数是否为空
	for(let key in req.query){
		if(req.query.hasOwnProperty('cid') && req.query.cid>1 && req.query<8){
			params.cid=req.query.cid;
		} else {
			params.cid="";
		}
		if(req.query.hasOwnProperty('pager_offset') && req.query.pager_offset>0) {
			params.pager_offset=req.query.pager_offset;
		}else{
			params.parger_offset="1";
		}
	}

	/**
	 * 准备返回参数
	 */
	var imgs = {
			"error":0,     //错误代码
			"data":[]	   //返回数据	
	};
	//发送请求
	axios.get(mmURL,{params})
		.then(function (response) {
			console.log(params)
			var $ = cheerio.load(response.data);
			var imgs = {
				"error":0,
				"data":[]
			};
			$('.height_min').each(function (k, v) {
				imgs.data.push($(this).attr('src'));
			})
			res.send(imgs)
		})
		.catch(function (error) {
			imgs.error="1";
			res.send(imgs)
		})
});

module.exports = router;