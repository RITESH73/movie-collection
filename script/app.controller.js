(function () {
	"use strict";

	angular.module("app").controller("MovieList",["$scope", "movieConstants", function($scope, movieConstants){
		
		$scope.activeIndex = -1;
		$scope.static ={
			movie: movieConstants.MOVIE
		};
		$scope.popupMode= "ADD";
		$scope.movieDetails = angular.copy($scope.static.movie);
		$scope.movieList = [];

		//Set movie index of movie list to performa action.
		$scope.setIndex = function(index){
			$scope.activeIndex = index;
		};

		//Remove movie from movie list collection
		$scope.removeMovieFromCollection = function(){
			$scope.movieList.splice($scope.activeIndex,1);
			$scope.activeIndex = -1;
			updateLocalStorage();
			$('#deleteConfirmation').modal('hide');
		};

		//Add movie to movie list collection
		$scope.addMovie = function(){
			$scope.movieList.push(angular.copy($scope.movieDetails));
			$scope.resetMovieDetials();
			$('#addMovie').modal('hide');	
			updateLocalStorage();
		};

		//Add movie to movie list collection
		$scope.editMovie = function(index){
			$scope.popupMode = "EDIT";
			$scope.movieDetails = angular.copy($scope.movieList[index]);
			$scope.setIndex(index);
			$('#addMovie').modal('show');
		};

		//Update acive move details on popup update button click
		$scope.updateMovie = function(){
			$scope.movieList[$scope.activeIndex] = angular.copy($scope.movieDetails);
			$scope.resetMovieDetials();
			$('#addMovie').modal('hide');
			updateLocalStorage();	
		};


		//Reset movie object to add new movie.
		$scope.resetMovieDetials = function (){
			$scope.movieDetails = angular.copy($scope.static.movie); 
			$scope.popupMode = "ADD";
		}

		//Update movie collection changes from local storage
		function updateLocalStorage(){
			localStorage.setItem("movie_collection", angular.toJson($scope.movieList));
		}

		//Set movie collection from local storage
		$scope.init = function(){
			$scope.movieList = (localStorage.getItem("movie_collection") == null) ? [] : angular.fromJson(localStorage.getItem("movie_collection"))
		}

	}]);
})();