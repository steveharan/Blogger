var app = angular.module('Blogger', []);

app.controller('MainCtrl', [
    '$scope',
    function($scope){
        $scope.blogs = [
            {title: 'Blogg 1', upvotes: 5},
            {title: 'Blogg 2', upvotes: 2},
            {title: 'Blogg 3', upvotes: 15},
            {title: 'Blogg 4', upvotes: 9},
            {title: 'Blogg 5', upvotes: 4}
        ];

        $scope.addBlog = function() {
            if (!$scope.title || $scope.title == '') { return; }
            $scope.blogs.push({title: $scope.title, link: $scope.link, upvotes: 0});
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotesBlog = function(post) {
            post.upvotes += 1;
        };
    }
]);