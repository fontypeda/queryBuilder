<?php

error_reporting(0);
ini_set('display_errors', 0);

$input = file_get_contents("php://input");
$data = json_decode($input);

// Jetzt wird $data['query'] ein Objekt sein und nicht in ein Array konvertiert.
if ($data && isset($data->query)) {
    $query = $data->query;
    $index = $data->index;

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    $ch = curl_init();
    $url = "http://localhost:9210/" . $index . "/_search"; // Verwenden Sie den dynamischen Index in der URL
    

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($query)); // Stellen Sie sicher, dass Sie die Query als JSON-String senden
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json', 'Content-Type: application/json'));
    
    $result = curl_exec($ch);
    curl_close($ch);
    echo $result;

} else {
    echo "Fehler beim Parsen der Eingabedaten oder 'query' nicht gesetzt.";
}

?>
