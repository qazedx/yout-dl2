angular.module('youtApp')
  .service('googleService', ['$http', '$q', function ($http, $q) {


    this.googleApiClientReady = function (type, q) {
      var deferred = $q.defer();
      maxResults = 3;
      gapi.client.setApiKey('AIzaSyDz-n5ZL3bbWXP0eHdUWOoPFCrRlbKxluk');
      gapi.client.load('youtube', 'v3', function () {
        if (type == "search") {
          console.log(q);
          var request = gapi.client.youtube.search.list({
            q: q,
            maxResults: maxResults,
            part: 'snippet'
          });
        } else if (type == "Subscriptions") {
          var request = gapi.client.youtube.subscriptions.list({
            part: 'snippet,contentDetails',
            type: 'channel',
            mine: true,
            maxResults: maxResults
          });
        }else if (type == "Paylists") {
          console.log(q);
          var request = gapi.client.youtube.playlists.list({
            part: 'snippet,contentDetails',
            channelId: q,
            maxResults: 3
          });
        } else if (type == "PaylistItems") {
          var request = gapi.client.youtube.playlistItems.list({
            q: q,
            part: 'snippet',
            playlistId: 'PLila01eYiSBjOtR8oqXkY0i5c1QS6k2Mu',
            maxResults: maxResults
          });
        } else {
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
