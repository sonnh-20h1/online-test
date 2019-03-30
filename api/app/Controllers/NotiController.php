<?php
namespace App\Controllers;

class NotiController extends Controller{
    private $tableName = "feedback_question";
    public function index($request,$respone){
        if(isset($_SESSION['success'])){
            return $this->view->render($respone,'mng_notification.phtml');
        }else{
            return $respone->withRedirect($this->router->pathFor('sign_in'));
        }
    }
    public function fetch_notification($request,$respone){
        $sql = "SELECT * FROM feedback_question INNER JOIN users ON users.IDUSER = feedback_question.user_id INNER JOIN question ON question.ID_QUE = feedback_question.question_id ORDER BY feedback_question.create_on DESC";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }

}