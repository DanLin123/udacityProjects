$(function() {
	var model = function() {
		var Cat = function(name, pic) {
			this.count = 0;
			this.name = name;
			this.pic = pic;
		};
		var cats = [];
		for(var i = 0; i < 5; i++) {
			cats.push(new Cat('cat' + i, 'cat' + i + '.jpg'));
		}
	
		return {
			cats: cats, 
			currentCat: null
		}
	}();

	var viewList = {
		init: function() {
			this.render();
		},
		render: function() {
			$('#list').empty();
			$.each(control.getCats(), function(i, cat) {
				var button = $('<button>' + cat.name + '</button>');
				button.click(function() {
					control.setCurrentCat(cat);
					viewContent.render();
				});
				$('#list').append(button);
			})
		}
	}

	var viewContent = {
		init: function() {
			var cat = control.getCurrentCat();
			if(cat == null) {
				return;
			}
			this.name = $('#name');
			this.pic = $('img');
			this.count = $('#count');
			var that = this;
			this.pic.click(function() {
				control.increaseCatCount();
				that.render();
				viewAdmin.render();
			});

			this.render();
		},

		render: function() {
			var cat = control.getCurrentCat();
			this.name.text(cat.name);
			this.pic.attr("src", cat.pic);
			$('#count').text(cat.count);
		}
	};

	var viewAdmin = {
		init: function() {
			this.name = $('input[name=name]');
			this.url = $('input[name=url]');
			this.count = $('input[name=count]');
			this.form = $('form');
			var that = this;
			$('#edit button').click(function() {
				control.toggleAdmin();
				that.render();
			});
			
			$('input[name=submit]').click(function() {
				control.editCurrentCat(that.name.val(), that.url.val(), that.count.val());
				renderPage();
			});

			$('input[name=cancel]').click(function() {
				renderPage();
			});

			this.render();
		},

		render: function(){
			var cat = control.getCurrentCat();
			this.name.val(cat.name);
			this.url.val(cat.pic);
			this.count.val(cat.count);
			if(control.hide) {
				this.form.hide();
			} else {
				this.form.show();
			}
		}
	}

	var renderPage = function() {
		viewList.render();
		viewContent.render();
		viewAdmin.render();
	}


	var control = {
		hide: true,
		init: function() {
			this.setCurrentCat(model.cats[0]);
			viewList.init();
			viewContent.init();
			viewAdmin.init();
		}, 

		getCats: function() {
			return model.cats;
		},

		getCurrentCat: function() {
			return model.currentCat;
		}, 

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		increaseCatCount: function() {
			this.getCurrentCat().count++;
		},

		editCurrentCat: function(name, url, count) {
			model.currentCat.name = name;
			model.currentCat.url = url;
			model.currentCat.count = count;
		},

		toggleAdmin : function() {
			this.hide = !this.hide;
		}
	} 
	control.init();
});
