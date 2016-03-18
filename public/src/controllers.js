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
        for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {

          // playlists
          googleService.googleApiClientReady(
            "Paylists",
            $scope.subscriptionsResult.items[i].snippet.resourceId.channelId
          ).then(function (data) {

              for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
                if ($scope.subscriptionsResult.items[i].playlists == null) {
                  $scope.subscriptionsResult.items[i].playlists = data;
                  return;
                }
              }

            },
            function (error) {
              console.log('Failed: ' + error)
            });

          // uploads
          googleService.googleApiClientReady(
            "Channels",
            $scope.subscriptionsResult.items[i].snippet.resourceId.channelId
          ).then(function (data) {

              //  console.log(data);

              for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
                if ($scope.subscriptionsResult.items[i].uploads == null) {
                  $scope.subscriptionsResult.items[i].uploads = data;
                  return;
                }
              }
            },
            function (error) {
              console.log('Failed: ' + error)
            });

          // uploads END

        }

      },
      function (error) {
        console.log('Failed: ' + error)
      });

  };
  $scope.logResult = function () {
    console.log($scope.subscriptionsResult);
  }

  $scope.refreshUploads = function () {

    for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {

      googleService.googleApiClientReady(
        "PlaylistItems",
        $scope.subscriptionsResult.items[i].uploads.items[0].contentDetails.relatedPlaylists.uploads
      ).then(function (data) {

          console.log(data);

          for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {

            if ($scope.subscriptionsResult.items[i].uploads.uploadItems == null) {

              $scope.subscriptionsResult.items[i].uploads.uploadItems = data;

              return;
            }

          }


        },
        function (error) {
          console.log('Failed: ' + error)
        });

    }
  }


}
