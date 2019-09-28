<?php

namespace App\Controllers;
use \Firebase\JWT\JWT;

class DetailExamsController extends Controller{
    private $tableName = 'exam';
    private $tableGroupUser = 'ol_groups_user';
    private $tableNameUser = 'user_exam';
    private $tableNameRandom = 'random_exam';
    private $tableNameAccountGoogle = 'ol_account_google';

    public function ChooseRandomQuestion($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        try{
            $idExam = $request->getParam('idExam');
            $token = $request->getParam('token');
            $timeNow = $request->getParam('timeNow');
            $dateNow = $request->getParam('dateNow');

            $checkAccount = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken' => $token]);
            if(!empty($checkAccount)){
                $idUser = $checkAccount[0]['id'];
                $date = new \DateTime();
                $id = $date->format('mdhis');

                $result = $this->database->query(
                    "SELECT 
                        g.id as id,
                        g.create_on,
                        g.name , 
                        u.limit,
                        u.doing 
                    FROM ol_groups as g 
                    INNER JOIN ol_groups_exam as e ON g.id = e.id_group 
                    INNER JOIN ol_groups_user as u ON g.id = u.id_group 
                    WHERE e.id_exam = :id_exam AND u.id_user = :id_user AND g.status = 1",[
                        ':id_exam' => $idExam,
                        ':id_user' => $idUser
                ])->fetchAll();

                $groupId = null;
                if(!empty($result)){
                    foreach($result as $item){
                        if($item['limit'] > $item['doing']){
                            $groupId = $item['id'];
                            break;
                        }
                    }
                }

                if((!empty($idExam) && !empty($idUser) && $groupId != null) || (!empty($idExam) && !empty($idUser))){
                    $date = new \DateTime();
                    $startDate = $date->format('Y-m-d H:i:s');
                    $id = $date->format('mdhis');
                    $result = $this->database->insert($this->tableNameUser,[
                        'ID_UX'     => $id,
                        'IDUSER'    => $idUser,
                        'IDEXAM'    => $idExam,
                        'TIMESTART' => $timeNow,
                        'DATEEXAM'  => $dateNow,
                        'start_date' => $startDate,
                        'id_group' => $groupId
                    ]);
                    if($groupId != null){
                        $this->database->update('ol_groups_user',[
                                "doing[+]" => 1
                            ],[
                                "id_group" => $groupId,
                                "id_user" => $idUser
                            ]
                        );
                    }

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
        $params = $request->getParams();
        $id = isset($params['id']) ? $params['id'] : '';
        $token = isset($params['token']) ? $params['token'] : '';
        $checkAccount = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken' => $token]);
        
        if(!empty($checkAccount)){
            $email = $checkAccount[0]['email'];
            $iduser = $checkAccount[0]['id'];

            if(!empty($id) && !empty($email)){
                $sql = "SELECT * FROM exam JOIN subjects ON exam.SUBID = subjects.SUBID WHERE exam.IDEXAM =:id";
                $result = $this->database->query($sql,[":id" => $id])->fetchAll();

                $sqlStatus = "SELECT  gu.limit, gu.doing FROM 
                            ol_groups as g 
                            INNER JOIN ol_groups_exam as ge ON g.id = ge.id_group
                            INNER JOIN ol_groups_user as gu ON g.id = gu.id_group
                            WHERE   gu.id_user = :id_user 
                                    AND ge.id_exam = :id_exam
                                    AND g.status = 1
                                    AND gu.limit > gu.doing";
                
                if(!empty($result)){
                    $rsData['status'] = 'success';
                    $rsData['message'] = 'Đã lấy dữ liệu thành công!';
                    $rsData['data'] = $result[0];
                    if($result[0]['status'] == 1){
                        $rsData['correct'] = 1;
                    }else if($result[0]['status'] == 2){
                        $checkStatus =$this->database->query($sqlStatus,[ ":id_user" => $iduser,":id_exam" => $id])->fetchAll();
                        if(!empty($checkStatus)){
                            $rsData['correct'] = 1;
                        }else{
                            $rsData['correct'] = 2;
                        }
                    }
                }else{
                    $rsData['message'] = 'Đề thi này không tồn tại!';           
                }
            }else{
                $rsData['message'] = 'Không lấy dữ liệu thành công!';           
            }
        }else{
            $rsData['message'] = 'Thông tin chưa đầy đủ!';           
        }
        
        echo json_encode($rsData);
    }
}