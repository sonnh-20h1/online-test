<?php

namespace App\Middlewares;

class Middleware{

    private $container;

    function __construct($container){

        $this->container = $container;

    }
}