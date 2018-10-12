angular.module('shubhamTodoService', [])

	// simple service
	// each function returns a promise object
	.factory('Todo', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todo');
			},
			create : function(todoData) {
				return $http.post('/api/todo', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todo/' + id);
			},
			update : function(todoData) {
				return $http.post('/api/updateTodo', todoData);
			},
			deleteList: function() {
				return $http.post('/api/deletetodolist');
			}
		}
	}]);
