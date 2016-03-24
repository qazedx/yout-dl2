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

  // init functions
  setTimeout(function () {
      //  getSubscriptions();
      //  getCollections();
    }, 1000)
    // init functions End
  $scope.nextPageToken = "";
  $scope.subscriptionsResult = [];

  function getSubscriptions() {

    googleService.googleApiClientReady("Subscriptions", $scope.nextPageToken).then(function (data) {

        $scope.nextPageToken = data.nextPageToken;
         console.log(data.nextPageToken);

        for (var i = 0; i < data.items.length; i++) {
          console.log($scope.subscriptionsResult);
          $scope.subscriptionsResult.push(data.items[i].snippet.resourceId.channelId);
        }

        if ($scope.nextPageToken == undefined) {
          data = {
            type: "subsctiptions-list",
            list: $scope.subscriptionsResult
          }

          var config = "";

          $http.post('/data', JSON.stringify(data)).then(
            function (response) {
              console.log(response);
              console.log("successful post");
            },
            function () {
              console.log("error post");
            });
        } else {
          getSubscriptions();

        }


        //  getChannelUploads();

        //  getChannelPlaylists();

        //  getPlaylistsItems();

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



  function getPlaylistsItems(type, collection) {
    if (type == "subscriptions") {
      for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
        var uploadsId = "UU" + $scope.subscriptionsResult.items[i].snippet.resourceId.channelId.substring(2);

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId
        ).then(function (data) {

            console.log(data);

            for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {



              if ($scope.subscriptionsResult.items[i].snippet.resourceId.channelId == data.items[0].snippet.channelId) {
                console.log($scope.subscriptionsResult.items[i].snippet.resourceId.channelId + " " + data.items[0].snippet.channelId);
                $scope.subscriptionsResult.items[i].uploads.uploadItems = data;

                return;

              }

            }


          },
          function (error) {
            console.log('Failed: ' + error)
          });

      }
    } else if (type == "collections") {

      console.log(collection);
      for (var i = 0; i < $scope.collectionsResult[collection].length; i++) {
        var uploadsId = "UU" + $scope.collectionsResult[collection][i].channelId.substring(2);

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId
        ).then(function (data) {


            for (var i = 0; i < $scope.collectionsResult[collection].length; i++) {
              if ($scope.collectionsResult[collection][i].channelId == data.items[0].snippet.channelId) {
                console.log($scope.collectionsResult[collection][i].channelId + " " + data.items[0].snippet.channelId);
                $scope.collectionsResult[collection][i].uploads = data;

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

        // for (var i = 0; i < $scope.collections.length; i++) {
        //
        //   var collection = $scope.collections[i];
        //   console.log(i);
        //   for (var i = 0; i < collection.length; i++) {
        //
        //     googleService.googleApiClientReady(
        //       "PlaylistItems",
        //       collection[i].playlistId
        //     ).then(function (data) {
        //         for (var i = 0; i < collection.length; i++) {
        //           console.log(data);
        //           console.log(i + " " + collection[i].title + " " + data.items[0].snippet.title);
        //           console.log(collection[i].channelId + "  " + data.items[0].snippet.channelId);
        //
        //           if (collection[i].channelId == data.items[0].snippet.channelId) {
        //             collection[i].uploads = data;
        //             // console.log(data);
        //             return;
        //           }
        //
        //         }
        //       },
        //       function (error) {
        //         console.log('Failed: ' + error)
        //       });
        //
        //   }
        //
        //   for (var i = 0; i < $scope.collections.length; i++) {
        //     if ($scope.collections[i][0].title == collection[0].title) {
        //       $scope.collections[i] = collection;
        //       return;
        //     }
        //   }
        //
        // }

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
  $scope.collection = function (type, title, channelId) {
    channelId = channelId.substring(2)
    console.log(channelId);
    data = {
      type: type,
      title: title,
      channelId: "UC" + channelId,
      uploadsId: "UU" + channelId
    }

    var config = "";

    $http.post('/data', JSON.stringify(data)).then(
      function (response) {
        console.log(response);
        console.log("successful post");
      },
      function () {
        console.log("error post");
      });
  }

  $scope.getChannels = function () {
    var tt = googleService.googleApiClientReady("SubscriptionsN");
    console.log(JSON.stringify(tt));
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
