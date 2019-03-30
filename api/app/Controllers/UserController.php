<?php
namespace App\Controllers;

class UserController extends Controller{

    private $tableName = 'users';
    public function index($request,$response){
        if(isset($_SESSION['success'])){
            return $this->view->render($response,'mng_user.phtml');          
        }else{
            return $response->withRedirect($this->router->pathFor('sign_in'));
        }
    }
    public function Display_user($req,$res){
        $result  = $this->database->select($this->tableName,'*');
        echo json_encode($result);
    }
    public function Login_User($req,$res){
        $UserName = $req->getParam('Username');
        $PassWord = $req->getParam('Password');
        if( !empty($UserName) && !empty($PassWord) ){
            $result  = $this->database->select($this->tableName,['IDUSER','LASTNAME','FIRSTNAME','USERNAME','EMAIL'],[
                'USERNAME'  => $UserName,
                'PASS'      => $PassWord,
                'status'    => 1
            ]);
            if(!empty($result)){
                echo json_encode($result);
            }else{
                $Block_User  = $this->database->select($this->tableName,['IDUSER'],[
                    'USERNAME'  => $UserName,
                    'PASS'      => $PassWord,
                    'status'    => 0
                ]);
                if(!empty($Block_User)){
                    $message['error'] = 'Tài khoản của bạn đã bị chặn,vui lòng liên hệ admin để kích hoạt!';
                    echo json_encode($message);
                }else{
                    $message['error'] = 'Tài khoản hoặc mật khẩu không chính xác !';
                    echo json_encode($message);
                }
            }
        }else{
            $message['error'] = 'Vui lòng nhập đầy đủ thông tin!';
            echo json_encode($message);
        }
    }
    public function loading_login($request,$response){
        
        $id  = $request->getParam('id');
        $result = $this->database->select($this->tableName,'*',['IDUSER'=>$id,'status' => 0]);
        if(!empty($result)){
            $message['error'] = 'Đã chặn thành công!';
        }else{
            $message['success'] = 'Đã loading thành công!';
        }
        echo json_encode($message);
    }
    public function BlockUser($request,$response){
        $id  = $request->getParam('id');
        if(!empty($id)){
            $result = $this->database->select($this->tableName,['status'],['IDUSER'=>$id]); 
            if($result[0]['status'] == 0){
                $this->database->update($this->tableName,['status' => 1],['IDUSER'=>$id]); 
                $message['success'] = 'Đã hoạt động thành công!';
            }else{
                $this->database->update($this->tableName,['status' => 0],['IDUSER'=>$id]); 
                $message['success'] = 'Đã chặn thành công!';
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
        }
        echo json_encode($message);
    }
    public function SignUpUser($request,$response){
        $UserName  = $request->getParam('UserName');
        $PassWord  = $request->getParam('PassWord');
        $FirstName = $request->getParam('FirstName');
        $LastName  = $request->getParam('LastName');
        $Email     = $request->getParam('Email');

        if(!empty($UserName) && !empty($PassWord) && !empty($Email)){
            $CheckUserName  = $this->database->select($this->tableName,'USERNAME',['USERNAME' => $UserName]);
            $CheckEmail     = $this->database->select($this->tableName,'EMAIL',['EMAIL' => $Email]);
            if(!empty($CheckUserName)){
                $message['error'] = 'Tài khoản này đã tồn tại!';
                echo json_encode($message);
            }else if(!empty($CheckEmail)){
                $message['error'] = 'Email này đã được sử dụng!';
                echo json_encode($message);
            }else{
                $this->database->insert($this->tableName,[
                    'LASTNAME'  => $LastName,
                    'FIRSTNAME' => $FirstName,
                    'EMAIL'     => $Email,
                    'USERNAME'  => $UserName,
                    'PASS'      => $PassWord,
                    'status'    => 1
                ]);
                $message['success'] = 'Đã tạo tài khoản thành công!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
    public function GetUserId($request,$response){
        $id = $request->getParam('id');
        if(!empty($id)){
            $result  = $this->database->select($this->tableName,'*',['IDUSER'=>$id]);
            if($result){
                echo json_encode($result[0]);
            }else{
                $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
}