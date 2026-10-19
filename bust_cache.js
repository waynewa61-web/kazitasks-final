const fs = require('fs');

// Add version numbers to all JSX and CSS files to force the browser to reload them
let html = fs.readFileSync('public/KaziTasks Prototype.html', 'utf8');

// We replace all "kt/..." and "tweaks_panel.jsx" with a version query
html = html.replace(/src="(kt\/[^"]+)"/g, 'src="$1?v=99"');
html = html.replace(/src="(tweaks_panel\.jsx)"/g, 'src="$1?v=99"');
html = html.replace(/href="(kt\/[^"]+)"/g, 'href="$1?v=99"');

fs.writeFileSync('public/KaziTasks Prototype.html', html);
console.log("✅ Cache busted! Files will now force-reload.");
