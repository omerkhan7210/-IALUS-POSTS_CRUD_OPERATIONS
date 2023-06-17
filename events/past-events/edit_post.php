<!DOCTYPE html>
<html>
<head>
    <title>Edit Post</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        form {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="text"],
        input[type="date"],
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            resize: vertical;
        }

        .thumbnail {
            display: inline-block;
            margin-right: 10px;
            position: relative;
        }

        .thumbnail img {
            width: 100px;
            height: auto;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .thumbnail .delete-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background-color: #ff0000;
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 10px;
            line-height: 1;
            cursor: pointer;
        }

        input[type="file"] {
            display: block;
            margin-top: 5px;
        }

        input[type="submit"] {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type="submit"]:hover {
            background-color: #555;
        }
    </style>
</head>
<body>
    <h1>Edit Post</h1>

    <form action="update_post.php" method="POST" enctype="multipart/form-data">
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
    $postDate = $row["date"];
    $postTitle = $row["title"];
    $postContent = $row["content"];
    $postImage = $row["image"];

    // Display the edit post form with pre-filled data
    echo "<form action='update_post.php' method='POST' enctype='multipart/form-data'>";
    echo "<label for='date'>Date:</label>";
    echo "<input type='date' id='date' name='date' value='$postDate' required><br><br>";
    echo "<label for='title'>Title:</label>";
    echo "<input type='text' id='title' name='title' value='$postTitle' required><br><br>";
    echo "<label for='content'>Content:</label>";
    echo "<textarea id='content' name='content' rows='6' required>$postContent</textarea><br><br>";
    echo "<label for='image'>Image(s):</label>";
    echo "<input type='file' id='image' name='image[]' multiple><br><br>";

    // Display thumbnails of uploaded images
if (!empty($postImage)) {
    $imagePaths = explode(",", $postImage);
    foreach ($imagePaths as $path) {
        if (!empty($path)) {
            echo "<div class='thumbnail'>";
            echo "<img src='$path' alt='Thumbnail'>";
            echo "<button class='delete-btn' onclick='deleteImage(this)' data-path='$path'>X</button>";
            echo "</div>";
        }
    }
}


    echo "<input type='hidden' name='old_image' value='$postImage'>";
    echo "<br><br><center><input type='submit' value='Update'></center>";
} else {
    echo "Post not found.";
}

$conn->close();
?>

<script>
    function deleteImage(button) {
        var imagePath = button.getAttribute('data-path');
        if (confirm('Are you sure you want to delete this image?')) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'delete_image.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Handle success response
                    // Remove the thumbnail from the DOM
                    button.parentNode.remove();
                }
            };
            xhr.send('imagePath=' + encodeURIComponent(imagePath));
        }
    }
</script>

    </form>
</body>
</html>
