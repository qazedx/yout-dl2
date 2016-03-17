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


function subscriptionsController($window, $rootScope, $scope, $http, googleService) {
  $scope.oneAtATime = true;

    $window.initGapi = function () {
      $scope.$apply($scope.getChannel);
    };

    $scope.showSubscriptions = function () {
      googleService.googleApiClientReady().then(function (data) {
        $scope.channel = data;
        console.log($scope.channel);
      }, function (error) {
        console.log('Failed: ' + error)
      });
    };
  $scope.showSubscriptions2 = function (search) {










    // //var q = $('#query').val();
    // // $scope.subscriptionsResult = {};
    // var request = gapi.client.youtube.subscriptions.list({
    //   //  q: q,
    //   part: 'snippet,contentDetails',
    //   type: 'channel',
    //   mine: true,
    //   maxResults: 10
    // });
    //
    // request.execute(function (response) {
    //   $scope.subscriptionsResult = response.result;
    //   var str = JSON.stringify(response.result);
    //   var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
    //   console.log(response.result);
    // });
    // if ($scope.subscriptionsResult) {
    //   console.log($scope.subscriptionsResult.items.length + " $scope.subscriptionsResult.items.length");
    //   for (var i = 0; i < $scope.subscriptionsResult.items.length; i++) {
    //     console.log($scope.subscriptionsResult.items[i].snippet.resourceId.channelId);
    //
    //
    //     var config = {
    //       id: $scope.subscriptionsResult.items[i].snippet.resourceId.channelId,
    //       part: 'snippet,contentDetails',
    //       maxResults: 5
    //     }
    //
    //
    //
    //     $http({
    //         method: 'GET',
    //         url: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UC5d4piMBQlBQRFpS9m_8UZQ'}).then(function successCallback(response) {
    //         console.log(response.result);
    //         console.log($scope.subscriptionsResult);
    //       }, function errorCallback(response) {
    //         console.log(response);
    //       });
    //
    //
    //
    //       var request = gapi.client.youtube.channels.list({
    //         id: $scope.subscriptionsResult.items[i].snippet.resourceId.channelId,
    //         part: 'snippet,contentDetails',
    //         maxResults: 5
    //       });
    //       var ttt;
    //       var yyy = request.execute(function (response, $scope) {
    //
    //         //  console.log($scope.subscriptionsResult);
    //         $scope.playlistTemp = response.result;
    //         ttt = response.result;
    //         console.log($scope.playlistTemp);
    //         return response.result;
    //       }); console.log(yyy);
    //
    //     }
    //
    //   }
  }
}
