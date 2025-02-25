const express = require('express');
// ...existing code...

// Add this line to serve files from Upload_Data directory
app.use('/uploads', express.static(path.join(__dirname, 'Upload_Data')));

// ...existing code...
