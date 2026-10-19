const fs = require('fs');

// 1. Rewrite screens-home.jsx to guarantee the logo is there
let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
const headerStart = homeJsx.indexOf('<div className="row between" style={{ marginBottom: 16 }}>');
const headerEnd = homeJsx.indexOf('<p style={{ fontSize: 14, opacity: .7, fontWeight: 500 }}>');

if (headerStart !== -1 && headerEnd !== -1) {
  const newHeader = `<div className="row between" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
          </div>
          <RoleSwitch />
        </div>
        <div className="row" style={{ gap: 2 }}>
          <button className="iconbtn" style={{ color: '#fff' }} onClick={() => kt.go('notifs')} aria-label="Notifications"><Icon n="bell" />{unread > 0 && <span className="dot" style={{ boxShadow: '0 0 0 2px var(--navy)' }} />}</button>
          <button onClick={() => kt.go('account')} style={{ marginLeft: 4 }}><Avatar name="Daniel Kato" color="#F7941D" size={34} /></button>
        </div>
      </div>
      `;
  homeJsx = homeJsx.substring(0, headerStart) + newHeader + homeJsx.substring(headerEnd);
  fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);
  console.log("✅ Logo surgically injected!");
}

// 2. Rewrite screens-work.jsx for file uploads
let workJsx = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
workJsx = workJsx.replace(
  /<button className="fab-sim"><Icon n="camera"[\s\S]*?<\/button>/,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="camera" s={18} /><span><b>Add photos or files</b></span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected!')} /></label>`
);
workJsx = workJsx.replace(
  /<button className="fab-sim"><Icon n="clip"[\s\S]*?<\/button>/,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}><Icon n="clip" s={16} /><span><b>Attach samples</b></span><input type="file" style={{ display: 'none' }} onChange={(e) => alert('File selected!')} /></label>`
);
fs.writeFileSync('public/kt/screens-work.jsx', workJsx);
console.log("✅ File uploads surgically injected!");

// 3. The ultimate cache bust (Adding ?v=9999 to HTML)
let html = fs.readFileSync('public/KaziTasks Prototype.html', 'utf8');
// Remove any existing version tags
html = html.replace(/\?v=\d+/g, ''); 
// Add new version tags
html = html.replace(/src="([^"]+)"/g, 'src="$1?v=9999"');
html = html.replace(/href="([^"]+)"/g, 'href="$1?v=9999"');
fs.writeFileSync('public/KaziTasks Prototype.html', html);
console.log("✅ Ultimate Cache Buster applied!");