<?php

namespace App\Controllers;
use \Firebase\JWT\JWT;

class DetailExamsController extends Controller{
    private $tableName = 'exam';
    private $tableNameUser = 'user_exam';
    private $tableNameRandom = 'random_exam';

    public function ChooseRandomQuestion($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        try{
            $idExam = $request->getParam('idExam');
            $jwt = $request->getParam('idUser');
            $timeNow = $request->getParam('timeNow');
            $dateNow = $request->getParam('dateNow');

            $key = 'loginuser';
            $token = (array)JWT::decode($jwt, $key, array('HS256'));
            $idUser = $token['IDUSER'];

            if(!empty($idExam) && !empty($idUser) ){
                $date = new \DateTime();
                $id = $date->format('mdhis');
                $result = $this->database->insert($this->tableNameUser,[
                    'ID_UX'     => $id,
                    'IDUSER'    => $idUser,
                    'IDEXAM'    => $idExam,
                    'TIMESTART' => $timeNow,
                    'DATEEXAM'  => $dateNow
                ]);
                if($result->rowCount()){
                    $listQuestions = $this->RequestExamById($idExam);
                    $rdNumber = $this->database->select($this->tableName,'RANDOMEXAM',['IDEXAM' => $idExam]);
                    $rand_keys = array_rand($listQuestions, $rdNumber[0]);
                    $ListRandom = [];
                    for($i = 0;$i < count($rand_keys);$i++){
                        $ListRandom[] = $listQuestions[$rand_keys[$i]];
                    }
                    if(!empty($ListRandom)){
                        foreach($ListRandom as $item ){
                            $this->database->insert($this->tableNameRandom,[
                                'ID_UX'     => $id,
                                'IDEXAM'    => $item['IDEXAM'],
                                'ID_QUE'    => $item['ID_QUE']
                            ]);
                        }
                        $checkListRandom = $this->database->select($this->tableNameRandom,'*',['ID_UX' => $id]);
                        if(!empty($checkListRandom)){
                            $rsData['status'] = 'success';
                            $rsData['message'] = 'Đã tạo đề thi thành công!';
                            $rsData['data'] = $id;
                        }else{
                            $rsData['message'] = 'Chưa tạo đề random!';
                        }
                    }else{
                        $rsData['message'] = 'Có lỗi sảy ra vui lòng reload lại!';
                    }
                }else {
                    $rsData['message'] = "Có lỗi sảy ra, chưa tạo được đề thi!";
                }
            }else {
                $rsData['message'] = 'Chưa nhận được dữ liệu!';
            }
        } catch (\InvalidArgumentException $e) {
            // 500 internal server error
            // your fault
            $rsData['message'] = 'co lo say ra';
        } catch (\Exception $e) {
            // 401 unauthorized
            // clients fault
            $rsData['message'] = 'co lo say ra';
        }
        echo json_encode($rsData);
    }
    private function RequestExamById($id){
        if($id){
            $sql = "SELECT  detail_exam.IDEXAM,
                            detail_exam.ID_QUE 
                    FROM detail_exam INNER JOIN exam ON exam.IDEXAM = detail_exam.IDEXAM 
                    WHERE detail_exam.IDEXAM = '$id'";
            $result = $this->database->query($sql)->fetchAll();
            return $result;
        }
        return [];
    }

    public function DetailExam($request,$response,$args){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        $id = $request->getParam('id');

        $jwt = $request->getParam('token');
        $key = 'loginuser';
        $token = (array)JWT::decode($jwt, $key, array('HS256'));
        $email = $token['EMAIL'];
        $iduser = $token['IDUSER'];

        if(!empty($id) && !empty($email)){
            $sql = "SELECT * FROM exam JOIN subjects ON exam.SUBID = subjects.SUBID WHERE exam.IDEXAM ='$id'";
            $result = $this->database->query($sql)->fetchAll();

            $sqlUser = "SELECT * FROM `ol_groups_user` 
                        INNER JOIN ol_groups_exam ON ol_groups_user.id_group = ol_groups_exam.id_group 
                        WHERE ol_groups_user.email = '$email' AND ol_groups_exam.id_exam = '$id'";

            $sqlDoNumber = "SELECT COUNT(user_exam.ID_UX) as doexam
                            FROM `user_exam` JOIN exam ON user_exam.IDEXAM = exam.IDEXAM    
                            WHERE exam.status = 2 AND user_exam.IDUSER = '$iduser'";

            $CheckUser = $this->database->query($sqlUser)->fetchAll();
            $DoNumberExam = $this->database->query($sqlDoNumber)->fetchAll();

            $LimitExam = 0;
            if(!empty($result)){
                $rsData['status'] = 'success';
                $rsData['message'] = 'Đã lấy dữ liệu thành công!';
                $rsData['data'] = $result[0];
                $rsData['correct'] = 2;
                if($result[0]['status'] == 1){
                    $rsData['correct'] = 1;
                }else if(!empty($CheckUser)){
                    foreach($CheckUser as $item){
                        $LimitExam += $item['limit'];
                    }
                    if($DoNumberExam[0]['doexam'] < $LimitExam){
                        $rsData['correct'] = 1;
                    }
                } 
            }else{
                $rsData['message'] = 'Đề thi này không tồn tại!';           
            }
        }else{
            $rsData['message'] = 'Không lấy dữ liệu thành công!';           
        }
        echo json_encode($rsData);
    }
}