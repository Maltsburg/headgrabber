<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Minecraft Player Head Extractor</h1>
    
    <label for="username">Minecraft Username:</label>
    <input type="text" id="username" placeholder="Username">
    
    <select id="edition">
        <option value="java">Java</option>
        <option value="bedrock">Bedrock</option>
    </select>
    
    <button onclick="getHead()">Get Player Head</button>
    <div id="result"></div>
    <script src="script.js"></script>

</body>
</html>
