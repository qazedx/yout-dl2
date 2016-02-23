// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    type:'channel'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    $('#search-container2').html('<strong style="white-space: pre-wrap;">' + channelTitle + '</strong>');
    $('#search-container').html('<pre style="white-space: pre-wrap;">' + str + '</pre>');
  });
}
