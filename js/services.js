/**
 * Created by Administrator on 2017/1/7.
 */
var myAppService = angular.module("myAppService",['myAppCtrl']);

////这个是从服务器上获取到的数据
myAppService.service('userListService',['$http', function ($http) {
   this.getStudentList = function () {
       return $http.get("/student-ajax/students");
   }
}]);

/*
myAppService.factory('studentlist',function ($scope) {
    var data= {};
})*/
