const fs = require('fs')
const signHook = require('./afterSignHook.cjs')

module.exports = async function () {
  // notarize the app on Mac OS only.
  if (process.platform !== 'darwin' || !process.env.GITHUB_REF || !process.env.GITHUB_REF.startsWith('refs/tags/')) {
    return
  }
  console.log('afterBuild hook triggered')

  const pkgName = fs.readdirSync('dist').find(x => x.endsWith('.pkg'))
  signHook({
    appOutDir: 'dist',
    _pathOverride: pkgName,
  })
}
