angular.module('youtApp')
  // .factory('SearchFactory', ['$rootScope', function ($rootScope) {
  //   var searchResult = function (q, part) {
  //     var request = gapi.client.youtube.search.list({
  //       q: q,
  //       part: part // 'snippet'
  //     });
  //     request.execute(function (response) {
  //       $rootScope.searchResults = response.result;
  //     });
  //   }
  //   return searchResult;
  // }])
  .service('googleService', ['$http', '$q', function ($http, $q) {

    
    this.googleApiClientReady = function (type, q) {
      var deferred = $q.defer();
       gapi.client.setApiKey('AIzaSyDz-n5ZL3bbWXP0eHdUWOoPFCrRlbKxluk');
      gapi.client.load('youtube', 'v3', function () {
        if (type == "search") {
          console.log(q);
          var request = gapi.client.youtube.search.list({
            q: q,
            maxResults: 3,
            part: 'snippet'
          });
        }
        // else if(type == "PaylistItems") {
        //   var request = gapi.client.youtube.playlistItems.list({
        //     q: q,
        //     part: 'snippet',
        //      playlistId: 'PLila01eYiSBjOtR8oqXkY0i5c1QS6k2Mu',
        //     maxResults: 8
        //   });
        // }
        else {
          console.log("unknown type");
          return;
        }
        request.execute(function (response) {
          deferred.resolve(response.result);
          console.log(response.result);
        });
      });
      return deferred.promise;
    };
  }])
