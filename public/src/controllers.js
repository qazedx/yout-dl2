angular.module('youtApp')
  .controller('searchController', searchController)
  .controller('subscriptionsController', subscriptionsController)

function searchController($rootScope, $scope, googleService) {
  $scope.searchResults = {
    "items": {
      "1": "s",
      "2": "s3",
      "3": "s2"
    }
  }
  $scope.Search = function (searchModel) {
    var q = $scope.searchModel;

    googleService.googleApiClientReady("search", q).then(function (data) {
      $scope.searchResults = data;
      console.log(data);
    }, function (error) {
      console.log('Failed: ' + error)
    });
  }

}

function subscriptionsController($window, $rootScope, $scope, $http, $sce, googleService) {
  $scope.oneAtATime = true;

  $window.initGapi = function () {
    $scope.$apply($scope.getChannel);
  };

  $scope.showSubscriptions = function () {
    googleService.googleApiClientReady("Subscriptions").then(function (data) {
      $scope.subscriptionsResult = data;
      console.log($scope.subscriptionsResult);
      for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
        googleService.googleApiClientReady(
          "Paylists",
          $scope.subscriptionsResult.items[i].snippet.resourceId.channelId
        ).then(function (data) {

          var playlists = data;

          $scope.subscriptionsResult.items[i][playlists] = {};
          $scope.subscriptionsResult.items[i][playlists] = playlists
          console.log($scope.subscriptionsResult.items[i].playlists);

        }, function (error) {
          console.log('Failed: ' + error)
        });
      }

    }, function (error) {
      console.log('Failed: ' + error)
    });

  };





  $scope.showSubscriptions2 = function (search) {
    // //var q = $('#query').val();
    // // $scope.subscriptionsResult = {};
    // var request = gapi.client.youtube.subscriptions.list({
    //   //  q: q,
    //   part: 'snippet,contentDetails',
    //   type: 'channel',
    //   mine: true,
    //   maxResults: 10
    // });
    //
    // request.execute(function (response) {
    //   $scope.subscriptionsResult = response.result;
    //   var str = JSON.stringify(response.result);
    //   var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    //   console.log(response.result);
    // });
    // if ($scope.subscriptionsResult) {
    //   console.log($scope.subscriptionsResult.items.length + " $scope.subscriptionsResult.items.length");
    //   for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
    //     console.log($scope.subscriptionsResult.items[i].snippet.resourceId.channelId);
    //
    //
    //     var config = {
    //       id: $scope.subscriptionsResult.items[i].snippet.resourceId.channelId,
    //       part: 'snippet,contentDetails',
    //       maxResults: 5
    //     }
    //       var request = gapi.client.youtube.channels.list({
    //         id: $scope.subscriptionsResult.items[i].snippet.resourceId.channelId,
    //         part: 'snippet,contentDetails',
    //         maxResults: 5
    //       });
    //       var ttt;
    //       var yyy = request.execute(function (response, $scope) {
    //
    //         //  console.log($scope.subscriptionsResult);
    //         $scope.playlistTemp = response.result;
    //         ttt = response.result;
    //         console.log($scope.playlistTemp);
    //         return response.result;
    //       }); console.log(yyy);
    //
    //     }
    //
    //   }
  }
}
