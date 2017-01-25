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

myAppCtrl.controller('addstudent',function ($scope,userListService) {
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
    $scope.time=$scope.dt.getTime();         //转化为毫秒数

    $scope.creatStudent = function () {     //添加学生
        var student = {
            name:$scope.user.name,
            qq:$scope.user.qq,
            type:$scope.user.type,
            school:$scope.user.school,
            talent:$scope.user.level,
            level:$scope.user.level,
            joinTime:$scope.time,
            wish:$scope.user.wish
        };
        userListService.addStudent(student).success(function () {
            $scope.user.name="";
            $scope.user.type="";
            $scope.user.school="";
            $scope.user.wish="";
            $scope.user.qq="";
            $scope.user.talent=null;
            $scope.user.level=null;
            alert("上传成功");
        })
    };

    $scope.reseatStudent = function () {        //取消按钮
        $scope.user.name="";
        $scope.user.type="";
        $scope.user.school="";
        $scope.user.wish="";
        $scope.user.qq="";
        $scope.user.talent=null;
        $scope.user.level=null;
    }
});
myAppCtrl.controller('info', ['$scope', '$http','Upload',function($scope, $http,Upload) {
    $scope.uploadImg = '';
    //提交
    $scope.submit = function () {
        $scope.upload($scope.files);
    };
    $scope.upload = function (file) {
        $scope.fileInfo = file;
        Upload.upload({
            //服务端接收
            url: 'Ashx/UploadFile.ashx',
            //上传的同时带的参数
            data: { 'username': $scope.username },
            file: file
        }).progress(function (evt) {
            //进度条
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            //上传成功
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            $scope.uploadImg = data;
        }).error(function (data, status, headers, config) {
            //上传失败
            console.log('error status: ' + status);
        });
    };
}]);