/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('ngBoilerplate.home', [
    'ui.router',
    'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        views: {
            "main": {
                controller: 'HomeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        },
        data: { pageTitle: 'Home' }
    });
})

.directive("fileread", [function() {
    return {
        scope: {
            fileread: "="
        },
        link: function(scope, element, attributes) {
            element.bind("change", function(changeEvent) {
                scope.$apply(function() {
                    scope.fileread = changeEvent.target.files[0];
                });
            });
        }
    };
}])

.factory('formUploader', function($http) {
    return {
        uploadImage: function(formFataObject) {
            return $http.post("http://localhost:3000/upload", formFataObject, {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
                params: {
                    formFataObject
                }
            });
        }
    }
})

/**
 * And of course we define a controller for our route.
 */
.controller('HomeCtrl', function HomeController($scope, $http, formUploader) {
    console.log($scope);

    $scope.submit = function(isValid) {

        if (isValid && $scope.image) {
            var fd = new FormData();
            fd.append('name', $scope.name);
            fd.append('image', $scope.image);

            console.log(formUploader);

            $scope.response = {};

            formUploader.uploadImage(fd).success(function(data, status, headers, config) {
                $scope.response_success = true;
                $scope.error = null;
                $scope.response = data;
            }).error(function(data, status, headers, config) {
                $scope.error = {};
                $scope.error.message = 'Something went wrong, could not contact the server';
            });
        } else {
            $scope.error = {};
            $scope.error.message = 'Please fill out all the fields';
        }
    };

    $scope.cancel = function() {
        $scope.response_success = false;
        $scope.error = null;
        $scope.name = null;
        $scope.image = null;
        angular.element("input[type='file']").val(null);
    }
})

;
