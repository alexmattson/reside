/**
 * Automatically bind all methods of a class to keep the scope of "this" correct
 *
 * This will loop thorugh all the methods on a given class bind them correctly
 * Optionally, you can pass in individual methods to exdlude from the bind
 *
 * We do not want to bind the native React methods, those are handled internally, so we exclude them
 */
const OUTTA_BOUNDS = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnMount'
]

function BindIt(what, ...exclude) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(what)).forEach(function(
    method,
    ind
  ) {
    if (OUTTA_BOUNDS.indexOf(method) === -1) {
      if (exclude.indexOf(method) === -1) {
        try {
          what[method] = what[method].bind(what)
        } catch (e) {
          console.error(`Tried to bind: ${method}() but it was not found.`) // eslint-disable-line
        }
      }
    }
  })
}

export default BindIt
