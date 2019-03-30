<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'config/constant.php';
use Ramsey\Uuid\Uuid;
use Medoo\Medoo;

$app = new \Slim\App();

$container = $app->getContainer();
$container['view'] = new \Slim\Views\PhpRenderer('Views/manage');

$container['database'] = function () {
	return new Medoo([
		'database_type' => 'mysql',
		'database_name' => 'que_ans',
		'server' => 'localhost',
		'username' => 'root',
        'password' => '',

        'charset' => 'utf8',
        'port' => 3306,

        'option' => [
            PDO::ATTR_CASE => PDO::CASE_NATURAL
        ]

	]); 
};

require 'app/routes.php';

$app->run();