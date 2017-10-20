var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('myCtrl', function($scope, $http) {
	$scope.types = {Amazon: false, Stockroom: false, Thoughtworks: false, Flipkart: false };
	$scope.types1 = {online:false, offline: false};
	$scope.clear= function(){
		$scope.types.Amazon = false; 
		$scope.types.Stockroom = false;
		 $scope.types.Thoughtworks = false;
		 $scope.types.Flipkart = false;
		 $scope.types1.online = false;
		 $scope.types1.offline = false;
	};

	  //Range slider config
  		$scope.expMin = 1;
  		$scope.expMax=7;
  		$scope.ctcMin = 1;
  		$scope.ctcMax=7;

  	 $scope.req = function(){ $http.get("https://api.stockroom.io/candidate/features_list")
    .then(function(response) {
    	$scope.result = response.data.features_list;
    	$scope.online = function(){
    	var count=0;
    	for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].feature_type == "online" ){
        			count++;
        		}else{}
        	};
        	 return count;
        };

        $scope.offline = function(){
    	var count=0;
    	for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].feature_type == "offline" ){
        			count++;
        		}else{}
        	};
        	 return count;
        };
    	//For project number
        $scope.amazon= function(){
        	 var number =0;
       		 for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].company_name == "Amazon" ){
        			number++;
        		}else{}
        	};
        	return number;
        };
          $scope.stockroom= function(){
        	 var number =0;
       		 for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].company_name == "Stockroom.io" ){
        			number++;
        		}else{}
        	};
        	return number;
        };
          $scope.thought= function(){
        	 var number =0;
       		 for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].company_name == "ThoughtWorks" ){
        			number++;
        		}else{}
        	};
        	return number;
        };
          $scope.flipkart= function(){
        	 var number =0;
       		 for(i=0;i<$scope.result.length;i++){
        		if($scope.result[i].company_name == "Flipkart" ){
        			number++;
        		}else{}
        	};
        	return number;
        };
        $scope.currentPage = 1,
        $scope.noOfPages=$scope.result.length*2,
        $scope.numPerPage = 5,
        $scope.maxSize = 5;
        
    });
};
$scope.req();
});

app.filter('myfilter', function(){

	return function(items, types) {
    var filtered = [];
    angular.forEach(items, function(item) {
       if(types.Amazon == false && types.Stockroom == false && types.Thoughtworks == false && types.Flipkart == false) {
          filtered.push(item);
        }
         if(types.Amazon == true &&  item.company_name == 'Amazon'){
          filtered.push(item);
        }
         if(types.Stockroom == true && item.company_name == 'Stockroom.io'){
          filtered.push(item);
        }
         if(types.Thoughtworks == true &&  item.company_name == 'ThoughtWorks'){
          filtered.push(item);
        }
         if(types.Flipkart == true &&  item.company_name == 'Flipkart'){
          filtered.push(item);
        } 
    });
    return filtered;
  };

});

app.filter('myfilter2' , function(){
	return function(features, types1){
		var featured = [];
		 angular.forEach(features, function(feature){
  	 	if(types1.online == false && types1.offline == false){
  	 		featured.push(feature);
  	 	}
  	 	if(types1.online == true &&  feature.feature_type == "online"){
  	 		featured.push(feature);
  	 	}
  	 	if(types1.offline == true && feature.feature_type == "offline"){
  	 		featured.push(feature);
  	 	}

  	});
	return featured;
	};

});

app.filter('rangeFilter', function () {
    return function (items, attr, min, max) {
        var range = [],
            min=parseFloat(min),
            max=parseFloat(max);
        for (var i=0, l=items.length; i<l; ++i){
            var item = items[i];
            if(item[attr]<=max && item[attr]>=min){
                range.push(item);
            }
        }
        return range;
    };
});

    app.directive('input', function() {
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if('numeric' in attrs) { ngModel.$parsers.push(parseFloat); }
            }
        };
    });

