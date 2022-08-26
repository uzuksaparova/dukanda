const fs = require('fs');
const fullVersion = fs
    .readFileSync('./src/version.js', {
        encoding: 'utf8',
        flag: 'r',
    })
    .split("export default '")[1];

const versionLast = Number(fullVersion.split('.')[2].substring(0, 3)) + 1;
const newVersion = `${fullVersion.split('.')[0]}.${
    fullVersion.split('.')[1]
}.${('00' + versionLast).slice(-3)}`;

fs.writeFileSync('./src/version.js', `export default '${newVersion}';`);
