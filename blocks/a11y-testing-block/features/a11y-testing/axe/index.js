/* eslint-disable */
/**
 * Brent Miller:  This is a fork of the React Axe library (version 3.5.2):
 * https://github.com/dequelabs/react-axe
 * This has been forked to build out an interactive UI besides the
 * standard browser console reporting.
 */

const axeCore = require('axe-core');
const rIC = require('requestidlecallback');
const after = require('./after');

const requestIdleCallback = rIC.request;
const cancelIdleCallback = rIC.cancel;
let React;
let ReactDOM;
// contrasted against Chrome default color of #ffffff
const lightTheme = {
  serious: '#d93251',
  minor: '#d24700',
  text: 'black',
};
// contrasted against Safari dark mode color of #535353
const darkTheme = {
  serious: '#ffb3b3',
  minor: '#ffd500',
  text: 'white',
};
const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  ? darkTheme
  : lightTheme;
const boldCourier = 'font-weight:bold;font-family:Courier;';
const critical = `color:${theme.serious};font-weight:bold;`;
const serious = `color:${theme.serious};font-weight:normal;`;
const moderate = `color:${theme.minor};font-weight:bold;`;
const minor = `color:${theme.minor};font-weight:normal;`;
const defaultReset = `font-color:${theme.text};font-weight:normal;`;
let idleId;
let timeout;
let context;
let _createElement;
const components = {};
const nodes = [document.documentElement];
const cache = {};
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// @see https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  let _timeout;
  return function () {
    const _this = this;
    const args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    const later = function () {
      _timeout = null;
      if (!immediate) func.apply(_this, args);
    };
    const callNow = immediate && !_timeout;
    clearTimeout(_timeout);
    _timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}
function escapeHTML(string) {
  const pre = document.createElement('pre');
  const text = document.createTextNode(string);
  pre.appendChild(text);
  return pre.innerHTML;
}

/**
 * Return the entire parent tree of a node (from HTML down).
 * @param {Node} node
 * @return {Node[]}
 */
function getPath(node) {
  const path = [node];
  while (node && node.nodeName.toLowerCase() !== 'html') {
    path.push(node.parentNode);
    node = node.parentNode;
  }
  if (!node || !node.parentNode) {
    return null;
  }
  return path.reverse();
}
/**
 * Find the common parent of an array of nodes.
 * @param {Node[]} nodes
 * @return {Node}
 */
function getCommonParent(nodes) {
  let path;
  let nextPath;
  if (nodes.length === 1) {
    return nodes.pop();
  }
  while (!path && nodes.length) {
    path = getPath(nodes.pop());
  }
  while (nodes.length) {
    nextPath = getPath(nodes.pop());
    if (nextPath) {
      path = path.filter((node, index) => nextPath.length > index && nextPath[index] === node);
    }
  }
  return path ? path[path.length - 1] : document;
}
/**
 * Log the axe result node to the console
 * @param {NodeResult} node
 * @param {Function} logFn console log function to use (error, warn, log, etc.)
 */
function logElement(node, logFn) {
  const elmStr = node.target.toString().replace(/\\/g, '');
  const elmName = `<button class='allyIdBtn' data-select='${elmStr}'>Highlight Element</button>`;
  const el = document.querySelector(node.target.toString());
  if (!el) {
    logFn('Selector: %c%s', boldCourier, node.target.toString());
  } else {
    logFn('Element: %o', el);
  }
  return elmName;
}
/**
 * Log the axe result node html tot he console
 * @param {NodeResult} node
 */
function logHtml(node) {
  console.log('HTML: %c%s', boldCourier, node.html);
  const nodeHTML = `<pre><code>${escapeHTML(node.html)}</code></pre>`;
  return nodeHTML;
}
/**
 * Log the failure message of a node result.
 * @param {NodeResult} node
 * @param {String} key which check array to log from (any, all, none)
 */
function logFailureMessage(node, key) {
  // this exists on axe but we don't export it as part of the typescript
  // namespace, so just let me use it as I need
  const message = axeCore._audit.data.failureSummaries[key].failureMessage(node[key].map((check) => check.message || ''));
  console.error(message);
  const htmlMesg = axeCore._audit.data.failureSummaries[key].failureMessage(
    node[key].map((check, index) => `<li>${check.message}</li>` || ''),
  );

  return `<ul>${htmlMesg}</ul>`;
}
/**
 * Log as a group the node result and failure message.
 * @param {NodeResult} node
 * @param {String} key which check array to log from (any, all, none)
 */
function failureSummary(node, key) {
  let summaryForUI = null;
  let elmName = null;
  if (node[key].length > 0) {
    elmName = logElement(node, console.groupCollapsed);
    summaryForUI = logHtml(node);
    summaryForUI = summaryForUI + "<div>" + elmName + "</div>";

    let failMesg = logFailureMessage(node, key);
    summaryForUI = summaryForUI + "<div>" + failMesg + "</div>";
    let relatedNodes_1 = [];
    node[key].forEach((check) => {
      relatedNodes_1 = relatedNodes_1.concat(check.relatedNodes);
    });
    if (relatedNodes_1.length > 0) {
      console.groupCollapsed('Related nodes');
      relatedNodes_1.forEach((relatedNode) => {
        elmName = logElement(relatedNode, console.log);
        summaryForUI = `${summaryForUI}<div>${elmName}</div>`;
        summaryForUI += logHtml(relatedNode);
      });
      console.groupEnd();
    }
    console.groupEnd();
  }
  return summaryForUI;
}
/**
 * Run axe against the passed in node and report violations
 * @param {*} node
 * @param {Number} timeout force call of axe.run after the timeout has passed (if not called before)
 * @return {Promise}
 */
function checkAndReport(node, timeout) {
  if (idleId) {
    cancelIdleCallback(idleId);
    idleId = undefined;
  }
  return new Promise(((resolve, reject) => {
    nodes.push(node);
    idleId = requestIdleCallback(() => {
      let n = context;
      if (n === undefined) {
        n = getCommonParent(nodes.filter((node) => node.isConnected));
        if (n.nodeName.toLowerCase() === 'html') {
          // if the only common parent is the body, then analyze the whole page
          n = document;
        }
      }
      axeCore.run(n, { reporter: 'v2' }, (error, results) => {
        if (error) {
          return reject(error);
        }
        results.violations = results.violations.filter((result) => {
          result.nodes = result.nodes.filter((node) => {
            const key = node.target.toString() + result.id;
            const retVal = !cache[key];
            cache[key] = key;
            return retVal;
          });
          return !!result.nodes.length;
        });
        if (results.violations.length) {
          let html = "<div class='reportContainer'>";
          console.group('%cNew axe issues', serious);
          results.violations.forEach((result) => {
            let fmt;
            switch (result.impact) {
              case 'critical':
                html = `${html}
                  <div class="report critical">
                      <div>
                           <h2>Critical:&nbsp;${result.help}</h2>
                           <a href="${result.helpUrl}" title="More Information" target="_blank">Learn More</a>
                       </div>
                `;
                fmt = critical;
                break;
              case 'serious':
                html = `${html}
                  <div class="report critical">
                      <div>
                           <h2>Serious:&nbsp;${result.help}</h2>
                           <a href="${result.helpUrl}" title="More Information" target="_blank">Learn More</a>
                       </div>
                `;
                fmt = serious;
                break;
              case 'moderate':
                html = `${html}
                  <div class="report moderate">
                      <div>
                           <h2>Moderate:&nbsp;${result.help}</h2>
                           <a href="${result.helpUrl}" title="More Information" target="_blank">Learn More</a>
                       </div>
                `;
                fmt = moderate;
                break;
              case 'minor':
                html = `${html}
                  <div class="report moderate">
                      <div>
                           <h2>Minor:&nbsp;${result.help}</h2>
                           <a href="${result.helpUrl}" title="More Information" target="_blank">Learn More</a>
                       </div>
                `;
                fmt = minor;
                break;
              default:
                html = `${html}
                  <div class="report moderate">
                      <div>
                           <h2>Minor:&nbsp;${result.help}</h2>
                           <a href="${result.helpUrl}" title="More Information" target="_blank">Learn More</a>
                       </div>
                `;
                fmt = minor;
                break;
            }
            console.groupCollapsed('%c%s: %c%s %s', fmt, result.impact, defaultReset, result.help, result.helpUrl);
            result.nodes.forEach((node) => {
              let summary = failureSummary(node, 'any');
              if (summary) html += `<div>${summary}</div>`;
              summary = failureSummary(node, 'none');
              if (summary) html += `<div>${summary}</div>`;
            });
            console.groupEnd();
            html = `${html}</div>`;
          });
          console.groupEnd();

          html = `${html}</div>`;
          const event = new CustomEvent('a11yAlerts', { detail: html });
          window.dispatchEvent(event);
        }
        resolve();
      });
    }, {
      timeout,
    });
  }));
}
/**
 * Check the node for violations.
 * @param {Component} component
 */
function checkNode(component) {
  let node;
  try {
    node = ReactDOM.findDOMNode(component);
  } catch (e) {
    console.group('%caxe error: could not check node', critical);
    console.group('%cComponent', serious);
    console.error(component);
    console.groupEnd();
    console.group('%cError', serious);
    console.error(e);
    console.groupEnd();
    console.groupEnd();
  }
  if (node) {
    checkAndReport(node, timeout);
  }
}
/**
 * Check the component for violations whenever the DOM updates
 * @param {Component} component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function componentAfterRender(component) {
  const debounceCheckNode = debounce(checkNode, timeout, true);
  after(component, 'componentDidMount', debounceCheckNode);
  after(component, 'componentDidUpdate', debounceCheckNode);
}
/**
 * Add a component to track.
 * @param {Component} component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addComponent(component) {
  const reactInstance = component._reactInternalInstance || {};
  const reactInstanceDebugID = reactInstance._debugID;
  const reactFiberInstance = component._reactInternalFiber || {};
  const reactFiberInstanceDebugID = reactFiberInstance._debugID;
  if (reactInstanceDebugID && !components[reactInstanceDebugID]) {
    components[reactInstanceDebugID] = component;
    componentAfterRender(component);
  } else if (reactFiberInstanceDebugID
        && !components[reactFiberInstanceDebugID]) {
    components[reactFiberInstanceDebugID] = component;
    componentAfterRender(component);
  }
}
/**
 * Run axe against all changes made in a React app.
 * @parma {React} _React React instance
 * @param {ReactDOM} _ReactDOM ReactDOM instance
 * @param {Number} _timeout debounce timeout in milliseconds
 * @parma {Spec} conf axe.configure Spec object
 * @param {ElementContext} _context axe ElementContent object
 */
function reactAxe(_React, _ReactDOM, _timeout, conf, _context) {
  React = _React;
  ReactDOM = _ReactDOM;
  timeout = _timeout;
  context = _context;
  if (conf) {
    axeCore.configure(conf);
  }
  if (!_createElement) {
    _createElement = React.createElement;
    React.createElement = function () {
      const args = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      const reactEl = _createElement.apply(this, args);
      if (reactEl._owner && reactEl._owner._instance) {
        addComponent(reactEl._owner._instance);
      } else if (reactEl._owner && reactEl._owner.stateNode) {
        addComponent(reactEl._owner.stateNode);
      }
      return reactEl;
    };
  }
  return checkAndReport(document.body, timeout);
}
module.exports = reactAxe;
