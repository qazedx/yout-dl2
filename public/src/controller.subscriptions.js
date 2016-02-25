angular.module('youtApp.controller.subscriptions', [])
  .controller('youtApp.controller.subscriptions', ['$rootScope', '$scope', subscriptionsController])
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
