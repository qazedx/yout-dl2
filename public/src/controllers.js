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
      getChannelPlaylists("mine");
      setTimeout(function () {

      }, 2000);

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



  function getPlaylistsItems(type, arg1, arg2) {
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
    } else if (type == "myplaylists") {
console.log("ll");
console.log($scope.subscriptionsResult.myplaylists);
      for (var i = 0; i < $scope.subscriptionsResult.myplaylists.items.length; i++) {
        var uploadsId = $scope.subscriptionsResult.myplaylists.items[i].id;

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId
        ).then(function (data) {

            for (var i = 0; i < $scope.subscriptionsResult.myplaylists.items.length; i++) {
              if ($scope.subscriptionsResult.myplaylists.items[i].id == data.items[0].snippet.playlistId) {
                $scope.subscriptionsResult.myplaylists.items[i].uploads = data;
                return;

              }
            }
          },
          function (error) {
            console.log('Failed: ' + error)
          });

      }
    } else if (type == "get-more-uploads") {
      if (arg2 !== undefined) {
        for (var i = 0; i < $scope.collectionsResult[arg2].length; i++) {
          var uploadsId = "UU" + arg1.substring(2);

          googleService.googleApiClientReady(
            "PlaylistItems",
            uploadsId,
            50
          ).then(function (data) {


              for (var i = 0; i < $scope.collectionsResult[arg2].length; i++) {
                if ($scope.collectionsResult[arg2][i].channelId == data.items[0].snippet.channelId) {

                  $scope.collectionsResult[arg2][i].uploads = data;

                  return;

                }
              }
            },
            function (error) {
              console.log('Failed: ' + error)
            });


        }
      } else {
        var uploadsId = "UU" + arg1.substring(2);

        googleService.googleApiClientReady(
          "PlaylistItems",
          uploadsId,
          50
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
      }
    }
  }

  function getChannelPlaylists(type) {
    if (type == "mine") {
      googleService.googleApiClientReady(
        "Paylists", undefined, undefined, true
      ).then(function (data) {

          $scope.subscriptionsResult.myplaylists = data;
getPlaylistsItems("myplaylists");
        },
        function (error) {
          console.log('Failed: ' + error)
        });
    } else if (type = "channels") {

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
    console.log($scope.iframeList);
  }
  $scope.refreshUploads = function () {
    getPlaylistsItems();
  }

  $scope.showCollections = function () {
    getCollections();

  }
  $scope.newCollection = function (collectionName) {
    data = {
      type: "add-new-collection",
      title: collectionName
    }
    $http.post('/data', JSON.stringify(data)).then(
      function (response) {
        console.log("successful post");
        getCollections();
      },
      function () {
        console.log("error post");
      });
  }
  $scope.removeCollection = function (collectionName) {
    data = {
      type: "remove-collection",
      title: collectionName
    }
    $http.post('/data', JSON.stringify(data)).then(
      function (response) {
        console.log("successful post");
        getCollections();
      },
      function () {
        console.log("error post");
      });
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
    } else if (type == 'remove') {

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
    } else if (type == "get-more-uploads") {
      getPlaylistsItems('get-more-uploads', channelId, collection)
    }
  }
  $scope.makePlaylist = function (collection) {
    getPlaylistsItems("collections", collection)
    setTimeout(function () {
      makePlaylist(collection)
    }, 2000);
  }
  $scope.iframeList = $sce.trustAsResourceUrl('https://www.youtube.com/embed/');

  function makePlaylist(collection) {
    $scope.iframeList = [];
    var firstVideo;
    for (var i = 0; i < $scope.collectionsResult[collection].length; i++) {
      var items = $scope.collectionsResult[collection][i].uploads.items;
      for (var j = 0; j < items.length; j++) {
        if (i == 0) {
          firstVideo = items[j].snippet.resourceId.videoId;
        }
        $scope.iframeList.push(items[j].snippet.resourceId.videoId);
      }
    }
    var length = $scope.iframeList.length;
    $scope.iframeList = $sce.trustAsResourceUrl("http://www.youtube.com/v/" + firstVideo.toString() + "?version=3&loop=1&playlist=" + $scope.iframeList.toString());


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
