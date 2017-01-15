/**
 * Created by Administrator on 2017/1/7.
 */
var myAppCtrl =angular.module("myAppCtrl",[]);
    myAppCtrl.controller('listData', ['$scope','userListService', function ($scope,userListService) {
        //这里是测试数据
        /*$scope.$on('students.updata',function (event) {
            $scope.items = userListService.query().data.data;
            $scope.apply();
        });
        $scope.items = userListService.query().data.data;*/
        ////测试失败。。。以后再来

        //取出服务器中的数据
        userListService.query()
                .then(function (res) {                   //这里使用then方法，当前面获取到数据之后，再取出值
                    $scope.items = res.data.data;
                    console.log($scope.items);
                }).then(function () {                    //页数代码，注意我这里的then嵌套
                $scope.dataNum = $scope.items.length;     //获取总个数
                //console.log( $scope.dataNum);
                $scope.pages = Math.ceil($scope.dataNum/120); //按照每页显示十个数据得到总页数
                $scope.pageNum=[];
                for (var i =0;i<$scope.pages;i++) {
                    $scope.pageNum.push(i);
                }
                console.log($scope.pageNum)
                $scope.currentPage = 0;                     //设置当前页是0
                $scope.listsPerPage =120;                     //设置每页显示120个

                $scope.setPage = function (num) {           //点击事件，点击之后显示为当前页数的页码数
                    $scope.currentPage=num;                 //将当前页设置为页码数
                };
                //console.log($scope.currentPage)
                $scope.prevPage = function () {
                    if($scope.currentPage>0) {
                        $scope.currentPage--;
                        console.log($scope.currentPage);
                    }
                };
                $scope.nextPage = function () {
                    if ($scope.currentPage < $scope.pages-1){
                        $scope.currentPage++;
                        console.log( $scope.currentPage++);
                    }
                }
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
                $scope.items.splice(index,1)
            }
        };
       /* //翻页器
        $scope.dataNum = $scope.num.length;     //获取总个数
        console.log( $scope.dataNum);
        $scope.pages = Math.ceil($scope.dataNum/3); //按照每页显示十个数据得到总页数
        $scope.pageNum=[];
        for (var i =0;i<$scope.pages;i++) {
            $scope.pageNum.push(i);
        }
        //console.log($scope.pageNum);
        $scope.currentPage = 0;                     //设置当前页是0
        $scope.listsPerPage =10;                     //设置每页显示10个

        $scope.setPage = function (num) {           //点击事件，点击之后显示为当前页数的页码数
            $scope.currentPage=num;                 //将当前页设置为页码数
        };
        $scope.prevPage = function () {
            if($scope.currentPage>0) {
                $scope.currentPage--;
            }
        };
        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pages-1){
                $scope.currentPage++;
            }
        }*/
    }]);
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
