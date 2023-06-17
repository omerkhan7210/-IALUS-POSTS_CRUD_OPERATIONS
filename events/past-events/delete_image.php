<?php
// Database connection
$dbHost = "localhost";
$dbUser = "thealamg_ialus";
$dbPass = "ialus12345@";
$dbName = "thealamg_ialus";

$conn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the image path from the request
    $imagePath = $_POST["imagePath"];

    // Delete the image file from the server
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }

    // Remove the image path from the database
    $sql = "UPDATE posts SET image = REPLACE(image, '$imagePath', '') WHERE image LIKE '%$imagePath%'";
    $result = $conn->query($sql);

    if ($result) {
        echo "Image deleted successfully.";
    } else {
        echo "Failed to delete the image.";
    }
}

$conn->close();
?>
