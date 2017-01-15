/**
 * Created by Administrator on 2017/1/7.
 */
var myApp = angular.module("myApp",['ui.router','myAppService','myAppCtrl','myAppFil']); //注入路由服务



myApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("","/loginindex"); //当路由为空时，加载哪个页面
    $stateProvider
        .state("loginindex",{                 //路由名字
            url:"/loginindex",                //域名显示
            templateUrl: "tpls/loginindex.html"  //来源文件
        })
        .state("loginindex.add",{
            url:"/add",
            templateUrl:"tpls/add.html"
        })
        .state("loginindex.info",{
            url:"/info",
            templateUrl:"tpls/info.html"
        })
        .state("loginindex.list",{
            url:"/list",
            templateUrl:"tpls/list.html"
        });
});
