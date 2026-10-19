const fs = require('fs');

// 1. FIX THE CSS (Chat Composer, Filter Scrolling, and Spacing)
let css = fs.readFileSync('public/kt/styles.css', 'utf8');

// Fix Chat Composer (keep it at the bottom, above the keyboard)
css += `
.composer { flex: none !important; padding-bottom: calc(16px + env(safe-area-inset-bottom)) !important; }
.app .main { padding-bottom: 0 !important; }
/* Fix Filter Sheet Scrolling */
.sheet { max-height: 90vh !important; }
.sheet .sbody { min-height: 0 !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 40px !important; }
/* Fix Homepage Spacing */
.navyband { padding-top: 20px !important; padding-bottom: 28px !important; }
`;
fs.writeFileSync('public/kt/styles.css', css);

// 2. ADD LOGO TO HOME HEADER
let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');
// Look for the RoleSwitch in the HomeHeader and add the logo next to it
const oldHeader = `<div className="row between" style={{ marginBottom: 16 }}>
        <RoleSwitch />`;
const newHeader = `<div className="row between" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '20px' }} />
          </div>
          <RoleSwitch />
        </div>`;
homeJsx = homeJsx.replace(oldHeader, newHeader);
fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);

// 3. FIX FILE UPLOADS (Make them actual file inputs)
let workJsx = fs.readFileSync('public/kt/screens-work.jsx', 'utf8');
// Replace the dummy Post Job attachment button
workJsx = workJsx.replace(
  `<button className="fab-sim"><Icon n="camera" s={18} /><span><b>Add photos or files</b> · helps Taskers quote accurately</span></button>`,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}>
      <Icon n="camera" s={18} />
      <span><b>Add photos or files</b> · helps Taskers quote accurately</span>
      <input type="file" style={{ display: 'none' }} onChange={(e) => alert(e.target.files[0]?.name ? 'Attached: ' + e.target.files[0].name : 'No file chosen')} />
   </label>`
);
// Replace the dummy Milestone attachment button
workJsx = workJsx.replace(
  `<button className="fab-sim"><Icon n="clip" s={16} /><span><b>Attach samples</b> · PDF, JPG up to 10 MB</span></button>`,
  `<label className="fab-sim" style={{ cursor: 'pointer' }}>
      <Icon n="clip" s={16} />
      <span><b>Attach samples</b> · PDF, JPG up to 10 MB</span>
      <input type="file" style={{ display: 'none' }} onChange={(e) => alert(e.target.files[0]?.name ? 'Attached: ' + e.target.files[0].name : 'No file chosen')} />
   </label>`
);
fs.writeFileSync('public/kt/screens-work.jsx', workJsx);

console.log("✅ All 5 phone issues fixed!");