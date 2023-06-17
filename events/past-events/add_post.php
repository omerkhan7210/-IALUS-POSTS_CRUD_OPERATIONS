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

$date = $_POST["date"];
$title = $_POST["title"];
$content = $_POST["content"];

// Check if the admin has uploaded multiple images
if (isset($_FILES['image']['name']) && is_array($_FILES['image']['name'])) {
    $imageFiles = array();
    $imageCount = count($_FILES['image']['name']);
    
    for ($i = 0; $i < $imageCount; $i++) {
        $imageName = $_FILES['image']['name'][$i];
        $imageTmpName = $_FILES['image']['tmp_name'][$i];
        
        // Move the uploaded file to a desired location
        $imagePath = "uploads/" . $imageName;
        move_uploaded_file($imageTmpName, $imagePath);
        
        $imageFiles[] = $imagePath;
    }
    
    // Store multiple image filenames as a comma-separated string
    $imageString = implode(",", $imageFiles);
} else {
    // If only a single image is uploaded
    $imageName = $_FILES['image']['name'];
    $imageTmpName = $_FILES['image']['tmp_name'];
    
    // Move the uploaded file to a desired location
    $imagePath = "uploads/" . $imageName;
    move_uploaded_file($imageTmpName, $imagePath);
    
    $imageString = $imagePath;
}

// Insert the post data into the database
$sql = "INSERT INTO posts (date, title, content, image) VALUES ('$date', '$title', '$content', '$imageString')";

if ($conn->query($sql) === TRUE) {
    echo "Post added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
