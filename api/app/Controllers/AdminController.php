<?php
namespace App\Controllers;
use \Firebase\JWT\JWT;

class AdminController extends Controller{
    private $tableName = 'ol_admin';
    private $tableNameMessage = 'ol_message';

    public function GetMessage(){
        echo json_encode($this->database->select($this->tableNameMessage,"*"));
    }

    public function EditMessage($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Bạn hãy đăng nhập lại!",
        );
        $params = $request->getParams();
        $id = isset(	$params['id']) ? $params['id'] : '';
        $text = isset(	$params['text']) ? $params['text'] : ''; 
        if(!empty($id) && !empty($text)){
            $this->database->update($this->tableNameMessage,['text' => $text],['id' => $id]);
            $rsData['message'] = 'Sua thanh cong!';
            $rsData['status'] = 'success';
        }else{
            $rsData['message'] = 'Vui long dien day du thong tin';
        }
        echo json_encode($rsData);
    }

    public function login($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Bạn hãy đăng nhập lại!",
        );
        $params = $request->getParams();
        $username = isset(	$params['username']) ? $params['username'] : '';
        $password = isset(	$params['password']) ? $params['password'] : '';  
        if(!empty($username) && !empty($password)){
            $result = $this->database->select($this->tableName,'*',[
                'username' => $username,
                'password' => $password
                ]
            );
            if(!empty($result)){
                $now = time(); 
                $key = 'loginadmin';
                $payload = array(
                    "iat" => $now,
                    "id"  => $result[0]['id']
                );
                $token = JWT::encode($payload, $key);
                // $token = JWT::decode($jwt, $key, array('HS256'));
                $rsData['status'] = 'success';
                $rsData['message'] = 'Đăng nhập thành công!!';
                $rsData['data'] = $token;
            }else{
                $rsData['message'] = 'Tài khoản hoặc mật khẩu không chính xác!';
            }
        }
        echo json_encode($rsData);     
    }
    public function UpdatePass($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Bạn hãy đăng nhập lại!",
        );
        $params = $request->getParams();
        $oldPass    = isset(	$params['oldPass']) ? $params['oldPass'] : '';
        $newPass    = isset(	$params['newPass']) ? $params['newPass'] : '';  
        $againPass  = isset(	$params['againPass']) ? $params['againPass'] : '';  

        if(!empty($oldPass) && !empty($newPass) &&!empty($againPass)){
            $result = $this->database->select($this->tableName,'*',[
                    'username' => 'admin',
                    'password' => $oldPass
                ]
            );
            if(!empty($result)){
                if($newPass == $againPass){
                    $result = $this->database->update($this->tableName,['password' => $newPass],[ 'username' => 'admin' ] );
                    $rsData['status'] = 'success';
                    $rsData['message'] = 'Đổi mật khẩu thành công!';
                }else{
                    $rsData['message'] = 'Mật khẩu mới chưa đúng!';
                }
            }else{
                $rsData['message'] = 'Bạn nhập chưa đúng mật khẩu cũ!';
            }
        }else{
            $rsData['message'] = 'Bạn vui lòng điền đầy đủ thông tin!';
        }
        echo json_encode($rsData);  
    }

}
?>