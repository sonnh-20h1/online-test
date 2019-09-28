<?php
namespace App\Controllers;

class NotiController extends Controller{
    private $tableName = "feedback_question";

    public function fetch_notification($request,$respone){
        $sql = "SELECT 
                    feedback_question.create_on,
                    feedback_question.content,
                    feedback_question.exam_id,
                    ol_account_google.email,
                    question.SUBID,
                    question.QUE_TEXT
                FROM feedback_question 
                INNER JOIN ol_account_google ON ol_account_google.id = feedback_question.user_id 
                INNER JOIN question ON question.ID_QUE = feedback_question.question_id 
                ORDER BY feedback_question.create_on DESC";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }

}