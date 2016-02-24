angular.module('youtApp')
  .directive('dlField', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/search.html',
      replace: false,
      link: function ($scope, element, attr) {
        $('#idl-input').on('click', function () {
          this.setSelectionRange(0, this.value.length) // select input on click
        });
      }
    };
  })
