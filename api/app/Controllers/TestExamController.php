<?php

namespace App\Controllers;
use \Firebase\JWT\JWT;

class TestExamController extends Controller{
    private $tableName = 'exam';
    private $tableNameAccountGoogle = 'ol_account_google';

    public function GetExamQuestionId($request, $response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );

        try{
            $id = $request->getParam('id');
            $idux = $request->getParam('idux');
            if(!empty($id) && !empty($idux)){
                $result = $this->database->select($this->tableName,'*',['IDEXAM' => $id]);
                $sql = "SELECT * FROM `random_exam` 
                        JOIN question ON question.ID_QUE = random_exam.ID_QUE 
                        WHERE ID_UX='$idux' AND IDEXAM='$id'";
                $getQuestion = $this->database->query($sql)->fetchAll();
                $questions = [];
                foreach($getQuestion as $item){
                    $answers = $this->GetAnswerId($item['ID_QUE']);
                    $questions[] = [
                        'ID_QUE'        => $item['ID_QUE'],
                        'QUE_TEXT'      => $item['QUE_TEXT'],
                        'choose'        => false,
                        'Answer'        => $answers,
                    ];
                }
                if(!empty($result)){
                    $rsData['status'] = 'success';
                    $rsData['message'] = 'cập nhật thành công';
                    $rsData['data'] = $result[0];
                    $rsData['Questions'] = $questions;
                }else{
                    $rsData['message'] = 'Dữ liệu trống!';
                }
            }else{
                $rsData['message'] = 'Chưa nhận được yêu cầu!';
            }
        } catch (\InvalidArgumentException $e) {
            // 500 internal server error
            // your fault
            $rsData['message'] = 'Co lo say ra 500';
        } catch (\Exception $e) {
            // 401 unauthorized
            // clients fault
            $rsData['message'] = 'Co lo say ra 401';
        }
        echo json_encode($rsData);
    }

    private function GetAnswerId($id){
        if($id){
            $sql = "SELECT * FROM `answer` WHERE ID_QUE = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }
    // nop bai 
    public function GetQuestionUserId($request, $response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        $idExam     = $request->getParam('idExam');
        $idux     = $request->getParam('idux');
        $token     = $request->getParam('token');
        $timeNow    = $request->getParam('timeNow');
        $QueID  = $request->getParam('questions');
        $number     = count($QueID);

        $idUser = null;
        $checkAccount = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken' => $token]);
        if(!empty($checkAccount)){
            $idUser = $checkAccount[0]['id'];
        }

        $sqlAns = " SELECT question.ID_QUE,answer.ID_ANS 
                    FROM question INNER JOIN detail_exam ON detail_exam.ID_QUE = question.ID_QUE 
                    INNER JOIN answer ON answer.ID_QUE = question.ID_QUE
                    WHERE detail_exam.IDEXAM = :idExam AND answer.CORRECT = 'true'";
        $resultAns = $this->database->query($sqlAns,[
            ":idExam" => $idExam
        ])->fetchAll();
        $m = count($resultAns);
        
        if(!empty($idExam) && !empty($idUser)){
            $checkConfirm = $this->database->select('user_exam','*',['ID_UX ' => $idux]);
            $arr = $checkConfirm[0];
            if($arr['CONFIRM'] == null){
                $dem = 0;
                for($i = 0;$i < $m; $i++){
                    for($j = 0;$j < $number;$j++){
                        if($QueID[$j]['idQue'] == $resultAns[$i]['ID_QUE'] && $QueID[$j]['idAns'] == $resultAns[$i]['ID_ANS']){
                            $dem += 1;
                        }
                    }
                }  
                $this->database->update('user_exam',[
                    'TIMEEND'   => $timeNow,
                    'CONFIRM'   => 'true',
                    'SCORE'     => $dem
                ],[
                    'ID_UX' => $idux
                ]);   
                        
                for($i = 0; $i < $number; $i++){
                    if(!empty($QueID[$i])){
                        $this->database->insert('detail_user_exam',[
                            'ID_UX'     => $idux,
                            'ID_ANS'    => $QueID[$i]['idAns'],
                            'ID_QUE'    => $QueID[$i]['idQue']
                        ]);
                    }
                }
                $rsData['status'] = 'success';
                $rsData['message'] = 'ok roi nha';
            }else{
                $message['message'] = 'Đề này đã thi xong rồi nhé!';
            }
        }else{
            $message['message'] = 'Chưa lấy được dữ liệu!';
        }
        echo json_encode($rsData);
    }
}