const $ = require('jquery');
const axios = require('axios');
const Swal = require('sweetalert2')
$("#addForm").on('submit', function (e) {
    e.preventDefault();
    let _this = this;
    let formType = $(_this).attr("data-form-type");
    if ($(this).valid()) {
        const formData = new FormData();
        formData.append("photo", _this.photo.files[0]);
        formData.append("name", _this.name.value);
        formData.append("surname", _this.surname.value);
        formData.append("job", _this.job.value);
        formData.append("_id", _this.id.value);
        formData.append("formtype", formType);
        axios.post('/add/user', formData).then(function (response) {
            if (response.status == 200) {
                if (formType == 'add') {
                    Swal.fire(
                        'Success',
                        response.data,
                        'success'
                    )
                } else if (formType == 'update') {
                    Swal.fire({
                        title: 'Success',
                        text: response.data,
                        icon: 'success',
                        timer: 2000
                    }).then((result) => {
                        location.reload();
                    });
                }
            }
        }).catch(function (error) {
            let errors = error.response.data.errors;
            let errorMessage = '';
            for (let i in errors) {
                errorMessage += errors[i].message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage
            })
        });
    }
});
$(".btn-remove").on('click', function (e) {
    let _this = this;
    e.preventDefault();
    axios.get('/remove/' + $(this).attr("data-id")).then(function (response) {
        if (response.status == 200) {
            Swal.fire(
                'Success',
                'User Removed!',
                'success'
            );
            $('tr[data-id="' + $(_this).attr("data-id") + '"]').remove();
            let lengthTR = $('#tableUsers tbody tr').length;
            if (lengthTR < 1) {
                $('.not-found-user').hide();
                $('.not-found-message').show();
            }
        }
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '404'
        })
    });
});

$(".btn-update").on('click', function (e) {
    let _this = this;
    e.preventDefault();
    axios.get('/update/' + $(this).attr("data-id")).then(function (response) {
        if (response.status == 200) {
            $('.update-content #name').val(response.data.name);
            $('.update-content #surname').val(response.data.surname);
            $('.update-content #job').val(response.data.job);
            $('.update-content #id').val(response.data._id);
            $('.update-content').slideToggle();
            $('.update-content form').valid();
        }
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '404'
        })
    });
});