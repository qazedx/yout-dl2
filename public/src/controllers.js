angular.module('youtApp', [])
  .controller('searchController', ['$rootScope', '$scope', searchController])
  .controller('subscriptionsController', ['$rootScope', '$scope', subscriptionsController])

function searchController($rootScope, $scope) {
$scope.searchResults = {
  "items":{
    "1":"s",
    "2":"s3",
    "3":"s2"
  }
}
  $scope.Search = function (search) {
    // console.log(search);
    var q = search.value;
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      // type:'channel'
      maxResults: 3
    });
    console.log($scope.search);
    request.execute(function (response) {

      var str = JSON.stringify(response.result);
      console.log(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      $('#search-container').html('<pre style="max-height:300px;">' + str + '</pre>');
      $('#search-container2').html('<i>' + channelTitle + '</i>');
      // $scope.searchResults(str);
      $scope.searchResults = response.result;
      console.log($scope.searchResults.items + " $scope.searchResults");
    });

  }
  $scope.echosc = function (){
    console.log($scope.searchResults);
  }
  // $scope.searchResults = function (resultsItems) {
  //   rez = JSON.parse(resultsItems)
  //   console.log("from controlet" + rez);
  //   return rez;
  // }
}


function subscriptionsController($rootScope, $scope) {

  $scope.showSubscriptions = function (search) {
    //var q = $('#query').val();
    var request = gapi.client.youtube.subscriptions.list({
      //  q: q,
      part: 'snippet',
      type: 'channel',
      mine: true,
      maxResults: 10
    });

    request.execute(function (response) {
      var str = JSON.stringify(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      $('#search-container2').html('<i>' + channelTitle + '</i>');
      $('#search-container').html('<pre>' + str + '</pre>');
      console.log(response.result);
    });
  }
}
