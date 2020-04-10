<?php

namespace App\Controllers;

class ImportExamController extends Controller{

    public function ShowExams($request,$response){
        $sql = "SELECT * FROM exam JOIN subjects ON exam.SUBID = subjects.SUBID";
        $result = $this->database->query($sql)->fetchAll();
        if(empty($result)){
            $message['error'] = 'Trống';
        }else{
            echo json_encode($result);
        }  
    }
    public function UpdateExamId($request,$response){
        $idExam = $request->getParam('IdExam'); 
        $TimeExam = $request->getParam('TimeExam'); 
        $NameExam = $request->getParam('NameExam'); 
        $SubjectExam = $request->getParam('SubjectExam');
        $RandomNumber = $request->getParam('RandomNumber'); 
        $status = $request->getParam('status'); 

        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        if(empty($idExam) || empty($TimeExam) || empty($NameExam) || empty($SubjectExam) || empty($status)){
            $rsData['message'] = 'Chưa nhận được dữ liệu!';
        }else{
            $this->database->update('exam',[
                'EXAMTEXT'  => $NameExam,
                'SUBID'     => $SubjectExam,
                'EXTIME'    => $TimeExam,
                'RANDOMEXAM'  => $RandomNumber,
                'status'  => $status
            ],['IDEXAM'    => $idExam]);
            $rsData['status'] = 'success';
            $rsData['message'] ='Đã cập nhật đề thi thành công!';
        }
        echo json_encode($rsData);
    }
    public function HanldingImportFileExcel($request,$response){
        $idExam = $request->getParam('IdExam'); 
        $TimeExam = $request->getParam('TimeExam'); 
        $NameExam = $request->getParam('NameExam'); 
        $SubjectExam = $request->getParam('SubjectExam');
        $RandomNumber = $request->getParam('RandomNumber'); 
        $status = $request->getParam('status'); 
        $data = $request->getParam('data');
        $numberExam = count($data);
        if(empty($idExam) || empty($TimeExam) || empty($NameExam) || empty($SubjectExam) || empty($status)){
            $message['error'] = 'Chưa nhận được dữ liệu!';
            echo json_encode($message);
        }else{
           $result = $this->database->select('exam','*',['IDEXAM' => $idExam]);
            if(empty($result)){
                $this->database->insert('exam',[
                    'IDEXAM'    => $idExam,
                    'EXAMTEXT'  => $NameExam,
                    'SUBID'     => $SubjectExam,
                    'EXTIME'    => $TimeExam,
                    'EXNUM'     => $numberExam,
                    'RANDOMEXAM'  => $RandomNumber,
                    'status'  => $status
                ]);
                $this->InsertQuestionExam($data,$idExam,$SubjectExam);
                $message['success'] ='Đã thêm đề thi thành công!';
                echo json_encode($message);
            }else{
                $message['error'] ='Mã đề thi đã tồn tại,vui lòng nhập mã khác!';
                echo json_encode($message);
            }
        }
    }
    public function UpdateQuestionId($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        $idQue = $request->getParam('idQue'); 
        $idAns = $request->getParam('idAns');
        
        if(!empty($idQue) && !empty($idAns)){
            $allAnswer = $this->database->select('answer','*',[ 'ID_QUE'    => $idQue ] );
            foreach($allAnswer as $item){
                if($item['ID_ANS'] == $idAns){
                    $this->database->update('answer',[
                        'CORRECT'   => 'true'
                    ],['ID_ANS' => $idAns]);
                }else{
                    $this->database->update('answer',[
                        'CORRECT'   => 'false'
                    ],['ID_ANS' => $item['ID_ANS']]);
                }
            }
            $rsData['status'] = 'success';
            $rsData['message'] = 'Cập nhật đáp án thành công!';

        }
        echo json_encode($rsData);
    }
    private function InsertQuestionExam($data,$idExam,$idSubject){
        $result = $this->database->select(
            'question',
            'ID_QUE',
            [
                "ORDER" => ["ID_QUE" => "DESC"],
                "LIMIT" => 1
            ]
        );
        $id_que = $result[0]+1;
        for($i = 0;$i < count($data);$i++){
            if(!empty($data[$i]['QUE_TEXT'])){
                $id_que += 2;
                $this->database->insert('question',[
                    'ID_QUE'    => $id_que,
                    'QUE_TEXT'  => $data[$i]['QUE_TEXT'],
                    'SUBID'     => $idSubject
                    ]
                );
                $this->InsertAnswerExam($data[$i]['Answer'],$id_que);
                $this->database->insert('detail_exam',[
                    'IDEXAM'    => $idExam,
                    'ID_QUE'    => $id_que
                ]);
            }
        }
        
    }
    private function InsertAnswerExam($dataAnswer,$id_que){
        for($i = 0; $i < count($dataAnswer);$i++){
            if(!empty($dataAnswer[$i]['ANS_TEXT'])){
                $correct = 'false';
                if($dataAnswer[$i]['CORRECT'] == 'true'){
                    $correct = 'true';
                }
                $this->database->insert('answer',[
                    'ID_QUE'    => $id_que,
                    'ANS_TEXT'  => $dataAnswer[$i]['ANS_TEXT'],
                    'CORRECT'   => $correct
                    ]
                );
            }
        }
    }
    private function GetExamId($id){
        $sql = "SELECT * FROM exam JOIN subjects ON exam.SUBID = subjects.SUBID WHERE exam.IDEXAM = '$id' ";
        $result = $this->database->query($sql)->fetchAll();
        return $result;
    }
    public function SelectExamId($request,$response){
        $id = $request->getParam('id');
        $questions = array();
        if(!empty($id)){
            $result = $this->GetExamId($id);
            $arrExam = $this->GetExamHaveId($id);
            $answers = [];

            foreach($arrExam as $item){
                $answers = $this->GetAnswerId($item['ID_QUE']);
                $questions[] = [
                    'ID_QUE'        => $item['ID_QUE'],
                    'QUE_TEXT'      => $item['QUE_TEXT'],
                    'type'          => $item['type'],
                    'Answer'        => $answers,
                ];
            }
            $exam[] =[
                'idExam'        => $result[0]['IDEXAM'] ,
                'NameExam'      => $result[0]['EXAMTEXT'] ,
                'SubjectExam'   => $result[0]['SUBID'] ,
                'TimeExam'      => $result[0]['EXTIME'] ,
                'RandomQues'    => $result[0]['RANDOMEXAM'] ,
                'status'        => $result[0]['status'],
                'questions'     => $questions
            ];
            echo json_encode($exam);
        }else{
            $message['error'] = 'Không có dữ liệu!';
            echo json_encode($message);
        } 
    }
    private function GetAnswerId($id){
        if($id){
            $sql = "SELECT * FROM `answer` WHERE ID_QUE = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }
    private function GetExamHaveId($id){
        if($id){
            $sql = "SELECT detail_exam.ID_DE,detail_exam.IDEXAM,question.ID_QUE,question.type,question.QUE_TEXT FROM detail_exam JOIN question ON detail_exam.ID_QUE = question.ID_QUE WHERE detail_exam.IDEXAM ='$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }
    private function GetQuestionExamId($arrExam){
        $questions = [];
        if(!empty($arrExam)){
            for($i = 0;$i < count($arrExam);$i++){
                $answer = $this->RequestQuestionId($arrExam[$i]['ID_QUE']);
                $questions[] = [
                    'ID_QUE'       => $arrExam[$i]['ID_QUE'],
                    'QUE_TEXT'     => $arrExam[$i]['QUE_TEXT'],
                    'Answer'       => $answer
                ];
            }
        }
        return $questions;
    }
    private function HandingGetExam($id,$arrExam){
            $exam = [];
            $questions = [];
            if(!empty($arrExam)){
                for($i = 0;$i < count($arrExam);$i++){
                    $answer = $this->GetAnswerId($arrExam[$i]['ID_QUE']);
                    $questions[] = [
                        'ID_QUE'       => $arrExam[$i]['ID_QUE'],
                        'QUE_TEXT'     => $arrExam[$i]['QUE_TEXT'],
                        'Answer'       => $answer
                    ];
                }
            }
            $result = $this->GetExamId($id);
            $exam[] =[
                'idExam'        => $result[0]['IDEXAM'] ,
                'NameExam'      => $result[0]['EXAMTEXT'] ,
                'SubjectExam'   => $result[0]['SUBID'] ,
                'TimeExam'      => $result[0]['EXTIME'] ,
                'RandomQues'    => $result[0]['RANDOMEXAM'] ,
                'status'    => $result[0]['status'] ,
                'questions'     => $questions
            ];
            return $exam;
    }
    
    private function RequestQuestionId($id){
        if($id){
            $sql = "SELECT * FROM question JOIN answer ON answer.ID_QUE = question.ID_QUE WHERE question.ID_QUE = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }
    
    private function RequestExamId($id){
        if($id){
            $sql = "SELECT * FROM detail_exam INNER JOIN exam ON exam.IDEXAM = detail_exam.IDEXAM INNER JOIN question ON detail_exam.ID_QUE = question.ID_QUE WHERE exam.IDEXAM = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }
    public function DeleteExamId($request,$response){
        $id = $request->getParam('id');
        if($id){
            $this->database->delete('detail_exam',['IDEXAM'=> $id]);
            $this->database->delete('random_exam',['IDEXAM'=> $id]);
            $sql = "SELECT user_exam.ID_UX FROM user_exam INNER JOIN detail_user_exam ON user_exam.ID_UX = detail_user_exam.ID_UX WHERE user_exam.IDEXAM = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            if(!empty($result)){
                for($i = 0;$i < count($result);$i++){
                    $this->database->delete('detail_user_exam',['ID_UX'=> $result[$i]['ID_UX']]);
                }
                $this->database->delete('user_exam',['IDEXAM'=> $id]);
            }
            $this->database->delete('exam',['IDEXAM'=> $id]);
            $message['success'] ='Đã xóa đề thi thành công!';
            echo json_encode($message);
        }
    }
    
    
    private function RandomQuestionId($arrExam,$idExam,$idux){
        $questions = [];
        if(!empty($arrExam)){
            for($i = 0;$i < count($arrExam);$i++){
                $answer = $this->RequestQuestionId($arrExam[$i]['ID_QUE']);
                $questions[] = [
                    'ID_UX'     => $idux,
                    'ID_QUE'    => $arrExam[$i]['ID_QUE'],
                    'IDEXAM'   => $idExam
                ];
            }
        }
        return $questions;
    }
    private function RandomAnserId($input){
        if(!empty($input)){
            $arr = [];
            $numbers = range(0,count($input)-1);
            shuffle($numbers);
            for($i = 0;$i < count($input);$i++){
                $arr[] = $input[$numbers[$i]];
            }
            return $arr;
        }else{
            return [];
        }
    }
    private function GetUserExam($idExam,$idUser,$timeNow,$dateNow){
        if(!empty($idExam) && !empty($idUser)){
            $checkConfirm = $this->database->select('user_exam','*',[
                'IDUSER' => $idUser,
                'IDEXAM'    => $idExam,
                "ORDER" => ["ID_UX" => "DESC"],
                "LIMIT" => 1
            ]);
            $arr = [];
            if(!empty($checkConfirm)){
                $arr = $checkConfirm[0];
            }
            if(empty($checkConfirm) || $arr['CONFIRM'] == "true"){
                $this->database->insert('user_exam',[
                    'IDUSER'    => $idUser,
                    'IDEXAM'    => $idExam,
                    'TIMESTART' => $timeNow,
                    'DATEEXAM'  => $dateNow
                ]);
                $idUX = $this->database->select('user_exam','ID_UX',[
                    'IDUSER' => $idUser,
                    'IDEXAM' => $idExam,
                    "ORDER"  => ["ID_UX" => "DESC"],
                    "LIMIT"  => 1
                ]);
                $this->RandomUserExam($idExam,$idUX[0]);
            }else if($arr['CONFIRM'] == null){
                $this->database->update('user_exam',[
                    'TIMESTART' => $timeNow,
                    'DATEEXAM'  => $dateNow],[
                        'ID_UX' => $arr['ID_UX'],
                        'IDUSER'    => $idUser
                    ]
                );
            }
        }
    }
    public function RandomTestExam($request,$response){
        $id = $request->getParam('idExam');
        $idUser = $request->getParam('idUser');
        $timeNow = $request->getParam('timeNow');
        $dateNow = $request->getParam('dateNow');
        $this->GetUserExam($id,$idUser,$timeNow,$dateNow);
        $idUX = $this->database->select('user_exam','ID_UX',[
            'IDUSER' => $idUser,
            'IDEXAM' => $id,
            "ORDER"  => ["ID_UX" => "DESC"],
            "LIMIT"  => 1
        ]);
        echo json_encode($idUX[0]);
    }
    
    private function RandomUserExam($id,$idux){
        $random = $this->database->select('exam','RANDOMEXAM',['IDEXAM' => $id]);
        $arrExam = $this->RequestExamId($id);
        $listItem = $this->RandomQuestionId($arrExam,$id,$idux);
        $rand_keys = array_rand($listItem, $random[0]);
        $arr = [];
        for($i = 0;$i < count($rand_keys);$i++){
            $arr[] = $listItem[$rand_keys[$i]];
        }
        for($i = 0;$i < count($arr);$i++){
            $this->database->insert('random_exam',[
                'ID_UX'     => $arr[$i]['ID_UX'],
                'IDEXAM'    => $arr[$i]['IDEXAM'],
                'ID_QUE'    => $arr[$i]['ID_QUE']
            ]);
        }
    }
    
}