/**
 * Created by Administrator on 2017/1/7.
 */
var myAppService = angular.module("myAppService",['myAppCtrl']);

////这个是从服务器上获取到的数据
myAppService.service('userListService',['$http', function ($http) {
   this.getStudentList = function () {
       return $http.get("/student-ajax/students");
   };
   this.deleteStudent= function (id) {
       return $http.post("/student-ajax/students",{headers:{"Content-Type":"application/application/x-www-form-urlencoded"}}, {params: {'id':id}});
   }
}]);

/*
myAppService.factory('studentlist',function ($scope) {
    var data= {};
})*/
