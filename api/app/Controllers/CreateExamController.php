<?php

namespace App\Controllers;

class CreateExamController extends Controller
{
    private $tableNameAccountGoogle = 'ol_account_google';
    private $tableSubject = 'subjects';

    public function CreateExamPerson($request, $response)
    {
        $token = $request->getParam('token');
        $idExam = $request->getParam('idExam');
        $TimeExam = $request->getParam('TimeExam');
        $NameExam = $request->getParam('NameExam');
        $createDate = $request->getParam('createDate');

        //subject
        $SubjectExam = $request->getParam('SubjectExam');
        $newSubjectName = $request->getParam('newSubjectName');

        $RandomNumber = $request->getParam('RandomQues');
        $status = $request->getParam('status');
        $data = $request->getParam('data');
        $rlUser = $this->database->select($this->tableNameAccountGoogle, '*', ['accessToken' => $token]);
        $numberExam = count($data);

        $subjectId = null;
        if (empty($SubjectExam)) {
            $subjectId = time().'_'.'new';
            $this->database->insert($this->tableSubject, [
                'SUBID' => $subjectId,
                'SUBTEXT' => $newSubjectName,
                'permission' => 2,
                'user_id' => $rlUser[0]['id'],
            ]);
        } else {
            $subjectId = $SubjectExam;
        }

        if (empty($idExam) || empty($rlUser) || empty($TimeExam) || empty($NameExam) || empty($subjectId) || empty($status)) {
            $message['error'] = 'Chưa nhận được dữ liệu!';
            echo json_encode($message);
        } else {
            $result = $this->database->select('exam', '*', ['IDEXAM' => $idExam]);
            if (empty($result)) {
                $this->database->insert('exam', [
                    'IDEXAM' => $idExam,
                    'EXAMTEXT' => $NameExam,
                    'SUBID' => $subjectId,
                    'EXTIME' => $TimeExam,
                    'EXNUM' => $numberExam,
                    'RANDOMEXAM' => $RandomNumber,
                    'create_date' => $createDate,
                    'user_id' => $rlUser[0]['id'],
                    'status' => $status,
                ]);
                $this->InsertQuestionExam($data, $idExam, $SubjectExam);
                $message['success'] = 'created';
                echo json_encode($message);
            } elseif (!empty($result)) {
                $this->database->update('exam', [
                    'EXAMTEXT' => $NameExam,
                    'SUBID' => $subjectId,
                    'EXTIME' => $TimeExam,
                    'EXNUM' => $numberExam,
                    'RANDOMEXAM' => $RandomNumber,
                ], ['IDEXAM' => $idExam]);

                $message['success'] = 'updated';
                $this->DeleteQuetionExam($idExam);
                $this->InsertQuestionExam($data, $idExam, $SubjectExam);
                echo json_encode($message);
            } else {
                $message['error'] = 'Có lỗi sảy ra!';
                echo json_encode($message);
            }
        }
    }

    public function CreateExamAdmin($request, $response)
    {
        $idExam = $request->getParam('idExam');
        $TimeExam = $request->getParam('TimeExam');
        $NameExam = $request->getParam('NameExam');
        $createDate = $request->getParam('createDate');

        $SubjectExam = $request->getParam('SubjectExam');
        $RandomNumber = $request->getParam('RandomQues');
        $status = $request->getParam('status');
        $data = $request->getParam('data');
        $numberExam = count($data);

        if (empty($idExam) || empty($TimeExam) || empty($NameExam) || empty($SubjectExam) || empty($status)) {
            $message['error'] = 'Chưa nhận được dữ liệu!';
            echo json_encode($message);
        } else {
            $result = $this->database->select('exam', '*', ['IDEXAM' => $idExam]);
            if (empty($result)) {
                $this->database->insert('exam', [
                    'IDEXAM' => $idExam,
                    'EXAMTEXT' => $NameExam,
                    'SUBID' => $SubjectExam,
                    'EXTIME' => $TimeExam,
                    'EXNUM' => $numberExam,
                    'create_date' => $createDate,
                    'RANDOMEXAM' => $RandomNumber,
                    'status' => $status,
                ]);
                $this->InsertQuestionExam($data, $idExam, $SubjectExam);
                $message['success'] = 'created';
                echo json_encode($message);
            } elseif (!empty($result)) {
                $this->database->update('exam', [
                    'EXAMTEXT' => $NameExam,
                    'SUBID' => $SubjectExam,
                    'EXTIME' => $TimeExam,
                    'EXNUM' => $numberExam,
                    'RANDOMEXAM' => $RandomNumber,
                    'status' => $status,
                ], ['IDEXAM' => $idExam]);

                $message['success'] = 'updated';
                $this->DeleteQuetionExam($idExam);
                $this->InsertQuestionExam($data, $idExam, $SubjectExam);
                echo json_encode($message);
            } else {
                $message['error'] = 'Có lỗi sảy ra!';
                echo json_encode($message);
            }
        }
    }

    public function DeleteExamId($request, $response)
    {
        $id = $request->getParam('id');
        $this->DeleteQuetionExam($id);
        $this->database->delete('exam', ['IDEXAM' => $id]);
    }

    private function DeleteQuetionExam($idExam)
    {
        $result = $this->database->select('detail_exam', '*', ['IDEXAM' => $idExam]);
        if (!empty($result)) {
            $this->database->delete('detail_exam', ['IDEXAM' => $idExam]);
            foreach ($result as $value) {
                $this->database->delete('answer', ['ID_QUE' => $value['ID_QUE']]);
                $this->database->delete('detail_user_exam', ['ID_QUE' => $value['ID_QUE']]);
                $this->database->delete('random_exam', ['ID_QUE' => $value['ID_QUE']]);
                $this->database->delete('question', ['ID_QUE' => $value['ID_QUE']]);
            }
        }
    }

    private function InsertQuestionExam($data, $idExam, $idSubject)
    {
        $result = $this->database->select(
            'question',
            'ID_QUE',
            [
                'ORDER' => ['ID_QUE' => 'DESC'],
                'LIMIT' => 1,
            ]
        );
        $id_que = $result[0] + 1;
        for ($i = 0; $i < count($data); ++$i) {
            if (!empty($data[$i]['QUE_TEXT'])) {
                $id_que += 2;
                $this->database->insert('question', [
                    'ID_QUE' => $id_que,
                    'QUE_TEXT' => $data[$i]['QUE_TEXT'],
                    'SUBID' => $idSubject,
                    'type' => $data[$i]['type'],
                    ]
                );
                $this->InsertAnswerExam($data[$i]['Answer'], $id_que);
                $this->database->insert('detail_exam', [
                    'IDEXAM' => $idExam,
                    'ID_QUE' => $id_que,
                ]);
            }
        }
    }

    private function InsertAnswerExam($dataAnswer, $id_que)
    {
        for ($i = 0; $i < count($dataAnswer); ++$i) {
            if (!empty($dataAnswer[$i]['ANS_TEXT'])) {
                $correct = 'false';
                if ($dataAnswer[$i]['CORRECT'] == 'true') {
                    $correct = 'true';
                }
                $this->database->insert('answer', [
                    'ID_QUE' => $id_que,
                    'ANS_TEXT' => $dataAnswer[$i]['ANS_TEXT'],
                    'CORRECT' => $correct,
                    ]
                );
            }
        }
    }
}
