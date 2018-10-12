angular.module('shubhamTodoController', [])

	.controller('mainController', ['$scope','$http','Todo','$interval', function($scope, $http, Todo, $interval) {
		$scope.dynamicDataAllow = false;
		var chartData1 = [];
		var max = 100;
		var min = 10;

		Todo.get()
		.success(function(data) {
			console.log(data[0].text);

			data[0].text.forEach(function(item){
				chartData1.push( {
					"date": new Date(item.date),
					"value": item.value
				});
			});




			var chart = AmCharts.makeChart( "chartdiv", {
			  "type": "stock",
			  "theme": "light",

			  // This will keep the selection at the end across data updates
			  "glueToTheEnd": true,

			  // Defining data sets
			  "dataSets": [ {
			    "title": "temprature in \xB0C",
			    "fieldMappings": [ {
			      "fromField": "value",
			      "toField": "value"
			    }],
			    "dataProvider": chartData1,
			    "categoryField": "date"
			  }],

			  // Panels
			  "panels": [ {
			    "showCategoryAxis": false,
			    "title": "Value",
			    "percentHeight": 60,
			    "stockGraphs": [ {
			      "id": "g1",
			      "valueField": "value",
			      "comparable": false,
			      "compareField": "value"
			    } ],
			    "stockLegend": {}
			  }],

			  // Scrollbar settings
			  "chartScrollbarSettings": {
			    "graph": "g1",
			    "usePeriod": "WW"
			  },

			  // Period Selector
			  "periodSelector": {
			    "position": "left",
			    "periods": [
					{
			      "period": "DD",
			      "count": 1,
			      "label": "1 day average temprature"
			    }, {
			      "period": "DD",
			      "selected": true,
			      "count": 10,
			      "label": "10 day temprature"
			    }, {
			      "period": "MM",
			      "count": 1,
			      "label": "1 month temprature"
			    },
					{
			      "period": "MM",
			      "count": 3,
			      "label": "3 month temprature"
			    },
					{
			      "period": "YYYY",
			      "count": 1,
			      "label": "1 year temprature"
			    }, {
			      "period": "MAX",
			      "label": "MAX"
			    } ]
			  },

			  // Data Set Selector
			  "dataSetSelector": {
			    "position": "left"
			  }
			} );

			function myTimer() {
				if ( chart.mouseDown )
					 return;
				 // add new datapoint at the end
				 var newDate = new Date( chartData1[ chartData1.length - 1 ].date );
				 newDate.setDate( newDate.getDate() + 1 );

				 var i = chartData1.length;

				 var a1 = (Math.floor(Math.random() * (max - min + 1)) + min);

				 chart.dataSets[ 0 ].dataProvider.push( {
					 date: newDate,
					 value: a1
				 } );
				 chart.validateData();

			}

			function myFunc (val) {
					var myVar = setInterval(myTimer, 500);
			}
			$scope.myFunc = myFunc;




			// var myVar = setInterval(myTimer, 1000);
			//
			// function myTimer() {
			// 	if ( chart.mouseDown )
			// 		return;
			// 	// add new datapoint at the end
			// 	var newDate = new Date( chartData1[ chartData1.length - 1 ].date );
			// 	newDate.setDate( newDate.getDate() + 1 );
			//
			// 	var i = chartData1.length;
			//
			// 	var a1 = (Math.floor(Math.random() * (max - min + 1)) + min);
			//
			// 	chart.dataSets[ 0 ].dataProvider.push( {
			// 		date: newDate,
			// 		value: a1
			// 	} );
			//
			// 	chart.validateData();
			// }
		});
}]);
