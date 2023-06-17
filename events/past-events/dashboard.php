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

// Retrieve post data from the database
$sql = "SELECT * FROM posts";
$result = $conn->query($sql);

$posts = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        h1, h2 {
            color: #333;
            text-align:center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ccc;
        }

        thead {
            background-color: #333;
            color: #fff;
        }

        tbody tr:hover {
            background-color: #f9f9f9;
        }

        label {
            display: inline-block;
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

        /* Custom Styling */
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .post-actions a {
            margin-right: 10px;
            color: #333;
            text-decoration: none;
        }

        .post-actions a:hover {
            text-decoration: underline;
        }

        .add-post-form {
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Dashboard</h1>
        
        <!-- Add Post Form -->
        <div class="add-post-form">
            <h2>Add Post</h2>
            <form action="add_post.php" method="POST" enctype="multipart/form-data">
                <label for="date">Date:</label>
                <input type="date" id="date" name="date" required><br><br>
                
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required><br><br>

                <label for="content">Content:</label>
                <textarea id="content" rows='15' name="content" required></textarea><br><br>

                <label for="image">Image(s):</label>
                <input type="file" id="image" name="image[]" multiple required><br><br>

                <input type="submit" value="Submit">
            </form>
        </div>
        
        <!-- Display Existing Posts -->
        <h2>Existing Posts</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                foreach ($posts as $post) {
                    echo "<tr>";
                    echo "<td>".$post['date']."</td>";
                    echo "<td>".$post['title']."</td>";
                    echo "<td class='post-actions'>
                            <a href='edit_post.php?date=".$post['date']."'>Edit</a> |
                            <a href='delete_post.php?date=".$post['date']."'>Delete</a>
                          </td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>

