<?php
namespace App\Controllers;
use Ramsey\Uuid\Uuid;

class GroupController extends Controller{
    private $tableName = 'ol_groups';
    private $tableNameSame = 'ol_groups_exam';
    private $tableNameGroupUser = 'ol_groups_user';

    public function SelectGroup($request,$response){
        echo json_encode($this->database->query("SELECT * FROM `ol_groups` ORDER BY `create_on` DESC")->fetchAll());
    }
    public function SelectGroupId($request,$response){
        $id   =  $request->getParam('id') ;
        $sql = "SELECT  ol_groups_exam.id_group,
                        ol_groups_exam.id,
                        ol_groups_exam.id_exam,
                        ol_groups_exam.create_on,
                        exam.EXAMTEXT as name 
                FROM `ol_groups_exam` JOIN exam ON exam.IDEXAM = ol_groups_exam.id_exam 
                WHERE ol_groups_exam.id_group='$id'";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }

    public function SelectUserGroupId($request,$response){
        $id   =  $request->getParam('id') ;
        $sql = "SELECT  ol_groups_user.email, 
                        ol_groups_user.id,
                        ol_groups_user.limit,
                        users.USERNAME as username,
                        ol_groups_user.create_on 
                FROM `ol_groups_user` JOIN users ON ol_groups_user.email = users.EMAIL 
                WHERE ol_groups_user.id_group ='$id'";
        $result = $this->database->query($sql)->fetchAll();
        echo json_encode($result);
    }

    public function DeleteUserGroupId($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Có lỗi sảy ra, không xóa được!'
        );
        $id   =  $request->getParam('id') ;
        if(!empty($id)){
            $this->database->delete($this->tableNameGroupUser,['id' => $id]);
            $rsData['status'] = 'success';
            $rsData['message'] = 'Đã xóa tài khoản này thành công.';
        }
        echo json_encode($rsData);
    }
    public function DeleteExamGroupId($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Có lỗi sảy ra, không xóa được!'
        );
        $id   =  $request->getParam('id') ;
        if(!empty($id)){
            $this->database->delete($this->tableNameSame,['id' => $id]);
            $rsData['status'] = 'success';
            $rsData['message'] = 'Đã xóa đề này thành công.';
        }
        echo json_encode($rsData);
    }

    public function onAddExamGroup($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu trống!'
        );
        $params = $request->getParams();
        $id_group   =  $request->getParam('id_group') ;
        $id_exam    = $request->getParam('id_exam') ;

        if(!empty($id_group) && !empty($id_exam)) {
            $date = new \DateTime();
            $create_on = $date->format('Y-m-d');

            $id = $date->format('Y-md-His');
            $checkExam = $this->database->select('exam','*',['IDEXAM' => $id_exam, 'status' => 2]);
            if(!empty($checkExam)){
                $checkGroup = $this->database->select($this->tableNameSame,'*',[
                        'id_exam' => $id_exam,
                        'id_group' =>$id_group
                    ]
                );
                if(empty($checkGroup)){
                    $itemData = [
                        'id'	    => $id,
                        'id_exam'   => $id_exam,
                        'id_group'  => $id_group,
                        'status'    => 1,
                        'create_on' => $create_on
                    ];
                    $result = $this->database->insert($this->tableNameSame, $itemData);
                    if($result->rowCount()) {
                        $rsData['status'] = 'success';
                        $rsData['message'] = 'Đã thêm đề thi thành công!';
                    } else {
                        $rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
                    }
                }else{
                    $rsData['message'] = 'Mã đề đã tồn tại trong nhóm này!';
                }
            }else {
                $rsData['message'] = 'Mã đề không tồn tại hoặc đề thi này đã công khai!';
            }
        }
        echo json_encode($rsData);
    }

    public function onAddUserGroup($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Bạn vui lòng nhập đầy đủ thông tin!'
        );
        $params = $request->getParams();
        $id_group   =  $request->getParam('id_group') ;
        $email    = $request->getParam('email') ;
        $limit    = $request->getParam('limit') ;

        if(!empty($id_group) && !empty($email) && !empty($limit)) {
            $date = new \DateTime();
            $create_on = $date->format('Y-m-d');

            $id = $date->format('Y-md-His');
            $checkExam = $this->database->select('users','*',['EMAIL' => $email]);
            if(!empty($checkExam)){
                $checkGroup = $this->database->select($this->tableNameGroupUser,'*',[
                        'email'     => $email,
                        'id_group'  =>$id_group
                    ]
                );
                if(empty($checkGroup)){
                    $itemData = [
                        'id'	    => $id,
                        'email'     => $email,
                        'id_user'   => $checkExam[0]['IDUSER'],
                        'limit'     => $limit,
                        'id_group'  => $id_group,
                        'status'    => 1,
                        'create_on' => $create_on
                    ];
                    $result = $this->database->insert($this->tableNameGroupUser, $itemData);
                    if($result->rowCount()) {
                        $rsData['status'] = 'success';
                        $rsData['message'] = 'Đã thêm thành viên thành công!';
                    } else {
                        $rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
                    }
                }else{
                    $rsData['message'] = 'Email đã tồn tại trong nhóm này!';
                }
            }else {
                $rsData['message'] = 'Email này không tồn tại!';
            }
        }
        echo json_encode($rsData);
    }

    public function CreateGroup($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        $params = $request->getParams();
        $id             = isset(	$params['id']) ? $params['id'] : '';
        $name           = isset(	$params['name']) ? $params['name'] : '';
        $note           = isset(	$params['note']) ? $params['note'] : '';
        $id_roles       = isset(	$params['id_roles']) ? $params['id_roles'] : '';

        if(empty($name) && empty($note) && empty($id_roles)) {
			$rsData['message'] = 'Yêu cầu nhập thông tin đầy đủ!';
			echo json_encode($rsData);
			return;
		}
        if(empty($id)){
            $date = new \DateTime();
            $create_on = $date->format('Y-m-d');

            $id = $date->format('Y-md-His');
            $itemData = [
				'id'	=> $id,
                'name' => $name,
                'note' => $note,
				'id_roles' => $id_roles,
				'status' => 1,
				'create_on' => $create_on
            ];
            $result = $this->database->insert($this->tableName, $itemData);
            if($result->rowCount()) {
				$rsData['status'] = 'success';
				$rsData['message'] = 'Đã gửi thành công!';
			} else {
				$rsData['message'] = 'Dữ liệu chưa được cập nhật vào cơ sở dữ liệu!';
			}
        }
        echo json_encode($rsData);
    }

    public function onDeleteGroupId($request,$response){
        $rsData = array(
            'status' => 'error',
            'message' => 'Xin lỗi! Dữ liệu chưa được cập nhật thành công!'
        );
        $id = $request->getParam('id');
        if(!empty($id)){
            $this->database->delete($this->tableNameSame,['id_group' => $id]);
            $this->database->delete($this->tableNameGroupUser,['id_group' => $id]);
            $this->database->delete($this->tableName,['id' => $id]);
            $rsData['status'] = 'success';
			$rsData['message'] = 'Đã xóa nhóm này thành công!';
        }
        echo json_encode($rsData);
    }
}