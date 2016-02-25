angular.module('youtApp', [])
  .controller('youtApp.controller.search', ['$rootScope', '$scope', searchController])

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
