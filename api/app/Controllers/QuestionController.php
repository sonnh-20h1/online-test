<?php
namespace App\Controllers;

class QuestionController extends Controller{


    public function Hanlding($req,$res){
        $que_name = $req->getParam('que_name');
        $ans = $req->getParam('txt_answer');
        $number = count($ans);
        $check = $req->getParam('item_ans');
        $correct = 'false';

        $result = $this->database->select(
            'question',
            'ID_QUE',
            [
                "ORDER" => ["ID_QUE" => "DESC"],
                "LIMIT" => 1
            ]
        );
        $id_que = $result[0] + 3;
        if(!empty($que_name)){
            $this->database->insert('question',[
                'ID_QUE'=> $id_que,
                'QUE_TEXT'=>$que_name
                ]
            );
            for($i = 0;$i < $number; $i++){
                $correct = 'false';
                if(!empty($ans[$i])){
                    if($check == ($i+1 )){
                        $correct = 'true';
                    }
                    $this->database->insert('answer',[
                        'ID_QUE'    => $id_que,
                        'ANS_TEXT'  => $ans[$i],
                        'CORRECT'   => $correct
                        ]
                    );
                }
            }
            echo json_encode('oke');
        }else{
            echo json_encode('noo');
        }
    }

    public function Display_all($req,$res){
        $result  = $this->database->select('question','*');
        echo json_encode($result);
    }
    public function get_answer($req,$res){
        $id = $req->getParam('id_que');
        $result = '';
        if(!empty($id)){
            $result = $this->database->select('answer','*',['ID_QUE'=> $id]);
        }
        echo json_encode($result);
    }
}