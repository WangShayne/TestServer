var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var axios = require('axios');
var iconv = require('iconv-lite');
var gbk = require('gbk');
var headers = {  
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
};
var hymURLstart = "http://www.gwdang.com/promotion/yangmao/00000000-0--edit_time-desc-";
var hymURLend = "----0.html";
var detailUrl = "http://www.gwdang.com";
//http://www.gwdang.com/promotion/yangmao/00000000-0--edit_time-desc-1----0.html?only_recent=1&keyword=


/**
 * 
 * edit_time-desc- 分页
 * 
 * @params{
 *      only_recent:最近24小时   0 否  1 是
 *      keyword: 关键字搜索
 * }
 */

router.get("/",function(req,res,next){
    var params = {};
    var hymURL = hymURLstart+'1'+hymURLend;

    for(let key in req.query){
        if(req.query.hasOwnProperty("pager_offset") && req.query.pager_offset>0){
            hymURL = hymURLstart+req.query.pager_offset+hymURLend;
        }else{
            hymURL = hymURLstart+'1'+hymURLend;
        }
        console.log(hymURL)
        if(req.query.hasOwnProperty("only_recent") && req.query.only_recent == 1){
            params.only_recent = 1;
        }else{
            params.only_recent = 0; 
        }
        params.keyword = req.query.hasOwnProperty("keyword") ? req.query.keyword : "";
    }
    var list = {
        "error":0,
        "data":[],
    }
    axios.get(hymURL,{
            headers,
            params,
            responseType:"arraybuffer"
        })
        .then(function(response){
            
            var $ = cheerio.load(iconv.decode(response.data,"GBK"))
             $('.zdm_li').each(function(k,v){
                 var detail = {};
                 detail.from = {};
                 detail.title = $(this).find(".zdm_title").attr("title");
                 detail.url = $(this).find("btn_buy").attr("href");
                 detail.imgUrl = $(this).find(".pic img.lazy").attr("data-original");
                 detail.detailUrl = detailUrl+$(this).find(".zdm_price_info").attr("href");
                 detail.quanUrl = $(this).find(".zdm_quan_link").attr("href");
                 detail.price = $(this).find(".zdm_price_info div").text().replace(/\r|\n/ig,"");
                 detail.time = $(this).find('em').text();
                 detail.from.imgUrl = $(this).find(".zoom.font12.mt-5 span img").attr("src");
                 detail.from.name = $(this).find(".zoom.font12.mt-5 span.hui999").text();
                 detail.from.url = $(this).find(".btn_buy.btn_buy2").attr("href")
                 list.data.push(detail);
            })
            res.send(list);
        })
        .catch(function(error){
           // console.log(error)
        })

})

module.exports = router;