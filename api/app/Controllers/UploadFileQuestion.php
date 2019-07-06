<?php

namespace App\Controllers;
use \Firebase\JWT\JWT;

class UploadFileQuestion extends Controller{

    const MAX_UPLOAD_FILESIZE = 104857600;//100M
    const MAX_UPLOAD_TOTAL_FILESIZE = 1048576000;//1000M

    private $tableNameUser = 'users';
    private $tableName = 'ol_upload_file';

    private function upload($file,$id,$idUser,$email,$create_on){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Chưa upload được file lên server!'
          );
        $fileName = basename($file["name"]);
        $path_name = date('Y') . '/' . date('m') . '/' . date('d').'/';
        $target_dir = $this->upload_file . '/public/upload/'.$path_name;
        if(!file_exists($target_dir)) {
            mkdir($target_dir, 0775, true);
        }
        $target_file = $target_dir .time().'_'.$fileName;
        $filename = time().'_'.$fileName;
        $pathName = $path_name.$filename;
        $uploadOk = 1;
        $fileExt = pathinfo($target_file,PATHINFO_EXTENSION);
        $fileExt = strtolower($fileExt);
        $allowExts = !empty($exts) ? $exts : ["xlsx","docx"];
        if(!in_array($fileExt, $allowExts)) {
            $rsData['message'] = "Xin lỗi, chỉ cho phép upload file có đuôi " . implode(',', $allowExts);
            $uploadOk = 0;
            return $rsData;
        }
        if (file_exists($target_file)) {
            //$rsData['message'] = "Sorry, file already exists.";
            $newfilename = time() . '_' . $filename;
            $target_file = $target_dir . $newfilename;
            //If file already exists then rename the file and allow upload normally
            $uploadOk = 1;
        }
        if ($file["size"] > self::MAX_UPLOAD_FILESIZE ) {
            $rsData['message'] = "Xin lỗi, file bạn tải lên quá lớn.";
            $uploadOk = 0;
        }
        if ($file["size"] < 5) {
            $rsData['message'] = "Xin lỗi, file của bạn không tồn tại!";
            $uploadOk = 0;
        }

        if($uploadOk == 1){
            if (move_uploaded_file($file["tmp_name"], $target_file)) {
                $result = $this->database->insert($this->tableName,[
                    'id'        => $id,
                    'create_by' => $idUser,
                    'email'     => $email,
                    'fileName'  => $filename,
                    'path'      => $pathName,
                    'create_on' => $create_on
                ]);
                if($result->rowCount()) {
                    $rsData['message'] ='ok';
                    $rsData['status'] = 'success';
                } else {
                    $rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
                }
            }
        }
        return $rsData;
    }
    public function uploadFile($request, $response) {
        $jwt = $request->getParam('token');
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Chưa upload được file lên server!'
          );
        $key = 'loginuser';
        $token = (array)JWT::decode($jwt, $key, array('HS256'));
        $idUser = $token['IDUSER'];
        $email = $token['EMAIL'];

        $date = new \DateTime();
        $create_on = $date->format('Y-m-d');

        $id = $date->format('Y-md-His');
        $result  = $this->database->select($this->tableNameUser,'*',['IDUSER'=>$idUser]);
        if($result){
           $rsData = $this->upload($_FILES['filename'],$id,$idUser,$email,$create_on);
        }
        echo json_encode($rsData);
    }

    public function showDataUploadFile($request,$response){
        $sql = "SELECT * FROM ol_upload_file  ORDER BY create_on DESC";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }
}