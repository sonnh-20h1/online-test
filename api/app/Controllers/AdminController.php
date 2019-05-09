<?php
namespace App\Controllers;
use \Firebase\JWT\JWT;

class AdminController extends Controller{
    private $tableName = 'ol_admin';
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
}
?>