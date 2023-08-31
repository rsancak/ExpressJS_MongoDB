const $ = require('jquery');
$.validator.addMethod('filesize', function(value, element, param) {
    return this.optional(element) || (element.files[0].size <= param) 
});
export default $(".validation-form").validate({
    onkeyup: function (element) { $(element).valid() },
    errorClass: "error alert alert-danger",
    unhighlight: function (element) {
        $(element).parents(".col-auto").addClass("valid-item");
        $(element).addClass("valid alert alert-success");
    },
    highlight: function (element) {
        $(element).parents(".col-auto").removeClass("valid-item");
        $(element).removeClass("valid alert alert-success");
    },
    rules: {
        photo: {
            required: true,
            extension: "jpg|jpeg|png",
            filesize: 5000000
        },
        name: {
            required: true,
            minlength: 2,
            maxlength: 20
        },
        surname: {
            required: true,
            minlength: 2,
            maxlength: 20,
        },
        job: {
            required: true,
            minlength: 2,
            maxlength: 30
        }
    },
    messages: {
        photo: {
            required: "Please fill this field!",
            extension: "Please attach a JPG/JPEG/PNG file!",
            filesize: "Please add images up to 5MB in size!"
        },
        name: {
            required: "Please fill this field!",
            minlength: $.validator.format("Please enter at least {0} characters!"),
            maxlength: $.validator.format("Please enter no more than {0} characters!")
        },
        surname: {
            required: "Please fill this field!",
            minlength: $.validator.format("Please enter at least {0} characters!"),
            maxlength: $.validator.format("Please enter no more than {0} characters!")
        },
        job: {
            required: "Please fill this field!",
            minlength: $.validator.format("Please enter at least {0} characters!"),
            maxlength: $.validator.format("Please enter no more than {0} characters!")
        }
    }
});
