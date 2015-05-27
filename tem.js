var tem = (function () {
  'use strict';

  var views = {};
  var cmds = {
    '=': function (args) {
      return '\' + tem.esc(' + unsanitizeCode(args) + ') +\'';
    },

    '-': function (args) {
      return '\' + ' + unsanitizeCode(args) + ' +\'';
    },

    'if': function (args, ctx) {
      ctx.push('\': \'\') + \'');

      return '\' + ('+ unsanitizeCode(args) + '? \'';
    },

    'else-if': function (args, ctx) {
      ctx.pop();
      ctx.push('\': \'\')) + \'');

      return '\':('+ unsanitizeCode(args) + '? \'';
    },

    'else': function (args, ctx) {
      ctx[ctx.length - 1] = '\') + \'';

      return '\': \'';
    },

    'for': function (args, ctx) {
      ctx.push('\'; } out += \'');
      args = args.trim().split(/[\s\,]+/);
      var arrName = args[0],
          varName = args[1],
          iName = args[2] || 'i';

      return '\'; for (var ' + iName + ' = 0; ' + iName + ' < ' + arrName + '.length; ++' + iName + ') { var ' +
        varName + ' = ' + arrName + '[' + iName + ']; out += \'';
    },

    '/': function (b, ctx) {
      return ctx.pop();
    },

    'tem': function (args) {
      var params = viewParams(args);
      return '\' + tem(\'' + params.view + '\', ' + params.it + ') + \'';
    },

    'master': function (args, ctx) {
      ctx.push('\'; return out; })()) + \'');
      var params = viewParams(args);
      return '\' + tem(\'' + params.view + '\', ' + params.it + ', (function (){ var out =\'';
    },

    'yield': function () {
      return '\' + body + \'';
    }
  };

  function viewParams(args) {
    args = unsanitizeCode(args.trim());
    var i = args.indexOf(' '),
        view = i >= 0 ? args.slice(0, i) : args,
        it = i >= 0 ? args.slice(i).trim() || 'it' : 'it';
    return { it: it, view: view };
  }

  function tem(name, model, body) {
    var v = views[name];

    if (v) return v(model, body);

    throw new Error('View ' + name + ' not found.');
  }

  function unsanitizeCode(str) {
    return str.replace(/\\([\'\\\n\r\t])/g, '$1');
  }

  function sanitizeTemplate(str) {
    return str.replace(/([\n\t\r\'\\])/g, '\\$1');
  }

  function parse(str) {
    var ctx = [];

    str = sanitizeTemplate(str);

    return str.replace(/\{\{([^\s\}]+)([\s\S]*?(\}?))\}\}/g, function (a, cmd, args) {
      var fn = cmds[cmd];
      return fn ? fn(args, ctx) : a;
    });
  }

  tem.build = function (html) {
    var fn = new Function('tem', 'it', 'body', 'var out = \'' + parse(html) + '\'; return out;');
    return function (it, body) {
      return fn(tem, it, body);
    }
  };

  tem.esc = function (str) {
    var map = {
      '<': '&lt;',
      '>': '&gt;',
      '\'': '&apos;',
      '\"': '&quot;',
      '&': '&amp;'
    };

    return (str + '').replace(/[<>&'"]/g, function (ch) {
      return map[ch];
    });
  };

  tem.add = function (name, html) {
    views[name] = function (model, body) {
      return (views[name] = tem.build(html))(model, body);
    };
  };

  tem.cmd = function (name, fn) {
    cmds[name] = fn;
  };

  return tem;

})();

(function (root, factory) {
  var define = root.define;

  if (define && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  }
}(this, function () { return tem; }));
