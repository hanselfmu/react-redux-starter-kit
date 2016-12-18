/**
 * Created by chan on 8/12/16.
 *
 * Borrowed from my plugin for 无讼合作
 */
var path = require('path');
var fs = require('fs');

function ReplaceAssets(config) {
    this.skip = config.skip || false;
    this.entries = config.entries;
    this.input = config.input;
    this.output = config.output;
    this.data = config.data;
}

ReplaceAssets.prototype.apply = function (compiler) {
    var self = this;
    var folder = compiler.options.context;
    var input = path.join(folder, self.input);
    var output = path.join(folder, self.output);

    fs.readFile(input, 'utf8', function (err, data) {
        compiler.plugin('done', function (stats) {
            var assetsByChunkName = stats.toJson().assetsByChunkName;

            if (self.entries) {
                self.entries.forEach(function(entry) {
                    var placeholder = '[' + entry + ']'

                    var replaceRegex = new RegExp('\\' + placeholder, 'g');
                    var hashedEntry;
                    var assets = assetsByChunkName[entry];
                    if (typeof assets === 'string') {
                        hashedEntry = assetsByChunkName[entry];
                    } else if (Array.isArray(assets)) {
                        hashedEntry = assets.filter(function(asset) {
                            return (asset.endsWith('css') && entry.startsWith('css')) ||
                                (asset.endsWith('js') && entry.startsWith('js'))
                        })[0]
                        //
                        //var extraEntry = assets.filter(function(asset) {
                        //    return (asset.endsWith('css') && entry.startsWith('js')) ||
                        //        (asset.endsWith('js') && entry.startsWith('css'))
                        //})[0]
                    }

                    data = data.replace(replaceRegex, hashedEntry);
                });
            }

            fs.writeFileSync(output, data);
        });
    });
};

module.exports = ReplaceAssets;

