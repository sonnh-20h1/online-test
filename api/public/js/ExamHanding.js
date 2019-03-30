$('#choose_question').on('click', function () {
    $('.choose_question').show();
    return false;
})
$('.btn_canel').click(function () {
    $('.choose_question').hide();
})

show_dataExam();
show_dataQuestion();
show_dataSubject()


function show_dataExam() {
    fetch('/display_exam', {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            get_dataExam(data);
            // console.log(data)
        })
        .catch(err => {
            console.error(err);
        })
}

function show_dataQuestion() {
    fetch('/display_que', {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            get_dataQuestion(data);
            check_question()
            // console.log(data)
        })
        .catch(err => {
            console.error(err);
        })
}

function show_dataSubject() {
    fetch('/display_sub', {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            get_dataSubject(data)
            // console.log(data)
        })
        .catch(err => {
            console.error(err);
        })
}

function get_dataExam(dataExam) {
    let arr = new Array();
    let stt = 0;
    for (let i = 0; i < dataExam.length; i++) {
        stt++;
        arr +=
            '<tr class="row_item">' +
            '<th class="column-title"><input type="checkbox" name="check_exam"></th>' +
            '<td>' + stt + '</td>' +
            '<td>' + dataExam[i].EXAMTEXT + '</td>' +
            '<td>' + dataExam[i].EXTIME + '</td>' +
            '<td>' + dataExam[i].EXNUM + '</td>' +
            '<td>' + dataExam[i].SUBTEXT + '</td>' +
            '<td class="chuc_nang" style="text-align: left;">' +
            '<span class="edit" stt="' + dataExam[i].IDEXAM + '" ><i class="fa fa-pencil edit_data"></i></span>' +
            '<span class="delete" stt="' + dataExam[i].IDEXAM + '"><i class="fa fa-trash-o del_data"></i></span>' +
            '</td>' +
            '</tr>'
    }
    document.getElementById('display_exams').innerHTML = arr;
}

function get_dataQuestion(dataQue) {
    stt = 0;
    let arrQ = new Array();
    for (var i = 0; i < dataQue.length; i++) {
        stt++;
        arrQ +=
            '<tr class="row_item">' +
            '<td>' + stt + '</td>' +
            '<td>' + dataQue[i].ID_QUE + '</td>' +
            '<td>' + dataQue[i].QUE_TEXT + '</td>' +
            '<td>' + dataQue[i].SUBID + '</td>' +
            '<td class="column-title"><input type="checkbox" class="check_item" subject="' + dataQue[i].SUBID + '" nameQue="' + dataQue[i].QUE_TEXT + '" value="' + dataQue[i].ID_QUE + '" name="check_item"></td>' +
            '</tr>'

    }
    document.getElementById('display_questions').innerHTML = arrQ;
}

function get_dataSubject(dataSubject) {
    stt = 0;
    let arrS = Array();
    arrS = '<option value="" >---choose subject----</option>';
    for (var i = 0; i < dataSubject.length; i++) {
        arrS += '<option value="' + dataSubject[i].SUBID + '">' + dataSubject[i].SUBTEXT + '</option>'
    }
    document.getElementById('new_subject').innerHTML = arrS;
    document.getElementById('search_que').innerHTML = arrS;

}

function check_question() {
    var check_que = document.querySelector(".check_que");
    check_que.addEventListener("change", function () {
        var check = document.getElementById('display_questions').getElementsByTagName('input')
        for (var i = 0; i < check.length; i++) {
            if (check[i].type == 'checkbox') {
                check[i].checked = !check[i].checked;
            }
        }
        console.log(check.length)
    })
}

var click_que = document.querySelector('.btn_oke');
var dem = 0;
var result_question = new Array();
var stt = 0;
let dataSave = [{ id: '' }]
let plus = 0;

click_que.addEventListener("click", function () {
    var check = document.getElementById('display_questions').getElementsByTagName('input');
    for (var i = 0; i < check.length; i++) {
        if (check[i].type == 'checkbox' && check[i].checked == true) {
            for (var j = 0; j < dataSave.length; j++) {
                if (dataSave[j].id == check[i].value) plus = 1;
            }
            if (plus == 0) {
                dataSave.push({ id: check[i].value })
                stt++;
                var nameQue = check[i].getAttribute('nameQue')
                var subject = check[i].getAttribute('subject')
                result_question +=
                    '<tr class="row_item" stt="'+check[i].value+'">' +
                    '<td>' + check[i].value + '</td>' +
                    '<td>' + nameQue + '</td>' +
                    '<td>' + subject + '</td>' +
                    '<td class="column-title"><span class="delete_question" ><i class="fa fa-trash-o del_data"></i></span></td>' +
                    '</tr>'
            } else plus = 0

        }
    }
    document.getElementById('show_choose_question').innerHTML = result_question;
    delete_question()
    $('.choose_question').hide();
})

function delete_question() {
    $('.delete_question').click(function () {
        var check = confirm("Are you sure do not delete?");
        if (check == true) {
            var parent = this.parentElement.parentNode;
            parent.remove()
        }
    })
}

var search_que = document.querySelector("#choose_sub");
search_que.addEventListener("click", function () {
    let get_sub = document.getElementById('search_que');
    let arrSe = '';
    stt = 0;
    for (var i = 0; i < dataQue.length; i++) {
        if (dataQue[i].idsub == get_sub.value) {
            stt++;
            arrSe +=
                '<tr class="row_item">' +
                '<td>' + stt + '</td>' +
                '<td>' + dataQue[i].name + '</td>' +
                '<td>' + dataQue[i].subject + '</td>' +
                '<th class="column-title"><input type="checkbox" value="' + dataQue[i].id + '" name="check_que"></th>'
        }
    }
    if (arrSe == '') {
        arrSe += '<p>No found data</p>';
    }
    document.getElementById('display_questions').innerHTML = arrSe;
    arrSe = '';
})

var create_exam = document.getElementById("btn_create_exam");

create_exam.addEventListener('click', function (e) {
    var num_que = document.getElementById('show_choose_question').getElementsByTagName('tr');
    var data_que = new Array();
    for(var i = 0;i < num_que.length;i++){
        data_que.push(num_que[i].getAttribute('stt'))
    }
    var ex_id = document.getElementById('Exam_id').value
    var ex_name = document.getElementById('Exam_name').value
    var ex_time = document.getElementById('study_time').value
    var ex_sub = document.getElementById('new_subject').value
    console.log(ex_sub)
    if (ex_id == '') {
        confirm('Please enter ID!')
        e.preventDefault();
    }
    else if (ex_name == '') {
        confirm('Please enter name!')
        e.preventDefault();
    }
    else if (ex_time == '') {
        confirm('Please enter time!')
        e.preventDefault();
    }else if (ex_sub == '') {
        confirm('Please enter subject!')
        e.preventDefault();
    }
    else if(dataSave.length < 2){
        confirm('Please choose question!')
        e.preventDefault();
    } else{

        var data = { dataSave: data_que, id: ex_id, name: ex_name, time: ex_time, subject: ex_sub }
        fetch('/add_exam', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data == 'success'){
                    show_dataExam();
                    reset();
                    alert('successfully created!!!!');
                }else if(data == 'alreadyid'){
                    alert('Exam id already exists!!!');
                }else{
                    console.log(data)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
    e.preventDefault();
})

document.getElementById('btn_reset').addEventListener('click',function(e){
    reset();
    return e.preventDefault();
})

function reset(){
    document.getElementById('show_choose_question').innerHTML = '';
    document.getElementById('Exam_id').value('')
    document.getElementById('Exam_name').value('')
    document.getElementById('study_time').value('')
    document.getElementById('new_subject').value('')
}