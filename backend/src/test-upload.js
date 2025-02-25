const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, 'Upload_Data');

try {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log('Upload directory created at:', uploadPath);
    } else {
        console.log('Upload directory exists at:', uploadPath);
    }
    
    // Test write permissions
    const testFile = path.join(uploadPath, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('Write permissions OK');
} catch (error) {
    console.error('Error:', error);
}
