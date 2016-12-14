$(document).ready(function () {

	var data = {
		lastID : 0,
		pizzas : []
	};

	var control = {
		addPizza: function() {
			data.lastID++;
			data.pizzas.push({
				id: data.lastID,
				visible: true
			});
			view.render();
		},

		removePizza: function(id) {
			var pizzaRemove = data.pizzas[id - 1];
			pizzaRemove.visible = false;
			view.render();
		},

		getVisiblePizza: function() {
			return data.pizzas.filter(function(pizza){
				return pizza.visible;
			});
		}
	}

	var view = {
		init: function() {
			this.pizzaList = $('.pizza-list');
			this.pizzaTemplate = $('script[data-template="pizza"]').html();
			$('button.add-pizza').click(function() {
				control.addPizza();
			});

			this.pizzaList.on('click', '.remove-pizza', function(e) {
				control.removePizza($(this).parents('.pizza').attr('data-id'));
			})

			this.render();
		},
		render: function() {
			var pizzeList = this.pizzaList;
			pizzeList.empty();
			var pizzaTemplate = this.pizzaTemplate;
			var visiblePizza = control.getVisiblePizza();
			visiblePizza.forEach(function(pizza) {
				var thisPizza = pizzaTemplate.replace(/{{id}}/g, pizza.id);
				pizzeList.append(thisPizza);
			});
		}
	}

	view.init();
});