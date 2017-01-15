/**
 * Created by Administrator on 2017/1/7.
 */
var myAppService = angular.module("myAppService",['myAppCtrl']);

////这个是从服务器上获取到的数据
myAppService.factory('userListService',['$http','$rootScope', function ($http,$rootScope) {
    return {
        query : function () {
               return $http.get("/student-ajax/students")
                .success(function (data) {
                    return  data;
                });
        },
        /*add : function (studentData) {
            (factory.query().data).push(studentData);
            $rootScope.$broadcast('students.updata');
        }*/
    }
}]);