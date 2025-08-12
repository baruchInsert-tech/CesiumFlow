// update-unity-version.js
const fs = require('fs');
const path = require('path');

// OLD WAY - DELETE THIS LINE
// const newVersion = process.env.NEXT_RELEASE_VERSION;

// NEW WAY - ADD THIS LINE
const newVersion = process.argv[2];

const projectSettingsPath = path.join(__dirname, 'ProjectSettings', 'ProjectSettings.asset');

if (!newVersion) {
  // Update the error message for clarity
  console.error('Error: No version number was passed to the update-unity-version.js script.');
  process.exit(1);
}

fs.readFile(projectSettingsPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading ProjectSettings.asset:', err);
    return process.exit(1);
  }

  // Use a regular expression to find and replace the bundleVersion
  const result = data.replace(/(bundleVersion:\s*).*/, `$1${newVersion}`);

  fs.writeFile(projectSettingsPath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to ProjectSettings.asset:', err);
      return process.exit(1);
    }
    console.log(`Successfully updated bundleVersion to ${newVersion}`);
  });
});