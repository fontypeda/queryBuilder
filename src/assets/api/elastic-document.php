<?php

$input = file_get_contents("php://input");
$data = json_encode($input, true);
$elasticBody = $data['body']['query'];
$elasticIndex = $data['body']['index'];

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
//strlen('search.php') = 11

$ch = curl_init();
$url = "http://localhost:9210/`$elasticIndex`/_search";

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_PORT, 9210);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $elasticBody);

if ($input != "") {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $input);
    //TODO check about heaser pass through
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
}


$result = curl_exec($ch);
$result = json_decode($result, true);
$result = $result["hits"]["hits"][0];
$result = json_encode($result, true);
curl_close($ch);
echo $result;

?>