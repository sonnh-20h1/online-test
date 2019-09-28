<?php
namespace App\Controllers;
use \Firebase\JWT\JWT;

class UserController extends Controller{

    private $tableName = 'users';
    private $tableNameAccountGoogle = 'ol_account_google';
    private $tableNameGroupUser = 'ol_groups_user';

    public function Display_user($req,$res){
        $users = array();
        $sql = "SELECT * FROM ol_account_google WHERE term = 1 ORDER BY create_on DESC";
        $result = $this->database->query($sql)->fetchAll();
        foreach($result as $item){
            $users[] =[
                'id'            => $item['id'],
                'googleId'      => $item['googleId'],
                'accessToken'   => $item['accessToken'],
                'email'         => $item['email'],
                'name'          => $item['name'],
                'imageUrl'      => $item['imageUrl'],
                'university'    => $item['university'],
                'type'          => $item['type'],
                'term'          => $item['term'],
                'create_on'     => $item['create_on'],
                'status' => $item['status'],
                'do_number' => $this->GetDoNumberUser($item['email']),
                'do_limit' => $this->GetNumberUserLimit($item['email']),
                // 'affiliate' => count($this->database->select($this->tableName,'*',['Id_people' => $item['IDUSER']])),
            ];
        }
        echo json_encode($users);
    }

    public function GetInfomationUserId($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Id không tồn tại!",
        );
        $id = $request->getParam('id');
        if(!empty($id)){
            $result = $this->database->select($this->tableNameAccountGoogle,'*',['id' => $id]);
            if(!empty($result)){
                $users = [
                    'affiliate' => $this->database->select($this->tableNameAccountGoogle,'*',['introduced' => $result[0]['email']]),
                    'introduced' => $this->database->select($this->tableNameAccountGoogle,'*',['email' => $result[0]['introduced']])
                ];
                $rsData['status'] = 'success';
                $rsData['message'] = 'Đã lấy dữ liệu thành công!';
                $rsData['data'] = $users;
            }
            
        }
        echo json_encode($rsData);
    }

    private function GetDoNumberUser($email){
        if($email){
            $doExam = 0;
            $result = $this->database->select('ol_groups_user',[
                "[>]ol_groups" => ["id_group" => "id"]
            ],'ol_groups_user.doing',[
                'ol_groups_user.email' => $email,
                'ol_groups.status' => 1 
            ]);
            foreach($result as $item){
                $doExam += $item;
            }
            return $doExam;
        }
        return 0;
    }
    private function GetNumberUserLimit($email){
        if($email){
            $LimitExam = 0;
            $result = $this->database->select('ol_groups_user',[
                "[>]ol_groups" => ["id_group" => "id"]
            ],'ol_groups_user.limit',[
                'ol_groups_user.email' => $email,
                'ol_groups.status' => 1 
            ]);
            foreach($result as $item){
                $LimitExam += $item;
            }
            return $LimitExam;
        }
        return 0;
    }

    public function GetHistoryExamUser($request,$response){
        $token = $request->getParam('token');
        if(!empty($token)){
            $checkToken  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]);
            if(!empty($checkToken)){
                $sql = "SELECT * FROM exam 
                        INNER JOIN user_exam ON user_exam.IDEXAM = exam.IDEXAM 
                        INNER JOIN subjects ON subjects.SUBID = exam.SUBID 
                        WHERE user_exam.IDUSER = :id 
                        ORDER BY user_exam.DATEEXAM	DESC,user_exam.TIMESTART DESC";
                $result = $this->database->query($sql,[
                    ":id" => $checkToken[0]['id']
                ])->fetchAll(); 
                echo json_encode($result);
            }else{
                $message['error'] = 'Token không chính xác!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Không tìm thấy dữ liệu!';
            echo json_encode($message);
        }
    }

    public function Login_User($req,$res){
        $UserName = $req->getParam('Username');
        $PassWord = $req->getParam('Password');
        if( !empty($UserName) && !empty($PassWord) ){
            $result  = $this->database->select($this->tableName,['IDUSER','EMAIL','PASS','status'],[
                'USERNAME'  => $UserName,
                'PASS'      => $PassWord,
                'status'    => 1
            ]);
            
            if(!empty($result)){
                $now = time(); 
                $key = 'loginuser';
                $payload = array(
                    "iat"       => $now,
                    "IDUSER"    => $result[0]['IDUSER'],
                    'EMAIL'     => $result[0]['EMAIL'],
                    'PASS'      => $result[0]['PASS']
                );
                $token = JWT::encode($payload, $key);
                echo json_encode($token);
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
        $rsData = array(
            "status" => 'error',
            "message" => "Bạn hãy đăng nhập lại!",
        );
        $jwt  = $request->getParam('token');
        $key = 'loginuser';
        
        try {
            $token = (array)JWT::decode($jwt, $key, array('HS256'));
            $result = $this->database->select($this->tableName,'*',['IDUSER'=>$token['IDUSER'],'PASS' => $token['PASS']]);
            if(!empty($result)){
                if($result[0]['status'] == 1){
                    $rsData['status'] = 'success';
                    $rsData['message'] = 'Đã loading thành công!';
                }else{
                    $rsData['message'] = 'Đã chặn thành công!';
                }
            }
        } catch (\InvalidArgumentException $e) {
            // 500 internal server error
            // your fault
        } catch (\Exception $e) {
            // 401 unauthorized
            // clients fault
        }
        echo json_encode($rsData);
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
        $term      = $request->getParam('term');
        $PeopleEmail     = $request->getParam('PeopleEmail');

        if(!empty($UserName) && !empty($PassWord) && !empty($Email) && $term == true){
            $CheckUserName  = $this->database->select($this->tableName,'USERNAME',['USERNAME' => $UserName]);
            $CheckEmail     = $this->database->select($this->tableName,'EMAIL',['EMAIL' => $Email]);
            $CheckPeopleEmail     = $this->database->select($this->tableName,'*',['EMAIL' => $PeopleEmail]);
            $date = new \DateTime();
            $create_on = $date->format('Y-m-d');
            $time = $date->format('Y-m-d H:i:s');
            if(!empty($CheckUserName)){
                $message['error'] = 'Tài khoản này đã tồn tại!';
                echo json_encode($message);
            }else if(!empty($CheckEmail)){
                $message['error'] = 'Email này đã được sử dụng!';
                echo json_encode($message);
            }else{
                if(!empty($PeopleEmail)){
                    if(empty($CheckPeopleEmail)){
                        $message['error'] = 'Email người giới thiệu này không tồn tại !';
                        echo json_encode($message);
                        return;
                    }else{
                        $this->database->insert($this->tableName,[
                            'LASTNAME'  => $LastName,
                            'FIRSTNAME' => $FirstName,
                            'EMAIL'     => $Email,
                            'Id_people' => $CheckPeopleEmail[0]["IDUSER"],
                            'create_on' => $create_on,
                            'time'      => $time,
                            'role_account' => 1,
                            'USERNAME'  => $UserName,
                            'PASS'      => $PassWord,
                            'term'     => 1,
                            'status'    => 1
                        ]);
                    }
                }else{
                    $this->database->insert($this->tableName,[
                        'LASTNAME'  => $LastName,
                        'FIRSTNAME' => $FirstName,
                        'EMAIL'     => $Email,
                        'create_on' => $create_on,
                        'USERNAME'  => $UserName,
                        'time'      => $time,
                        'role_account' => 1,
                        'PASS'      => $PassWord,
                        'term'     => 1,
                        'status'    => 1
                    ]);
                }
                $message['success'] = 'Đã tạo tài khoản thành công!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
    public function GetUserId($request,$response){
        $token = $request->getParam('token');
        
        if(!empty($token)){
            
            $result  = $this->database->select($this->tableNameAccountGoogle,'*',['accessToken'=>$token]); 
            if($result){
                $users = array();
                $item = $result[0];
                $user =[
                    'id' => $item['id'],
                    'imageUrl' => $item['imageUrl'],
                    'university' => $item['university'],
                    'name' => $item['name'],
                    'type' => (int)$item['type'],
                    'email' => $item['email'],
                    'status' => (int)$item['status'],
                    'do_number' => $this->GetDoNumberUser($item['email']),
                    'do_limit' => $this->GetNumberUserLimit($item['email']),
                    'groups' => $this->GetGroupsEmail($item['email']),
                ];
                echo json_encode($user);
            }else{
                $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
                echo json_encode($message);
            }
        }else{
            $message['error'] = 'Chưa nhận được dữ liệu gửi về!';
            echo json_encode($message);
        }
    }
    public function SelectAccountGroupId($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Có lỗi sảy ra, không xóa được!'
        );
        $id   =  $request->getParam('id');
        if($id){
            $sql = "SELECT  ol_groups_exam.id_group,
                        ol_groups_exam.id, 
                        ol_groups_exam.id_exam, 
                        ol_groups_exam.create_on,
                        subjects.SUBTEXT as subject, 
                        exam.EXAMTEXT as name, 
                        exam.EXTIME as time, 
                        exam.EXNUM as number, 
                        exam.RANDOMEXAM as random, 
                        exam.status FROM `ol_groups_exam` 
                    INNER JOIN exam ON exam.IDEXAM = ol_groups_exam.id_exam 
                    INNER JOIN subjects ON exam.SUBID = subjects.SUBID
                    WHERE ol_groups_exam.id_group='$id'
                    ORDER BY ol_groups_exam.create_on DESC";
            $result = $this->database->query($sql)->fetchAll();
            if(!empty($result)){
                $rsData['status'] = 'success';
                $rsData['message'] = 'Đã lấy dữ liệu thành công!';
                $rsData['data'] = $result;
            }
        }
        echo json_encode($rsData);
    }
    private function GetGroupsEmail($email){
        if($email){
            $sql = "SELECT  ol_groups.id,
                            ol_groups.name,
                            ol_groups.status,
                            ol_groups.create_on as createDate,
                            ol_groups.limit_group,
                            ol_groups_user.email,
                            ol_groups_user.limit,
                            ol_groups_user.doing,
                            ol_groups_user.create_on 
                    FROM `ol_groups` 
                    JOIN ol_groups_user ON ol_groups.id = ol_groups_user.id_group 
                    WHERE ol_groups_user.email = '$email'
                    ORDER BY ol_groups.status DESC";
            return $this->database->query($sql)->fetchAll();
        }
        return [];
    }
}