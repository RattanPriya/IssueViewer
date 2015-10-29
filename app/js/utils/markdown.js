
var marked = require('marked')

module.exports = {
  linkProfiles: linkProfiles,
  processBody: processBody,
}

/*
 * Convert to markdown, link @mentions to their user profiles.
 */
function processBody(text) {
  return React.DOM.span({
    dangerouslySetInnerHTML: {
      __html: linkProfiles(marked(text, {gfm: true}))
    }
  })
}

function linkProfiles(text) {
  var rep = '$1<a href="https://github.com/$2">@$2</a>'
  return text.replace(/(^|\s|>)@([a-zA-Z_-]{2,})/g, rep)
}