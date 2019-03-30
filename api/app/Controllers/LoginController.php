<?php
namespace App\Controllers;

class LoginController extends Controller{

    public function index($request,$response){

        return $this->view->render($response,'login.html');
    }
    public function HandleLoginAdmin($request,$response){
        $username = $request->getParam('username');
        $password = $request->getParam('password');
        if(!empty($username) && !empty($password)){
            if($username == 'admin' && $password == '123456'){
                $_SESSION['success'] = true;
                $message['success'] = 'success';
                echo json_encode($message);
            }else{
                $message['error'] = 'Tài khoản hoặc mật khẩu admin không chính xác!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Vui lòng nhập đầy đủ thông tin!';
            echo json_encode($message);
        }
    }
    public function LogoutAdmin($request,$response){
        unset($_SESSION['success']);
        $message['success'] = 'logout';
        echo json_encode($message);
    }
}