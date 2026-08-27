const fs = require('fs');
const path = require('path');

function createLocalBackup() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(__dirname, '_backups', `backup_${timestamp}`);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const files = fs.readdirSync(__dirname);
  let count = 0;

  for (const file of files) {
    if (file === '_backups' || file === '.git' || file === 'node_modules') continue;
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(backupDir, file);

    const stat = fs.statSync(srcPath);
    if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }

  console.log(`[BACKUP] Successfully archived ${count} files to: _backups/backup_${timestamp}`);
  return backupDir;
}

if (require.main === module) {
  createLocalBackup();
}

module.exports = { createLocalBackup };
