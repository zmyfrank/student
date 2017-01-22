/**
 * Created by Administrator on 2017/1/7.
 */
var myAppCtrl = angular.module("myAppCtrl", []);
myAppCtrl.controller('listData', function ($scope, userListService, $http) {
    userListService.getStudentList().then(function (res) {
        /*获取数据*/
        $scope.items = res.data.data;
        /*翻页器---基于bootstrap.ui*/
        $scope.totalItems = res.data.data.length;       //数据的总数
        $scope.currentPage = 1;                         //当前页码
        $scope.maxSize = 10;                            //每页最多显示多少
        $scope.pageChanged = function () {               //这里是测试当前页面的change事件的
            console.log('Page changed to: ' + $scope.currentPage);
        };
    });
    /*删除功能*/
    $scope.remove = function (id) {
        var index = -1;
        angular.forEach($scope.items, function (item, key) {
            if (item.id === id) {
                index = key;                      //foreach方法，会返回一个key值，这个值是当前的这个值的下标
                console.log(key);
            }
        });
        if (index !== -1) {
            userListService.deleteStudent(id).then($scope.items.splice(index, 1));
            /*$http({                            //使用post方法来删除，注意id必须要写成这种对应的形式
                method: 'POST',
                url: '/student-ajax/students',
                params: {id: id}
            }).then($scope.items.splice(index, 1))*/
        }
    };
});

myAppCtrl.controller('addstudent',function ($scope) {
    /*时间选择器---基于bootstrap.ui*/
    $scope.today = function() {
        $scope.dt = new Date();         //等下要获取数据的话，就用这个dt就行了
    };
    $scope.today();                     //直接显示今天的时间

    $scope.clear = function() {
        $scope.dt = null;               //清除时间
    };

    $scope.inlineOptions = {
        //minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2018, 1, 1),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.toggleMin = function() {         //这里我不知道是啥，但是必须要- -
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open2 = function() {
        $scope.popup2.opened = true;        //配合下面使用，点击弹出，再点击关闭
    };

    $scope.popup2 = {
        opened: false
    };
    $scope.time=$scope.dt.getTime()         //转化为毫秒数

})