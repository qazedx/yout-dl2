angular.module('youtApp', [])
  .controller('searchController', ['$rootScope', '$scope', searchController])
  .controller('subscriptionsController', ['$rootScope', '$scope', subscriptionsController])

function searchController($rootScope, $scope, list) {
  $scope.searchResults = {
    "items": {
      "1": "s",
      "2": "s3",
      "3": "s2"
    }
  }
  $scope.Search = function () {
    // console.log($search.value);

    // var request = gapi.client.youtube.search.list({
    //   q: $scope.search.value,
    //   part: 'snippet',
    //   maxResults: 10
    //     // type:'channel'
    // });
    // console.log($scope.search);
    // request.execute(function(response) {
    //
    //   var str = JSON.stringify(response.result);
    //   console.log(response.result);
    //   var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    //   // $scope.searchResults(str);
    //   $scope.searchResults = response.result;
    //   console.log($scope.searchResults.items + " $scope.searchResults");
    // });
    list.search();
  }

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
      $scope.subscriptionsResult = response.result;
      var str = JSON.stringify(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      console.log(response.result);
    });
  }
}
