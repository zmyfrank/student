/**
 * Created by Administrator on 2017/1/7.
 */
var myAppFil = angular.module("myAppFil",[]);

/*页码过滤器*/
    myAppFil.filter('paging',function(){      //paging 过滤器

            return function(items,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
                //console.log(items);
                //  start 也就是 paging 后面传的参数，即 currentPage*listsPerPage

                    console.log(start);
                    return items.slice(start);     //将原始数据按照 start 分割
            };
    });
