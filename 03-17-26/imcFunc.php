<?php
function obterImc(float $altura, float $peso):float {
return $peso/($altura * $altura);
}

function obterClassificacao(float $imc):string {
    if($imc < 18.5) return "Abaixo do peso normal";
    elseif($imc < 24.9) return "Peso normal";
    elseif($imc < 29.9) return "Excesso de peso";
    elseif($imc < 34.9) return "Obesidade Classe I";
    elseif($imc < 39.9) return "Obesidade Classe II";
    else return "Obesidade Classe III";
}

function responder( int $codStatus, array|null $info):void{
    http_response_code( $codStatus );
    die( json_encode( $info, JSON_UNESCAPED_UNICODE, JSON_UNESCAPED_SLASHES ));
}