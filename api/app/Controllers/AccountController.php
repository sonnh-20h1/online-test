<?php
namespace App\Controllers;
use \Firebase\JWT\JWT;

//From PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class AccountController extends Controller{

    private $tableName = 'ol_account_google';

    public function index($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Tài khoản chưa chính xác,bạn hãy đăng nhập lại!",
        );

        $params = $request->getParams();
        $accessToken = isset($params['accessToken']) ? $params['accessToken'] : '';
        $email = isset($params['email']) ? $params['email'] : ''; 
        $googleId = isset($params['googleId']) ? $params['googleId'] : ''; 
        $imageUrl = isset($params['imageUrl']) ? $params['imageUrl'] : ''; 
        $name = isset($params['name']) ? $params['name'] : ''; 

        if(!empty($accessToken) && !empty($email) && !empty($googleId)){
            $checkAccount = $this->database->select($this->tableName,'*',[
                'email' => $email,
                'googleId' => $googleId
            ]);
            if(!empty($checkAccount)){
                $this->database->update($this->tableName,[
                    'imageUrl' => $imageUrl,
                    'name' => $name,                    
                    'accessToken'   => $accessToken,
                ],[
                    'email' => $email,
                    'googleId' => $googleId
                ]);
                $rsData['status'] =  'success';
                $rsData['message'] = 'Đăng nhập thành công.';
                $rsData['data'] = [
                    'term' => $checkAccount[0]['term'],
                    'token' => $accessToken
                ];
            }else{
                $date = new \DateTime();
                $create_on = $date->format('Y-m-d H:i:s');

                $id = $date->format('Y-md-His');
                $result = $this->database->insert($this->tableName,[
                    'id'            => $id,
                    'googleId'      => $googleId,
                    'email'         => $email,
                    'accessToken'   => $accessToken,
                    'name'          => $name,
                    'term'          => 0,
                    'type'          => 1,
                    'imageUrl'      => $imageUrl,
                    'status'        => 1,
                    'create_on'     => $create_on
                ]);
                if($result->rowCount()) {
                    $rsData['message'] ='Đăng nhập thành công';
                    $rsData['status'] = 'success';
                    $rsData['data'] = [
                        'term' => 0,
                        'token' => $accessToken
                    ];
                } else {
                    $rsData['status'] = 'error';
                    $rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
                }
            }
        }else{
            $rsData['status'] = 'error';
            $rsData['message'] = 'Thông tin tài khoản chưa đầy đủ!';
        }

        echo json_encode($rsData);
    }

    public function updateAccount($request){
        $rsData = array(
            "status" => 'error',
            "message" => "có lỗi sảy ra vui lòng nhập lại!",
        );

        $params = $request->getParams();
        $token = isset($params['token']) ? $params['token'] : '';
        $id = isset($params['id']) ? $params['id'] : '';
        if(!empty($id)){
            $type = isset($params['type']) ? $params['type'] : '';
            $this->database->update($this->tableName,[
                'type' => $type
            ],[ 'id' => $id]);
            $rsData['status'] =  'success';
            $rsData['message'] = 'Đã cập nhật thành công.';
        }
        if(!empty($token)){
            $term = isset($params['term']) ? $params['term'] : '';
            $email = isset($params['email']) ? $params['email'] : '';
            $university = isset($params['university']) ? $params['university'] : '';
    
            if($term == true && !empty($university)){
                $this->database->update($this->tableName,[
                    'term' => 1,
                    'university' => $university,
                    'introduced' => $email
                ],[ 'accessToken' => $token]);
                $rsData['status'] =  'success';
                $rsData['message'] = 'Đã cập nhật thành công.';
            } 
        }
        echo json_encode($rsData);
    }

    public function loadingLogin($request,$response){
        $rsData = array(
            "status" => 'error',
            "message" => "Bạn hãy đăng nhập lại!",
        );
        $token  = $request->getParam('token');
        $result = $this->database->select($this->tableName,'*',['accessToken' => $token]);
        if(!empty($result)){
            if($result[0]['status'] == 1){
                $rsData['status'] = 'success';
                $rsData['data'] = [
                    'university' => $result[0]['university'],
                    'term' => $result[0]['term']
                ];
                $rsData['message'] = 'Đã loading thành công!';
            }
        }
        echo json_encode($rsData);
    }

    public function sendEmail($request,$response){
        $mail = new PHPMailer;

        // $mail->SMTPDebug=3;
        $mail->isSMTP();

        $mail->Host="smtp.gmail.com";
        $mail->Port=587;
        $mail->SMTPSecure="tls";
        $mail->SMTPAuth=true;
        $mail->Username="sonnh0998@gmail.com";
        $mail->Password="son09111998";

        $email = "nguyenson09111998@gmail.com";

        $mail->addAddress($email,"Son Nguyen");
        $mail->Subject="Online test";
        $mail->isHTML(true);
        $mail->Body=" Welcome to StackOverFlow.<b><b> Please verify your email adress to continue..";
        $mail->From="sonnh0998@gmail.com";
        $mail->FromName="Nguyen Hoai Son";

        if($mail->send()) {
            echo json_encode( "Email Has Been Sent Your Email Address");
        } else {
            echo json_encode( "Failed To Sent An Email To Your Email Address");
        } 
    }

}