<?php
namespace App\Controllers;
use \Firebase\JWT\JWT;

class PersonalController extends Controller{

    private $tableName = 'exam';
    private $tablePerson = 'ol_personal_exams';
    private $tableCode = 'ol_code_exams';
    private $tableNameAccountGoogle = 'ol_account_google';

    public function getExamByUserId($request,$response){
        $token = $request->getParam('token');
        if(!empty($token)){
            $result  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]); 
            if($result){
                $users = array();
                $item = $result[0];
                $exams  = $this->database->select($this->tableName,'*',['user_id'=>$item['id']]); 
                echo json_encode($exams);
            }
        }
    }
    public function selectCode($request,$response){ 
        $rlCode = $this->database->select($this->tableCode,'*');
        echo json_encode($rlCode);
    }

    public function selectPerson($request,$response){ 
        $rlCode = $this->database->select($this->tablePerson,'*');
        echo json_encode($rlCode);
    }

    public function createCode($request,$response){
        $code = $request->getParam('code');
        $useDay = $request->getParam('useDay');
        $type = $request->getParam('type');
        $expiryDay = $request->getParam('expiryDay');
        $createDate = $request->getParam('createDate');
        $this->database->insert($this->tableCode,[
            'code' => $code,
            'useDay' => $useDay,
            'expiryDay' => $expiryDay,
            'type' => $type,
            'create_date' => $createDate ,
            'status' => 1,
        ]);
        echo json_encode(true);
    }
    
    public function deleteCode($request,$response){
        $id = $request->getParam('id'); 
        $this->database->delete($this->tableCode,['id'=> $id]);
        echo json_encode(true);
    }

    public function statusPerson($request,$response){
        $token = $request->getParam('token');
        $rlUser  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]);
        $rlPerson = $this->database->select($this->tablePerson,'*',['user_id'=> $rlUser[0]['id']]);
        if($rlPerson){
            echo json_encode($rlPerson[0]);
        }else{
            echo json_encode(false);
        }
    }

    public function getExamPerson($request,$response){
        $result = $this->database->select('exam',[
            "[>]ol_account_google" => ["user_id" => "id"],
        ],'*',['exam.status' => 3]);
        echo json_encode($result);
    }

    public function confirmCode($request,$response){
        $code = $request->getParam('code');
        $datetime = $request->getParam('datetime');
        $token = $request->getParam('token');
        $rlCode = $this->database->select($this->tableCode,'*',['code' => $code]);
        $rlUser  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]);
        $rlPerson = $this->database->select($this->tablePerson,'*',['user_id'=> $rlUser[0]['id']]);

        $useDay = floor(($datetime - $rlCode[0]['create_date'])/ 1000 / 60 / 60 / 24);
        $deadline = $rlCode[0]['expiryDay'] - $useDay; 
        if($deadline > 0){
            if($rlCode && $rlUser && empty($rlPerson)) {
                $this->database->insert($this->tablePerson,[
                    'user_id' => $rlUser[0]['id'],
                    'email' => $rlUser[0]['email'],
                    'create_time' => $datetime,
                    'useDay' => $rlCode[0]['useDay'],
                    'status' => $rlCode[0]['type'],
                ]);
                echo json_encode(true);
            } else if($rlCode && $rlUser && $rlPerson) {
                if($rlCode[0]['type'] == 2 && $rlCode[0]['status'] == 1){
                    $this->database->update($this->tablePerson,[
                        'create_time' => $datetime,
                        'useDay' => $rlCode[0]['useDay'],
                        'status' => 2,
                    ],['user_id' => $rlUser[0]['id']]);
                    $this->database->update($this->tableCode,[
                        'status' => 2
                    ],['id' => $rlCode[0]['id']]);
                    echo json_encode(true);
                }else{
                    echo json_encode(false);
                }
            }else{
                echo json_encode(false);
            }
        }else{
            echo json_encode(false);
        }
    }

}