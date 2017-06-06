;(function() {
	angular
		.module('todo')
		.controller('ListController', ListController);

	function ListController($scope, TaskStore, flux) {
		var vm = this;

		$scope.$listenTo(TaskStore, ['tasks'], function() {
			vm.tasks = TaskStore.tasks;
			vm.total = TaskStore.total;
		});

		vm.selectAll = function() {
			flux.dispatch('SELECT_ALL_TASKS');
		};

		vm.toggleSelection = function($event, task) {
			$event.preventDefault();
			flux.dispatch('TOGGLE_TASK_SELECTION', task);
		}

		vm.deleteTasks = function() {
			flux.dispatch('DELETE_SELECTED_TASKS');
		};
	}

	ListController.$inject = ['$scope', 'TaskStore', 'flux'];
})();
