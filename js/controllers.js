/**
 * Created by Administrator on 2017/1/7.
 */
var myAppCtrl =angular.module("myAppCtrl",[]);
    myAppCtrl.controller('listData',function ($scope,userListService,$http) {

        userListService.getStudentList().then(function(res){
            $scope.items = res.data.data;
            $scope.totalItems = res.data.data.length;       //数据的总数
            $scope.currentPage = 1;                         //当前页码
            $scope.maxSize = 10;                            //每页最多显示多少
            $scope.pageChanged = function() {               //这里是测试当前页面的change事件的
                console.log('Page changed to: ' + $scope.currentPage);
            };
        });

        //删除其中的一条东西
        $scope.remove = function (id) {
            var index = -1;
            angular.forEach($scope.items,function (item,key) {
                if (item.id === id) {
                    index=key;                      //foreach方法，会返回一个key值，这个值是当前的这个值的下标
                    console.log(key);
                }
            });
            if (index!==-1){
                $http ({                            //使用post方法来删除，注意id必须要写成这种对应的形式
                    method:'POST',
                    url:'/student-ajax/students',
                    params:{id:id}
                }).then($scope.items.splice(index,1))
            }
        };
    });
// myAppCtrl.controller('PaginationDemoCtrl', function ($scope, $log) {
//     $scope.totalItems = 64;
//
//     $scope.setPage = function (pageNo) {
//         $scope.currentPage = pageNo;
//     };
//
//     $scope.pageChanged = function() {
//         $log.log('Page changed to: ' + $scope.currentPage);
//     };
//
//     $scope.maxSize = 5;
// });
   /* myAppCtrl.controller('calendar', function ($scope) {
        var vm = $scope.vm = {};

        //初始化日期
        vm.today = function() {
            vm.calendar = new Date();
        };
        vm.today();

        //清除当前日期
        vm.clear = function() {
            vm.calendar = null;
        };


        // 不允许选择周末
        vm.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        //最小日期开关
        vm.toggleMin = function() {
            vm.minDate = vm.minDate ? null : new Date();
        };
        vm.toggleMin();

        //弹出式日历触发函数
        vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
        };

        //自定义选项
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            formatDayTitle: 'yyyy MMMM'
        };

        //输出格式控制,来源:官方date filter
        vm.formats = ['yyyy-MMMM-dd', 'yyyy/MM/dd', 'yyyy.MM.dd', 'shortDate'];
        vm.format = vm.formats[1];
    });*/
