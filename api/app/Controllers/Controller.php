<?php

namespace App\Controllers;

class Controller{

    private $container;

    function __construct($container){

        $this->container = $container;

    }

    public function __get($pro){

        if($this->container->$pro){

            return $this->container->$pro;

        }  
    }

}