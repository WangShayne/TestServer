# 基于Node.js的本地测试服务器
## 使用方法
```
npm install 
npm start /*默认3000端口*/
```
//npm主要包: express,axios,cheerio,iconv-lite
## 接口列表

1. 福利接口( /api/fuli )
    #### 抓取[豆瓣美女网页](www.dbmeinv.com/dbgroup/show.htm)
    ```
    参数列表
    {
        cid:"" /*类型,默认为空,可选2,3,4,5,6,7 自己测试,不多言*/
        pager_offset:1 /*页数,默认为1*/
    }
    ```
2. 薅羊毛接口 ( /api/haoyangmao )
    #### 抓取[购物党](http://www.gwdang.com/promotion/yangmao)
    ```
        参数列表
        {
            keyword:"牛奶" /*关键字搜索*/
            only_recent:"0" /*只显示24以内的商品信息*/
            parger_offset:1 /*页数,默认1*/
        }
    ```
