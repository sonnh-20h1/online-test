
$(document).ready(function () {
    var i = 1
    $('#btn_answer').on('click', function () {
        i = i++;
        var a = '<div class="item_answer"><input type="radio" id="item_ans" value="' + (i++) + '" name="item_ans" required><input type="text" placeholder="New a answer" id="txt_answer" class="txt_answer" name="txt_answer[]"><span class="remove_answer">X</span></div>';
        $('#text_answer').append(a);
        return false;
    })
    $(document).on('click', '.remove_answer', function () {
        $(this).parent().remove();
    })
})

document.getElementById("btn_question").addEventListener("click", function (event) {
    if (document.querySelector('.item_answer input[name="item_ans"]:checked') == null) {
        window.alert("You need to choose an option!");
        return false;
    }
    postForm('/add_que')
        .then(data => {
            
            if(data == "oke"){
                All_data();
                reSetAdd();
            }else{
                alert('Không thêm được câu hỏi!');
            }
        })
        .catch(error => console.error(error))
    function postForm(url) {
        const formData = new FormData(document.querySelector('form#get_question'));
        console.log(formData)
        return fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
    }
    event.preventDefault();
});

function reSetAdd(){
    var a = $('#get_question input[type="text"]').val('');
}

All_data();
function All_data() {
    fetch('/display_que', {
        method: 'POST'
    }
    ).then(response => response.json())
        .then(data => {
            var arr = new Array();
            var stt = 0;
            for (var i = 0; i < data.length; i++) {
                stt++;
                arr.push(
                    '<tr class="row_item">' +
                    '<th class="column-title"><input type="checkbox" name="check_que"></th>' +
                    '<td>' + stt + '</td>' +
                    '<td>' + data[i].QUE_TEXT + '</td>' +
                    '<td class="chuc_nang" style="text-align: left;">' +
                    '<span class="que_view" stt="' + data[i].ID_QUE + '"><i class="fa fa-minus"></i></span>' +
                    '<span class="edit" stt="' + data[i].ID_QUE + '" ><i class="fa fa-pencil edit_data"></i></span>' +
                    '<span class="delete" stt="' + data[i].ID_QUE + '"><i class="fa fa-trash-o del_data"></i></span>' +
                    '</td>' +
                    '</tr>')
            }
            $('#display_subject').html(arr);
            que_view();
        })
        .catch(error => console.error(error))
}
$('.btn_oke').click(function () {
    $('.view_question').hide();
})

function que_view() {
    $('.que_view').click(function () {
        const id_que = $(this).attr('stt');
        $('.view_question').show();
        $.ajax({
            url: '/get_answer',
            method: "POST",
            data: { id_que: id_que },
            dataType: 'json',
            success: function (data) {
                console.log(data)
                if (data != '') {
                    var arr = new Array();
                    var stt = 0;
                    for (var i = 0; i < data.length; i++) {
                        stt++;
                        arr.push(
                            '<tr class="row_item">' +
                            '<td>' + stt + '</td>' +
                            '<td>' + data[i].ANS_TEXT + '</td>' +
                            '<td>' + data[i].CORRECT + '</td>' +
                            '<td class="chuc_nang" style="text-align: left;">' +
                            '<span class="edit" stt="' + data[i].ID_ANS + '" ><i class="fa fa-pencil edit_data"></i></span>' +
                            '<span class="delete" stt="' + data[i].ID_ANS + '"><i class="fa fa-trash-o del_data"></i></span>' +
                            '</td>' +
                            '</tr>')
                    }
                    $('#display_answer').html(arr);
                } else {
                    $('#display_answer').html('<p>No found data!</p>');
                }
            }
        })
    })
}