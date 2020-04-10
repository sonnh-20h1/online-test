<?php

namespace App\Controllers;
use \Firebase\JWT\JWT;

class FeedBackWebController extends Controller{

    private $tableNameUser = 'users';
    private $tableName = 'ol_feedback_website';
    private $tableNameAccountGoogle = 'ol_account_google';
    
    public function getFeedBackWebsite($request,$response){
        $sql = "SELECT * FROM ol_feedback_website  ORDER BY create_on DESC";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }

    public function insertFeedBack($request, $response) {
        $token = $request->getParam('token');
        $content = $request->getParam('content');
        $rsData = array(
            'status' => 'error',
            'message' => 'Có lỗi sảy ra! Vui lòng kiếm tra lại!'
        );
        $result  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]); 
        $date = new \DateTime();
        $create_on = $date->format('Y-m-d H:i:s');
    
        $id = $date->format('Y-md-His');
        if($result){
            $item = $result[0];
            $idUser = $item['id'];
            $email = $item['email'];
            if(!empty($content) && !empty($id) && !empty($idUser)){
                $result = $this->database->insert($this->tableName,[
                    'id'        => $id,
                    'create_by' => $idUser,
                    'email'     => $email,
                    'content'  => $content,
                    'create_on' => $create_on
                ]);
                if($result->rowCount()) {
                    $rsData['message'] ='ok';
                    $rsData['status'] = 'success';
                } else {
                    $rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
                }
            }else{
                $rsData['message'] = 'Bạn vui lòng điền đầy đủ thông tin!';
            }
        }
        echo json_encode($rsData);
    }
}
?>