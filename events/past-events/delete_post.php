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

$date = $_GET["date"];

// Retrieve post data from the database
$sql = "SELECT * FROM posts WHERE date = '$date'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $postImage = $row["image"];
    
    // Delete the post from the database
    $deleteSql = "DELETE FROM posts WHERE date = '$date'";
    if ($conn->query($deleteSql) === TRUE) {
        // Delete the post image file(s) from the server
        $imageFiles = explode(",", $postImage);
        foreach ($imageFiles as $image) {
            if (file_exists($image)) {
                unlink($image);
            }
        }
        
        echo "Post deleted successfully!";
    } else {
        echo "Error deleting post: " . $conn->error;
    }
} else {
    echo "Post not found.";
}

$conn->close();
?>
