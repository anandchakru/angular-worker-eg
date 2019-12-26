//git rev-list --tags --date-order --max-count=1
//git describe --exact-match $(git rev-list --tags --date-order --max-count=1) --tags
//git rev-parse HEAD
'use strict';
const { spawnSync } = require('child_process');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const pjson = require('../package.json');

const hashLong = spawnSync('git', ['rev-parse', 'HEAD']);
const hash = hashLong.stdout.toString().trim();
const hashShort = spawnSync('git', ['rev-parse', '--short', 'HEAD']);
const tagCmd = spawnSync('git', ['describe', '--exact-match', hash, '--tags']);
const op = { hash: { short: hashShort.stdout.toString().trim(), long: hash }, tag: tagCmd.stdout.toString().trim(), package: pjson.version };

const file = resolve(__dirname, '..', 'src', 'environments', 'meta.ts');

writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const BUILDINFO = ${JSON.stringify(op, null, 2)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote ${JSON.stringify(op)} to ${relative(resolve(__dirname, '..'), file)}`);
if (hashLong.stderr.toString()) {
  console.log(`hashLongError: ${hashLong.stderr.toString()}`);
}
if (hashShort.stderr.toString()) {
  console.log(`hashShortError: ${hashShort.stderr.toString()}`);
}
if (tagCmd.stderr.toString()) {
  console.log(`tagError: ${tagCmd.stderr.toString()}`);
}