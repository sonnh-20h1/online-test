
fetch_notification()
function fetch_notification() {
    $.ajax({
        url: '/api/fetch_notification',
        method: "GET",
        dataType: 'json',
        success: function (data) {
            console.log(data)
            var arr = new Array();
            for (var i = 0; i < data.length; i++) {
                arr.push(
                    '<div class="item_feedback row">'+
                        '<div class="noti_feedback">'+
                            '<span class="user_feedback">'+data[i]['USERNAME']+' </span>'+
                            '<span class="time_feedback">'+data[i]['create_on']+'</span>'+
                        '</div>'+
                        '<div class="question_feedback">'+
                            '<div class="exam_text">'+
                                '<span>Đánh giá: </span>'+
                                '<span class="content_feedback" >'+data[i]['content']+'</span>'+
                            '</div>'+
                            '<div class="exam_text">'+
                                '<span>ID đề: </span>'+
                                '<span class="exam_feedback">'+data[i]['exam_id']+'</span>'+
                           ' </div>'+
                            '<div class="question_text">'+
                                '<span>Câu hỏi: </span>'+
                                '<span class="question_feeback">'+data[i]['QUE_TEXT']+'</span>'+
                           ' </div>'+
                        '</div>'+
                    '</div>'
                )
            }
            $('#display_all_data').html(arr);
        }
    })
}