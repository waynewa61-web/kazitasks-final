const fs = require('fs');

let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
let workJsx = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
let css = fs.readFileSync('public/kt/styles.css', 'utf8');

if (!homeJsx.includes('assets/kazitasks-logo.png')) {
    console.log("❌ Logo is missing from Home Header!");
} else {
    console.log("✅ Logo is in the Home Header.");
}

if (!workJsx.includes('type="file"')) {
    console.log("❌ File uploads are missing!");
} else {
    console.log("✅ File uploads are in the code.");
}

if (!css.includes('.composer { flex: none')) {
    console.log("❌ Chat composer fix is missing!");
} else {
    console.log("✅ Chat composer fix is in the CSS.");
}

console.log("\nChecking complete.");