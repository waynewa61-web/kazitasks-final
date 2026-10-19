const fs = require('fs');

// 1. Overwrite the Home Screen to force the logo
let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
// We will look for the specific header div and replace it entirely
const searchString = '<div className="row between" style={{ marginBottom: 16 }}>';
const replaceString = `<div className="row between" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
          </div>
          <RoleSwitch />
        </div>`;

if (homeJsx.includes(searchString)) {
    // Replace only the first occurrence (the header)
    homeJsx = homeJsx.replace(searchString, replaceString);
    // If there is an existing <RoleSwitch /> right after, we don't want it twice, so let's clean it up
    homeJsx = homeJsx.replace(replaceString + '\n        <RoleSwitch />', replaceString);
    fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);
    console.log("✅ Logo successfully forced into Home Header!");
}

// 2. Overwrite the Work Screen to force file inputs
let workJsx = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
let changed = false;
if (workJsx.includes('<span><b>Add photos or files</b>')) {
    workJsx = workJsx.replace(
      /<button className="fab-sim"><Icon n="camera" s=\{18\} \/><span><b>Add photos or files<\/b>.*?<\/button>/,
      `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="camera" s={18} /><span><b>Add photos or files</b> · helps Taskers quote accurately</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected: ' + e.target.files[0]?.name)} /></label>`
    );
    changed = true;
}
if (workJsx.includes('<span><b>Attach samples</b>')) {
    workJsx = workJsx.replace(
      /<button className="fab-sim"><Icon n="clip" s=\{16\} \/><span><b>Attach samples<\/b>.*?<\/button>/,
      `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="clip" s={16} /><span><b>Attach samples</b> · PDF, JPG up to 10 MB</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected: ' + e.target.files[0]?.name)} /></label>`
    );
    changed = true;
}
if (changed) {
    fs.writeFileSync('public/kt/screens-work.jsx', workJsx);
    console.log("✅ File uploads successfully forced!");
}