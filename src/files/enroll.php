<?php

function readEnv() {
    $env = [];
    foreach(file('../.env') as $line) {
        $kv = explode('=', $line);
        $env[$kv[0]] = $kv[1];
    }
    return $env;
}

function tgSendMessage($chatId, $token, $text) {
    $apiCallUrl = "https://api.telegram.org/bot$token/sendMessage";
    $data = ["chat_id" => $chatId, "text" => $text];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiCallUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

if ($_POST['name'] && $_POST['phone']) {
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $phone = preg_replace('|[^0-9]*|', '', $phone);
    $phone = preg_replace('|^[78]|', '+7', $phone);

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $name = substr($name, 0, 60);

    $details = filter_input(INPUT_POST, 'details', FILTER_SANITIZE_STRING);
    $details = substr($details, 0, 200);

    $ip = $_SERVER['REMOTE_ADDR'];

    $text = "На сайт поступила заявка.\nТелефон: $phone\nИмя: $name\nIP: $ip";
    if ($details) {
        $text .= "\n\n" . $details;
    }

    $env = readEnv();
    $result = tgSendMessage($env['CHAT_ID'], $env['BOT_TOKEN'], $text);
    $json = json_decode($result, true);
    header("Content-Type: application/json");
    echo json_encode(["status" => $json && $json ['ok'] ? "OK" : "FAIL"]);
    exit();
}

header("Location: /");
exit();
