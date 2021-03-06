/**
 * Created by Administrator on 2017/1/7.
 */
var myAppDire = angular.module("myAppDire",[]);


/**
 * angularjs分页控件
 * Created by CHEN on 2016/11/1.
 */

myAppDire.directive('numbericInput', function() {
    return {
        require: 'ngModel',
        restrict: "EA",
        scope: {
            max: '@', // 数字最大值
            maxLength: '@', // 数字最大长度
            min: '@' // 数字最小值
        },
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(tezxt) {
                if (text == undefined) {
                    return '';
                }
                var max = +scope.max;
                var maxLength = +scope.maxLength;
                var min = +scope.min;

                // 替换所有非数字为空
                var transformedInput = text.replace(/[^0-9]/g, '');

                // 长度超过去掉
                if (maxLength && text.length > maxLength) {
                    transformedInput = text.slice(0, maxLength);
                }
                // 数字大小超过max的，等于最大值max
                if (max && +transformedInput > max) {
                    transformedInput = max + '';
                }
                // 数字大小小于min的，等于min
                if (min && +transformedInput < min) {
                    transformedInput = min + '';
                }

                if(transformedInput !== text) {
                    // $setViewValue 更新视图值
                    // 视图值改变时会被调用，比如inputlect指令就会调用这个函数
                    ngModelCtrl.$setViewValue(transformedInput);
                    // 更新视图
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }

            // 推入将要执行的函数数组，
            // 其中的函数依次被调用，并将结果传递给下一个，
            // 最后出来的值会被传递到model中，
            // 还会包括验证和转换值的过程，验证中会使用$setValidity方法
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
    //接下来是验证是否与服务器上同名
myAppDire.directive('ensureUnique', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function(n) {
                if (!n) return;
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,        //这里应该都会不一样吧
                    data: {'field': attrs.ensureUnique}
                }).success(function(data) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data) {
                    c.$setValidity('unique', false);
                });
            });
        }
    };
});

/*失焦后再进行表单的验证*/
myAppDire.directive('ngFocus', [function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur', function(evt) {
                scope.$apply(function() {
                    ctrl.$focused = false;
                });
            });
        }
    };
}]);

