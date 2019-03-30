<?php

namespace App\Middlewares;

class OldInputMiddleware extends Middleware{
    
    public function __invoke($request,$response,$next){

        if(isset($_SESSION['success'])){

            return $response->withRedirect(PATH . '/mng_user');

        }else{
            $response = $next($request,$response);
            return $response;
        }
    }
}