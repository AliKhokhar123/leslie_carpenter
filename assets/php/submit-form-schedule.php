<?php

require '../vendor/PHP-Mailer/src/PHPMailer.php';
require '../vendor/PHP-Mailer/src/SMTP.php';
require '../vendor/PHP-Mailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name    = $_POST['name'] ?? '';
    $email   = $_POST['email'] ?? '';
    $phone   = $_POST['phone'] ?? '';
    $message = $_POST['message'] ?? '';
    $pageUrl = $_SERVER['HTTP_REFERER'] ?? 'Not provided';

    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'groundsmenwebsiteform@gmail.com';
        $mail->Password   = 'iojb txzq rxmi owhj';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('groundsmenwebsiteform@gmail.com', 'Leslie Carpenter Appointment');
        $mail->addAddress('muhammadumair25591@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'NEW Website Lead - Schedule Form Submission';
        $mail->Body    = "
            <h2>Schedule Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Message:</strong> {$message}</p>
            <p><strong>Submitted From:</strong> <a href='{$pageUrl}' target='_blank'>{$pageUrl}</a></p>
        ";

        $mail->send();

        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo
        ]);
    }
}
