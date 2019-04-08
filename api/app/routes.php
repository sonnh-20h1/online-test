<?php
session_start();

$app->get('/mng_subject','App\Controllers\SubjectController:index');
$app->get('/mng_user','App\Controllers\UserController:index');
$app->get('/mng_question','App\Controllers\QuestionController:index');
$app->get('/mng_exam','App\Controllers\ExamController:index');
$app->get('/import_exam','App\Controllers\ImportExamController:index');
$app->get('/','App\Controllers\LoginController:index')->add(App\Middlewares\OldInputMiddleware::class)->setName('sign_in');

$app->post('/display_sub','App\Controllers\SubjectController:display_sub');
$app->post('/create_sub','App\Controllers\SubjectController:create_subject');
$app->post('/del_sub','App\Controllers\SubjectController:del_subject');

$app->post('/add_que','App\Controllers\QuestionController:Hanlding');
$app->post('/display_que','App\Controllers\QuestionController:Display_all');
$app->post('/get_answer','App\Controllers\QuestionController:get_answer');

$app->post('/display_exam','App\Controllers\ExamController:display_exam');
$app->post('/add_exam','App\Controllers\ExamController:add_exam');
$app->get('/GetResultRequest/{id}','App\Controllers\ExamController:GetResultRequest');
$app->get('/detail-exam/{id}','App\Controllers\ExamController:DetailExam');
$app->post('/get-exam-question','App\Controllers\ExamController:RequestExam');
$app->post('/GetAnswerQuestionId','App\Controllers\ExamController:GetAnswerQuestionId');
$app->post('/RequestAnswerQuestionId','App\Controllers\ExamController:RequestAnswerQuestionId');
$app->post('/GetUserExam','App\Controllers\ExamController:GetUserExam');
$app->post('/GetQuestionUser','App\Controllers\ExamController:GetQuestionUser');
$app->post('/GetUserExamId','App\Controllers\ExamController:GetUserExamId');
$app->post('/GetHistoryExamUser','App\Controllers\ExamController:GetHistoryExamUser');
$app->post('/GetExamMinuteId','App\Controllers\ExamController:GetExamMinuteId');
$app->post('/exam-question','App\Controllers\ExamController:GetExam');
$app->post('/GetExamSubjectId','App\Controllers\ExamController:GetExamSubjectId');
$app->post('/SaveFeedBack','App\Controllers\ExamController:SaveFeedBack');


$app->post('/HanldingImportFileExcel','App\Controllers\ImportExamController:HanldingImportFileExcel');
$app->post('/ShowExams','App\Controllers\ImportExamController:ShowExams');
$app->post('/SelectExamId','App\Controllers\ImportExamController:SelectExamId');
$app->post('/DeleteExamId','App\Controllers\ImportExamController:DeleteExamId');
$app->post('/RandomTestExam','App\Controllers\ImportExamController:RandomTestExam');

$app->post('/display_user','App\Controllers\UserController:display_user');
$app->post('/Login_User','App\Controllers\UserController:Login_User');
$app->post('/SignUpUser','App\Controllers\UserController:SignUpUser');
$app->post('/GetUserId','App\Controllers\UserController:GetUserId');
$app->post('/BlockUser','App\Controllers\UserController:BlockUser');
$app->post('/loading_login','App\Controllers\UserController:loading_login');

$app->post('/HandleLoginAdmin','App\Controllers\LoginController:HandleLoginAdmin');
$app->post('/LogoutAdmin','App\Controllers\LoginController:LogoutAdmin');

$app->get('/mng_noti','App\Controllers\NotiController:index');
$app->get('/fetch_notification','App\Controllers\NotiController:fetch_notification');


