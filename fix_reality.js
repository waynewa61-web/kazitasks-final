const fs = require('fs');

// 1. Fix Home Header (Logo)
let home = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
if (!home.includes('kazitasks-logo.png')) {
  home = home.replace(/<RoleSwitch \/>/, `
    <div className="row" style={{ gap: 12 }}>
      <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
        <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
      </div>
      <RoleSwitch />
    </div>`);
  fs.writeFileSync('public/kt/screens-home.jsx', home);
  console.log("✅ Home header logo fixed!");
}

// 2. Fix File Uploads
let work = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
if (!work.includes('type="file"')) {
  work = work.replace(
    /<button className="fab-sim"><Icon n="camera" s=\{18\} \/><span><b>Add photos or files<\/b> · helps Taskers quote accurately<\/span><\/button>/,
    `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="camera" s={18} /><span><b>Add photos or files</b> · helps Taskers quote accurately</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected: ' + e.target.files[0]?.name)} /></label>`
  );
  work = work.replace(
    /<button className="fab-sim"><Icon n="clip" s=\{16\} \/><span><b>Attach samples<\/b> · PDF, JPG up to 10 MB<\/span><\/button>/,
    `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="clip" s={16} /><span><b>Attach samples</b> · PDF, JPG up to 10 MB</span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected: ' + e.target.files[0]?.name)} /></label>`
  );
  fs.writeFileSync('public/kt/screens-work.jsx', work);
  console.log("✅ File uploads fixed!");
}

// 3. Fix Chat & Scrolling CSS
let css = fs.readFileSync('public/kt/styles.css', 'utf8');
if (!css.includes('/* PHONE FIXES */')) {
  css += `
  /* PHONE FIXES */
  .composer { flex: none !important; padding-bottom: calc(16px + env(safe-area-inset-bottom)) !important; background: var(--surface); z-index: 10; }
  .sheet .sbody { overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 40px !important; }
  .navyband { padding-top: 24px !important; padding-bottom: 32px !important; }
  `;
  fs.writeFileSync('public/kt/styles.css', css);
  console.log("✅ CSS fixes applied!");
}

// 4. Force Cache Busting (This forces your browser to reload the files)
let html = fs.readFileSync('public/KaziTasks Prototype.html', 'utf8');
html = html.replace(/\?v=\d+/g, ''); // Remove old versions
html = html.replace(/src="(kt\/[^"]+)"/g, 'src="$1?v=999"'); // Add new version
html = html.replace(/href="(kt\/[^"]+)"/g, 'href="$1?v=999"');
fs.writeFileSync('public/KaziTasks Prototype.html', html);
console.log("✅ Cache busted! Browser forced to download new files.");