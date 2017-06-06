;(function() {
	angular
		.module('todo')
		.store('TaskStore', function() {
			return {
				initialize: function() {
					this.state = this.immutable({
						tasks: {}
					});

					// add sample data
					this.addTask({
						id: uuid.v4(),
						title: 'Finish Quiz',
						selected: true
					});

					this.addTask({
						id: uuid.v4(),
						title: 'Push Quiz source code to Github',
						selected: false
					})
				},
				handlers: {
					ADD_TASK: 'addTask',
					SELECT_ALL_TASKS: 'selectAllTasks',
					TOGGLE_TASK_SELECTION: 'toogleTaskSelection',
					DELETE_SELECTED_TASKS: 'deleteSelectedTasks'
				},
				addTask: function(task) {
					this.state.set(['tasks', task.id], task);
				},
				selectAllTasks: function() {
					var tasks = this.state.get('tasks');

					Object.keys(tasks).forEach(function(id) {
						this.state.set(['tasks', id, 'selected'], true);
					}.bind(this));
				},
				toogleTaskSelection: function(task) {
					var currentStatus = this.state.get(['tasks', task.id, 'selected']);

					this.state.set(['tasks', task.id, 'selected'], !currentStatus);
				},
				deleteSelectedTasks: function() {
					var tasks = this.state.get('tasks');

					Object.keys(tasks).forEach(function(id) {
						var selected = this.state.get(['tasks', id, 'selected']);

						if (selected) {
							this.state.unset(['tasks', id]);
						}
					}.bind(this));
				},
				exports: {
					get tasks() {
						return this.state.get('tasks');
					},
					get total() {
						return Object.keys(this.state.get('tasks')).length;
					}
				}
			}
		});
})();
