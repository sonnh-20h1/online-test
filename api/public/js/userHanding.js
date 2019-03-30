function features(){
    $('.user_view').click(function(){
        $('.info_user').show();
    })
    $('.btn_seen').click(function(){
        $('.info_user').hide();
    })
}
fetch('/display_user',{
    method:"POST"
})
.then(res=>res.json())
.then(data=>{
    show_data(data);
    features();
})
.catch(err=>{
    console.error(err);
})

function show_data(data){
    let arr = new Array();
    let stt = 0;
    
    for (let i = 0; i < data.length; i++) {
        stt++;
        let title = "Chặn tài khoản này";
        let status = "Hoạt động";
        if(data[i].status == 0){
            title = "Bỏ chặn tài khoản này";
            status = "Đã chặn";
        }
        arr  +=
            '<tr class="row_item">' +
            '<td>' + stt + '</td>' +
            '<td>' + data[i].EMAIL + '</td>' +
            '<td>' + data[i].LASTNAME + '</td>' +
            '<td>' + data[i].FIRSTNAME + '</td>' +
            '<td>' + data[i].USERNAME + '</td>' +
            '<td>' + status + '</td>' +
            '<td class="feature_user" style="text-align: left;">'+
                '<span class="block_user" title="'+title+'" stt="' + data[i].IDUSER + '"><i class="glyphicon glyphicon-ban-circle del_"></i></span>' +
            '</td>'+
            '</tr>'
    }
    document.getElementById('display_users').innerHTML = arr;
    block_user();
}

function block_user(){
    $('.block_user').click(function(){
        var r = confirm("Bạn có muốn thực hiện hành động này?");
        if (r == true) {
            var id = $(this).attr('stt');
            $.ajax({
                url: '/BlockUser',
                method: "POST",
                data: { id: id },
                dataType: 'json',
                success: function (data) {
                    location.reload();
                }
            })
        } 
    })
}

