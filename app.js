angular.module('Blogger', ['ui.router'])
.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('blogs', {
                    url: '/blogs/{id}',
                    templateUrl: '/blogs.html',
                    controller: 'BlogsCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }])
    .controller('MainCtrl', [
    '$scope',
    'blogs',
    function($scope, blogs){

        $scope.blogs = blogs.blogs;

        $scope.addBlog = function() {
            if (!$scope.title || $scope.title == '') { return; }
            $scope.blogs.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Steve', body: 'Good Post Dude', upvotes: 0},
                    {author: 'Jon', body: 'eh?', upvotes: 0}
                ]
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotesBlog = function(post) {
            post.upvotes += 1;
        };

        $scope.decrementUpvotesBlog = function(post) {
            if (post.upvotes >= 1) {
                post.upvotes -= 1;
            }
        };
    }])
    .controller('BlogsCtrl', [
        '$scope',
        '$stateParams',
        'blogs',
        function($scope, $stateParams, blogs) {
            $scope.blog = blogs.blogs[$stateParams.id];

            $scope.addComment = function(){
                if($scope.body === '') { return; }
                $scope.blog.comments.push({
                    body: $scope.body,
                    author: 'user',
                    upvotes: 0
                });
                $scope.body = '';
            };
            $scope.incrementUpvotesComment = function(comment) {
                comment.upvotes += 1;
            };
            $scope.decrementUpvotesComment = function(comment) {
                if (comment.upvotes >= 1) {
                    comment.upvotes -= 1;
                }
            };
        }
    ])
.factory('blogs', [function(){
    var o = {
        blogs: []
    };
    return o;
}]);
