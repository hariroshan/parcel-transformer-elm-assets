const Transformer = require('@parcel/plugin').Transformer;

module.exports = new Transformer({
  async transform({asset}) {
    let code = await asset.getCode();
    let result = code.replace(/[\'\"]ASSET_URL:(.*?)[\'\"]/g, (m, dep) => {
      asset.addURLDependency(dep);
      return `(new URL("${dep}", import.meta.url))`;
    });

    asset.setCode(result)
    return [asset];
  }
});