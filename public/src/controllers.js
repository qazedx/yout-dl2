angular.module('youtApp', [])
  .controller('searchController', ['$rootScope', '$scope', searchController])
  .controller('subscriptionsController', ['$rootScope', '$scope', subscriptionsController])

function searchController($rootScope, $scope) {
  $scope.searchResults = {
    "items": {
      "1": "s",
      "2": "s3",
      "3": "s2"
    }
  }
  $scope.Search = function() {
    // console.log($search.value);

    var request = gapi.client.youtube.search.list({
      q: $scope.search.value,
      part: 'snippet',
      maxResults: 10
        // type:'channel'
    });
    console.log($scope.search);
    request.execute(function(response) {

      var str = JSON.stringify(response.result);
      console.log(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      // $scope.searchResults(str);
      $scope.searchResults = response.result;
      console.log($scope.searchResults.items + " $scope.searchResults");

      $scope.echosc;
    });
    setTimeout(function() {
      $scope.searchResults;
    }, 2000);
  }

  $scope.echosc = function() {
      console.log($scope.searchResults);
    }
    // $scope.searchResults = function (resultsItems) {
    //   rez = JSON.parse(resultsItems)
    //   console.log("from controlet" + rez);
    //   return rez;
    // }
}


function subscriptionsController($rootScope, $scope) {
  {
  // // Define some variables used to remember state.
  // var playlistId, nextPageToken, prevPageToken;
  //
  // // After the API loads, call a function to get the uploads playlist ID.
  // $scope.handleAPILoaded = function() {
  //   $scope.requestUserUploadsPlaylistId();
  // }
  //
  // // Call the Data API to retrieve the playlist ID that uniquely identifies the
  // // list of videos uploaded to the currently authenticated user's channel.
  // $scope.requestUserUploadsPlaylistId = function() {
  //   // See https://developers.google.com/youtube/v3/docs/channels/list
  //   var request = gapi.client.youtube.channels.list({
  //     mine: true,
  //     part: 'contentDetails'
  //   });
  //   request.execute(function(response) {
  //     playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
  //     requestVideoPlaylist(playlistId);
  //   });
  // }
  //   $scope.handleAPILoaded;
  // // Retrieve the list of videos in the specified playlist.
  // $scope.requestVideoPlaylist= function (playlistId, pageToken) {
  //   $('#video-container').html('');
  //   var requestOptions = {
  //     playlistId: playlistId,
  //     part: 'snippet',
  //     maxResults: 10
  //   };
  //   if (pageToken) {
  //     requestOptions.pageToken = pageToken;
  //   }
  //
  //   var request = gapi.client.youtube.playlistItems.list(requestOptions);
  //   request.execute(function(response) {
  //     // Only show pagination buttons if there is a pagination token for the
  //     // next or previous page of results.
  //     nextPageToken = response.result.nextPageToken;
  //     var nextVis = nextPageToken ? 'visible' : 'hidden';
  //     $('#next-button').css('visibility', nextVis);
  //     prevPageToken = response.result.prevPageToken
  //     var prevVis = prevPageToken ? 'visible' : 'hidden';
  //     $('#prev-button').css('visibility', prevVis);
  //
  //     var playlistItems = response.result.items;
  //     if (playlistItems) {
  //       $.each(playlistItems, function(index, item) {
  //         displayResult(item.snippet);
  //       });
  //     } else {
  //       $('#video-container').html('Sorry you have no uploaded videos');
  //     }
  //   });
  // }
  }
  $scope.showSubscriptions = function(search) {
    //var q = $('#query').val();
    var request = gapi.client.youtube.subscriptions.list({
      //  q: q,
      part: 'snippet',
      type: 'channel',
      mine: true,
      maxResults: 10
    });

    request.execute(function(response) {
      $scope.subscriptionsResult = response.result;
      var str = JSON.stringify(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      console.log(response.result);
    });
  }
}
