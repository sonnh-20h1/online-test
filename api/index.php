<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'config/constant.php';
use Ramsey\Uuid\Uuid;
use Medoo\Medoo;

$app = new \Slim\App();

$container = $app->getContainer();

$container['database'] = function () {
	return new Medoo([
		'database_type' => 'mysql',
		'database_name' => 'son_tnol',
		'server' => 'localhost',
		'username' => 'root',
        'password' => '',

        'charset' => 'utf8',
        //port mysql on server is 3306
        'port' => 3308,

        'option' => [
            PDO::ATTR_CASE => PDO::CASE_NATURAL
        ]

	]); 
};

$container['upload_file'] = __DIR__;

require 'app/routes.php';

$app->run();