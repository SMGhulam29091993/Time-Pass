

module.exports.base64 = (file)=>`data:${file.mimetype};base64,${file.buffer.toString("base64")}`