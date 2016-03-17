angular.module('youtApp')
  .factory('SearchFactory', ['$rootScope', function ($rootScope) {
    var searchResult = function (q, part) {
      var request = gapi.client.youtube.search.list({
        q: q,
        part: part // 'snippet'
      });
      request.execute(function (response) {
        $rootScope.searchResults = response.result;
      });
    }
    return searchResult;
  }])
  .service('googleService', ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();
    this.googleApiClientReady = function () {
      gapi.client.setApiKey('YOU API KEY');
      gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.playlistItems.list({
          part: 'snippet',
          playlistId: 'PLila01eYiSBjOtR8oqXkY0i5c1QS6k2Mu',
          maxResults: 8
        });
        request.execute(function (response) {
          deferred.resolve(response.result);
        });
      });
      return deferred.promise;
    };
  }])
