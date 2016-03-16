angular.module('youtApp')
  .controller('searchController', searchController)
  .controller('subscriptionsController', subscriptionsController)

function searchController($rootScope, $scope, SearchFactory) {
  $scope.searchResults = {
    "items": {
      "1": "s",
      "2": "s3",
      "3": "s2"
    }
  }
  $scope.Search = function (searchModel) {
    console.log($scope.searchModel);
    var q = $scope.searchModel;
    SearchFactory(q, 'snippet');
    $scope.searchResults = $rootScope.searchResults
    console.log($scope.searchResults);
    // SearchFactory.searchResult().then(function (data) {
    //   console.log(data + " data");
    //   //   $scope.Temp1 = data.Temp1;
    // });
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
    // list.search();
  }

}


function subscriptionsController($rootScope, $scope) {
  $scope.oneAtATime = true;
  $scope.showSubscriptions = function (search) {
    //var q = $('#query').val();
    var request = gapi.client.youtube.subscriptions.list({
      //  q: q,
      part: 'snippet,contentDetails',
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
    console.log($scope.subscriptionsResult.items.length + " $scope.subscriptionsResult.items.length");
    for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
      console.log($scope.subscriptionsResult.items[i].snippet.resourceId.channelId);

      var request = gapi.client.youtube.channels.list({
        id: $scope.subscriptionsResult.items[i].snippet.resourceId.channelId,
        part: 'snippet',
        maxResults: 5
      });
      request.execute(function (response) {


      console.log(response.result); ;

      });
    }
  }
}
