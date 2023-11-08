import Inputmask from "inputmask";
import validate from "jquery-validation";

var forms = {
	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			mask: "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: false,
		});

		im.mask(selector);
	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function(error, element) {
					$(element).closest('.input').append(error)
				},
				highlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.addClass(errorClass)
						.removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element)
						.parent()
						.removeClass(errorClass)
						.addClass(validClass);
				},
				rules: {
					phone: {
						required: true,
						minlength: 10
					},
					name: {
						required: true,
					},
					email: {
						required: true,
						email: true,
					},
				},
				messages: {
					phone: {
						required: "Это поле обязательно для заполнения",
						minlength: ""
					},
					name: {
						required: "Это поле обязательно для заполнения",
					},
					email: {
						required: "Это поле обязательно для заполнения",
						email: 'Пожалуйста, введите действительный адрес электронной почты.'
					},
				}
			});
		});
	},

	events: () => {
		$(".input__field")
			.on("focus", (e) => {
				let $input = $(e.target);
				$input.parent().addClass("is-focus");
			})
			.on("blur change", (e) => {
				let $input = $(e.target);

				if ($input.val() == "") $input.parent().removeClass("is-focus");
			});
	},

	init: () => {
		forms.mask();
		forms.validate();
		forms.events();
	},
};

export { forms };