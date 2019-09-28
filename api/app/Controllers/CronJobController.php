<?php

namespace App\Controllers;

class CronJobController extends Controller{
    // private $tableName = 'exam';

    public function index($request,$response){
        $sql = "UPDATE ol_groups SET status = 0 WHERE limit_group < DATEDIFF(CURDATE(),create_on)";
        $sth = $this->database->pdo->prepare($sql);
        $sth->execute();
        // $result = $this->database->update('ol_groups',['status' => 0],['limit_group[<]' => DATEDIFF(CURDATE(),create_on)]);
        echo "oke";
    }
}