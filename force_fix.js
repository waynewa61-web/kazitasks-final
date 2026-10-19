const fs = require('fs');

// 1. FORCE CSS FIXES (Chat composer, scrolling, spacing)
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
css += `
/* FORCE FIXES */
.app { height: 100vh !important; display: flex; flex-direction: column; }
.app .main { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.composer { flex: none !important; padding-bottom: calc(16px + env(safe-area-inset-bottom)) !important; background: var(--surface); z-index: 10; }
.sheet { max-height: 90vh !important; }
.sheet .sbody { overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 40px !important; }
.navyband { padding-top: 24px !important; padding-bottom: 32px !important; }
`;
fs.writeFileSync('public/kt/styles.css', css);

// 2. FORCE LOGO IN HEADER (Targeting the exact HomeHeader code)
let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
const oldHeader = `<div className="row between" style={{ marginBottom: 16 }}>
        <RoleSwitch />`;
const newHeader = `<div className="row between" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
          </div>
          <RoleSwitch />
        </div>`;
if (homeJsx.includes(oldHeader)) {
    homeJsx = homeJsx.replace(oldHeader, newHeader);
    fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);
    console.log("✅ Logo forced into header!");
} else {
    console.log("❌ Could not find header code to replace.");
}

// 3. FORCE FILE UPLOADS IN WORK SCREEN
let workJsx = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
// Replace the Task creation file button
workJsx = workJsx.replace(
  /<button className="fab-sim"><Icon n="camera" s=\{18\} \/><span><b>Add photos or files<\/b> · helps Taskers quote accurately<\/span><\/button>/g,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="camera" s={18} /><span><b>Add photos or files</b> · helps Taskers quote accurately</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert(e.target.files[0]?.name ? 'Attached: ' + e.target.files[0].name : 'No file chosen')} /></label>`
);
// Replace the Milestone attachment button
workJsx = workJsx.replace(
  /<button className="fab-sim"><Icon n="clip" s=\{16\} \/><span><b>Attach samples<\/b> · PDF, JPG up to 10 MB<\/span><\/button>/g,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="clip" s={16} /><span><b>Attach samples</b> · PDF, JPG up to 10 MB</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert(e.target.files[0]?.name ? 'Attached: ' + e.target.files[0].name : 'No file chosen')} /></label>`
);
fs.writeFileSync('public/kt/screens-work.jsx', workJsx);

// 4. FORCE CACHE BUSTING IN HTML
let html = fs.readFileSync('public/KaziTasks Prototype.html', 'utf8');
if (!html.includes('Cache-Control')) {
    html = html.replace('<head>', `<head>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">`);
    fs.writeFileSync('public/KaziTasks Prototype.html', html);
}

console.log("✅ All forces applied successfully!");