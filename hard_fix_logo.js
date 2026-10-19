const fs = require('fs');

let homeJsx = fs.readFileSync('public/kt/screens-home.jsx', 'utf8');

// The exact block that is currently failing to change
const oldBlock = `    <div className="row between" style={{ marginBottom: 16 }}>
        <RoleSwitch />`;

// The new block with the logo inserted
const newBlock = `    <div className="row between" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div style={{ background: '#fff', padding: '4px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <img src="assets/kazitasks-logo.png" alt="KaziTasks" style={{ height: '22px' }} />
          </div>
          <RoleSwitch />
        </div>`;

if (homeJsx.includes(oldBlock)) {
    homeJsx = homeJsx.replace(oldBlock, newBlock);
    fs.writeFileSync('public/kt/screens-home.jsx', homeJsx);
    console.log("✅ LOGO SUCCESSFULLY ADDED!");
} else {
    console.log("❌ COULD NOT FIND THE CODE. Let's do it manually.");
}