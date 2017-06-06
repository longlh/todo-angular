;(function() {

	angular
		.module('todo')
		.controller('FormController', FormController);

	function FormController(TaskStore, flux) {
		var vm = this;
		vm.task = getNewTask();

		vm.createTask = function() {
			flux.dispatch('ADD_TASK', vm.task);

			vm.task = getNewTask();
		};

		function getNewTask() {
			return {};
		}
	}

	FormController.$inject = ['TaskStore', 'flux'];
})();
