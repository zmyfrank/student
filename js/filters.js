/**
 * Created by Administrator on 2017/1/7.
 */
var myAppFil = angular.module("myAppFil",[]);

/*页码过滤器*/
    myAppFil.filter('paging',function(){      //paging 过滤器

            return function(items,currentPage){     //传入了现页面
                var pagesize =  (currentPage-1)*10  //当前页面起始位置，后面的10可以通过传入的参数更改
                return items.slice(pagesize,pagesize+10);     //将原始数据按照 start 分割
            };
    });
    myAppFil.filter('serch',function () {
        return function (items,stype,talent,level) {
            
        }
    })
