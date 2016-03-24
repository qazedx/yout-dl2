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

  // init functions
  setTimeout(function () {
      getCollections();
      refreshSubscriptions();
    }, 1000)
    // init functions End
  $scope.nextPageToken = "";
  $scope.subscriptionsResult = [];

  function getSubscriptions() {

    googleService.googleApiClientReady("Subscriptions", $scope.nextPageToken).then(function (data) {

        $scope.nextPageToken = data.nextPageToken;

        for (var i = 0; i < data.items.length; i++) {
          $scope.subscriptionsResult.push({
            "title": data.items[i].snippet.title,
            "channelId": data.items[i].snippet.resourceId.channelId
          });
        }

        if ($scope.nextPageToken == undefined) {
          data = {
            type: "subsctiptions-list",
            list: $scope.subscriptionsResult
          }

          var config = "";

          $http.post('/data', JSON.stringify(data)).then(
            function (response) {
              console.log("successful post");
            },
            function () {
              console.log("error post");
            });
        } else {
          getSubscriptions();

        }

      },
      function (error) {
        console.log('Failed: ' + error)
      });

  }

  function getChannelUploads() {

    for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
      googleService.googleApiClientReady(
        "Channels",
        $scope.subscriptionsResult.items[i].snippet.resourceId.channelId
      ).then(function (data) {
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
    }
  }



  function getPlaylistsItems(type, arg1) {
    if (type == "subscriptions") {

        var uploadsId = "UU" + arg1.substring(2);

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId
        ).then(function (data) {


            for (var i = 0; i < $scope.subscriptionsResult.length; i++) {

              if ($scope.subscriptionsResult[i].channelId == data.items[0].snippet.channelId) {

                $scope.subscriptionsResult[i].uploads = data;

                return;
              }
            }
          },
          function (error) {
            console.log('Failed: ' + error)
          });

    } else if (type == "collections") {

      for (var i = 0; i < $scope.collectionsResult[arg1].length; i++) {
        var uploadsId = "UU" + $scope.collectionsResult[arg1][i].channelId.substring(2);

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId
        ).then(function (data) {


            for (var i = 0; i < $scope.collectionsResult[arg1].length; i++) {
              if ($scope.collectionsResult[arg1][i].channelId == data.items[0].snippet.channelId) {

                $scope.collectionsResult[arg1][i].uploads = data;

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

  function getChannelPlaylists() {
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

  }

  function getCollections() {
    $http.get('/data').then(
      function (response) {

        $scope.collectionsResult = response.data.collections;

        console.log("successful get");
      },
      function () {
        console.log("error post");
      });
  }
  function refreshSubscriptions() {
    $http.get('/data').then(
      function (response) {

        $scope.subscriptionsResult = response.data.subscriptions;

        console.log("successful get");
      },
      function () {
        console.log("error post");
      });
  }
  $scope.refreshUploadsCollection = function (collection) {
    getPlaylistsItems("collections", collection)
  }
  $scope.getSubscriptions = function () {
    getSubscriptions()

  };
  $scope.logResult = function () {
    console.log($scope.subscriptionsResult);
    console.log($scope.collectionsResult);
  }
  $scope.refreshUploads = function () {
    getPlaylistsItems();
  }

  $scope.showCollections = function () {
    getCollections();

  }
  $scope.collection = function (type, title, channelId, collection) {

    if (type == 'add') {

      channelId = channelId.substring(2);
      data = {
        type: type,
        title: title,
        collection: collection,
        channelId: "UC" + channelId,
        uploadsId: "UU" + channelId
      }
console.log(data);
      var config = "";

      $http.post('/data', JSON.stringify(data)).then(
        function (response) {
          console.log("successful post");
         getCollections();
        },
        function () {
          console.log("error post");
        });
    } else if (type == "get-uploads") {
      getPlaylistsItems('subscriptions', channelId)
    }
  }


  function getChannels() {
    var data = {};
    googleService.googleApiClientReady("Subscriptions").then(function (data) {
        data = data;
        return data;
      },
      function (error) {
        console.log('Failed: ' + error)
      });
    return data;
  }
}
