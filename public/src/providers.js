myApp.provider('list', function listProvider() {
  var useTinfoilShielding = false;

  this.useTinfoilShielding = function(value) {
    useTinfoilShielding = !!value;
  };

  this.$get = ["apiToken", function unicornLauncherFactory(apiToken) {

    var request = gapi.client.youtube.search.list({
      q: $scope.search.value,
      part: 'snippet',
      maxResults: 10
        // type:'channel'
    });

    request.execute(function(response) {

      console.log(response.result);
      var channelTitle = JSON.stringify(response.result.items[0].snippet.title);
      // $scope.searchResults(str);
      $scope.searchResults = response.result;
      console.log($scope.searchResults.items + " $scope.searchResults");

    });

    // let's assume that the UnicornLauncher constructor was also changed to
    // accept and use the useTinfoilShielding argument
    return new list(apiToken, useTinfoilShielding);
  }];
});
