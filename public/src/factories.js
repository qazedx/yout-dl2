angular.module('youtApp')
  .factory('SearchFactory', ['$rootScope', function($rootScope) {


    var searchResult = function (q, part) {
      var request = gapi.client.youtube.search.list({
        q: q,
        part: part // 'snippet'
      });
console.log(q);
      request.execute(function (response) {
        $rootScope.searchResults = response.result;

      });

    }
return searchResult;
  }]);
