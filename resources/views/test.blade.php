<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test Page</title>
</head>
<body>
    <h1>Test Page - If you can see this, basic rendering works</h1>
    <script>
        console.log('JavaScript is working!');
        if (document.getElementById('app')) {
            document.getElementById('app').innerHTML = 'React app loaded successfully!';
        }
    </script>
</body>
</html>
