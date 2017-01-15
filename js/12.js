var demoApp = angular.module('demoApp',[]);
demoApp.filter('paging',function(){      //paging 过滤器
    return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
        //  start 也就是 paging 后面传的参数，即 currentPage*listsPerPage
        return lists.slice(start);     //将原始数据按照 start 分割
    };
});

demoApp.controller('demoCtrl',['$scope',function($scope){  //页面控制器
    $scope.demoLists = [                                     //模拟数据
        {name:['hello world','hello world again',
            'why i say hello wrold',
            'i dont know the reason',
            'maybe because i am a developer.',
            'thank you for reading this',
            'why i say thank you',
            'cause this stuff has nothing to  do with your angularJs studying',
            'these are just demo sentences.',
            'Do not have any special meanings.',
            'and you still take time to read this row by row',
            'what could i say?',
            'okay.maybe you wanna lenrn how json works.']
        }
    ];
    $scope.dataNum =  $scope.demoLists[0].name.length;  //获得数据总个数
    $scope.pages = Math.ceil($scope.dataNum/3);         //按照每页显示3个数据，得到总页数
    $scope.pageNum = [];                                //生成页码，在 html里 ng-repeat 出来
    for(var i=0;i<$scope.pages;i++){
        $scope.pageNum.push(i);
    }

    $scope.currentPage = 0;                       //设置当前页是 0
    $scope.listsPerPage = 3;                      //设置每页显示 3 个

    $scope.setPage = function(num){             // 当点击页码数字时执行的函数
        $scope.currentPage = num;                 //将当前页 设置为 页码数
    }

    $scope.prevPage = function(){               //点击上一页执行的函数
        if($scope.currentPage > 0){
            $scope.currentPage--;
        }
    }
    $scope.nextPage = function(){              //点击下一页执行的函数
        if ($scope.currentPage < $scope.pages-1){
            $scope.currentPage++;
        }
    }
}]);

///////////////////////////////////////////////////////////////////////////////////////////////////////
var myModule = angular.module("myModule", []);
myModule.constant('pagexConfig', {
    visiblePageCount: 10,
    firstText: 'First',
    lastText: 'Last',
    prevText: 'Previous',
    nextText: 'Next'
}).directive("pager", ['pagexConfig', function(pagexConfig) {
    return {
        link: function(scope, element, attrs) {
            var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : pagexConfig.visiblePageCount;
            scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : pagexConfig.firstText;
            scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : pagexConfig.lastText;
            scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : pagexConfig.prevText;
            scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : pagexConfig.nextText;
            scope.currentPage = 1;
            scope.pageChange = function(page) {
                if (page >= 1 && page <= scope.pageCount) {
                    scope.currentPage = page;
                } else {
                    scope.currentPage = 1;
                }
            }
            function build() {
                var low,
                    high,
                    v;
                scope.pagenums = [];
                if (scope.pageCount == 0) {
                    return;
                }
                if (scope.currentPage > scope.pageCount) {
                    scope.currentPage = 1;
                }
                if (scope.pageCount <= visiblePageCount) {
                    low = 1;
                    high = scope.pageCount;
                } else {
                    v = Math.ceil(visiblePageCount / 2);
                    low = Math.max(scope.currentPage - v, 1);
                    high = Math.min(low + visiblePageCount - 1, scope.pageCount);
                    if (scope.pageCount - high < v) {
                        low = high - visiblePageCount + 1;
                    }
                }
                for (; low <= high; low++) {
                    scope.pagenums.push(low);
                }
                scope.onPageChange();
            }
            scope.$watch('currentPage+pageCount', function() {
                build();
            });
        },
        replace: true,
        restrict: "E",
        scope: {
            pageCount: '=',
            currentPage: '=',
            onPageChange: '&'
        },
        template: '<ul class="pagination"><li ng-click="pageChange(1)">{{firstText}}</li>' +
        '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' +
        '<li ng-repeat="pagenum in pagenums" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' +
        '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' +
        '<li ng-click="pageChange(pageCount)">{{lastText}}</li></ul>'
    }
}]);
})(angular)