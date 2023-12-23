const Transformer = require('@parcel/plugin').Transformer;

module.exports = new Transformer({
  async transform({asset}) {
    let code = await asset.getCode();
    let deps = code.matchAll(/ASSET_URL:(.+)\'/g);

    for (let dep of deps) {
      let depId = asset.addDependency({
        specifier: dep[1],
        specifierType: 'url'
      });

      code = code.replaceAll(`\'ASSET_URL:${dep[1]}\'`, `(new URL(\'${dep[1]}\', import.meta.url))`)
    }
    asset.setCode(code)
    return [asset];
  }
});