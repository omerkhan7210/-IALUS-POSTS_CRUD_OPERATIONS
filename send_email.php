<?php
use PHPMailer\src\PHPMailer;
use PHPMailer\src\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Retrieve form data
$name = $_POST['uname'];
$email = $_POST['email1'];
$phone = $_POST['phone1'];
$country = $_POST['country1'];
$city = $_POST['city1'];

// Compose email body
$message = "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone Number: " . $phone . "\n";
$message .= "Country: " . $country . "\n";
$message .= "City: " . $city . "\n";

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host = 'mail.noorularfeen.com'; // Replace with your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'ialus@noorularfeen.com'; // Replace with your email address
    $mail->Password = 'ialus12345@'; // Replace with your email password
    $mail->SMTPSecure = 'SMTP';
    $mail->Port = 465;

    // Set the sender and recipient
    $mail->setFrom('ialus@noorularfeen.com', 'IALUS'); // Replace with your email address and name
    $mail->addAddress('recipient-email@example.com', 'Omer'); // Replace with recipient's email address and name

     // Add a BCC recipient (copy of the email)
     $mail->addBCC($email, $name);

    // Set email subject and body
    $mail->Subject = 'Form for IALUS';
    $mail->Body = $message;

    // Send the email
    $mail->send();

    // Redirect back to the form with a success message
    header('Location: index.html?status=success');
    exit();
} catch (Exception $e) {
    // Redirect back to the form with an error message
    header('Location: index.html?status=error');
    exit();
}
?>
