export const sanitizeOptions = {
  allowedTags: [ 'a', 'span', 'br' ],
  allowedAttributes: {
    'a': [ 'href', 'target', 'class', 'style', 'onclick' ],
    'span': [ 'class' ],
    'br': []
  },
  allowedIframeHostnames: ['www.youtube.com']
}