<?php
session_start();

$app->post('/display_sub','App\Controllers\SubjectController:display_sub');
$app->post('/create_sub','App\Controllers\SubjectController:create_subject');
$app->post('/del_sub','App\Controllers\SubjectController:del_subject');

$app->post('/add_que','App\Controllers\QuestionController:Hanlding');
$app->post('/display_que','App\Controllers\QuestionController:Display_all');
$app->post('/get_answer','App\Controllers\QuestionController:get_answer');

$app->post('/display_exam','App\Controllers\ExamController:display_exam');
$app->post('/add_exam','App\Controllers\ExamController:add_exam');
$app->get('/GetResultRequest/{id}','App\Controllers\ExamController:GetResultRequest');
$app->post('/get-exam-question','App\Controllers\ExamController:RequestExam');
$app->post('/GetAnswerQuestionId','App\Controllers\ExamController:GetAnswerQuestionId');
$app->post('/RequestAnswerQuestionId','App\Controllers\ExamController:RequestAnswerQuestionId');
$app->post('/GetUserExam','App\Controllers\ExamController:GetUserExam');
$app->post('/GetQuestionUser','App\Controllers\ExamController:GetQuestionUser');
$app->post('/GetUserExamId','App\Controllers\ExamController:GetUserExamId');

$app->post('/GetExamMinuteId','App\Controllers\ExamController:GetExamMinuteId');
$app->post('/exam-question','App\Controllers\ExamController:GetExam');
$app->post('/GetExamSubjectId','App\Controllers\ExamController:GetExamSubjectId');

//Random the exams
$app->post('/ChooseRandomExam','App\Controllers\ExamController:ChooseRandomExam');
$app->post('/GetExamRequestId','App\Controllers\ExamController:GetExamRequestId');

$app->post('/HanldingImportFileExcel','App\Controllers\ImportExamController:HanldingImportFileExcel');
$app->post('/UpdateExamId','App\Controllers\ImportExamController:UpdateExamId');
$app->post('/UpdateQuestionId','App\Controllers\ImportExamController:UpdateQuestionId');
$app->post('/ShowExams','App\Controllers\ImportExamController:ShowExams');
$app->post('/SelectExamId','App\Controllers\ImportExamController:SelectExamId');
$app->post('/DeleteExamId','App\Controllers\ImportExamController:DeleteExamId');
$app->post('/RandomTestExam','App\Controllers\ImportExamController:RandomTestExam');

//Account  
$app->post('/display_user','App\Controllers\UserController:display_user');
$app->post('/Login_User','App\Controllers\UserController:Login_User');
$app->post('/SignUpUser','App\Controllers\UserController:SignUpUser');
$app->post('/GetUserId','App\Controllers\UserController:GetUserId');
$app->post('/BlockUser','App\Controllers\UserController:BlockUser');
$app->post('/loading_login','App\Controllers\UserController:loading_login');
$app->post('/SelectAccountGroupId','App\Controllers\UserController:SelectAccountGroupId');
$app->post('/GetHistoryExamUser','App\Controllers\UserController:GetHistoryExamUser');
$app->post('/GetInfomationUserId','App\Controllers\UserController:GetInfomationUserId');

//notification
$app->get('/mng_noti','App\Controllers\NotiController:index');
$app->get('/fetch_notification','App\Controllers\NotiController:fetch_notification');
$app->post('/SaveFeedBack','App\Controllers\ExamController:SaveFeedBack');

//admin management
$app->post('/manage/login','App\Controllers\AdminController:login');
$app->post('/manage/UpdatePass','App\Controllers\AdminController:UpdatePass');
$app->post('/GetMessage','App\Controllers\AdminController:GetMessage');
$app->post('/EditMessage','App\Controllers\AdminController:EditMessage');

// test exam random 
$app->post('/GetQuestionUserId','App\Controllers\TestExamController:GetQuestionUserId');
$app->post('/GetExamQuestionId','App\Controllers\TestExamController:GetExamQuestionId');


// Detail exam
$app->post('/ChooseRandomQuestion','App\Controllers\DetailExamsController:ChooseRandomQuestion');
$app->post('/detail-exam','App\Controllers\DetailExamsController:DetailExam');

//group
$app->get('/SelectGroup','App\Controllers\GroupController:SelectGroup');
$app->post('/CreateGroup','App\Controllers\GroupController:CreateGroup');
$app->post('/onAddExamGroup','App\Controllers\GroupController:onAddExamGroup');
$app->post('/onAddUserGroup','App\Controllers\GroupController:onAddUserGroup');
$app->post('/SelectGroupId','App\Controllers\GroupController:SelectGroupId');
$app->post('/SelectUserGroupId','App\Controllers\GroupController:SelectUserGroupId');
$app->post('/DeleteUserGroupId','App\Controllers\GroupController:DeleteUserGroupId');
$app->post('/DeleteExamGroupId','App\Controllers\GroupController:DeleteExamGroupId');
$app->post('/onDeleteGroupId','App\Controllers\GroupController:onDeleteGroupId');






