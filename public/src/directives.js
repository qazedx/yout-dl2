angular.module('youtApp')
  .directive('search', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/search.html',
      replace: false,
      link: function ($scope, element, attr) {

      }
    };
  })
  .directive('searchlist', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/searchlist.html',
      replace: false,
      link: function ($scope, element, attr) {

      }
    };
  })
  .directive('subscriptions', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/subscriptions.html',
      replace: false,
      link: function ($scope, element, attr) {

      }
    };
  })
  .directive('subscriptionslist', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/subscriptionslist.html',
      replace: false,
      link: function ($scope, element, attr) {

      }
    };
  })
