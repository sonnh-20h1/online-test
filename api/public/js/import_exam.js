var btn_import = document.getElementById('btn_import');
var inputFile = document.querySelector('input[type="file"]');
btn_import.addEventListener('click', function (e) {
    if (inputFile.files.length > 0) {
        if (inputFile.files[0].name.split('.')[1] == 'xlsx') {
            const reader = new FileReader();
            reader.readAsArrayBuffer(inputFile.files[0]);
            reader.onload = function () {
                var data = new Uint8Array(reader.result)
                var wb = XLSX.read(data, { type: "array" });
                var RowObject = XLSX.utils.sheet_to_row_object_array(wb.Sheets['Sheet1'])
                // var showQuestions = document.getElementById('show_question_file');
                // showQuestions.innerHTML = showQuestionFile(RowObject);
                showReadFile();
                DataQuestion(RowObject);
                showPage();
            }
        } else {
            notification('.error_notification');
            document.getElementById('error_notification').innerHTML = '<p>Bạn vui lòng chọn file .xlsx</p>';
            console.log('vui nhap file .xlsx!')
        }
    } else {
        notification('.error_notification')
        document.getElementById('error_notification').innerHTML = '<p>Bạn vui lòng chọn file</p>';
        console.log('vui long chon file!');
    }
    e.preventDefault();
})
var closeReadFile = document.getElementById('close_FileRead');
closeReadFile.addEventListener('click', function () {
    hideReadFile();
})
ShowSubject('subject_file_import');
ShowSubject('subject_update_exam');
pageExams();
ShowExams();
close_edit()
function close_edit() {
    $('#close_edit_exam').click(function () {
        $('.EditExamId').hide();
    })
}
function ShowSubject(id) {
    fetch('/display_sub', {
        method: "POST"
    })
        .then(res => res.json())
        .then((data) => {
            var subject = '<option value="">---choose---</option>';
            for (let i = 0; i < data.length; i++) {
                subject += '<option value="' + data[i].SUBID + '">' + data[i].SUBTEXT + '</option>';
            }
            document.getElementById(id).innerHTML = subject;
        })
        .catch(err => {
            console.error(err);
        })
}
function showReadFile() {
    var readFileExam = document.getElementById('readFileExam');
    readFileExam.style.display = 'block';
}
function hideReadFile() {
    var readFileExam = document.getElementById('readFileExam');
    readFileExam.style.display = 'none';
}
function showQuestionFile(data) {
    var itemData = [];
    for (let i = 0; i < data.length; i++) {
        itemData += '<div class="number-que">' +
            '<div class="box-question">' +
            '<div class="content-q-file">' +
            '<div class="name-q-file ">' +
            '<p><span>Câu ' + (i + 1) + ': </span>' + data[i].question + '</p>' +
            '</div>' +
            '<div class="answer-q-file padL10">' +
            '<table>' +
            '<tbody>' + ShowReadAnswer(data[i].answer, i) + '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    document.getElementById('show_question_file').innerHTML = itemData;
}
function ShowReadAnswer(data, stt) {
    var answer = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].ans != '') {
            answer += '<tr>' +
                '<td><input type="radio" class="option_que radio_que"' + (data[i].correct ? 'checked' : '') + ' name="' + stt + '" id="" /></td>' +
                '<td><p>' + data[i].ans + '</p></td>' +
                '</tr>'
        }
    }
    return answer;
}
function showPage() {
    var data = $('.number-que');
    var page = '#pagination_que';
    table(10, data.length, data, page)
}
function showPageQuestion() {
    var maxRow = 10;
    var number_que = document.querySelectorAll('.number-que');
    var stt = 0
    number_que.forEach(function (item_que) {
        stt < maxRow ? item_que.style.display = 'block' : item_que.style.display = 'none';;
        stt++;
    })
    var numberRows = document.getElementsByClassName("number-que").length;
    if (numberRows > maxRow) {
        var pageNum = Math.ceil(numberRows / maxRow);
        for (let i = 1; i <= pageNum; i++) {
            addElement(i)
        }
    }
    var aFirst = document.querySelector('.item_page');
    aFirst.className += ' active';

    var item_page = document.getElementsByClassName('item_page');
    var sttNum = 0;
    for (var i = 0; i < item_page.length; i++) {
        item_page[i].addEventListener('click', function () {
            var pageN = this.getAttribute('page');

            var active = document.querySelector('.active');
            active.setAttribute('class', 'item_page')
            this.className += ' active';

            number_que.forEach(function (item_que) {
                console.log((maxRow * pageN));
                if (sttNum > (maxRow * pageN) || sttNum < ((maxRow * pageN) - maxRow)) {
                    item_que.style.display = 'none';
                } else {
                    item_que.style.display = 'block';
                }
                sttNum++;
            })
        });
    }
}
function addElement(number) {
    var pagination = document.getElementById('pagination_que');
    var a = document.createElement('a');
    var content = document.createTextNode(number);
    a.appendChild(content);
    a.setAttribute('page', `${number}`);
    a.setAttribute('class', 'item_page');
    pagination.appendChild(a);
}
function table(maxRows, totalRows, data, page) {
    var trnum = 0;
    data.each(function () {
        trnum++;
        if (trnum > maxRows) {
            $(this).hide()
        } else {
            $(this).show();
        }
    })
    $(page + ' li').remove();
    if (totalRows > maxRows) {
        var pagenum = Math.ceil(totalRows / maxRows);
        for (var i = 1; i <= pagenum; i++) {
            $(page).append('<li page="' + i + '">\<span>' + i + '</span></li>');
        }
    }
    $(page + ' li:first').addClass('active');
    $(page + ' li').click(function () {
        var pageNum = $(this).attr('page')
        var trIndex = 0;
        $(page + ' li').removeClass('active')
        $(this).addClass('active');
        data.each(function () {
            trIndex++;
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    })
}
function pageExams() {
    var data = $('#show_data_exam tr');
    var page = '#pagination_exam'
    table(10, data.length, data, page);
}
function infomationError(text) {
    notification('.error_notification')
    document.getElementById('error_notification').innerHTML = '<p>' + text + '</p>';
}
function infomationSuccess(text) {
    notification('.insert_successfuly')
    document.getElementById('insert_successfuly').innerHTML = '<p>' + text + '</p>';
}
function DataQuestion(data) {
    var arr = {}
    var exam = []
    for (let i = 0; i < data.length; i++) {
        arr = {
            question: data[i].questions,
            answer: [
                {
                    ans: data[i].answer_a ? data[i].answer_a : '',
                    correct: data[i].answer_a ? ((data[i].da).toUpperCase() == 'A' ? true : false) : ''
                },
                {
                    ans: data[i].answer_b ? data[i].answer_b : '',
                    correct: data[i].answer_b ? ((data[i].da).toUpperCase() == 'B' ? true : false) : ''
                },
                {
                    ans: data[i].answer_c ? data[i].answer_c : '',
                    correct: data[i].answer_c ? ((data[i].da).toUpperCase() == 'C' ? true : false) : ''
                },
                {
                    ans: data[i].answer_d ? data[i].answer_d : '',
                    correct: data[i].answer_d ? ((data[i].da).toUpperCase() == 'D' ? true : false) : ''
                },
                {
                    ans: data[i].answer_e ? data[i].answer_e : '',
                    correct: data[i].answer_e ? ((data[i].da).toUpperCase() == 'E' ? true : false) : ''
                }
            ]
        }
        exam.push(arr);
    }
    showQuestionFile(exam);
    var ClickImportExam = document.getElementById('NewImportExam');
    ClickImportExam.addEventListener('click', function () {
        var IdExam = document.getElementsByName('IdExam');
        var TimeExam = document.getElementsByName('TimeExam');
        var NameExam = document.getElementsByName('NameExam');
        var SubjectExam = document.getElementsByName('SubjectExam');
        var RandomNumber = document.getElementsByName('RandomNumber');
        if (!IdExam[0].value || !TimeExam[0].value || !NameExam[0].value || !SubjectExam[0].value || !RandomNumber[0].value) {
            infomationError('Bạn chưa nhâp đầy đủ thông tin!')
            return false;
        }
        var dataExams = {
            IdExam: IdExam[0].value.trim(),
            TimeExam: TimeExam[0].value.trim(),
            NameExam: NameExam[0].value.trim(),
            SubjectExam: SubjectExam[0].value.trim(),
            RandomNumber: RandomNumber[0].value.trim(),
            data: exam
        }
        InsertExamImport(dataExams);
    })
}
function InsertExamImport(data) {
    console.log(data);
    fetch('/HanldingImportFileExcel', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => {
            if (data['error']) {
                infomationError(data['error']);
            } else {
                infomationSuccess(data['success']);
                ShowExams();
            }
        })
        .catch(err => {
            console.error(err);
        })
}
function deleteExam() {
    var item_dels = document.getElementsByClassName('btn_del_exam');
    for (let i = 0; i < item_dels.length; i++) {
        item_dels[i].addEventListener('click', function () {
            var id = this.getAttribute('stt');
            var conf = confirm('Bạn chắc chắn muốn xóa đề thi này!');
            if (conf == true) {
                var data = { id: id }
                fetch('/DeleteExamId', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        infomationSuccess(data.success);
                        ShowExams();
                        console.log(data);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        })
    }
}
function UpdateExam() {
    // var item_dels = document.getElementsByClassName('btn_edit_exam');
    // for(let i = 0;i < item_dels.length;i++){
    //     item_dels[i].addEventListener('click',function(){
    //         var id = this.getAttribute('stt');
    //         var data= {id:id}
    //         if(id){
    //             fetch('/SelectExamId', {
    //                 method: "POST",
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             .then(res=>res.json())
    //             .then((data) =>{
    //                 UpdateExamId(data);
    //             })
    //             .catch(err=>{
    //                 console.error(err);
    //             })
    //             $('.EditExamId').show();
    //         }
    //      })
    // }
    $('.btn_edit_exam').click(function () {
        var id = $(this).attr('stt');
        if (id) {
            $.ajax({
                type: "post",
                url: "/SelectExamId",
                data: { id:id },
                dataType:"json",
                success: function (data) {
                    UpdateExamId(data);
                }
            })
            $('.EditExamId').show();
        }
    })
}
function ShowExams() {
    fetch('/ShowExams', {
        method: "POST"
    })
        .then(res => res.json())
        .then((data) => {
            ShowItemExam(data);
        })
        .catch(err => {
            console.error(err);
        })
}
function ShowItemExam(data) {
    var item = [];
    for (let i = 0; i < data.length; i++) {
        item += '<tr>' +
            '<td><input type="checkbox" class="option_que radio_que" name="" id=""></td>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + data[i].IDEXAM + '</td>' +
            '<td>' + data[i].EXAMTEXT + '</td>' +
            '<td>' + data[i].SUBTEXT + '</td>' +
            '<td>' + data[i].EXTIME + '</td>' +
            '<td>' + data[i].EXNUM + '</td>' +
            '<td>' + data[i].RANDOMEXAM + '</td>' +
            '<td>' +
            '<span stt="' + data[i].IDEXAM + '" class="btn_edit_exam"><i class="fa fa-pencil edit_"></i></span>' +
            '<span stt="' + data[i].IDEXAM + '" class="btn_del_exam"><i class="fa fa-trash-o del_"></i></span>' +
            '</td>' +
            '</tr>'
    }
    document.getElementById('show_data_exam').innerHTML = item;
    pageExams()
    deleteExam()
    UpdateExam()
}
function UpdateExamId(data) {
    console.log(data);
    var UpdateIdExam = document.getElementsByName('UpdateIdExam');
    var UpdateTimeExam = document.getElementsByName('UpdateTimeExam');
    var UpdateNameExam = document.getElementsByName('UpdateNameExam');
    var UpdateSubjectExam = document.getElementsByName('UpdateSubjectExam');
    var UpdateRandomNumber = document.getElementsByName('UpdateRandomNumber');

    UpdateIdExam[0].value = data[0].idExam;
    UpdateTimeExam[0].value = data[0].TimeExam;
    UpdateNameExam[0].value = data[0].NameExam;
    UpdateSubjectExam[0].value = data[0].SubjectExam;
    UpdateRandomNumber[0].value = data[0].RandomQues;

    var itemData = [];
    var quetion = data[0].questions;
    for (let i = 0; i < quetion.length; i++) {
        itemData += '<div class="number-que">' +
            '<div class="box-question">' +
            '<div class="content-q-file">' +
            '<div class="name-q-file ">' +
            '<p><span>Câu ' + (i + 1) + ': </span>' + quetion[i].QUE_TEXT + '</p>' +
            '</div>' +
            '<div class="answer-q-file padL10">' +
            '<table>' +
            '<tbody>' + ShowListAnswer(quetion[i].Answer) + '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    document.getElementById('showQuestionExam').innerHTML = itemData;
    var dataQue = $('#showQuestionExam .number-que');
    var page = '#pageQuestions'
    table(10, dataQue.length, dataQue, page);
}
function ShowListAnswer(data) {
    var answer = [];
    for (let i = 0; i < data.length; i++) {
        answer += '<tr>' +
            '<td><input type="radio" class="option_que radio_que"' + (data[i].CORRECT == "false" ?'':'checked') + ' name="' + data[i].ID_QUE + '" id="" /></td>' +
            '<td><p>' + data[i].ANS_TEXT + '</p></td>' +
            '</tr>'
    }
    return answer;
}

