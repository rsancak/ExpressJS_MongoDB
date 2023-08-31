const $ = require('jquery');
$('#nameSearch').on('keyup', function(){
    let searchQuery = $(this).val().toLowerCase();
    $('tr[data-name]').each(function(){
        let dataName = $(this).attr("data-name").toLowerCase();
        if(dataName.includes(searchQuery)){
            $(this).show();
        }else{
            $(this).hide();          
        }
        let lengthUsers = $('#tableUsers tr:not([style*="display: none"])').length;
        if(lengthUsers<=1){
            $('#tableUsers').hide();
            $('.not-found-message').show();
        }else{
            $('#tableUsers').show();
            $('.textQuery').text("'"+searchQuery+"'");
            $('.not-found-message').hide();
        }
    });    
});

$('.btn-close').on('click', function(){
    $('.update-content').slideToggle();
});