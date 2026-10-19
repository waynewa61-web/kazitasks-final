const fs = require('fs');
let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');

// This finds the RoleSwitch component anywhere in the file and puts the logo right next to it
homeJsx = homeJsx.replace(
  /<RoleSwitch \/>/g,
  `<div className="row" style={{ gap: 12 }}>
    <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
      <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
    </div>
    <RoleSwitch />
  </div>`
);

fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);
console.log("✅ Logo successfully injected into the Home Header!");