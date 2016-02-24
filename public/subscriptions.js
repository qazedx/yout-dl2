
function showSubscriptions2() {
  var q = $('#query').val();
  var request = gapi.client.youtube.subscriptions.list({
    q: q,
    part: 'snippet',
    type:'channel',
    mine:true,
    maxResults: 50
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    $('#search-container2').html('<i>' + channelTitle + '</i>');
    $('#search-container').html('<pre>' + str + '</pre>');
    console.log(response.result);
  });
}

function showSubscriptions() {
  var q = $('#query').val();
  var request = gapi.client.youtube.subscriptions({
    q: q,
    part: 'snippet',
    // type:'channel'
    maxResults: 3
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    $('#subscriptions-container2').html('<i>' + channelTitle + '</i>');
    $('#Subscriptions-container').html('<pre>' + str + '</pre>');
  });
}
function requestUserSubscriptions() {
  // See https://developers.google.com/youtube/v3/docs/channels/list
  var request = gapi.client.youtube.subscriptions.list({
    mine: true,
    part: 'contentDetails'
  });
  request.execute(function(response) {
    playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
  //  requestVideoPlaylist(playlistId);
  console.log(playlistId);
  });
}

// Retrieve the list of videos in the specified playlist.
function requestVideoPlaylist(playlistId, pageToken) {
  $('#video-container').html('');
  var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 10
  };
  if (pageToken) {
    requestOptions.pageToken = pageToken;
  }
  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute(function(response) {
    // Only show pagination buttons if there is a pagination token for the
    // next or previous page of results.
    nextPageToken = response.result.nextPageToken;
    var nextVis = nextPageToken ? 'visible' : 'hidden';
    $('#next-button').css('visibility', nextVis);
    prevPageToken = response.result.prevPageToken
    var prevVis = prevPageToken ? 'visible' : 'hidden';
    $('#prev-button').css('visibility', prevVis);

    var playlistItems = response.result.items;
    if (playlistItems) {
      $.each(playlistItems, function(index, item) {
        displayResult(item.snippet);
      });
    } else {
      $('#video-container').html('Sorry you have no uploaded videos');
    }
  });
}

// Create a listing for a video.
function displayResult(videoSnippet) {
  var title = videoSnippet.title;
  var videoId = videoSnippet.resourceId.videoId;
  $('#video-container').append('<p>' + title + ' - ' + videoId + '</p>');
}
