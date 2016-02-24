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
console.log($scope.searchResults);

      }
    };
  })
  .directive('subscriptions', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/subscriptions.html',
      replace: false,
      link: function ($scope, element, attr) {
        function showSubscriptions2() {
          var q = $('#query').val();
          var request = gapi.client.youtube.subscriptions.list({
            q: q,
            part: 'snippet',
            type: 'channel',
            mine: true,
            maxResults: 10
          });

          request.execute(function (response) {
            var str = JSON.stringify(response.result);
            var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
            console.log(response.result);
          });
        }
      }
    };
  })
