<?php
declare(strict_types=1);

function calculaMedia(float $nota1, float $nota2): float{
    return ($nota1 + $nota2)/2;
}

function calculaGrau(float $media, string &$grau): void{
    if($media > 8)
        $grau = 'A';
    elseif($media >= 6)
        $grau = 'B';
    elseif($media >= 4)
        $grau = 'C';
    elseif($media >= 2)
        $grau = 'D';
    else
        $grau = 'E';
}

function resolverErros(int $status, string $msg): void{
    http_response_code($status);
    die($msg);
}