!(function (r, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((r = r || self)['@hpcc-js/wasm'] = {}));
})(this, function (r) {
  'use strict';
  function t(r, t) {
    return r((t = { exports: {} }), t.exports), t.exports;
  }
  var e = t(function (r, t) {
      var e,
        n =
          ((e =
            'undefined' != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          function (r) {
            var t,
              n = void 0 !== (r = r || {}) ? r : {},
              o = {};
            for (t in n) n.hasOwnProperty(t) && (o[t] = n[t]);
            var i,
              a = './this.program',
              s = '';
            document.currentScript && (s = document.currentScript.src),
              e && (s = e),
              (s =
                0 !== s.indexOf('blob:')
                  ? s.substr(0, s.lastIndexOf('/') + 1)
                  : ''),
              (i = function (r) {
                var t = new XMLHttpRequest();
                return t.open('GET', r, !1), t.send(null), t.responseText;
              });
            var u,
              c,
              f = n.print || console.log.bind(console),
              l = n.printErr || console.warn.bind(console);
            for (t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
            (o = null),
              n.arguments && n.arguments,
              n.thisProgram && (a = n.thisProgram),
              n.quit && n.quit,
              n.wasmBinary && (u = n.wasmBinary),
              n.noExitRuntime && n.noExitRuntime,
              'object' != typeof WebAssembly &&
                l('no native wasm support detected');
            var d = new WebAssembly.Table({
                initial: 153,
                maximum: 153,
                element: 'anyfunc',
              }),
              p = !1;
            function m(r, t) {
              r || H('Assertion failed: ' + t);
            }
            var h,
              y,
              v,
              _,
              w,
              g =
                'undefined' != typeof TextDecoder
                  ? new TextDecoder('utf8')
                  : void 0;
            function E(r, t, e) {
              for (var n = t + e, o = t; r[o] && !(o >= n); ) ++o;
              if (o - t > 16 && r.subarray && g)
                return g.decode(r.subarray(t, o));
              for (var i = ''; t < o; ) {
                var a = r[t++];
                if (128 & a) {
                  var s = 63 & r[t++];
                  if (192 != (224 & a)) {
                    var u = 63 & r[t++];
                    if (
                      (a =
                        224 == (240 & a)
                          ? ((15 & a) << 12) | (s << 6) | u
                          : ((7 & a) << 18) |
                            (s << 12) |
                            (u << 6) |
                            (63 & r[t++])) < 65536
                    )
                      i += String.fromCharCode(a);
                    else {
                      var c = a - 65536;
                      i += String.fromCharCode(
                        55296 | (c >> 10),
                        56320 | (1023 & c),
                      );
                    }
                  } else i += String.fromCharCode(((31 & a) << 6) | s);
                } else i += String.fromCharCode(a);
              }
              return i;
            }
            function k(r, t) {
              return r ? E(v, r, t) : '';
            }
            function b(r, t, e, n) {
              if (!(n > 0)) return 0;
              for (var o = e, i = e + n - 1, a = 0; a < r.length; ++a) {
                var s = r.charCodeAt(a);
                if (
                  (s >= 55296 &&
                    s <= 57343 &&
                    (s =
                      (65536 + ((1023 & s) << 10)) |
                      (1023 & r.charCodeAt(++a))),
                  s <= 127)
                ) {
                  if (e >= i) break;
                  t[e++] = s;
                } else if (s <= 2047) {
                  if (e + 1 >= i) break;
                  (t[e++] = 192 | (s >> 6)), (t[e++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (e + 2 >= i) break;
                  (t[e++] = 224 | (s >> 12)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                } else {
                  if (e + 3 >= i) break;
                  (t[e++] = 240 | (s >> 18)),
                    (t[e++] = 128 | ((s >> 12) & 63)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                }
              }
              return (t[e] = 0), e - o;
            }
            function D(r) {
              for (var t = 0, e = 0; e < r.length; ++e) {
                var n = r.charCodeAt(e);
                n >= 55296 &&
                  n <= 57343 &&
                  (n =
                    (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++e))),
                  n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return t;
            }
            function S(r) {
              (h = r),
                (n.HEAP8 = y = new Int8Array(r)),
                (n.HEAP16 = new Int16Array(r)),
                (n.HEAP32 = _ = new Int32Array(r)),
                (n.HEAPU8 = v = new Uint8Array(r)),
                (n.HEAPU16 = new Uint16Array(r)),
                (n.HEAPU32 = new Uint32Array(r)),
                (n.HEAPF32 = new Float32Array(r)),
                (n.HEAPF64 = w = new Float64Array(r));
            }
            'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
            var F = n.TOTAL_MEMORY || 16777216;
            function P(r) {
              for (; r.length > 0; ) {
                var t = r.shift();
                if ('function' != typeof t) {
                  var e = t.func;
                  'number' == typeof e
                    ? void 0 === t.arg
                      ? n.dynCall_v(e)
                      : n.dynCall_vi(e, t.arg)
                    : e(void 0 === t.arg ? null : t.arg);
                } else t();
              }
            }
            (c = n.wasmMemory
              ? n.wasmMemory
              : new WebAssembly.Memory({ initial: F / 65536 })) &&
              (h = c.buffer),
              (F = h.byteLength),
              S(h),
              (_[2080] = 5251360);
            var x = [],
              A = [],
              M = [],
              C = [],
              R = !1,
              O = Math.abs,
              j = Math.ceil,
              T = Math.floor,
              z = Math.min,
              B = 0,
              N = null;
            function L(r) {
              B++, n.monitorRunDependencies && n.monitorRunDependencies(B);
            }
            function I(r) {
              if (
                (B--,
                n.monitorRunDependencies && n.monitorRunDependencies(B),
                0 == B && N)
              ) {
                var t = N;
                (N = null), t();
              }
            }
            function H(r) {
              throw (
                (n.onAbort && n.onAbort(r),
                f((r += '')),
                l(r),
                (p = !0),
                (r =
                  'abort(' +
                  r +
                  '). Build with -s ASSERTIONS=1 for more info.'),
                new WebAssembly.RuntimeError(r))
              );
            }
            function U(r) {
              return String.prototype.startsWith
                ? r.startsWith('data:application/octet-stream;base64,')
                : 0 === r.indexOf('data:application/octet-stream;base64,');
            }
            (n.preloadedImages = {}), (n.preloadedAudios = {});
            var W,
              q,
              Y,
              J = 'expatlib.wasm';
            function V() {
              try {
                if (u) return new Uint8Array(u);
                throw 'both async and sync fetching of the wasm failed';
              } catch (r) {
                H(r);
              }
            }
            U(J) || ((W = J), (J = n.locateFile ? n.locateFile(W, s) : s + W));
            var X = {
              1184: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('startElement'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::startElement.';
                t.startElement();
              },
              1404: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('endElement'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::endElement.';
                t.endElement();
              },
              1616: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('characterData'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::characterData.';
                t.characterData();
              },
            };
            function G() {
              var r = (function () {
                var r = new Error();
                if (!r.stack) {
                  try {
                    throw new Error();
                  } catch (t) {
                    r = t;
                  }
                  if (!r.stack) return '(no stack trace available)';
                }
                return r.stack.toString();
              })();
              return (
                n.extraStackTrace && (r += '\n' + n.extraStackTrace()),
                r.replace(/\b_Z[\w\d_]+/g, function (r) {
                  return r == r ? r : r + ' [' + r + ']';
                })
              );
            }
            A.push({
              func: function () {
                dr();
              },
            });
            var Z = 42,
              K = {
                splitPath: function (r) {
                  return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(r)
                    .slice(1);
                },
                normalizeArray: function (r, t) {
                  for (var e = 0, n = r.length - 1; n >= 0; n--) {
                    var o = r[n];
                    '.' === o
                      ? r.splice(n, 1)
                      : '..' === o
                      ? (r.splice(n, 1), e++)
                      : e && (r.splice(n, 1), e--);
                  }
                  if (t) for (; e; e--) r.unshift('..');
                  return r;
                },
                normalize: function (r) {
                  var t = '/' === r.charAt(0),
                    e = '/' === r.substr(-1);
                  return (
                    (r = K.normalizeArray(
                      r.split('/').filter(function (r) {
                        return !!r;
                      }),
                      !t,
                    ).join('/')) ||
                      t ||
                      (r = '.'),
                    r && e && (r += '/'),
                    (t ? '/' : '') + r
                  );
                },
                dirname: function (r) {
                  var t = K.splitPath(r),
                    e = t[0],
                    n = t[1];
                  return e || n
                    ? (n && (n = n.substr(0, n.length - 1)), e + n)
                    : '.';
                },
                basename: function (r) {
                  if ('/' === r) return '/';
                  var t = r.lastIndexOf('/');
                  return -1 === t ? r : r.substr(t + 1);
                },
                extname: function (r) {
                  return K.splitPath(r)[3];
                },
                join: function () {
                  var r = Array.prototype.slice.call(arguments, 0);
                  return K.normalize(r.join('/'));
                },
                join2: function (r, t) {
                  return K.normalize(r + '/' + t);
                },
              };
            function $(r) {
              return (
                n.___errno_location && (_[n.___errno_location() >> 2] = r), r
              );
            }
            var Q = {
                resolve: function () {
                  for (
                    var r = '', t = !1, e = arguments.length - 1;
                    e >= -1 && !t;
                    e--
                  ) {
                    var n = e >= 0 ? arguments[e] : er.cwd();
                    if ('string' != typeof n)
                      throw new TypeError(
                        'Arguments to path.resolve must be strings',
                      );
                    if (!n) return '';
                    (r = n + '/' + r), (t = '/' === n.charAt(0));
                  }
                  return (
                    (t ? '/' : '') +
                      (r = K.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !t,
                      ).join('/')) || '.'
                  );
                },
                relative: function (r, t) {
                  function e(r) {
                    for (var t = 0; t < r.length && '' === r[t]; t++);
                    for (var e = r.length - 1; e >= 0 && '' === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1);
                  }
                  (r = Q.resolve(r).substr(1)), (t = Q.resolve(t).substr(1));
                  for (
                    var n = e(r.split('/')),
                      o = e(t.split('/')),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push('..');
                  return (u = u.concat(o.slice(a))).join('/');
                },
              },
              rr = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (r, t) {
                  (rr.ttys[r] = { input: [], output: [], ops: t }),
                    er.registerDevice(r, rr.stream_ops);
                },
                stream_ops: {
                  open: function (r) {
                    var t = rr.ttys[r.node.rdev];
                    if (!t) throw new er.ErrnoError(43);
                    (r.tty = t), (r.seekable = !1);
                  },
                  close: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  flush: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  read: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.get_char)
                      throw new er.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = r.tty.ops.get_char(r.tty);
                      } catch (r) {
                        throw new er.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new er.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[e + a] = s);
                    }
                    return i && (r.node.timestamp = Date.now()), i;
                  },
                  write: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.put_char)
                      throw new er.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        r.tty.ops.put_char(r.tty, t[e + i]);
                    } catch (r) {
                      throw new er.ErrnoError(29);
                    }
                    return n && (r.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: function (r) {
                    if (!r.input.length) {
                      var t = null;
                      if (
                        ('undefined' != typeof window &&
                        'function' == typeof window.prompt
                          ? null !== (t = window.prompt('Input: ')) &&
                            (t += '\n')
                          : 'function' == typeof readline &&
                            null !== (t = readline()) &&
                            (t += '\n'),
                        !t)
                      )
                        return null;
                      r.input = ur(t, !0);
                    }
                    return r.input.shift();
                  },
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (f(E(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (f(E(r.output, 0)), (r.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (l(E(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (l(E(r.output, 0)), (r.output = []));
                  },
                },
              },
              tr = {
                ops_table: null,
                mount: function (r) {
                  return tr.createNode(null, '/', 16895, 0);
                },
                createNode: function (r, t, e, n) {
                  if (er.isBlkdev(e) || er.isFIFO(e))
                    throw new er.ErrnoError(63);
                  tr.ops_table ||
                    (tr.ops_table = {
                      dir: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                          lookup: tr.node_ops.lookup,
                          mknod: tr.node_ops.mknod,
                          rename: tr.node_ops.rename,
                          unlink: tr.node_ops.unlink,
                          rmdir: tr.node_ops.rmdir,
                          readdir: tr.node_ops.readdir,
                          symlink: tr.node_ops.symlink,
                        },
                        stream: { llseek: tr.stream_ops.llseek },
                      },
                      file: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                        },
                        stream: {
                          llseek: tr.stream_ops.llseek,
                          read: tr.stream_ops.read,
                          write: tr.stream_ops.write,
                          allocate: tr.stream_ops.allocate,
                          mmap: tr.stream_ops.mmap,
                          msync: tr.stream_ops.msync,
                        },
                      },
                      link: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                          readlink: tr.node_ops.readlink,
                        },
                        stream: {},
                      },
                      chrdev: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                        },
                        stream: er.chrdev_stream_ops,
                      },
                    });
                  var o = er.createNode(r, t, e, n);
                  return (
                    er.isDir(o.mode)
                      ? ((o.node_ops = tr.ops_table.dir.node),
                        (o.stream_ops = tr.ops_table.dir.stream),
                        (o.contents = {}))
                      : er.isFile(o.mode)
                      ? ((o.node_ops = tr.ops_table.file.node),
                        (o.stream_ops = tr.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : er.isLink(o.mode)
                      ? ((o.node_ops = tr.ops_table.link.node),
                        (o.stream_ops = tr.ops_table.link.stream))
                      : er.isChrdev(o.mode) &&
                        ((o.node_ops = tr.ops_table.chrdev.node),
                        (o.stream_ops = tr.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    r && (r.contents[t] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (r) {
                  if (r.contents && r.contents.subarray) {
                    for (var t = [], e = 0; e < r.usedBytes; ++e)
                      t.push(r.contents[e]);
                    return t;
                  }
                  return r.contents;
                },
                getFileDataAsTypedArray: function (r) {
                  return r.contents
                    ? r.contents.subarray
                      ? r.contents.subarray(0, r.usedBytes)
                      : new Uint8Array(r.contents)
                    : new Uint8Array();
                },
                expandFileStorage: function (r, t) {
                  var e = r.contents ? r.contents.length : 0;
                  if (!(e >= t)) {
                    (t = Math.max(t, (e * (e < 1048576 ? 2 : 1.125)) | 0)),
                      0 != e && (t = Math.max(t, 256));
                    var n = r.contents;
                    (r.contents = new Uint8Array(t)),
                      r.usedBytes > 0 &&
                        r.contents.set(n.subarray(0, r.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (r, t) {
                  if (r.usedBytes != t) {
                    if (0 == t)
                      return (r.contents = null), void (r.usedBytes = 0);
                    if (!r.contents || r.contents.subarray) {
                      var e = r.contents;
                      return (
                        (r.contents = new Uint8Array(t)),
                        e &&
                          r.contents.set(
                            e.subarray(0, Math.min(t, r.usedBytes)),
                          ),
                        void (r.usedBytes = t)
                      );
                    }
                    if (
                      (r.contents || (r.contents = []), r.contents.length > t)
                    )
                      r.contents.length = t;
                    else for (; r.contents.length < t; ) r.contents.push(0);
                    r.usedBytes = t;
                  }
                },
                node_ops: {
                  getattr: function (r) {
                    var t = {};
                    return (
                      (t.dev = er.isChrdev(r.mode) ? r.id : 1),
                      (t.ino = r.id),
                      (t.mode = r.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = r.rdev),
                      er.isDir(r.mode)
                        ? (t.size = 4096)
                        : er.isFile(r.mode)
                        ? (t.size = r.usedBytes)
                        : er.isLink(r.mode)
                        ? (t.size = r.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(r.timestamp)),
                      (t.mtime = new Date(r.timestamp)),
                      (t.ctime = new Date(r.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr: function (r, t) {
                    void 0 !== t.mode && (r.mode = t.mode),
                      void 0 !== t.timestamp && (r.timestamp = t.timestamp),
                      void 0 !== t.size && tr.resizeFileStorage(r, t.size);
                  },
                  lookup: function (r, t) {
                    throw er.genericErrors[44];
                  },
                  mknod: function (r, t, e, n) {
                    return tr.createNode(r, t, e, n);
                  },
                  rename: function (r, t, e) {
                    if (er.isDir(r.mode)) {
                      var n;
                      try {
                        n = er.lookupNode(t, e);
                      } catch (r) {}
                      if (n)
                        for (var o in n.contents) throw new er.ErrnoError(55);
                    }
                    delete r.parent.contents[r.name],
                      (r.name = e),
                      (t.contents[e] = r),
                      (r.parent = t);
                  },
                  unlink: function (r, t) {
                    delete r.contents[t];
                  },
                  rmdir: function (r, t) {
                    var e = er.lookupNode(r, t);
                    for (var n in e.contents) throw new er.ErrnoError(55);
                    delete r.contents[t];
                  },
                  readdir: function (r) {
                    var t = ['.', '..'];
                    for (var e in r.contents)
                      r.contents.hasOwnProperty(e) && t.push(e);
                    return t;
                  },
                  symlink: function (r, t, e) {
                    var n = tr.createNode(r, t, 41471, 0);
                    return (n.link = e), n;
                  },
                  readlink: function (r) {
                    if (!er.isLink(r.mode)) throw new er.ErrnoError(28);
                    return r.link;
                  },
                },
                stream_ops: {
                  read: function (r, t, e, n, o) {
                    var i = r.node.contents;
                    if (o >= r.node.usedBytes) return 0;
                    var a = Math.min(r.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), e);
                    else for (var s = 0; s < a; s++) t[e + s] = i[o + s];
                    return a;
                  },
                  write: function (r, t, e, n, o, i) {
                    if ((t.buffer === y.buffer && (i = !1), !n)) return 0;
                    var a = r.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(e, e + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(e, e + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(e, e + n), o), n;
                    }
                    if (
                      (tr.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(e, e + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[e + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek: function (r, t, e) {
                    var n = t;
                    if (
                      (1 === e
                        ? (n += r.position)
                        : 2 === e &&
                          er.isFile(r.node.mode) &&
                          (n += r.node.usedBytes),
                      n < 0)
                    )
                      throw new er.ErrnoError(28);
                    return n;
                  },
                  allocate: function (r, t, e) {
                    tr.expandFileStorage(r.node, t + e),
                      (r.node.usedBytes = Math.max(r.node.usedBytes, t + e));
                  },
                  mmap: function (r, t, e, n, o, i, a) {
                    if (!er.isFile(r.node.mode)) throw new er.ErrnoError(43);
                    var s,
                      u,
                      c = r.node.contents;
                    if (2 & a || c.buffer !== t.buffer) {
                      (o > 0 || o + n < r.node.usedBytes) &&
                        (c = c.subarray
                          ? c.subarray(o, o + n)
                          : Array.prototype.slice.call(c, o, o + n)),
                        (u = !0);
                      var f = t.buffer == y.buffer;
                      if (!(s = Mr(n))) throw new er.ErrnoError(48);
                      (f ? y : t).set(c, s);
                    } else (u = !1), (s = c.byteOffset);
                    return { ptr: s, allocated: u };
                  },
                  msync: function (r, t, e, n, o) {
                    if (!er.isFile(r.node.mode)) throw new er.ErrnoError(43);
                    return 2 & o || tr.stream_ops.write(r, t, 0, n, e, !1), 0;
                  },
                },
              },
              er = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: '/',
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (r) {
                  if (!(r instanceof er.ErrnoError)) throw r + ' : ' + G();
                  return $(r.errno);
                },
                lookupPath: function (r, t) {
                  if (((t = t || {}), !(r = Q.resolve(er.cwd(), r))))
                    return { path: '', node: null };
                  var e = { follow_mount: !0, recurse_count: 0 };
                  for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                  if (t.recurse_count > 8) throw new er.ErrnoError(32);
                  for (
                    var o = K.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !1,
                      ),
                      i = er.root,
                      a = '/',
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && t.parent) break;
                    if (
                      ((i = er.lookupNode(i, o[s])),
                      (a = K.join2(a, o[s])),
                      er.isMountpoint(i) &&
                        (!u || (u && t.follow_mount)) &&
                        (i = i.mounted.root),
                      !u || t.follow)
                    )
                      for (var c = 0; er.isLink(i.mode); ) {
                        var f = er.readlink(a);
                        if (
                          ((a = Q.resolve(K.dirname(a), f)),
                          (i = er.lookupPath(a, {
                            recurse_count: t.recurse_count,
                          }).node),
                          c++ > 40)
                        )
                          throw new er.ErrnoError(32);
                      }
                  }
                  return { path: a, node: i };
                },
                getPath: function (r) {
                  for (var t; ; ) {
                    if (er.isRoot(r)) {
                      var e = r.mount.mountpoint;
                      return t
                        ? '/' !== e[e.length - 1]
                          ? e + '/' + t
                          : e + t
                        : e;
                    }
                    (t = t ? r.name + '/' + t : r.name), (r = r.parent);
                  }
                },
                hashName: function (r, t) {
                  for (var e = 0, n = 0; n < t.length; n++)
                    e = ((e << 5) - e + t.charCodeAt(n)) | 0;
                  return ((r + e) >>> 0) % er.nameTable.length;
                },
                hashAddNode: function (r) {
                  var t = er.hashName(r.parent.id, r.name);
                  (r.name_next = er.nameTable[t]), (er.nameTable[t] = r);
                },
                hashRemoveNode: function (r) {
                  var t = er.hashName(r.parent.id, r.name);
                  if (er.nameTable[t] === r) er.nameTable[t] = r.name_next;
                  else
                    for (var e = er.nameTable[t]; e; ) {
                      if (e.name_next === r) {
                        e.name_next = r.name_next;
                        break;
                      }
                      e = e.name_next;
                    }
                },
                lookupNode: function (r, t) {
                  var e = er.mayLookup(r);
                  if (e) throw new er.ErrnoError(e, r);
                  for (
                    var n = er.hashName(r.id, t), o = er.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === r.id && i === t) return o;
                  }
                  return er.lookup(r, t);
                },
                createNode: function (r, t, e, n) {
                  er.FSNode ||
                    ((er.FSNode = function (r, t, e, n) {
                      r || (r = this),
                        (this.parent = r),
                        (this.mount = r.mount),
                        (this.mounted = null),
                        (this.id = er.nextInode++),
                        (this.name = t),
                        (this.mode = e),
                        (this.node_ops = {}),
                        (this.stream_ops = {}),
                        (this.rdev = n);
                    }),
                    (er.FSNode.prototype = {}),
                    Object.defineProperties(er.FSNode.prototype, {
                      read: {
                        get: function () {
                          return 365 == (365 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 365) : (this.mode &= -366);
                        },
                      },
                      write: {
                        get: function () {
                          return 146 == (146 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 146) : (this.mode &= -147);
                        },
                      },
                      isFolder: {
                        get: function () {
                          return er.isDir(this.mode);
                        },
                      },
                      isDevice: {
                        get: function () {
                          return er.isChrdev(this.mode);
                        },
                      },
                    }));
                  var o = new er.FSNode(r, t, e, n);
                  return er.hashAddNode(o), o;
                },
                destroyNode: function (r) {
                  er.hashRemoveNode(r);
                },
                isRoot: function (r) {
                  return r === r.parent;
                },
                isMountpoint: function (r) {
                  return !!r.mounted;
                },
                isFile: function (r) {
                  return 32768 == (61440 & r);
                },
                isDir: function (r) {
                  return 16384 == (61440 & r);
                },
                isLink: function (r) {
                  return 40960 == (61440 & r);
                },
                isChrdev: function (r) {
                  return 8192 == (61440 & r);
                },
                isBlkdev: function (r) {
                  return 24576 == (61440 & r);
                },
                isFIFO: function (r) {
                  return 4096 == (61440 & r);
                },
                isSocket: function (r) {
                  return 49152 == (49152 & r);
                },
                flagModes: {
                  r: 0,
                  rs: 1052672,
                  'r+': 2,
                  w: 577,
                  wx: 705,
                  xw: 705,
                  'w+': 578,
                  'wx+': 706,
                  'xw+': 706,
                  a: 1089,
                  ax: 1217,
                  xa: 1217,
                  'a+': 1090,
                  'ax+': 1218,
                  'xa+': 1218,
                },
                modeStringToFlags: function (r) {
                  var t = er.flagModes[r];
                  if (void 0 === t)
                    throw new Error('Unknown file open mode: ' + r);
                  return t;
                },
                flagsToPermissionString: function (r) {
                  var t = ['r', 'w', 'rw'][3 & r];
                  return 512 & r && (t += 'w'), t;
                },
                nodePermissions: function (r, t) {
                  return er.ignorePermissions ||
                    ((-1 === t.indexOf('r') || 292 & r.mode) &&
                      (-1 === t.indexOf('w') || 146 & r.mode) &&
                      (-1 === t.indexOf('x') || 73 & r.mode))
                    ? 0
                    : 2;
                },
                mayLookup: function (r) {
                  var t = er.nodePermissions(r, 'x');
                  return t || (r.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (r, t) {
                  try {
                    return er.lookupNode(r, t), 20;
                  } catch (r) {}
                  return er.nodePermissions(r, 'wx');
                },
                mayDelete: function (r, t, e) {
                  var n;
                  try {
                    n = er.lookupNode(r, t);
                  } catch (r) {
                    return r.errno;
                  }
                  var o = er.nodePermissions(r, 'wx');
                  if (o) return o;
                  if (e) {
                    if (!er.isDir(n.mode)) return 54;
                    if (er.isRoot(n) || er.getPath(n) === er.cwd()) return 10;
                  } else if (er.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (r, t) {
                  return r
                    ? er.isLink(r.mode)
                      ? 32
                      : er.isDir(r.mode) &&
                        ('r' !== er.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : er.nodePermissions(r, er.flagsToPermissionString(t))
                    : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (r, t) {
                  (r = r || 0), (t = t || er.MAX_OPEN_FDS);
                  for (var e = r; e <= t; e++) if (!er.streams[e]) return e;
                  throw new er.ErrnoError(33);
                },
                getStream: function (r) {
                  return er.streams[r];
                },
                createStream: function (r, t, e) {
                  er.FSStream ||
                    ((er.FSStream = function () {}),
                    (er.FSStream.prototype = {}),
                    Object.defineProperties(er.FSStream.prototype, {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (r) {
                          this.node = r;
                        },
                      },
                      isRead: {
                        get: function () {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get: function () {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get: function () {
                          return 1024 & this.flags;
                        },
                      },
                    }));
                  var n = new er.FSStream();
                  for (var o in r) n[o] = r[o];
                  r = n;
                  var i = er.nextfd(t, e);
                  return (r.fd = i), (er.streams[i] = r), r;
                },
                closeStream: function (r) {
                  er.streams[r] = null;
                },
                chrdev_stream_ops: {
                  open: function (r) {
                    var t = er.getDevice(r.node.rdev);
                    (r.stream_ops = t.stream_ops),
                      r.stream_ops.open && r.stream_ops.open(r);
                  },
                  llseek: function () {
                    throw new er.ErrnoError(70);
                  },
                },
                major: function (r) {
                  return r >> 8;
                },
                minor: function (r) {
                  return 255 & r;
                },
                makedev: function (r, t) {
                  return (r << 8) | t;
                },
                registerDevice: function (r, t) {
                  er.devices[r] = { stream_ops: t };
                },
                getDevice: function (r) {
                  return er.devices[r];
                },
                getMounts: function (r) {
                  for (var t = [], e = [r]; e.length; ) {
                    var n = e.pop();
                    t.push(n), e.push.apply(e, n.mounts);
                  }
                  return t;
                },
                syncfs: function (r, t) {
                  'function' == typeof r && ((t = r), (r = !1)),
                    er.syncFSRequests++,
                    er.syncFSRequests > 1 &&
                      l(
                        'warning: ' +
                          er.syncFSRequests +
                          ' FS.syncfs operations in flight at once, probably just doing extra work',
                      );
                  var e = er.getMounts(er.root.mount),
                    n = 0;
                  function o(r) {
                    return er.syncFSRequests--, t(r);
                  }
                  function i(r) {
                    if (r) return i.errored ? void 0 : ((i.errored = !0), o(r));
                    ++n >= e.length && o(null);
                  }
                  e.forEach(function (t) {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, r, i);
                  });
                },
                mount: function (r, t, e) {
                  var n,
                    o = '/' === e,
                    i = !e;
                  if (o && er.root) throw new er.ErrnoError(10);
                  if (!o && !i) {
                    var a = er.lookupPath(e, { follow_mount: !1 });
                    if (((e = a.path), (n = a.node), er.isMountpoint(n)))
                      throw new er.ErrnoError(10);
                    if (!er.isDir(n.mode)) throw new er.ErrnoError(54);
                  }
                  var s = { type: r, opts: t, mountpoint: e, mounts: [] },
                    u = r.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (er.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount: function (r) {
                  var t = er.lookupPath(r, { follow_mount: !1 });
                  if (!er.isMountpoint(t.node)) throw new er.ErrnoError(28);
                  var e = t.node,
                    n = e.mounted,
                    o = er.getMounts(n);
                  Object.keys(er.nameTable).forEach(function (r) {
                    for (var t = er.nameTable[r]; t; ) {
                      var e = t.name_next;
                      -1 !== o.indexOf(t.mount) && er.destroyNode(t), (t = e);
                    }
                  }),
                    (e.mounted = null);
                  var i = e.mount.mounts.indexOf(n);
                  e.mount.mounts.splice(i, 1);
                },
                lookup: function (r, t) {
                  return r.node_ops.lookup(r, t);
                },
                mknod: function (r, t, e) {
                  var n = er.lookupPath(r, { parent: !0 }).node,
                    o = K.basename(r);
                  if (!o || '.' === o || '..' === o)
                    throw new er.ErrnoError(28);
                  var i = er.mayCreate(n, o);
                  if (i) throw new er.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new er.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, e);
                },
                create: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 438),
                    (t &= 4095),
                    (t |= 32768),
                    er.mknod(r, t, 0)
                  );
                },
                mkdir: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 511),
                    (t &= 1023),
                    (t |= 16384),
                    er.mknod(r, t, 0)
                  );
                },
                mkdirTree: function (r, t) {
                  for (var e = r.split('/'), n = '', o = 0; o < e.length; ++o)
                    if (e[o]) {
                      n += '/' + e[o];
                      try {
                        er.mkdir(n, t);
                      } catch (r) {
                        if (20 != r.errno) throw r;
                      }
                    }
                },
                mkdev: function (r, t, e) {
                  return (
                    void 0 === e && ((e = t), (t = 438)),
                    (t |= 8192),
                    er.mknod(r, t, e)
                  );
                },
                symlink: function (r, t) {
                  if (!Q.resolve(r)) throw new er.ErrnoError(44);
                  var e = er.lookupPath(t, { parent: !0 }).node;
                  if (!e) throw new er.ErrnoError(44);
                  var n = K.basename(t),
                    o = er.mayCreate(e, n);
                  if (o) throw new er.ErrnoError(o);
                  if (!e.node_ops.symlink) throw new er.ErrnoError(63);
                  return e.node_ops.symlink(e, n, r);
                },
                rename: function (r, t) {
                  var e,
                    n,
                    o = K.dirname(r),
                    i = K.dirname(t),
                    a = K.basename(r),
                    s = K.basename(t);
                  try {
                    (e = er.lookupPath(r, { parent: !0 }).node),
                      (n = er.lookupPath(t, { parent: !0 }).node);
                  } catch (r) {
                    throw new er.ErrnoError(10);
                  }
                  if (!e || !n) throw new er.ErrnoError(44);
                  if (e.mount !== n.mount) throw new er.ErrnoError(75);
                  var u,
                    c = er.lookupNode(e, a),
                    f = Q.relative(r, i);
                  if ('.' !== f.charAt(0)) throw new er.ErrnoError(28);
                  if ('.' !== (f = Q.relative(t, o)).charAt(0))
                    throw new er.ErrnoError(55);
                  try {
                    u = er.lookupNode(n, s);
                  } catch (r) {}
                  if (c !== u) {
                    var d = er.isDir(c.mode),
                      p = er.mayDelete(e, a, d);
                    if (p) throw new er.ErrnoError(p);
                    if ((p = u ? er.mayDelete(n, s, d) : er.mayCreate(n, s)))
                      throw new er.ErrnoError(p);
                    if (!e.node_ops.rename) throw new er.ErrnoError(63);
                    if (er.isMountpoint(c) || (u && er.isMountpoint(u)))
                      throw new er.ErrnoError(10);
                    if (n !== e && (p = er.nodePermissions(e, 'w')))
                      throw new er.ErrnoError(p);
                    try {
                      er.trackingDelegate.willMovePath &&
                        er.trackingDelegate.willMovePath(r, t);
                    } catch (e) {
                      l(
                        "FS.trackingDelegate['willMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                    er.hashRemoveNode(c);
                    try {
                      e.node_ops.rename(c, n, s);
                    } catch (r) {
                      throw r;
                    } finally {
                      er.hashAddNode(c);
                    }
                    try {
                      er.trackingDelegate.onMovePath &&
                        er.trackingDelegate.onMovePath(r, t);
                    } catch (e) {
                      l(
                        "FS.trackingDelegate['onMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                  }
                },
                rmdir: function (r) {
                  var t = er.lookupPath(r, { parent: !0 }).node,
                    e = K.basename(r),
                    n = er.lookupNode(t, e),
                    o = er.mayDelete(t, e, !0);
                  if (o) throw new er.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new er.ErrnoError(63);
                  if (er.isMountpoint(n)) throw new er.ErrnoError(10);
                  try {
                    er.trackingDelegate.willDeletePath &&
                      er.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.rmdir(t, e), er.destroyNode(n);
                  try {
                    er.trackingDelegate.onDeletePath &&
                      er.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readdir: function (r) {
                  var t = er.lookupPath(r, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new er.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink: function (r) {
                  var t = er.lookupPath(r, { parent: !0 }).node,
                    e = K.basename(r),
                    n = er.lookupNode(t, e),
                    o = er.mayDelete(t, e, !1);
                  if (o) throw new er.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new er.ErrnoError(63);
                  if (er.isMountpoint(n)) throw new er.ErrnoError(10);
                  try {
                    er.trackingDelegate.willDeletePath &&
                      er.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.unlink(t, e), er.destroyNode(n);
                  try {
                    er.trackingDelegate.onDeletePath &&
                      er.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readlink: function (r) {
                  var t = er.lookupPath(r).node;
                  if (!t) throw new er.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new er.ErrnoError(28);
                  return Q.resolve(
                    er.getPath(t.parent),
                    t.node_ops.readlink(t),
                  );
                },
                stat: function (r, t) {
                  var e = er.lookupPath(r, { follow: !t }).node;
                  if (!e) throw new er.ErrnoError(44);
                  if (!e.node_ops.getattr) throw new er.ErrnoError(63);
                  return e.node_ops.getattr(e);
                },
                lstat: function (r) {
                  return er.stat(r, !0);
                },
                chmod: function (r, t, e) {
                  var n;
                  if (
                    !(n =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !e }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod: function (r, t) {
                  er.chmod(r, t, !0);
                },
                fchmod: function (r, t) {
                  var e = er.getStream(r);
                  if (!e) throw new er.ErrnoError(8);
                  er.chmod(e.node, t);
                },
                chown: function (r, t, e, n) {
                  var o;
                  if (
                    !(o =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !n }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (r, t, e) {
                  er.chown(r, t, e, !0);
                },
                fchown: function (r, t, e) {
                  var n = er.getStream(r);
                  if (!n) throw new er.ErrnoError(8);
                  er.chown(n.node, t, e);
                },
                truncate: function (r, t) {
                  if (t < 0) throw new er.ErrnoError(28);
                  var e;
                  if (
                    !(e =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !0 }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  if (er.isDir(e.mode)) throw new er.ErrnoError(31);
                  if (!er.isFile(e.mode)) throw new er.ErrnoError(28);
                  var n = er.nodePermissions(e, 'w');
                  if (n) throw new er.ErrnoError(n);
                  e.node_ops.setattr(e, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (r, t) {
                  var e = er.getStream(r);
                  if (!e) throw new er.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new er.ErrnoError(28);
                  er.truncate(e.node, t);
                },
                utime: function (r, t, e) {
                  var n = er.lookupPath(r, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, e) });
                },
                open: function (r, t, e, o, i) {
                  if ('' === r) throw new er.ErrnoError(44);
                  var a;
                  if (
                    ((e = void 0 === e ? 438 : e),
                    (e =
                      64 &
                      (t = 'string' == typeof t ? er.modeStringToFlags(t) : t)
                        ? (4095 & e) | 32768
                        : 0),
                    'object' == typeof r)
                  )
                    a = r;
                  else {
                    r = K.normalize(r);
                    try {
                      a = er.lookupPath(r, { follow: !(131072 & t) }).node;
                    } catch (r) {}
                  }
                  var s = !1;
                  if (64 & t)
                    if (a) {
                      if (128 & t) throw new er.ErrnoError(20);
                    } else (a = er.mknod(r, e, 0)), (s = !0);
                  if (!a) throw new er.ErrnoError(44);
                  if (
                    (er.isChrdev(a.mode) && (t &= -513),
                    65536 & t && !er.isDir(a.mode))
                  )
                    throw new er.ErrnoError(54);
                  if (!s) {
                    var u = er.mayOpen(a, t);
                    if (u) throw new er.ErrnoError(u);
                  }
                  512 & t && er.truncate(a, 0), (t &= -641);
                  var c = er.createStream(
                    {
                      node: a,
                      path: er.getPath(a),
                      flags: t,
                      seekable: !0,
                      position: 0,
                      stream_ops: a.stream_ops,
                      ungotten: [],
                      error: !1,
                    },
                    o,
                    i,
                  );
                  c.stream_ops.open && c.stream_ops.open(c),
                    !n.logReadFiles ||
                      1 & t ||
                      (er.readFiles || (er.readFiles = {}),
                      r in er.readFiles ||
                        ((er.readFiles[r] = 1),
                        l('FS.trackingDelegate error on read file: ' + r)));
                  try {
                    if (er.trackingDelegate.onOpenFile) {
                      var f = 0;
                      1 != (2097155 & t) && (f |= er.tracking.openFlags.READ),
                        0 != (2097155 & t) &&
                          (f |= er.tracking.openFlags.WRITE),
                        er.trackingDelegate.onOpenFile(r, f);
                    }
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onOpenFile']('" +
                        r +
                        "', flags) threw an exception: " +
                        t.message,
                    );
                  }
                  return c;
                },
                close: function (r) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  r.getdents && (r.getdents = null);
                  try {
                    r.stream_ops.close && r.stream_ops.close(r);
                  } catch (r) {
                    throw r;
                  } finally {
                    er.closeStream(r.fd);
                  }
                  r.fd = null;
                },
                isClosed: function (r) {
                  return null === r.fd;
                },
                llseek: function (r, t, e) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (!r.seekable || !r.stream_ops.llseek)
                    throw new er.ErrnoError(70);
                  if (0 != e && 1 != e && 2 != e) throw new er.ErrnoError(28);
                  return (
                    (r.position = r.stream_ops.llseek(r, t, e)),
                    (r.ungotten = []),
                    r.position
                  );
                },
                read: function (r, t, e, n, o) {
                  if (n < 0 || o < 0) throw new er.ErrnoError(28);
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (1 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (er.isDir(r.node.mode)) throw new er.ErrnoError(31);
                  if (!r.stream_ops.read) throw new er.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!r.seekable) throw new er.ErrnoError(70);
                  } else o = r.position;
                  var a = r.stream_ops.read(r, t, e, n, o);
                  return i || (r.position += a), a;
                },
                write: function (r, t, e, n, o, i) {
                  if (n < 0 || o < 0) throw new er.ErrnoError(28);
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (0 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (er.isDir(r.node.mode)) throw new er.ErrnoError(31);
                  if (!r.stream_ops.write) throw new er.ErrnoError(28);
                  1024 & r.flags && er.llseek(r, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!r.seekable) throw new er.ErrnoError(70);
                  } else o = r.position;
                  var s = r.stream_ops.write(r, t, e, n, o, i);
                  a || (r.position += s);
                  try {
                    r.path &&
                      er.trackingDelegate.onWriteToFile &&
                      er.trackingDelegate.onWriteToFile(r.path);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onWriteToFile']('" +
                        r.path +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  return s;
                },
                allocate: function (r, t, e) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (t < 0 || e <= 0) throw new er.ErrnoError(28);
                  if (0 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (!er.isFile(r.node.mode) && !er.isDir(r.node.mode))
                    throw new er.ErrnoError(43);
                  if (!r.stream_ops.allocate) throw new er.ErrnoError(138);
                  r.stream_ops.allocate(r, t, e);
                },
                mmap: function (r, t, e, n, o, i, a) {
                  if (0 != (2 & i) && 0 == (2 & a) && 2 != (2097155 & r.flags))
                    throw new er.ErrnoError(2);
                  if (1 == (2097155 & r.flags)) throw new er.ErrnoError(2);
                  if (!r.stream_ops.mmap) throw new er.ErrnoError(43);
                  return r.stream_ops.mmap(r, t, e, n, o, i, a);
                },
                msync: function (r, t, e, n, o) {
                  return r && r.stream_ops.msync
                    ? r.stream_ops.msync(r, t, e, n, o)
                    : 0;
                },
                munmap: function (r) {
                  return 0;
                },
                ioctl: function (r, t, e) {
                  if (!r.stream_ops.ioctl) throw new er.ErrnoError(59);
                  return r.stream_ops.ioctl(r, t, e);
                },
                readFile: function (r, t) {
                  if (
                    (((t = t || {}).flags = t.flags || 'r'),
                    (t.encoding = t.encoding || 'binary'),
                    'utf8' !== t.encoding && 'binary' !== t.encoding)
                  )
                    throw new Error(
                      'Invalid encoding type "' + t.encoding + '"',
                    );
                  var e,
                    n = er.open(r, t.flags),
                    o = er.stat(r).size,
                    i = new Uint8Array(o);
                  return (
                    er.read(n, i, 0, o, 0),
                    'utf8' === t.encoding
                      ? (e = E(i, 0))
                      : 'binary' === t.encoding && (e = i),
                    er.close(n),
                    e
                  );
                },
                writeFile: function (r, t, e) {
                  (e = e || {}).flags = e.flags || 'w';
                  var n = er.open(r, e.flags, e.mode);
                  if ('string' == typeof t) {
                    var o = new Uint8Array(D(t) + 1),
                      i = b(t, o, 0, o.length);
                    er.write(n, o, 0, i, void 0, e.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error('Unsupported data type');
                    er.write(n, t, 0, t.byteLength, void 0, e.canOwn);
                  }
                  er.close(n);
                },
                cwd: function () {
                  return er.currentPath;
                },
                chdir: function (r) {
                  var t = er.lookupPath(r, { follow: !0 });
                  if (null === t.node) throw new er.ErrnoError(44);
                  if (!er.isDir(t.node.mode)) throw new er.ErrnoError(54);
                  var e = er.nodePermissions(t.node, 'x');
                  if (e) throw new er.ErrnoError(e);
                  er.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                  er.mkdir('/tmp'),
                    er.mkdir('/home'),
                    er.mkdir('/home/web_user');
                },
                createDefaultDevices: function () {
                  var r;
                  if (
                    (er.mkdir('/dev'),
                    er.registerDevice(er.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (r, t, e, n, o) {
                        return n;
                      },
                    }),
                    er.mkdev('/dev/null', er.makedev(1, 3)),
                    rr.register(er.makedev(5, 0), rr.default_tty_ops),
                    rr.register(er.makedev(6, 0), rr.default_tty1_ops),
                    er.mkdev('/dev/tty', er.makedev(5, 0)),
                    er.mkdev('/dev/tty1', er.makedev(6, 0)),
                    'object' == typeof crypto &&
                      'function' == typeof crypto.getRandomValues)
                  ) {
                    var t = new Uint8Array(1);
                    r = function () {
                      return crypto.getRandomValues(t), t[0];
                    };
                  }
                  r ||
                    (r = function () {
                      H('random_device');
                    }),
                    er.createDevice('/dev', 'random', r),
                    er.createDevice('/dev', 'urandom', r),
                    er.mkdir('/dev/shm'),
                    er.mkdir('/dev/shm/tmp');
                },
                createSpecialDirectories: function () {
                  er.mkdir('/proc'),
                    er.mkdir('/proc/self'),
                    er.mkdir('/proc/self/fd'),
                    er.mount(
                      {
                        mount: function () {
                          var r = er.createNode('/proc/self', 'fd', 16895, 73);
                          return (
                            (r.node_ops = {
                              lookup: function (r, t) {
                                var e = +t,
                                  n = er.getStream(e);
                                if (!n) throw new er.ErrnoError(8);
                                var o = {
                                  parent: null,
                                  mount: { mountpoint: 'fake' },
                                  node_ops: {
                                    readlink: function () {
                                      return n.path;
                                    },
                                  },
                                };
                                return (o.parent = o), o;
                              },
                            }),
                            r
                          );
                        },
                      },
                      {},
                      '/proc/self/fd',
                    );
                },
                createStandardStreams: function () {
                  n.stdin
                    ? er.createDevice('/dev', 'stdin', n.stdin)
                    : er.symlink('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? er.createDevice('/dev', 'stdout', null, n.stdout)
                      : er.symlink('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? er.createDevice('/dev', 'stderr', null, n.stderr)
                      : er.symlink('/dev/tty1', '/dev/stderr'),
                    er.open('/dev/stdin', 'r'),
                    er.open('/dev/stdout', 'w'),
                    er.open('/dev/stderr', 'w');
                },
                ensureErrnoError: function () {
                  er.ErrnoError ||
                    ((er.ErrnoError = function (r, t) {
                      (this.node = t),
                        (this.setErrno = function (r) {
                          this.errno = r;
                        }),
                        this.setErrno(r),
                        (this.message = 'FS error');
                    }),
                    (er.ErrnoError.prototype = new Error()),
                    (er.ErrnoError.prototype.constructor = er.ErrnoError),
                    [44].forEach(function (r) {
                      (er.genericErrors[r] = new er.ErrnoError(r)),
                        (er.genericErrors[r].stack =
                          '<generic error, no stack>');
                    }));
                },
                staticInit: function () {
                  er.ensureErrnoError(),
                    (er.nameTable = new Array(4096)),
                    er.mount(tr, {}, '/'),
                    er.createDefaultDirectories(),
                    er.createDefaultDevices(),
                    er.createSpecialDirectories(),
                    (er.filesystems = { MEMFS: tr });
                },
                init: function (r, t, e) {
                  (er.init.initialized = !0),
                    er.ensureErrnoError(),
                    (n.stdin = r || n.stdin),
                    (n.stdout = t || n.stdout),
                    (n.stderr = e || n.stderr),
                    er.createStandardStreams();
                },
                quit: function () {
                  er.init.initialized = !1;
                  var r = n._fflush;
                  r && r(0);
                  for (var t = 0; t < er.streams.length; t++) {
                    var e = er.streams[t];
                    e && er.close(e);
                  }
                },
                getMode: function (r, t) {
                  var e = 0;
                  return r && (e |= 365), t && (e |= 146), e;
                },
                joinPath: function (r, t) {
                  var e = K.join.apply(null, r);
                  return t && '/' == e[0] && (e = e.substr(1)), e;
                },
                absolutePath: function (r, t) {
                  return Q.resolve(t, r);
                },
                standardizePath: function (r) {
                  return K.normalize(r);
                },
                findObject: function (r, t) {
                  var e = er.analyzePath(r, t);
                  return e.exists ? e.object : ($(e.error), null);
                },
                analyzePath: function (r, t) {
                  try {
                    r = (n = er.lookupPath(r, { follow: !t })).path;
                  } catch (r) {}
                  var e = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = er.lookupPath(r, { parent: !0 });
                    (e.parentExists = !0),
                      (e.parentPath = n.path),
                      (e.parentObject = n.node),
                      (e.name = K.basename(r)),
                      (n = er.lookupPath(r, { follow: !t })),
                      (e.exists = !0),
                      (e.path = n.path),
                      (e.object = n.node),
                      (e.name = n.node.name),
                      (e.isRoot = '/' === n.path);
                  } catch (r) {
                    e.error = r.errno;
                  }
                  return e;
                },
                createFolder: function (r, t, e, n) {
                  var o = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    i = er.getMode(e, n);
                  return er.mkdir(o, i);
                },
                createPath: function (r, t, e, n) {
                  r = 'string' == typeof r ? r : er.getPath(r);
                  for (var o = t.split('/').reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = K.join2(r, i);
                      try {
                        er.mkdir(a);
                      } catch (r) {}
                      r = a;
                    }
                  }
                  return a;
                },
                createFile: function (r, t, e, n, o) {
                  var i = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    a = er.getMode(n, o);
                  return er.create(i, a);
                },
                createDataFile: function (r, t, e, n, o, i) {
                  var a = t
                      ? K.join2('string' == typeof r ? r : er.getPath(r), t)
                      : r,
                    s = er.getMode(n, o),
                    u = er.create(a, s);
                  if (e) {
                    if ('string' == typeof e) {
                      for (
                        var c = new Array(e.length), f = 0, l = e.length;
                        f < l;
                        ++f
                      )
                        c[f] = e.charCodeAt(f);
                      e = c;
                    }
                    er.chmod(u, 146 | s);
                    var d = er.open(u, 'w');
                    er.write(d, e, 0, e.length, 0, i),
                      er.close(d),
                      er.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (r, t, e, n) {
                  var o = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    i = er.getMode(!!e, !!n);
                  er.createDevice.major || (er.createDevice.major = 64);
                  var a = er.makedev(er.createDevice.major++, 0);
                  return (
                    er.registerDevice(a, {
                      open: function (r) {
                        r.seekable = !1;
                      },
                      close: function (r) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (r, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = e();
                          } catch (r) {
                            throw new er.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new er.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (r.node.timestamp = Date.now()), a;
                      },
                      write: function (r, t, e, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[e + a]);
                          } catch (r) {
                            throw new er.ErrnoError(29);
                          }
                        return o && (r.node.timestamp = Date.now()), a;
                      },
                    }),
                    er.mkdev(o, i, a)
                  );
                },
                createLink: function (r, t, e, n, o) {
                  var i = K.join2('string' == typeof r ? r : er.getPath(r), t);
                  return er.symlink(e, i);
                },
                forceLoadFile: function (r) {
                  if (r.isDevice || r.isFolder || r.link || r.contents)
                    return !0;
                  var t = !0;
                  if ('undefined' != typeof XMLHttpRequest)
                    throw new Error(
                      'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
                    );
                  if (!i)
                    throw new Error(
                      'Cannot load without read() or XMLHttpRequest.',
                    );
                  try {
                    (r.contents = ur(i(r.url), !0)),
                      (r.usedBytes = r.contents.length);
                  } catch (r) {
                    t = !1;
                  }
                  return t || $(29), t;
                },
                createLazyFile: function (r, t, e, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (r) {
                      if (!(r > this.length - 1 || r < 0)) {
                        var t = r % this.chunkSize,
                          e = (r / this.chunkSize) | 0;
                        return this.getter(e)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (r) {
                      this.getter = r;
                    }),
                    (i.prototype.cacheLength = function () {
                      var r = new XMLHttpRequest();
                      if (
                        (r.open('HEAD', e, !1),
                        r.send(null),
                        !(
                          (r.status >= 200 && r.status < 300) ||
                          304 === r.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + e + '. Status: ' + r.status,
                        );
                      var t,
                        n = Number(r.getResponseHeader('Content-length')),
                        o =
                          (t = r.getResponseHeader('Accept-Ranges')) &&
                          'bytes' === t,
                        i =
                          (t = r.getResponseHeader('Content-Encoding')) &&
                          'gzip' === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter(function (r) {
                        var t = r * a,
                          o = (r + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[r] &&
                            (s.chunks[r] = (function (r, t) {
                              if (r > t)
                                throw new Error(
                                  'invalid range (' +
                                    r +
                                    ', ' +
                                    t +
                                    ') or no bytes requested!',
                                );
                              if (t > n - 1)
                                throw new Error(
                                  'only ' +
                                    n +
                                    ' bytes available! programmer error!',
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open('GET', e, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    'Range',
                                    'bytes=' + r + '-' + t,
                                  ),
                                'undefined' != typeof Uint8Array &&
                                  (o.responseType = 'arraybuffer'),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    'text/plain; charset=x-user-defined',
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " +
                                    e +
                                    '. Status: ' +
                                    o.status,
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : ur(o.responseText || '', !0);
                            })(t, o)),
                          void 0 === s.chunks[r])
                        )
                          throw new Error('doXHR failed!');
                        return s.chunks[r];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          f(
                            'LazyFiles on gzip forces download of the whole file when length is accessed',
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    'undefined' != typeof XMLHttpRequest)
                  )
                    throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
                  var a = { isDevice: !1, url: e },
                    s = er.createFile(r, t, a, n, o);
                  a.contents
                    ? (s.contents = a.contents)
                    : a.url && ((s.contents = null), (s.url = a.url)),
                    Object.defineProperties(s, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var u = {};
                  return (
                    Object.keys(s.stream_ops).forEach(function (r) {
                      var t = s.stream_ops[r];
                      u[r] = function () {
                        if (!er.forceLoadFile(s)) throw new er.ErrnoError(29);
                        return t.apply(null, arguments);
                      };
                    }),
                    (u.read = function (r, t, e, n, o) {
                      if (!er.forceLoadFile(s)) throw new er.ErrnoError(29);
                      var i = r.node.contents;
                      if (o >= i.length) return 0;
                      var a = Math.min(i.length - o, n);
                      if (i.slice)
                        for (var u = 0; u < a; u++) t[e + u] = i[o + u];
                      else for (u = 0; u < a; u++) t[e + u] = i.get(o + u);
                      return a;
                    }),
                    (s.stream_ops = u),
                    s
                  );
                },
                createPreloadedFile: function (r, t, e, o, i, a, s, u, c, f) {
                  Browser.init();
                  var l = t ? Q.resolve(K.join2(r, t)) : r;
                  function d(e) {
                    function d(e) {
                      f && f(),
                        u || er.createDataFile(r, t, e, o, i, c),
                        a && a(),
                        I();
                    }
                    var p = !1;
                    n.preloadPlugins.forEach(function (r) {
                      p ||
                        (r.canHandle(l) &&
                          (r.handle(e, l, d, function () {
                            s && s(), I();
                          }),
                          (p = !0)));
                    }),
                      p || d(e);
                  }
                  L(),
                    'string' == typeof e
                      ? Browser.asyncLoad(
                          e,
                          function (r) {
                            d(r);
                          },
                          s,
                        )
                      : d(e);
                },
                indexedDB: function () {
                  return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                  );
                },
                DB_NAME: function () {
                  return 'EM_FS_' + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: 'FILE_DATA',
                saveFilesToDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = er.indexedDB();
                  try {
                    var o = n.open(er.DB_NAME(), er.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = function () {
                    f('creating db'),
                      o.result.createObjectStore(er.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction(
                          [er.DB_STORE_NAME],
                          'readwrite',
                        ),
                        i = n.objectStore(er.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        u = r.length;
                      function c() {
                        0 == s ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = i.put(er.analyzePath(r).object.contents, r);
                        (t.onsuccess = function () {
                          ++a + s == u && c();
                        }),
                          (t.onerror = function () {
                            s++, a + s == u && c();
                          });
                      }),
                        (n.onerror = e);
                    }),
                    (o.onerror = e);
                },
                loadFilesFromDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = er.indexedDB();
                  try {
                    var o = n.open(er.DB_NAME(), er.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = e),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var i = n.transaction([er.DB_STORE_NAME], 'readonly');
                      } catch (r) {
                        return void e(r);
                      }
                      var a = i.objectStore(er.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = r.length;
                      function f() {
                        0 == u ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = a.get(r);
                        (t.onsuccess = function () {
                          er.analyzePath(r).exists && er.unlink(r),
                            er.createDataFile(
                              K.dirname(r),
                              K.basename(r),
                              t.result,
                              !0,
                              !0,
                              !0,
                            ),
                            ++s + u == c && f();
                        }),
                          (t.onerror = function () {
                            u++, s + u == c && f();
                          });
                      }),
                        (i.onerror = e);
                    }),
                    (o.onerror = e);
                },
              },
              nr = {
                DEFAULT_POLLMASK: 5,
                mappings: {},
                umask: 511,
                calculateAt: function (r, t) {
                  if ('/' !== t[0]) {
                    var e;
                    if (-100 === r) e = er.cwd();
                    else {
                      var n = er.getStream(r);
                      if (!n) throw new er.ErrnoError(8);
                      e = n.path;
                    }
                    t = K.join2(e, t);
                  }
                  return t;
                },
                doStat: function (r, t, e) {
                  try {
                    var n = r(t);
                  } catch (r) {
                    if (
                      r &&
                      r.node &&
                      K.normalize(t) !== K.normalize(er.getPath(r.node))
                    )
                      return -54;
                    throw r;
                  }
                  return (
                    (_[e >> 2] = n.dev),
                    (_[(e + 4) >> 2] = 0),
                    (_[(e + 8) >> 2] = n.ino),
                    (_[(e + 12) >> 2] = n.mode),
                    (_[(e + 16) >> 2] = n.nlink),
                    (_[(e + 20) >> 2] = n.uid),
                    (_[(e + 24) >> 2] = n.gid),
                    (_[(e + 28) >> 2] = n.rdev),
                    (_[(e + 32) >> 2] = 0),
                    (Y = [
                      n.size >>> 0,
                      ((q = n.size),
                      +O(q) >= 1
                        ? q > 0
                          ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                          : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (_[(e + 40) >> 2] = Y[0]),
                    (_[(e + 44) >> 2] = Y[1]),
                    (_[(e + 48) >> 2] = 4096),
                    (_[(e + 52) >> 2] = n.blocks),
                    (_[(e + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (_[(e + 60) >> 2] = 0),
                    (_[(e + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (_[(e + 68) >> 2] = 0),
                    (_[(e + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (_[(e + 76) >> 2] = 0),
                    (Y = [
                      n.ino >>> 0,
                      ((q = n.ino),
                      +O(q) >= 1
                        ? q > 0
                          ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                          : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (_[(e + 80) >> 2] = Y[0]),
                    (_[(e + 84) >> 2] = Y[1]),
                    0
                  );
                },
                doMsync: function (r, t, e, n, o) {
                  var i = v.slice(r, r + e);
                  er.msync(t, i, o, e, n);
                },
                doMkdir: function (r, t) {
                  return (
                    '/' === (r = K.normalize(r))[r.length - 1] &&
                      (r = r.substr(0, r.length - 1)),
                    er.mkdir(r, t, 0),
                    0
                  );
                },
                doMknod: function (r, t, e) {
                  switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return er.mknod(r, t, e), 0;
                },
                doReadlink: function (r, t, e) {
                  if (e <= 0) return -28;
                  var n = er.readlink(r),
                    o = Math.min(e, D(n)),
                    i = y[t + o];
                  return b(n, v, t, e + 1), (y[t + o] = i), o;
                },
                doAccess: function (r, t) {
                  if (-8 & t) return -28;
                  var e;
                  if (!(e = er.lookupPath(r, { follow: !0 }).node)) return -44;
                  var n = '';
                  return (
                    4 & t && (n += 'r'),
                    2 & t && (n += 'w'),
                    1 & t && (n += 'x'),
                    n && er.nodePermissions(e, n) ? -2 : 0
                  );
                },
                doDup: function (r, t, e) {
                  var n = er.getStream(e);
                  return n && er.close(n), er.open(r, t, 0, e, e).fd;
                },
                doReadv: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = _[(t + 8 * i) >> 2],
                      s = _[(t + (8 * i + 4)) >> 2],
                      u = er.read(r, y, a, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = _[(t + 8 * i) >> 2],
                      s = _[(t + (8 * i + 4)) >> 2],
                      u = er.write(r, y, a, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: 0,
                get: function (r) {
                  return (nr.varargs += 4), _[(nr.varargs - 4) >> 2];
                },
                getStr: function () {
                  return k(nr.get());
                },
                getStreamFromFD: function (r) {
                  void 0 === r && (r = nr.get());
                  var t = er.getStream(r);
                  if (!t) throw new er.ErrnoError(8);
                  return t;
                },
                get64: function () {
                  var r = nr.get();
                  return nr.get(), r;
                },
                getZero: function () {
                  nr.get();
                },
              };
            function or(r) {
              try {
                return c.grow((r - h.byteLength + 65535) >> 16), S(c.buffer), 1;
              } catch (r) {}
            }
            var ir = {};
            function ar() {
              if (!ar.strings) {
                var r = {
                  USER: 'web_user',
                  LOGNAME: 'web_user',
                  PATH: '/',
                  PWD: '/',
                  HOME: '/home/web_user',
                  LANG:
                    (
                      ('object' == typeof navigator &&
                        navigator.languages &&
                        navigator.languages[0]) ||
                      'C'
                    ).replace('-', '_') + '.UTF-8',
                  _: a || './this.program',
                };
                for (var t in ir) r[t] = ir[t];
                var e = [];
                for (var t in r) e.push(t + '=' + r[t]);
                ar.strings = e;
              }
              return ar.strings;
            }
            function sr(r, t) {
              sr.array || (sr.array = []);
              var e,
                n = sr.array;
              for (n.length = 0; (e = v[r++]); )
                100 === e || 102 === e
                  ? ((t = (t + 7) & -8), n.push(w[t >> 3]), (t += 8))
                  : ((t = (t + 3) & -4), n.push(_[t >> 2]), (t += 4));
              return n;
            }
            function ur(r, t, e) {
              var n = e > 0 ? e : D(r) + 1,
                o = new Array(n),
                i = b(r, o, 0, o.length);
              return t && (o.length = i), o;
            }
            er.staticInit();
            var cr = {
                h: function (r, t) {
                  nr.varargs = t;
                  try {
                    return Z;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      -r.errno
                    );
                  }
                },
                e: function () {
                  H();
                },
                a: function (r, t, e) {
                  var n = sr(t, e);
                  return X[r].apply(null, n);
                },
                c: function (r, t, e) {
                  v.set(v.subarray(t, t + e), r);
                },
                d: function (r) {
                  var t = v.length;
                  if (r > 2147418112) return !1;
                  for (var e, n, o = 1; o <= 4; o *= 2) {
                    var i = t * (1 + 0.2 / o);
                    if (
                      ((i = Math.min(i, r + 100663296)),
                      or(
                        Math.min(
                          2147418112,
                          ((e = Math.max(16777216, r, i)) % (n = 65536) > 0 &&
                            (e += n - (e % n)),
                          e),
                        ),
                      ))
                    )
                      return !0;
                  }
                  return !1;
                },
                f: function (r, t) {
                  var e = ar(),
                    n = 0;
                  return (
                    e.forEach(function (e, o) {
                      var i = t + n;
                      (_[(r + 4 * o) >> 2] = i),
                        (function (r, t, e) {
                          for (var n = 0; n < r.length; ++n)
                            y[t++ >> 0] = r.charCodeAt(n);
                          e || (y[t >> 0] = 0);
                        })(e, i),
                        (n += e.length + 1);
                    }),
                    0
                  );
                },
                g: function (r, t) {
                  var e = ar();
                  _[r >> 2] = e.length;
                  var n = 0;
                  return (
                    e.forEach(function (r) {
                      n += r.length + 1;
                    }),
                    (_[t >> 2] = n),
                    0
                  );
                },
                j: function (r) {
                  try {
                    var t = nr.getStreamFromFD(r);
                    return er.close(t), 0;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                i: function (r, t, e, n, o) {
                  try {
                    var i = nr.getStreamFromFD(r),
                      a = 4294967296 * e + (t >>> 0);
                    return a <= -9007199254740992 || a >= 9007199254740992
                      ? -61
                      : (er.llseek(i, a, n),
                        (Y = [
                          i.position >>> 0,
                          ((q = i.position),
                          +O(q) >= 1
                            ? q > 0
                              ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                              : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (_[o >> 2] = Y[0]),
                        (_[(o + 4) >> 2] = Y[1]),
                        i.getdents && 0 === a && 0 === n && (i.getdents = null),
                        0);
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                b: function (r, t, e, n) {
                  try {
                    var o = nr.getStreamFromFD(r),
                      i = nr.doWritev(o, t, e);
                    return (_[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                k: function (r) {
                  var t = Date.now();
                  return (
                    (_[r >> 2] = (t / 1e3) | 0),
                    (_[(r + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                    0
                  );
                },
                memory: c,
                table: d,
              },
              fr = (function () {
                var r = { a: cr };
                function t(r, t) {
                  var e = r.exports;
                  (n.asm = e), I();
                }
                function e(r) {
                  t(r.instance);
                }
                function o(t) {
                  return (
                    u || 'function' != typeof fetch
                      ? new Promise(function (r, t) {
                          r(V());
                        })
                      : fetch(J, { credentials: 'same-origin' })
                          .then(function (r) {
                            if (!r.ok)
                              throw (
                                "failed to load wasm binary file at '" + J + "'"
                              );
                            return r.arrayBuffer();
                          })
                          .catch(function () {
                            return V();
                          })
                  )
                    .then(function (t) {
                      return WebAssembly.instantiate(t, r);
                    })
                    .then(t, function (r) {
                      l('failed to asynchronously prepare wasm: ' + r), H(r);
                    });
                }
                if ((L(), n.instantiateWasm))
                  try {
                    return n.instantiateWasm(r, t);
                  } catch (r) {
                    return (
                      l(
                        'Module.instantiateWasm callback failed with error: ' +
                          r,
                      ),
                      !1
                    );
                  }
                return (
                  (function () {
                    if (
                      u ||
                      'function' != typeof WebAssembly.instantiateStreaming ||
                      U(J) ||
                      'function' != typeof fetch
                    )
                      return o(e);
                    fetch(J, { credentials: 'same-origin' }).then(function (t) {
                      return WebAssembly.instantiateStreaming(t, r).then(
                        e,
                        function (r) {
                          l('wasm streaming compile failed: ' + r),
                            l('falling back to ArrayBuffer instantiation'),
                            o(e);
                        },
                      );
                    });
                  })(),
                  {}
                );
              })();
            n.asm = fr;
            var lr,
              dr = (n.___wasm_call_ctors = function () {
                return (dr = n.___wasm_call_ctors = n.asm.l).apply(
                  null,
                  arguments,
                );
              }),
              pr = (n._emscripten_bind_CExpat_CExpat_0 = function () {
                return (pr = n._emscripten_bind_CExpat_CExpat_0 =
                  n.asm.m).apply(null, arguments);
              }),
              mr = (n._emscripten_bind_CExpat_create_0 = function () {
                return (mr = n._emscripten_bind_CExpat_create_0 =
                  n.asm.n).apply(null, arguments);
              }),
              hr = (n._emscripten_bind_CExpat_destroy_0 = function () {
                return (hr = n._emscripten_bind_CExpat_destroy_0 =
                  n.asm.o).apply(null, arguments);
              }),
              yr = (n._emscripten_bind_CExpat_parse_1 = function () {
                return (yr = n._emscripten_bind_CExpat_parse_1 = n.asm.p).apply(
                  null,
                  arguments,
                );
              }),
              vr = (n._emscripten_bind_CExpat_tag_0 = function () {
                return (vr = n._emscripten_bind_CExpat_tag_0 = n.asm.q).apply(
                  null,
                  arguments,
                );
              }),
              _r = (n._emscripten_bind_CExpat_attrs_0 = function () {
                return (_r = n._emscripten_bind_CExpat_attrs_0 = n.asm.r).apply(
                  null,
                  arguments,
                );
              }),
              wr = (n._emscripten_bind_CExpat_content_0 = function () {
                return (wr = n._emscripten_bind_CExpat_content_0 =
                  n.asm.s).apply(null, arguments);
              }),
              gr = (n._emscripten_bind_CExpat_startElement_0 = function () {
                return (gr = n._emscripten_bind_CExpat_startElement_0 =
                  n.asm.t).apply(null, arguments);
              }),
              Er = (n._emscripten_bind_CExpat_endElement_0 = function () {
                return (Er = n._emscripten_bind_CExpat_endElement_0 =
                  n.asm.u).apply(null, arguments);
              }),
              kr = (n._emscripten_bind_CExpat_characterData_0 = function () {
                return (kr = n._emscripten_bind_CExpat_characterData_0 =
                  n.asm.v).apply(null, arguments);
              }),
              br = (n._emscripten_bind_CExpat___destroy___0 = function () {
                return (br = n._emscripten_bind_CExpat___destroy___0 =
                  n.asm.w).apply(null, arguments);
              }),
              Dr = (n._emscripten_bind_CExpatJS_CExpatJS_0 = function () {
                return (Dr = n._emscripten_bind_CExpatJS_CExpatJS_0 =
                  n.asm.x).apply(null, arguments);
              }),
              Sr = (n._emscripten_bind_CExpatJS_startElement_0 = function () {
                return (Sr = n._emscripten_bind_CExpatJS_startElement_0 =
                  n.asm.y).apply(null, arguments);
              }),
              Fr = (n._emscripten_bind_CExpatJS_endElement_0 = function () {
                return (Fr = n._emscripten_bind_CExpatJS_endElement_0 =
                  n.asm.z).apply(null, arguments);
              }),
              Pr = (n._emscripten_bind_CExpatJS_characterData_0 = function () {
                return (Pr = n._emscripten_bind_CExpatJS_characterData_0 =
                  n.asm.A).apply(null, arguments);
              }),
              xr = (n._emscripten_bind_CExpatJS___destroy___0 = function () {
                return (xr = n._emscripten_bind_CExpatJS___destroy___0 =
                  n.asm.B).apply(null, arguments);
              }),
              Ar = (n._emscripten_bind_VoidPtr___destroy___0 = function () {
                return (Ar = n._emscripten_bind_VoidPtr___destroy___0 =
                  n.asm.C).apply(null, arguments);
              }),
              Mr = (n._malloc = function () {
                return (Mr = n._malloc = n.asm.D).apply(null, arguments);
              });
            function Cr(r) {
              function t() {
                lr ||
                  ((lr = !0),
                  p ||
                    ((R = !0),
                    n.noFSInit || er.init.initialized || er.init(),
                    rr.init(),
                    P(A),
                    (er.ignorePermissions = !1),
                    P(M),
                    n.onRuntimeInitialized && n.onRuntimeInitialized(),
                    (function () {
                      if (n.postRun)
                        for (
                          'function' == typeof n.postRun &&
                          (n.postRun = [n.postRun]);
                          n.postRun.length;

                        )
                          (r = n.postRun.shift()), C.unshift(r);
                      var r;
                      P(C);
                    })()));
              }
              B > 0 ||
                ((function () {
                  if (n.preRun)
                    for (
                      'function' == typeof n.preRun && (n.preRun = [n.preRun]);
                      n.preRun.length;

                    )
                      (r = n.preRun.shift()), x.unshift(r);
                  var r;
                  P(x);
                })(),
                B > 0 ||
                  (n.setStatus
                    ? (n.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          n.setStatus('');
                        }, 1),
                          t();
                      }, 1))
                    : t()));
            }
            if (
              ((n._free = function () {
                return (n._free = n.asm.E).apply(null, arguments);
              }),
              (n.___errno_location = function () {
                return (n.___errno_location = n.asm.F).apply(null, arguments);
              }),
              (n.stackAlloc = function () {
                return (n.stackAlloc = n.asm.G).apply(null, arguments);
              }),
              (n.dynCall_vi = function () {
                return (n.dynCall_vi = n.asm.H).apply(null, arguments);
              }),
              (n.asm = fr),
              (n.then = function (r) {
                if (lr) r(n);
                else {
                  var t = n.onRuntimeInitialized;
                  n.onRuntimeInitialized = function () {
                    t && t(), r(n);
                  };
                }
                return n;
              }),
              (N = function r() {
                lr || Cr(), lr || (N = r);
              }),
              (n.run = Cr),
              n.preInit)
            )
              for (
                'function' == typeof n.preInit && (n.preInit = [n.preInit]);
                n.preInit.length > 0;

              )
                n.preInit.pop()();
            function Rr() {}
            function Or(r) {
              return (r || Rr).__cache__;
            }
            function jr(r, t) {
              var e = Or(t),
                n = e[r];
              return (
                n ||
                (((n = Object.create((t || Rr).prototype)).ptr = r), (e[r] = n))
              );
            }
            Cr(),
              (Rr.prototype = Object.create(Rr.prototype)),
              (Rr.prototype.constructor = Rr),
              (Rr.prototype.__class__ = Rr),
              (Rr.__cache__ = {}),
              (n.WrapperObject = Rr),
              (n.getCache = Or),
              (n.wrapPointer = jr),
              (n.castObject = function (r, t) {
                return jr(r.ptr, t);
              }),
              (n.NULL = jr(0)),
              (n.destroy = function (r) {
                if (!r.__destroy__)
                  throw 'Error: Cannot destroy object. (Did you create it yourself?)';
                r.__destroy__(), delete Or(r.__class__)[r.ptr];
              }),
              (n.compare = function (r, t) {
                return r.ptr === t.ptr;
              }),
              (n.getPointer = function (r) {
                return r.ptr;
              }),
              (n.getClass = function (r) {
                return r.__class__;
              });
            var Tr,
              zr = {
                buffer: 0,
                size: 0,
                pos: 0,
                temps: [],
                needed: 0,
                prepare: function () {
                  if (zr.needed) {
                    for (var r = 0; r < zr.temps.length; r++)
                      n._free(zr.temps[r]);
                    (zr.temps.length = 0),
                      n._free(zr.buffer),
                      (zr.buffer = 0),
                      (zr.size += zr.needed),
                      (zr.needed = 0);
                  }
                  zr.buffer ||
                    ((zr.size += 128),
                    (zr.buffer = n._malloc(zr.size)),
                    m(zr.buffer)),
                    (zr.pos = 0);
                },
                alloc: function (r, t) {
                  m(zr.buffer);
                  var e,
                    o = t.BYTES_PER_ELEMENT,
                    i = r.length * o;
                  return (
                    (i = (i + 7) & -8),
                    zr.pos + i >= zr.size
                      ? (m(i > 0),
                        (zr.needed += i),
                        (e = n._malloc(i)),
                        zr.temps.push(e))
                      : ((e = zr.buffer + zr.pos), (zr.pos += i)),
                    e
                  );
                },
                copy: function (r, t, e) {
                  var n = e;
                  switch (t.BYTES_PER_ELEMENT) {
                    case 2:
                      n >>= 1;
                      break;
                    case 4:
                      n >>= 2;
                      break;
                    case 8:
                      n >>= 3;
                  }
                  for (var o = 0; o < r.length; o++) t[n + o] = r[o];
                },
              };
            function Br() {
              (this.ptr = pr()), (Or(Br)[this.ptr] = this);
            }
            function Nr() {
              (this.ptr = Dr()), (Or(Nr)[this.ptr] = this);
            }
            function Lr() {
              throw 'cannot construct a VoidPtr, no constructor in IDL';
            }
            return (
              (Br.prototype = Object.create(Rr.prototype)),
              (Br.prototype.constructor = Br),
              (Br.prototype.__class__ = Br),
              (Br.__cache__ = {}),
              (n.CExpat = Br),
              (Br.prototype.create = Br.prototype.create =
                function () {
                  var r = this.ptr;
                  return !!mr(r);
                }),
              (Br.prototype.destroy = Br.prototype.destroy =
                function () {
                  var r = this.ptr;
                  hr(r);
                }),
              (Br.prototype.parse = Br.prototype.parse =
                function (r) {
                  var t = this.ptr;
                  return (
                    zr.prepare(),
                    (r =
                      r && 'object' == typeof r
                        ? r.ptr
                        : (function (r) {
                            if ('string' == typeof r) {
                              var t = ur(r),
                                e = zr.alloc(t, y);
                              return zr.copy(t, y, e), e;
                            }
                            return r;
                          })(r)),
                    !!yr(t, r)
                  );
                }),
              (Br.prototype.tag = Br.prototype.tag =
                function () {
                  var r = this.ptr;
                  return k(vr(r));
                }),
              (Br.prototype.attrs = Br.prototype.attrs =
                function () {
                  var r = this.ptr;
                  return k(_r(r));
                }),
              (Br.prototype.content = Br.prototype.content =
                function () {
                  var r = this.ptr;
                  return k(wr(r));
                }),
              (Br.prototype.startElement = Br.prototype.startElement =
                function () {
                  var r = this.ptr;
                  gr(r);
                }),
              (Br.prototype.endElement = Br.prototype.endElement =
                function () {
                  var r = this.ptr;
                  Er(r);
                }),
              (Br.prototype.characterData = Br.prototype.characterData =
                function () {
                  var r = this.ptr;
                  kr(r);
                }),
              (Br.prototype.__destroy__ = Br.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  br(r);
                }),
              (Nr.prototype = Object.create(Br.prototype)),
              (Nr.prototype.constructor = Nr),
              (Nr.prototype.__class__ = Nr),
              (Nr.__cache__ = {}),
              (n.CExpatJS = Nr),
              (Nr.prototype.startElement = Nr.prototype.startElement =
                function () {
                  var r = this.ptr;
                  Sr(r);
                }),
              (Nr.prototype.endElement = Nr.prototype.endElement =
                function () {
                  var r = this.ptr;
                  Fr(r);
                }),
              (Nr.prototype.characterData = Nr.prototype.characterData =
                function () {
                  var r = this.ptr;
                  Pr(r);
                }),
              (Nr.prototype.__destroy__ = Nr.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  xr(r);
                }),
              (Lr.prototype = Object.create(Rr.prototype)),
              (Lr.prototype.constructor = Lr),
              (Lr.prototype.__class__ = Lr),
              (Lr.__cache__ = {}),
              (n.VoidPtr = Lr),
              (Lr.prototype.__destroy__ = Lr.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Ar(r);
                }),
              R || ((Tr = function () {}), M.unshift(Tr)),
              r
            );
          });
      r.exports = n;
    }),
    n = Object.freeze({ __proto__: null, default: e, __moduleExports: e }),
    o = new Function('return this;')().__hpcc_wasmFolder || void 0;
  function i(r) {
    if (void 0 === r) return o;
    var t = o;
    return (o = r), t;
  }
  function a(r) {
    var t = r.default || r;
    return (
      t.__hpcc_promise ||
        (t.__hpcc_promise = new Promise(function (r) {
          t({
            locateFile: function (r, t) {
              return (i() || t) + (r ? '/' : '') + r;
            },
          }).then(function (t) {
            delete t.then, r(t);
          });
        })),
      t.__hpcc_promise
    );
  }
  var s = (function () {
      function r(r, t) {
        (this.tag = r), (this.attrs = t), (this._content = '');
      }
      return (
        Object.defineProperty(r.prototype, 'content', {
          get: function () {
            return this._content;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (r.prototype.appendContent = function (r) {
          this._content += r;
        }),
        r
      );
    })(),
    u = (function () {
      function r() {
        this._stack = [];
      }
      return (
        (r.prototype.parse = function (r) {
          return c(r, this);
        }),
        (r.prototype.top = function () {
          return this._stack[this._stack.length - 1];
        }),
        (r.prototype.startElement = function (r, t) {
          var e = new s(r, t);
          return this._stack.push(e), e;
        }),
        (r.prototype.endElement = function (r) {
          return this._stack.pop();
        }),
        (r.prototype.characterData = function (r) {
          this.top().appendContent(r);
        }),
        r
      );
    })();
  function c(r, t) {
    return a(n).then(function (e) {
      var n = new e.CExpatJS();
      (n.startElement = function () {
        t.startElement(
          this.tag(),
          (function (r) {
            var t = {},
              e = r,
              n = '' + String.fromCharCode(1),
              o = '' + n + n;
            return (
              e
                .split(o)
                .filter(function (r) {
                  return !!r;
                })
                .forEach(function (r) {
                  var e = r.split(n);
                  t[e[0]] = e[1];
                }),
              t
            );
          })(this.attrs()),
        );
      }),
        (n.endElement = function () {
          t.endElement(this.tag());
        }),
        (n.characterData = function () {
          t.characterData(this.content());
        }),
        n.create();
      var o = n.parse(r);
      return n.destroy(), e.destroy(n), o;
    });
  }
  var f = t(function (r, t) {
      var e,
        n =
          ((e =
            'undefined' != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          function (r) {
            var t,
              n = void 0 !== (r = r || {}) ? r : {},
              o = {};
            for (t in n) n.hasOwnProperty(t) && (o[t] = n[t]);
            var i,
              a = './this.program',
              s = function (r, t) {
                throw t;
              },
              u = '';
            document.currentScript && (u = document.currentScript.src),
              e && (u = e),
              (u =
                0 !== u.indexOf('blob:')
                  ? u.substr(0, u.lastIndexOf('/') + 1)
                  : ''),
              (i = function (r) {
                var t = new XMLHttpRequest();
                return t.open('GET', r, !1), t.send(null), t.responseText;
              });
            var c = n.print || console.log.bind(console),
              f = n.printErr || console.warn.bind(console);
            for (t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
            (o = null),
              n.arguments && n.arguments,
              n.thisProgram && (a = n.thisProgram),
              n.quit && (s = n.quit);
            var l,
              d,
              p,
              m = 0,
              h = function (r) {
                m = r;
              };
            n.wasmBinary && (l = n.wasmBinary),
              n.noExitRuntime && (d = n.noExitRuntime),
              'object' != typeof WebAssembly &&
                f('no native wasm support detected');
            var y = new WebAssembly.Table({
                initial: 928,
                maximum: 928,
                element: 'anyfunc',
              }),
              v = !1;
            function _(r, t) {
              r || J('Assertion failed: ' + t);
            }
            var w,
              g,
              E,
              k,
              b,
              D,
              S =
                'undefined' != typeof TextDecoder
                  ? new TextDecoder('utf8')
                  : void 0;
            function F(r, t, e) {
              for (var n = t + e, o = t; r[o] && !(o >= n); ) ++o;
              if (o - t > 16 && r.subarray && S)
                return S.decode(r.subarray(t, o));
              for (var i = ''; t < o; ) {
                var a = r[t++];
                if (128 & a) {
                  var s = 63 & r[t++];
                  if (192 != (224 & a)) {
                    var u = 63 & r[t++];
                    if (
                      (a =
                        224 == (240 & a)
                          ? ((15 & a) << 12) | (s << 6) | u
                          : ((7 & a) << 18) |
                            (s << 12) |
                            (u << 6) |
                            (63 & r[t++])) < 65536
                    )
                      i += String.fromCharCode(a);
                    else {
                      var c = a - 65536;
                      i += String.fromCharCode(
                        55296 | (c >> 10),
                        56320 | (1023 & c),
                      );
                    }
                  } else i += String.fromCharCode(((31 & a) << 6) | s);
                } else i += String.fromCharCode(a);
              }
              return i;
            }
            function P(r, t) {
              return r ? F(E, r, t) : '';
            }
            function x(r, t, e, n) {
              if (!(n > 0)) return 0;
              for (var o = e, i = e + n - 1, a = 0; a < r.length; ++a) {
                var s = r.charCodeAt(a);
                if (
                  (s >= 55296 &&
                    s <= 57343 &&
                    (s =
                      (65536 + ((1023 & s) << 10)) |
                      (1023 & r.charCodeAt(++a))),
                  s <= 127)
                ) {
                  if (e >= i) break;
                  t[e++] = s;
                } else if (s <= 2047) {
                  if (e + 1 >= i) break;
                  (t[e++] = 192 | (s >> 6)), (t[e++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (e + 2 >= i) break;
                  (t[e++] = 224 | (s >> 12)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                } else {
                  if (e + 3 >= i) break;
                  (t[e++] = 240 | (s >> 18)),
                    (t[e++] = 128 | ((s >> 12) & 63)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                }
              }
              return (t[e] = 0), e - o;
            }
            function A(r) {
              for (var t = 0, e = 0; e < r.length; ++e) {
                var n = r.charCodeAt(e);
                n >= 55296 &&
                  n <= 57343 &&
                  (n =
                    (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++e))),
                  n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return t;
            }
            function M(r) {
              (w = r),
                (n.HEAP8 = g = new Int8Array(r)),
                (n.HEAP16 = k = new Int16Array(r)),
                (n.HEAP32 = b = new Int32Array(r)),
                (n.HEAPU8 = E = new Uint8Array(r)),
                (n.HEAPU16 = new Uint16Array(r)),
                (n.HEAPU32 = new Uint32Array(r)),
                (n.HEAPF32 = new Float32Array(r)),
                (n.HEAPF64 = D = new Float64Array(r));
            }
            'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
            var C = n.TOTAL_MEMORY || 16777216;
            function R(r) {
              for (; r.length > 0; ) {
                var t = r.shift();
                if ('function' != typeof t) {
                  var e = t.func;
                  'number' == typeof e
                    ? void 0 === t.arg
                      ? n.dynCall_v(e)
                      : n.dynCall_vi(e, t.arg)
                    : e(void 0 === t.arg ? null : t.arg);
                } else t();
              }
            }
            (p = n.wasmMemory
              ? n.wasmMemory
              : new WebAssembly.Memory({ initial: C / 65536 })) &&
              (w = p.buffer),
              (C = w.byteLength),
              M(w),
              (b[54044] = 5459216);
            var O = [],
              j = [],
              T = [],
              z = [],
              B = !1,
              N = Math.abs,
              L = Math.ceil,
              I = Math.floor,
              H = Math.min,
              U = 0,
              W = null;
            function q(r) {
              U++, n.monitorRunDependencies && n.monitorRunDependencies(U);
            }
            function Y(r) {
              if (
                (U--,
                n.monitorRunDependencies && n.monitorRunDependencies(U),
                0 == U && W)
              ) {
                var t = W;
                (W = null), t();
              }
            }
            function J(r) {
              throw (
                (n.onAbort && n.onAbort(r),
                c((r += '')),
                f(r),
                (v = !0),
                (r =
                  'abort(' +
                  r +
                  '). Build with -s ASSERTIONS=1 for more info.'),
                new WebAssembly.RuntimeError(r))
              );
            }
            function V(r) {
              return String.prototype.startsWith
                ? r.startsWith('data:application/octet-stream;base64,')
                : 0 === r.indexOf('data:application/octet-stream;base64,');
            }
            (n.preloadedImages = {}), (n.preloadedAudios = {});
            var X,
              G,
              Z,
              K = 'graphvizlib.wasm';
            function $() {
              try {
                if (l) return new Uint8Array(l);
                throw 'both async and sync fetching of the wasm failed';
              } catch (r) {
                J(r);
              }
            }
            V(K) || ((X = K), (K = n.locateFile ? n.locateFile(X, u) : u + X));
            var Q = {
              1088: function (r, t) {
                var e = P(r),
                  n = P(t);
                sr.createPath('/', nr.dirname(e)),
                  sr.writeFile(nr.join('/', e), n);
              },
            };
            function rr() {
              var r = (function () {
                var r = new Error();
                if (!r.stack) {
                  try {
                    throw new Error();
                  } catch (t) {
                    r = t;
                  }
                  if (!r.stack) return '(no stack trace available)';
                }
                return r.stack.toString();
              })();
              return (
                n.extraStackTrace && (r += '\n' + n.extraStackTrace()),
                r.replace(/\b_Z[\w\d_]+/g, function (r) {
                  return r == r ? r : r + ' [' + r + ']';
                })
              );
            }
            function tr() {
              J();
            }
            function er(r) {
              return (
                n.___errno_location && (b[n.___errno_location() >> 2] = r), r
              );
            }
            j.push({
              func: function () {
                Fr();
              },
            });
            var nr = {
                splitPath: function (r) {
                  return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(r)
                    .slice(1);
                },
                normalizeArray: function (r, t) {
                  for (var e = 0, n = r.length - 1; n >= 0; n--) {
                    var o = r[n];
                    '.' === o
                      ? r.splice(n, 1)
                      : '..' === o
                      ? (r.splice(n, 1), e++)
                      : e && (r.splice(n, 1), e--);
                  }
                  if (t) for (; e; e--) r.unshift('..');
                  return r;
                },
                normalize: function (r) {
                  var t = '/' === r.charAt(0),
                    e = '/' === r.substr(-1);
                  return (
                    (r = nr
                      .normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !t,
                      )
                      .join('/')) ||
                      t ||
                      (r = '.'),
                    r && e && (r += '/'),
                    (t ? '/' : '') + r
                  );
                },
                dirname: function (r) {
                  var t = nr.splitPath(r),
                    e = t[0],
                    n = t[1];
                  return e || n
                    ? (n && (n = n.substr(0, n.length - 1)), e + n)
                    : '.';
                },
                basename: function (r) {
                  if ('/' === r) return '/';
                  var t = r.lastIndexOf('/');
                  return -1 === t ? r : r.substr(t + 1);
                },
                extname: function (r) {
                  return nr.splitPath(r)[3];
                },
                join: function () {
                  var r = Array.prototype.slice.call(arguments, 0);
                  return nr.normalize(r.join('/'));
                },
                join2: function (r, t) {
                  return nr.normalize(r + '/' + t);
                },
              },
              or = {
                resolve: function () {
                  for (
                    var r = '', t = !1, e = arguments.length - 1;
                    e >= -1 && !t;
                    e--
                  ) {
                    var n = e >= 0 ? arguments[e] : sr.cwd();
                    if ('string' != typeof n)
                      throw new TypeError(
                        'Arguments to path.resolve must be strings',
                      );
                    if (!n) return '';
                    (r = n + '/' + r), (t = '/' === n.charAt(0));
                  }
                  return (
                    (t ? '/' : '') +
                      (r = nr
                        .normalizeArray(
                          r.split('/').filter(function (r) {
                            return !!r;
                          }),
                          !t,
                        )
                        .join('/')) || '.'
                  );
                },
                relative: function (r, t) {
                  function e(r) {
                    for (var t = 0; t < r.length && '' === r[t]; t++);
                    for (var e = r.length - 1; e >= 0 && '' === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1);
                  }
                  (r = or.resolve(r).substr(1)), (t = or.resolve(t).substr(1));
                  for (
                    var n = e(r.split('/')),
                      o = e(t.split('/')),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push('..');
                  return (u = u.concat(o.slice(a))).join('/');
                },
              },
              ir = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (r, t) {
                  (ir.ttys[r] = { input: [], output: [], ops: t }),
                    sr.registerDevice(r, ir.stream_ops);
                },
                stream_ops: {
                  open: function (r) {
                    var t = ir.ttys[r.node.rdev];
                    if (!t) throw new sr.ErrnoError(43);
                    (r.tty = t), (r.seekable = !1);
                  },
                  close: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  flush: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  read: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.get_char)
                      throw new sr.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = r.tty.ops.get_char(r.tty);
                      } catch (r) {
                        throw new sr.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new sr.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[e + a] = s);
                    }
                    return i && (r.node.timestamp = Date.now()), i;
                  },
                  write: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.put_char)
                      throw new sr.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        r.tty.ops.put_char(r.tty, t[e + i]);
                    } catch (r) {
                      throw new sr.ErrnoError(29);
                    }
                    return n && (r.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: function (r) {
                    if (!r.input.length) {
                      var t = null;
                      if (
                        ('undefined' != typeof window &&
                        'function' == typeof window.prompt
                          ? null !== (t = window.prompt('Input: ')) &&
                            (t += '\n')
                          : 'function' == typeof readline &&
                            null !== (t = readline()) &&
                            (t += '\n'),
                        !t)
                      )
                        return null;
                      r.input = kr(t, !0);
                    }
                    return r.input.shift();
                  },
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (c(F(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (c(F(r.output, 0)), (r.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (f(F(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (f(F(r.output, 0)), (r.output = []));
                  },
                },
              },
              ar = {
                ops_table: null,
                mount: function (r) {
                  return ar.createNode(null, '/', 16895, 0);
                },
                createNode: function (r, t, e, n) {
                  if (sr.isBlkdev(e) || sr.isFIFO(e))
                    throw new sr.ErrnoError(63);
                  ar.ops_table ||
                    (ar.ops_table = {
                      dir: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                          lookup: ar.node_ops.lookup,
                          mknod: ar.node_ops.mknod,
                          rename: ar.node_ops.rename,
                          unlink: ar.node_ops.unlink,
                          rmdir: ar.node_ops.rmdir,
                          readdir: ar.node_ops.readdir,
                          symlink: ar.node_ops.symlink,
                        },
                        stream: { llseek: ar.stream_ops.llseek },
                      },
                      file: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                        },
                        stream: {
                          llseek: ar.stream_ops.llseek,
                          read: ar.stream_ops.read,
                          write: ar.stream_ops.write,
                          allocate: ar.stream_ops.allocate,
                          mmap: ar.stream_ops.mmap,
                          msync: ar.stream_ops.msync,
                        },
                      },
                      link: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                          readlink: ar.node_ops.readlink,
                        },
                        stream: {},
                      },
                      chrdev: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                        },
                        stream: sr.chrdev_stream_ops,
                      },
                    });
                  var o = sr.createNode(r, t, e, n);
                  return (
                    sr.isDir(o.mode)
                      ? ((o.node_ops = ar.ops_table.dir.node),
                        (o.stream_ops = ar.ops_table.dir.stream),
                        (o.contents = {}))
                      : sr.isFile(o.mode)
                      ? ((o.node_ops = ar.ops_table.file.node),
                        (o.stream_ops = ar.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : sr.isLink(o.mode)
                      ? ((o.node_ops = ar.ops_table.link.node),
                        (o.stream_ops = ar.ops_table.link.stream))
                      : sr.isChrdev(o.mode) &&
                        ((o.node_ops = ar.ops_table.chrdev.node),
                        (o.stream_ops = ar.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    r && (r.contents[t] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (r) {
                  if (r.contents && r.contents.subarray) {
                    for (var t = [], e = 0; e < r.usedBytes; ++e)
                      t.push(r.contents[e]);
                    return t;
                  }
                  return r.contents;
                },
                getFileDataAsTypedArray: function (r) {
                  return r.contents
                    ? r.contents.subarray
                      ? r.contents.subarray(0, r.usedBytes)
                      : new Uint8Array(r.contents)
                    : new Uint8Array();
                },
                expandFileStorage: function (r, t) {
                  var e = r.contents ? r.contents.length : 0;
                  if (!(e >= t)) {
                    (t = Math.max(t, (e * (e < 1048576 ? 2 : 1.125)) | 0)),
                      0 != e && (t = Math.max(t, 256));
                    var n = r.contents;
                    (r.contents = new Uint8Array(t)),
                      r.usedBytes > 0 &&
                        r.contents.set(n.subarray(0, r.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (r, t) {
                  if (r.usedBytes != t) {
                    if (0 == t)
                      return (r.contents = null), void (r.usedBytes = 0);
                    if (!r.contents || r.contents.subarray) {
                      var e = r.contents;
                      return (
                        (r.contents = new Uint8Array(t)),
                        e &&
                          r.contents.set(
                            e.subarray(0, Math.min(t, r.usedBytes)),
                          ),
                        void (r.usedBytes = t)
                      );
                    }
                    if (
                      (r.contents || (r.contents = []), r.contents.length > t)
                    )
                      r.contents.length = t;
                    else for (; r.contents.length < t; ) r.contents.push(0);
                    r.usedBytes = t;
                  }
                },
                node_ops: {
                  getattr: function (r) {
                    var t = {};
                    return (
                      (t.dev = sr.isChrdev(r.mode) ? r.id : 1),
                      (t.ino = r.id),
                      (t.mode = r.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = r.rdev),
                      sr.isDir(r.mode)
                        ? (t.size = 4096)
                        : sr.isFile(r.mode)
                        ? (t.size = r.usedBytes)
                        : sr.isLink(r.mode)
                        ? (t.size = r.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(r.timestamp)),
                      (t.mtime = new Date(r.timestamp)),
                      (t.ctime = new Date(r.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr: function (r, t) {
                    void 0 !== t.mode && (r.mode = t.mode),
                      void 0 !== t.timestamp && (r.timestamp = t.timestamp),
                      void 0 !== t.size && ar.resizeFileStorage(r, t.size);
                  },
                  lookup: function (r, t) {
                    throw sr.genericErrors[44];
                  },
                  mknod: function (r, t, e, n) {
                    return ar.createNode(r, t, e, n);
                  },
                  rename: function (r, t, e) {
                    if (sr.isDir(r.mode)) {
                      var n;
                      try {
                        n = sr.lookupNode(t, e);
                      } catch (r) {}
                      if (n)
                        for (var o in n.contents) throw new sr.ErrnoError(55);
                    }
                    delete r.parent.contents[r.name],
                      (r.name = e),
                      (t.contents[e] = r),
                      (r.parent = t);
                  },
                  unlink: function (r, t) {
                    delete r.contents[t];
                  },
                  rmdir: function (r, t) {
                    var e = sr.lookupNode(r, t);
                    for (var n in e.contents) throw new sr.ErrnoError(55);
                    delete r.contents[t];
                  },
                  readdir: function (r) {
                    var t = ['.', '..'];
                    for (var e in r.contents)
                      r.contents.hasOwnProperty(e) && t.push(e);
                    return t;
                  },
                  symlink: function (r, t, e) {
                    var n = ar.createNode(r, t, 41471, 0);
                    return (n.link = e), n;
                  },
                  readlink: function (r) {
                    if (!sr.isLink(r.mode)) throw new sr.ErrnoError(28);
                    return r.link;
                  },
                },
                stream_ops: {
                  read: function (r, t, e, n, o) {
                    var i = r.node.contents;
                    if (o >= r.node.usedBytes) return 0;
                    var a = Math.min(r.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), e);
                    else for (var s = 0; s < a; s++) t[e + s] = i[o + s];
                    return a;
                  },
                  write: function (r, t, e, n, o, i) {
                    if ((t.buffer === g.buffer && (i = !1), !n)) return 0;
                    var a = r.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(e, e + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(e, e + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(e, e + n), o), n;
                    }
                    if (
                      (ar.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(e, e + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[e + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek: function (r, t, e) {
                    var n = t;
                    if (
                      (1 === e
                        ? (n += r.position)
                        : 2 === e &&
                          sr.isFile(r.node.mode) &&
                          (n += r.node.usedBytes),
                      n < 0)
                    )
                      throw new sr.ErrnoError(28);
                    return n;
                  },
                  allocate: function (r, t, e) {
                    ar.expandFileStorage(r.node, t + e),
                      (r.node.usedBytes = Math.max(r.node.usedBytes, t + e));
                  },
                  mmap: function (r, t, e, n, o, i, a) {
                    if (!sr.isFile(r.node.mode)) throw new sr.ErrnoError(43);
                    var s,
                      u,
                      c = r.node.contents;
                    if (2 & a || c.buffer !== t.buffer) {
                      (o > 0 || o + n < r.node.usedBytes) &&
                        (c = c.subarray
                          ? c.subarray(o, o + n)
                          : Array.prototype.slice.call(c, o, o + n)),
                        (u = !0);
                      var f = t.buffer == g.buffer;
                      if (!(s = Rr(n))) throw new sr.ErrnoError(48);
                      (f ? g : t).set(c, s);
                    } else (u = !1), (s = c.byteOffset);
                    return { ptr: s, allocated: u };
                  },
                  msync: function (r, t, e, n, o) {
                    if (!sr.isFile(r.node.mode)) throw new sr.ErrnoError(43);
                    return 2 & o || ar.stream_ops.write(r, t, 0, n, e, !1), 0;
                  },
                },
              },
              sr = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: '/',
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (r) {
                  if (!(r instanceof sr.ErrnoError)) throw r + ' : ' + rr();
                  return er(r.errno);
                },
                lookupPath: function (r, t) {
                  if (((t = t || {}), !(r = or.resolve(sr.cwd(), r))))
                    return { path: '', node: null };
                  var e = { follow_mount: !0, recurse_count: 0 };
                  for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                  if (t.recurse_count > 8) throw new sr.ErrnoError(32);
                  for (
                    var o = nr.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !1,
                      ),
                      i = sr.root,
                      a = '/',
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && t.parent) break;
                    if (
                      ((i = sr.lookupNode(i, o[s])),
                      (a = nr.join2(a, o[s])),
                      sr.isMountpoint(i) &&
                        (!u || (u && t.follow_mount)) &&
                        (i = i.mounted.root),
                      !u || t.follow)
                    )
                      for (var c = 0; sr.isLink(i.mode); ) {
                        var f = sr.readlink(a);
                        if (
                          ((a = or.resolve(nr.dirname(a), f)),
                          (i = sr.lookupPath(a, {
                            recurse_count: t.recurse_count,
                          }).node),
                          c++ > 40)
                        )
                          throw new sr.ErrnoError(32);
                      }
                  }
                  return { path: a, node: i };
                },
                getPath: function (r) {
                  for (var t; ; ) {
                    if (sr.isRoot(r)) {
                      var e = r.mount.mountpoint;
                      return t
                        ? '/' !== e[e.length - 1]
                          ? e + '/' + t
                          : e + t
                        : e;
                    }
                    (t = t ? r.name + '/' + t : r.name), (r = r.parent);
                  }
                },
                hashName: function (r, t) {
                  for (var e = 0, n = 0; n < t.length; n++)
                    e = ((e << 5) - e + t.charCodeAt(n)) | 0;
                  return ((r + e) >>> 0) % sr.nameTable.length;
                },
                hashAddNode: function (r) {
                  var t = sr.hashName(r.parent.id, r.name);
                  (r.name_next = sr.nameTable[t]), (sr.nameTable[t] = r);
                },
                hashRemoveNode: function (r) {
                  var t = sr.hashName(r.parent.id, r.name);
                  if (sr.nameTable[t] === r) sr.nameTable[t] = r.name_next;
                  else
                    for (var e = sr.nameTable[t]; e; ) {
                      if (e.name_next === r) {
                        e.name_next = r.name_next;
                        break;
                      }
                      e = e.name_next;
                    }
                },
                lookupNode: function (r, t) {
                  var e = sr.mayLookup(r);
                  if (e) throw new sr.ErrnoError(e, r);
                  for (
                    var n = sr.hashName(r.id, t), o = sr.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === r.id && i === t) return o;
                  }
                  return sr.lookup(r, t);
                },
                createNode: function (r, t, e, n) {
                  sr.FSNode ||
                    ((sr.FSNode = function (r, t, e, n) {
                      r || (r = this),
                        (this.parent = r),
                        (this.mount = r.mount),
                        (this.mounted = null),
                        (this.id = sr.nextInode++),
                        (this.name = t),
                        (this.mode = e),
                        (this.node_ops = {}),
                        (this.stream_ops = {}),
                        (this.rdev = n);
                    }),
                    (sr.FSNode.prototype = {}),
                    Object.defineProperties(sr.FSNode.prototype, {
                      read: {
                        get: function () {
                          return 365 == (365 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 365) : (this.mode &= -366);
                        },
                      },
                      write: {
                        get: function () {
                          return 146 == (146 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 146) : (this.mode &= -147);
                        },
                      },
                      isFolder: {
                        get: function () {
                          return sr.isDir(this.mode);
                        },
                      },
                      isDevice: {
                        get: function () {
                          return sr.isChrdev(this.mode);
                        },
                      },
                    }));
                  var o = new sr.FSNode(r, t, e, n);
                  return sr.hashAddNode(o), o;
                },
                destroyNode: function (r) {
                  sr.hashRemoveNode(r);
                },
                isRoot: function (r) {
                  return r === r.parent;
                },
                isMountpoint: function (r) {
                  return !!r.mounted;
                },
                isFile: function (r) {
                  return 32768 == (61440 & r);
                },
                isDir: function (r) {
                  return 16384 == (61440 & r);
                },
                isLink: function (r) {
                  return 40960 == (61440 & r);
                },
                isChrdev: function (r) {
                  return 8192 == (61440 & r);
                },
                isBlkdev: function (r) {
                  return 24576 == (61440 & r);
                },
                isFIFO: function (r) {
                  return 4096 == (61440 & r);
                },
                isSocket: function (r) {
                  return 49152 == (49152 & r);
                },
                flagModes: {
                  r: 0,
                  rs: 1052672,
                  'r+': 2,
                  w: 577,
                  wx: 705,
                  xw: 705,
                  'w+': 578,
                  'wx+': 706,
                  'xw+': 706,
                  a: 1089,
                  ax: 1217,
                  xa: 1217,
                  'a+': 1090,
                  'ax+': 1218,
                  'xa+': 1218,
                },
                modeStringToFlags: function (r) {
                  var t = sr.flagModes[r];
                  if (void 0 === t)
                    throw new Error('Unknown file open mode: ' + r);
                  return t;
                },
                flagsToPermissionString: function (r) {
                  var t = ['r', 'w', 'rw'][3 & r];
                  return 512 & r && (t += 'w'), t;
                },
                nodePermissions: function (r, t) {
                  return sr.ignorePermissions ||
                    ((-1 === t.indexOf('r') || 292 & r.mode) &&
                      (-1 === t.indexOf('w') || 146 & r.mode) &&
                      (-1 === t.indexOf('x') || 73 & r.mode))
                    ? 0
                    : 2;
                },
                mayLookup: function (r) {
                  var t = sr.nodePermissions(r, 'x');
                  return t || (r.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (r, t) {
                  try {
                    return sr.lookupNode(r, t), 20;
                  } catch (r) {}
                  return sr.nodePermissions(r, 'wx');
                },
                mayDelete: function (r, t, e) {
                  var n;
                  try {
                    n = sr.lookupNode(r, t);
                  } catch (r) {
                    return r.errno;
                  }
                  var o = sr.nodePermissions(r, 'wx');
                  if (o) return o;
                  if (e) {
                    if (!sr.isDir(n.mode)) return 54;
                    if (sr.isRoot(n) || sr.getPath(n) === sr.cwd()) return 10;
                  } else if (sr.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (r, t) {
                  return r
                    ? sr.isLink(r.mode)
                      ? 32
                      : sr.isDir(r.mode) &&
                        ('r' !== sr.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : sr.nodePermissions(r, sr.flagsToPermissionString(t))
                    : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (r, t) {
                  (r = r || 0), (t = t || sr.MAX_OPEN_FDS);
                  for (var e = r; e <= t; e++) if (!sr.streams[e]) return e;
                  throw new sr.ErrnoError(33);
                },
                getStream: function (r) {
                  return sr.streams[r];
                },
                createStream: function (r, t, e) {
                  sr.FSStream ||
                    ((sr.FSStream = function () {}),
                    (sr.FSStream.prototype = {}),
                    Object.defineProperties(sr.FSStream.prototype, {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (r) {
                          this.node = r;
                        },
                      },
                      isRead: {
                        get: function () {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get: function () {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get: function () {
                          return 1024 & this.flags;
                        },
                      },
                    }));
                  var n = new sr.FSStream();
                  for (var o in r) n[o] = r[o];
                  r = n;
                  var i = sr.nextfd(t, e);
                  return (r.fd = i), (sr.streams[i] = r), r;
                },
                closeStream: function (r) {
                  sr.streams[r] = null;
                },
                chrdev_stream_ops: {
                  open: function (r) {
                    var t = sr.getDevice(r.node.rdev);
                    (r.stream_ops = t.stream_ops),
                      r.stream_ops.open && r.stream_ops.open(r);
                  },
                  llseek: function () {
                    throw new sr.ErrnoError(70);
                  },
                },
                major: function (r) {
                  return r >> 8;
                },
                minor: function (r) {
                  return 255 & r;
                },
                makedev: function (r, t) {
                  return (r << 8) | t;
                },
                registerDevice: function (r, t) {
                  sr.devices[r] = { stream_ops: t };
                },
                getDevice: function (r) {
                  return sr.devices[r];
                },
                getMounts: function (r) {
                  for (var t = [], e = [r]; e.length; ) {
                    var n = e.pop();
                    t.push(n), e.push.apply(e, n.mounts);
                  }
                  return t;
                },
                syncfs: function (r, t) {
                  'function' == typeof r && ((t = r), (r = !1)),
                    sr.syncFSRequests++,
                    sr.syncFSRequests > 1 &&
                      f(
                        'warning: ' +
                          sr.syncFSRequests +
                          ' FS.syncfs operations in flight at once, probably just doing extra work',
                      );
                  var e = sr.getMounts(sr.root.mount),
                    n = 0;
                  function o(r) {
                    return sr.syncFSRequests--, t(r);
                  }
                  function i(r) {
                    if (r) return i.errored ? void 0 : ((i.errored = !0), o(r));
                    ++n >= e.length && o(null);
                  }
                  e.forEach(function (t) {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, r, i);
                  });
                },
                mount: function (r, t, e) {
                  var n,
                    o = '/' === e,
                    i = !e;
                  if (o && sr.root) throw new sr.ErrnoError(10);
                  if (!o && !i) {
                    var a = sr.lookupPath(e, { follow_mount: !1 });
                    if (((e = a.path), (n = a.node), sr.isMountpoint(n)))
                      throw new sr.ErrnoError(10);
                    if (!sr.isDir(n.mode)) throw new sr.ErrnoError(54);
                  }
                  var s = { type: r, opts: t, mountpoint: e, mounts: [] },
                    u = r.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (sr.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount: function (r) {
                  var t = sr.lookupPath(r, { follow_mount: !1 });
                  if (!sr.isMountpoint(t.node)) throw new sr.ErrnoError(28);
                  var e = t.node,
                    n = e.mounted,
                    o = sr.getMounts(n);
                  Object.keys(sr.nameTable).forEach(function (r) {
                    for (var t = sr.nameTable[r]; t; ) {
                      var e = t.name_next;
                      -1 !== o.indexOf(t.mount) && sr.destroyNode(t), (t = e);
                    }
                  }),
                    (e.mounted = null);
                  var i = e.mount.mounts.indexOf(n);
                  e.mount.mounts.splice(i, 1);
                },
                lookup: function (r, t) {
                  return r.node_ops.lookup(r, t);
                },
                mknod: function (r, t, e) {
                  var n = sr.lookupPath(r, { parent: !0 }).node,
                    o = nr.basename(r);
                  if (!o || '.' === o || '..' === o)
                    throw new sr.ErrnoError(28);
                  var i = sr.mayCreate(n, o);
                  if (i) throw new sr.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new sr.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, e);
                },
                create: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 438),
                    (t &= 4095),
                    (t |= 32768),
                    sr.mknod(r, t, 0)
                  );
                },
                mkdir: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 511),
                    (t &= 1023),
                    (t |= 16384),
                    sr.mknod(r, t, 0)
                  );
                },
                mkdirTree: function (r, t) {
                  for (var e = r.split('/'), n = '', o = 0; o < e.length; ++o)
                    if (e[o]) {
                      n += '/' + e[o];
                      try {
                        sr.mkdir(n, t);
                      } catch (r) {
                        if (20 != r.errno) throw r;
                      }
                    }
                },
                mkdev: function (r, t, e) {
                  return (
                    void 0 === e && ((e = t), (t = 438)),
                    (t |= 8192),
                    sr.mknod(r, t, e)
                  );
                },
                symlink: function (r, t) {
                  if (!or.resolve(r)) throw new sr.ErrnoError(44);
                  var e = sr.lookupPath(t, { parent: !0 }).node;
                  if (!e) throw new sr.ErrnoError(44);
                  var n = nr.basename(t),
                    o = sr.mayCreate(e, n);
                  if (o) throw new sr.ErrnoError(o);
                  if (!e.node_ops.symlink) throw new sr.ErrnoError(63);
                  return e.node_ops.symlink(e, n, r);
                },
                rename: function (r, t) {
                  var e,
                    n,
                    o = nr.dirname(r),
                    i = nr.dirname(t),
                    a = nr.basename(r),
                    s = nr.basename(t);
                  try {
                    (e = sr.lookupPath(r, { parent: !0 }).node),
                      (n = sr.lookupPath(t, { parent: !0 }).node);
                  } catch (r) {
                    throw new sr.ErrnoError(10);
                  }
                  if (!e || !n) throw new sr.ErrnoError(44);
                  if (e.mount !== n.mount) throw new sr.ErrnoError(75);
                  var u,
                    c = sr.lookupNode(e, a),
                    l = or.relative(r, i);
                  if ('.' !== l.charAt(0)) throw new sr.ErrnoError(28);
                  if ('.' !== (l = or.relative(t, o)).charAt(0))
                    throw new sr.ErrnoError(55);
                  try {
                    u = sr.lookupNode(n, s);
                  } catch (r) {}
                  if (c !== u) {
                    var d = sr.isDir(c.mode),
                      p = sr.mayDelete(e, a, d);
                    if (p) throw new sr.ErrnoError(p);
                    if ((p = u ? sr.mayDelete(n, s, d) : sr.mayCreate(n, s)))
                      throw new sr.ErrnoError(p);
                    if (!e.node_ops.rename) throw new sr.ErrnoError(63);
                    if (sr.isMountpoint(c) || (u && sr.isMountpoint(u)))
                      throw new sr.ErrnoError(10);
                    if (n !== e && (p = sr.nodePermissions(e, 'w')))
                      throw new sr.ErrnoError(p);
                    try {
                      sr.trackingDelegate.willMovePath &&
                        sr.trackingDelegate.willMovePath(r, t);
                    } catch (e) {
                      f(
                        "FS.trackingDelegate['willMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                    sr.hashRemoveNode(c);
                    try {
                      e.node_ops.rename(c, n, s);
                    } catch (r) {
                      throw r;
                    } finally {
                      sr.hashAddNode(c);
                    }
                    try {
                      sr.trackingDelegate.onMovePath &&
                        sr.trackingDelegate.onMovePath(r, t);
                    } catch (e) {
                      f(
                        "FS.trackingDelegate['onMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                  }
                },
                rmdir: function (r) {
                  var t = sr.lookupPath(r, { parent: !0 }).node,
                    e = nr.basename(r),
                    n = sr.lookupNode(t, e),
                    o = sr.mayDelete(t, e, !0);
                  if (o) throw new sr.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new sr.ErrnoError(63);
                  if (sr.isMountpoint(n)) throw new sr.ErrnoError(10);
                  try {
                    sr.trackingDelegate.willDeletePath &&
                      sr.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.rmdir(t, e), sr.destroyNode(n);
                  try {
                    sr.trackingDelegate.onDeletePath &&
                      sr.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readdir: function (r) {
                  var t = sr.lookupPath(r, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new sr.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink: function (r) {
                  var t = sr.lookupPath(r, { parent: !0 }).node,
                    e = nr.basename(r),
                    n = sr.lookupNode(t, e),
                    o = sr.mayDelete(t, e, !1);
                  if (o) throw new sr.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new sr.ErrnoError(63);
                  if (sr.isMountpoint(n)) throw new sr.ErrnoError(10);
                  try {
                    sr.trackingDelegate.willDeletePath &&
                      sr.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.unlink(t, e), sr.destroyNode(n);
                  try {
                    sr.trackingDelegate.onDeletePath &&
                      sr.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readlink: function (r) {
                  var t = sr.lookupPath(r).node;
                  if (!t) throw new sr.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new sr.ErrnoError(28);
                  return or.resolve(
                    sr.getPath(t.parent),
                    t.node_ops.readlink(t),
                  );
                },
                stat: function (r, t) {
                  var e = sr.lookupPath(r, { follow: !t }).node;
                  if (!e) throw new sr.ErrnoError(44);
                  if (!e.node_ops.getattr) throw new sr.ErrnoError(63);
                  return e.node_ops.getattr(e);
                },
                lstat: function (r) {
                  return sr.stat(r, !0);
                },
                chmod: function (r, t, e) {
                  var n;
                  if (
                    !(n =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !e }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod: function (r, t) {
                  sr.chmod(r, t, !0);
                },
                fchmod: function (r, t) {
                  var e = sr.getStream(r);
                  if (!e) throw new sr.ErrnoError(8);
                  sr.chmod(e.node, t);
                },
                chown: function (r, t, e, n) {
                  var o;
                  if (
                    !(o =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !n }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (r, t, e) {
                  sr.chown(r, t, e, !0);
                },
                fchown: function (r, t, e) {
                  var n = sr.getStream(r);
                  if (!n) throw new sr.ErrnoError(8);
                  sr.chown(n.node, t, e);
                },
                truncate: function (r, t) {
                  if (t < 0) throw new sr.ErrnoError(28);
                  var e;
                  if (
                    !(e =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !0 }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  if (sr.isDir(e.mode)) throw new sr.ErrnoError(31);
                  if (!sr.isFile(e.mode)) throw new sr.ErrnoError(28);
                  var n = sr.nodePermissions(e, 'w');
                  if (n) throw new sr.ErrnoError(n);
                  e.node_ops.setattr(e, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (r, t) {
                  var e = sr.getStream(r);
                  if (!e) throw new sr.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new sr.ErrnoError(28);
                  sr.truncate(e.node, t);
                },
                utime: function (r, t, e) {
                  var n = sr.lookupPath(r, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, e) });
                },
                open: function (r, t, e, o, i) {
                  if ('' === r) throw new sr.ErrnoError(44);
                  var a;
                  if (
                    ((e = void 0 === e ? 438 : e),
                    (e =
                      64 &
                      (t = 'string' == typeof t ? sr.modeStringToFlags(t) : t)
                        ? (4095 & e) | 32768
                        : 0),
                    'object' == typeof r)
                  )
                    a = r;
                  else {
                    r = nr.normalize(r);
                    try {
                      a = sr.lookupPath(r, { follow: !(131072 & t) }).node;
                    } catch (r) {}
                  }
                  var s = !1;
                  if (64 & t)
                    if (a) {
                      if (128 & t) throw new sr.ErrnoError(20);
                    } else (a = sr.mknod(r, e, 0)), (s = !0);
                  if (!a) throw new sr.ErrnoError(44);
                  if (
                    (sr.isChrdev(a.mode) && (t &= -513),
                    65536 & t && !sr.isDir(a.mode))
                  )
                    throw new sr.ErrnoError(54);
                  if (!s) {
                    var u = sr.mayOpen(a, t);
                    if (u) throw new sr.ErrnoError(u);
                  }
                  512 & t && sr.truncate(a, 0), (t &= -641);
                  var c = sr.createStream(
                    {
                      node: a,
                      path: sr.getPath(a),
                      flags: t,
                      seekable: !0,
                      position: 0,
                      stream_ops: a.stream_ops,
                      ungotten: [],
                      error: !1,
                    },
                    o,
                    i,
                  );
                  c.stream_ops.open && c.stream_ops.open(c),
                    !n.logReadFiles ||
                      1 & t ||
                      (sr.readFiles || (sr.readFiles = {}),
                      r in sr.readFiles ||
                        ((sr.readFiles[r] = 1),
                        f('FS.trackingDelegate error on read file: ' + r)));
                  try {
                    if (sr.trackingDelegate.onOpenFile) {
                      var l = 0;
                      1 != (2097155 & t) && (l |= sr.tracking.openFlags.READ),
                        0 != (2097155 & t) &&
                          (l |= sr.tracking.openFlags.WRITE),
                        sr.trackingDelegate.onOpenFile(r, l);
                    }
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onOpenFile']('" +
                        r +
                        "', flags) threw an exception: " +
                        t.message,
                    );
                  }
                  return c;
                },
                close: function (r) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  r.getdents && (r.getdents = null);
                  try {
                    r.stream_ops.close && r.stream_ops.close(r);
                  } catch (r) {
                    throw r;
                  } finally {
                    sr.closeStream(r.fd);
                  }
                  r.fd = null;
                },
                isClosed: function (r) {
                  return null === r.fd;
                },
                llseek: function (r, t, e) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (!r.seekable || !r.stream_ops.llseek)
                    throw new sr.ErrnoError(70);
                  if (0 != e && 1 != e && 2 != e) throw new sr.ErrnoError(28);
                  return (
                    (r.position = r.stream_ops.llseek(r, t, e)),
                    (r.ungotten = []),
                    r.position
                  );
                },
                read: function (r, t, e, n, o) {
                  if (n < 0 || o < 0) throw new sr.ErrnoError(28);
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (1 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (sr.isDir(r.node.mode)) throw new sr.ErrnoError(31);
                  if (!r.stream_ops.read) throw new sr.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!r.seekable) throw new sr.ErrnoError(70);
                  } else o = r.position;
                  var a = r.stream_ops.read(r, t, e, n, o);
                  return i || (r.position += a), a;
                },
                write: function (r, t, e, n, o, i) {
                  if (n < 0 || o < 0) throw new sr.ErrnoError(28);
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (0 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (sr.isDir(r.node.mode)) throw new sr.ErrnoError(31);
                  if (!r.stream_ops.write) throw new sr.ErrnoError(28);
                  1024 & r.flags && sr.llseek(r, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!r.seekable) throw new sr.ErrnoError(70);
                  } else o = r.position;
                  var s = r.stream_ops.write(r, t, e, n, o, i);
                  a || (r.position += s);
                  try {
                    r.path &&
                      sr.trackingDelegate.onWriteToFile &&
                      sr.trackingDelegate.onWriteToFile(r.path);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onWriteToFile']('" +
                        r.path +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  return s;
                },
                allocate: function (r, t, e) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (t < 0 || e <= 0) throw new sr.ErrnoError(28);
                  if (0 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (!sr.isFile(r.node.mode) && !sr.isDir(r.node.mode))
                    throw new sr.ErrnoError(43);
                  if (!r.stream_ops.allocate) throw new sr.ErrnoError(138);
                  r.stream_ops.allocate(r, t, e);
                },
                mmap: function (r, t, e, n, o, i, a) {
                  if (0 != (2 & i) && 0 == (2 & a) && 2 != (2097155 & r.flags))
                    throw new sr.ErrnoError(2);
                  if (1 == (2097155 & r.flags)) throw new sr.ErrnoError(2);
                  if (!r.stream_ops.mmap) throw new sr.ErrnoError(43);
                  return r.stream_ops.mmap(r, t, e, n, o, i, a);
                },
                msync: function (r, t, e, n, o) {
                  return r && r.stream_ops.msync
                    ? r.stream_ops.msync(r, t, e, n, o)
                    : 0;
                },
                munmap: function (r) {
                  return 0;
                },
                ioctl: function (r, t, e) {
                  if (!r.stream_ops.ioctl) throw new sr.ErrnoError(59);
                  return r.stream_ops.ioctl(r, t, e);
                },
                readFile: function (r, t) {
                  if (
                    (((t = t || {}).flags = t.flags || 'r'),
                    (t.encoding = t.encoding || 'binary'),
                    'utf8' !== t.encoding && 'binary' !== t.encoding)
                  )
                    throw new Error(
                      'Invalid encoding type "' + t.encoding + '"',
                    );
                  var e,
                    n = sr.open(r, t.flags),
                    o = sr.stat(r).size,
                    i = new Uint8Array(o);
                  return (
                    sr.read(n, i, 0, o, 0),
                    'utf8' === t.encoding
                      ? (e = F(i, 0))
                      : 'binary' === t.encoding && (e = i),
                    sr.close(n),
                    e
                  );
                },
                writeFile: function (r, t, e) {
                  (e = e || {}).flags = e.flags || 'w';
                  var n = sr.open(r, e.flags, e.mode);
                  if ('string' == typeof t) {
                    var o = new Uint8Array(A(t) + 1),
                      i = x(t, o, 0, o.length);
                    sr.write(n, o, 0, i, void 0, e.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error('Unsupported data type');
                    sr.write(n, t, 0, t.byteLength, void 0, e.canOwn);
                  }
                  sr.close(n);
                },
                cwd: function () {
                  return sr.currentPath;
                },
                chdir: function (r) {
                  var t = sr.lookupPath(r, { follow: !0 });
                  if (null === t.node) throw new sr.ErrnoError(44);
                  if (!sr.isDir(t.node.mode)) throw new sr.ErrnoError(54);
                  var e = sr.nodePermissions(t.node, 'x');
                  if (e) throw new sr.ErrnoError(e);
                  sr.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                  sr.mkdir('/tmp'),
                    sr.mkdir('/home'),
                    sr.mkdir('/home/web_user');
                },
                createDefaultDevices: function () {
                  var r;
                  if (
                    (sr.mkdir('/dev'),
                    sr.registerDevice(sr.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (r, t, e, n, o) {
                        return n;
                      },
                    }),
                    sr.mkdev('/dev/null', sr.makedev(1, 3)),
                    ir.register(sr.makedev(5, 0), ir.default_tty_ops),
                    ir.register(sr.makedev(6, 0), ir.default_tty1_ops),
                    sr.mkdev('/dev/tty', sr.makedev(5, 0)),
                    sr.mkdev('/dev/tty1', sr.makedev(6, 0)),
                    'object' == typeof crypto &&
                      'function' == typeof crypto.getRandomValues)
                  ) {
                    var t = new Uint8Array(1);
                    r = function () {
                      return crypto.getRandomValues(t), t[0];
                    };
                  }
                  r ||
                    (r = function () {
                      J('random_device');
                    }),
                    sr.createDevice('/dev', 'random', r),
                    sr.createDevice('/dev', 'urandom', r),
                    sr.mkdir('/dev/shm'),
                    sr.mkdir('/dev/shm/tmp');
                },
                createSpecialDirectories: function () {
                  sr.mkdir('/proc'),
                    sr.mkdir('/proc/self'),
                    sr.mkdir('/proc/self/fd'),
                    sr.mount(
                      {
                        mount: function () {
                          var r = sr.createNode('/proc/self', 'fd', 16895, 73);
                          return (
                            (r.node_ops = {
                              lookup: function (r, t) {
                                var e = +t,
                                  n = sr.getStream(e);
                                if (!n) throw new sr.ErrnoError(8);
                                var o = {
                                  parent: null,
                                  mount: { mountpoint: 'fake' },
                                  node_ops: {
                                    readlink: function () {
                                      return n.path;
                                    },
                                  },
                                };
                                return (o.parent = o), o;
                              },
                            }),
                            r
                          );
                        },
                      },
                      {},
                      '/proc/self/fd',
                    );
                },
                createStandardStreams: function () {
                  n.stdin
                    ? sr.createDevice('/dev', 'stdin', n.stdin)
                    : sr.symlink('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? sr.createDevice('/dev', 'stdout', null, n.stdout)
                      : sr.symlink('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? sr.createDevice('/dev', 'stderr', null, n.stderr)
                      : sr.symlink('/dev/tty1', '/dev/stderr'),
                    sr.open('/dev/stdin', 'r'),
                    sr.open('/dev/stdout', 'w'),
                    sr.open('/dev/stderr', 'w');
                },
                ensureErrnoError: function () {
                  sr.ErrnoError ||
                    ((sr.ErrnoError = function (r, t) {
                      (this.node = t),
                        (this.setErrno = function (r) {
                          this.errno = r;
                        }),
                        this.setErrno(r),
                        (this.message = 'FS error');
                    }),
                    (sr.ErrnoError.prototype = new Error()),
                    (sr.ErrnoError.prototype.constructor = sr.ErrnoError),
                    [44].forEach(function (r) {
                      (sr.genericErrors[r] = new sr.ErrnoError(r)),
                        (sr.genericErrors[r].stack =
                          '<generic error, no stack>');
                    }));
                },
                staticInit: function () {
                  sr.ensureErrnoError(),
                    (sr.nameTable = new Array(4096)),
                    sr.mount(ar, {}, '/'),
                    sr.createDefaultDirectories(),
                    sr.createDefaultDevices(),
                    sr.createSpecialDirectories(),
                    (sr.filesystems = { MEMFS: ar });
                },
                init: function (r, t, e) {
                  (sr.init.initialized = !0),
                    sr.ensureErrnoError(),
                    (n.stdin = r || n.stdin),
                    (n.stdout = t || n.stdout),
                    (n.stderr = e || n.stderr),
                    sr.createStandardStreams();
                },
                quit: function () {
                  sr.init.initialized = !1;
                  var r = n._fflush;
                  r && r(0);
                  for (var t = 0; t < sr.streams.length; t++) {
                    var e = sr.streams[t];
                    e && sr.close(e);
                  }
                },
                getMode: function (r, t) {
                  var e = 0;
                  return r && (e |= 365), t && (e |= 146), e;
                },
                joinPath: function (r, t) {
                  var e = nr.join.apply(null, r);
                  return t && '/' == e[0] && (e = e.substr(1)), e;
                },
                absolutePath: function (r, t) {
                  return or.resolve(t, r);
                },
                standardizePath: function (r) {
                  return nr.normalize(r);
                },
                findObject: function (r, t) {
                  var e = sr.analyzePath(r, t);
                  return e.exists ? e.object : (er(e.error), null);
                },
                analyzePath: function (r, t) {
                  try {
                    r = (n = sr.lookupPath(r, { follow: !t })).path;
                  } catch (r) {}
                  var e = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = sr.lookupPath(r, { parent: !0 });
                    (e.parentExists = !0),
                      (e.parentPath = n.path),
                      (e.parentObject = n.node),
                      (e.name = nr.basename(r)),
                      (n = sr.lookupPath(r, { follow: !t })),
                      (e.exists = !0),
                      (e.path = n.path),
                      (e.object = n.node),
                      (e.name = n.node.name),
                      (e.isRoot = '/' === n.path);
                  } catch (r) {
                    e.error = r.errno;
                  }
                  return e;
                },
                createFolder: function (r, t, e, n) {
                  var o = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    i = sr.getMode(e, n);
                  return sr.mkdir(o, i);
                },
                createPath: function (r, t, e, n) {
                  r = 'string' == typeof r ? r : sr.getPath(r);
                  for (var o = t.split('/').reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = nr.join2(r, i);
                      try {
                        sr.mkdir(a);
                      } catch (r) {}
                      r = a;
                    }
                  }
                  return a;
                },
                createFile: function (r, t, e, n, o) {
                  var i = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    a = sr.getMode(n, o);
                  return sr.create(i, a);
                },
                createDataFile: function (r, t, e, n, o, i) {
                  var a = t
                      ? nr.join2('string' == typeof r ? r : sr.getPath(r), t)
                      : r,
                    s = sr.getMode(n, o),
                    u = sr.create(a, s);
                  if (e) {
                    if ('string' == typeof e) {
                      for (
                        var c = new Array(e.length), f = 0, l = e.length;
                        f < l;
                        ++f
                      )
                        c[f] = e.charCodeAt(f);
                      e = c;
                    }
                    sr.chmod(u, 146 | s);
                    var d = sr.open(u, 'w');
                    sr.write(d, e, 0, e.length, 0, i),
                      sr.close(d),
                      sr.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (r, t, e, n) {
                  var o = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    i = sr.getMode(!!e, !!n);
                  sr.createDevice.major || (sr.createDevice.major = 64);
                  var a = sr.makedev(sr.createDevice.major++, 0);
                  return (
                    sr.registerDevice(a, {
                      open: function (r) {
                        r.seekable = !1;
                      },
                      close: function (r) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (r, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = e();
                          } catch (r) {
                            throw new sr.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new sr.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (r.node.timestamp = Date.now()), a;
                      },
                      write: function (r, t, e, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[e + a]);
                          } catch (r) {
                            throw new sr.ErrnoError(29);
                          }
                        return o && (r.node.timestamp = Date.now()), a;
                      },
                    }),
                    sr.mkdev(o, i, a)
                  );
                },
                createLink: function (r, t, e, n, o) {
                  var i = nr.join2('string' == typeof r ? r : sr.getPath(r), t);
                  return sr.symlink(e, i);
                },
                forceLoadFile: function (r) {
                  if (r.isDevice || r.isFolder || r.link || r.contents)
                    return !0;
                  var t = !0;
                  if ('undefined' != typeof XMLHttpRequest)
                    throw new Error(
                      'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
                    );
                  if (!i)
                    throw new Error(
                      'Cannot load without read() or XMLHttpRequest.',
                    );
                  try {
                    (r.contents = kr(i(r.url), !0)),
                      (r.usedBytes = r.contents.length);
                  } catch (r) {
                    t = !1;
                  }
                  return t || er(29), t;
                },
                createLazyFile: function (r, t, e, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (r) {
                      if (!(r > this.length - 1 || r < 0)) {
                        var t = r % this.chunkSize,
                          e = (r / this.chunkSize) | 0;
                        return this.getter(e)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (r) {
                      this.getter = r;
                    }),
                    (i.prototype.cacheLength = function () {
                      var r = new XMLHttpRequest();
                      if (
                        (r.open('HEAD', e, !1),
                        r.send(null),
                        !(
                          (r.status >= 200 && r.status < 300) ||
                          304 === r.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + e + '. Status: ' + r.status,
                        );
                      var t,
                        n = Number(r.getResponseHeader('Content-length')),
                        o =
                          (t = r.getResponseHeader('Accept-Ranges')) &&
                          'bytes' === t,
                        i =
                          (t = r.getResponseHeader('Content-Encoding')) &&
                          'gzip' === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter(function (r) {
                        var t = r * a,
                          o = (r + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[r] &&
                            (s.chunks[r] = (function (r, t) {
                              if (r > t)
                                throw new Error(
                                  'invalid range (' +
                                    r +
                                    ', ' +
                                    t +
                                    ') or no bytes requested!',
                                );
                              if (t > n - 1)
                                throw new Error(
                                  'only ' +
                                    n +
                                    ' bytes available! programmer error!',
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open('GET', e, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    'Range',
                                    'bytes=' + r + '-' + t,
                                  ),
                                'undefined' != typeof Uint8Array &&
                                  (o.responseType = 'arraybuffer'),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    'text/plain; charset=x-user-defined',
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " +
                                    e +
                                    '. Status: ' +
                                    o.status,
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : kr(o.responseText || '', !0);
                            })(t, o)),
                          void 0 === s.chunks[r])
                        )
                          throw new Error('doXHR failed!');
                        return s.chunks[r];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          c(
                            'LazyFiles on gzip forces download of the whole file when length is accessed',
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    'undefined' != typeof XMLHttpRequest)
                  )
                    throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
                  var a = { isDevice: !1, url: e },
                    s = sr.createFile(r, t, a, n, o);
                  a.contents
                    ? (s.contents = a.contents)
                    : a.url && ((s.contents = null), (s.url = a.url)),
                    Object.defineProperties(s, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var u = {};
                  return (
                    Object.keys(s.stream_ops).forEach(function (r) {
                      var t = s.stream_ops[r];
                      u[r] = function () {
                        if (!sr.forceLoadFile(s)) throw new sr.ErrnoError(29);
                        return t.apply(null, arguments);
                      };
                    }),
                    (u.read = function (r, t, e, n, o) {
                      if (!sr.forceLoadFile(s)) throw new sr.ErrnoError(29);
                      var i = r.node.contents;
                      if (o >= i.length) return 0;
                      var a = Math.min(i.length - o, n);
                      if (i.slice)
                        for (var u = 0; u < a; u++) t[e + u] = i[o + u];
                      else for (u = 0; u < a; u++) t[e + u] = i.get(o + u);
                      return a;
                    }),
                    (s.stream_ops = u),
                    s
                  );
                },
                createPreloadedFile: function (r, t, e, o, i, a, s, u, c, f) {
                  Browser.init();
                  var l = t ? or.resolve(nr.join2(r, t)) : r;
                  function d(e) {
                    function d(e) {
                      f && f(),
                        u || sr.createDataFile(r, t, e, o, i, c),
                        a && a(),
                        Y();
                    }
                    var p = !1;
                    n.preloadPlugins.forEach(function (r) {
                      p ||
                        (r.canHandle(l) &&
                          (r.handle(e, l, d, function () {
                            s && s(), Y();
                          }),
                          (p = !0)));
                    }),
                      p || d(e);
                  }
                  q(),
                    'string' == typeof e
                      ? Browser.asyncLoad(
                          e,
                          function (r) {
                            d(r);
                          },
                          s,
                        )
                      : d(e);
                },
                indexedDB: function () {
                  return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                  );
                },
                DB_NAME: function () {
                  return 'EM_FS_' + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: 'FILE_DATA',
                saveFilesToDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = sr.indexedDB();
                  try {
                    var o = n.open(sr.DB_NAME(), sr.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = function () {
                    c('creating db'),
                      o.result.createObjectStore(sr.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction(
                          [sr.DB_STORE_NAME],
                          'readwrite',
                        ),
                        i = n.objectStore(sr.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        u = r.length;
                      function c() {
                        0 == s ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = i.put(sr.analyzePath(r).object.contents, r);
                        (t.onsuccess = function () {
                          ++a + s == u && c();
                        }),
                          (t.onerror = function () {
                            s++, a + s == u && c();
                          });
                      }),
                        (n.onerror = e);
                    }),
                    (o.onerror = e);
                },
                loadFilesFromDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = sr.indexedDB();
                  try {
                    var o = n.open(sr.DB_NAME(), sr.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = e),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var i = n.transaction([sr.DB_STORE_NAME], 'readonly');
                      } catch (r) {
                        return void e(r);
                      }
                      var a = i.objectStore(sr.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = r.length;
                      function f() {
                        0 == u ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = a.get(r);
                        (t.onsuccess = function () {
                          sr.analyzePath(r).exists && sr.unlink(r),
                            sr.createDataFile(
                              nr.dirname(r),
                              nr.basename(r),
                              t.result,
                              !0,
                              !0,
                              !0,
                            ),
                            ++s + u == c && f();
                        }),
                          (t.onerror = function () {
                            u++, s + u == c && f();
                          });
                      }),
                        (i.onerror = e);
                    }),
                    (o.onerror = e);
                },
              },
              ur = {
                DEFAULT_POLLMASK: 5,
                mappings: {},
                umask: 511,
                calculateAt: function (r, t) {
                  if ('/' !== t[0]) {
                    var e;
                    if (-100 === r) e = sr.cwd();
                    else {
                      var n = sr.getStream(r);
                      if (!n) throw new sr.ErrnoError(8);
                      e = n.path;
                    }
                    t = nr.join2(e, t);
                  }
                  return t;
                },
                doStat: function (r, t, e) {
                  try {
                    var n = r(t);
                  } catch (r) {
                    if (
                      r &&
                      r.node &&
                      nr.normalize(t) !== nr.normalize(sr.getPath(r.node))
                    )
                      return -54;
                    throw r;
                  }
                  return (
                    (b[e >> 2] = n.dev),
                    (b[(e + 4) >> 2] = 0),
                    (b[(e + 8) >> 2] = n.ino),
                    (b[(e + 12) >> 2] = n.mode),
                    (b[(e + 16) >> 2] = n.nlink),
                    (b[(e + 20) >> 2] = n.uid),
                    (b[(e + 24) >> 2] = n.gid),
                    (b[(e + 28) >> 2] = n.rdev),
                    (b[(e + 32) >> 2] = 0),
                    (Z = [
                      n.size >>> 0,
                      ((G = n.size),
                      +N(G) >= 1
                        ? G > 0
                          ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                          : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (b[(e + 40) >> 2] = Z[0]),
                    (b[(e + 44) >> 2] = Z[1]),
                    (b[(e + 48) >> 2] = 4096),
                    (b[(e + 52) >> 2] = n.blocks),
                    (b[(e + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (b[(e + 60) >> 2] = 0),
                    (b[(e + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (b[(e + 68) >> 2] = 0),
                    (b[(e + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (b[(e + 76) >> 2] = 0),
                    (Z = [
                      n.ino >>> 0,
                      ((G = n.ino),
                      +N(G) >= 1
                        ? G > 0
                          ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                          : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (b[(e + 80) >> 2] = Z[0]),
                    (b[(e + 84) >> 2] = Z[1]),
                    0
                  );
                },
                doMsync: function (r, t, e, n, o) {
                  var i = E.slice(r, r + e);
                  sr.msync(t, i, o, e, n);
                },
                doMkdir: function (r, t) {
                  return (
                    '/' === (r = nr.normalize(r))[r.length - 1] &&
                      (r = r.substr(0, r.length - 1)),
                    sr.mkdir(r, t, 0),
                    0
                  );
                },
                doMknod: function (r, t, e) {
                  switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return sr.mknod(r, t, e), 0;
                },
                doReadlink: function (r, t, e) {
                  if (e <= 0) return -28;
                  var n = sr.readlink(r),
                    o = Math.min(e, A(n)),
                    i = g[t + o];
                  return x(n, E, t, e + 1), (g[t + o] = i), o;
                },
                doAccess: function (r, t) {
                  if (-8 & t) return -28;
                  var e;
                  if (!(e = sr.lookupPath(r, { follow: !0 }).node)) return -44;
                  var n = '';
                  return (
                    4 & t && (n += 'r'),
                    2 & t && (n += 'w'),
                    1 & t && (n += 'x'),
                    n && sr.nodePermissions(e, n) ? -2 : 0
                  );
                },
                doDup: function (r, t, e) {
                  var n = sr.getStream(e);
                  return n && sr.close(n), sr.open(r, t, 0, e, e).fd;
                },
                doReadv: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = b[(t + 8 * i) >> 2],
                      s = b[(t + (8 * i + 4)) >> 2],
                      u = sr.read(r, g, a, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = b[(t + 8 * i) >> 2],
                      s = b[(t + (8 * i + 4)) >> 2],
                      u = sr.write(r, g, a, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: 0,
                get: function (r) {
                  return (ur.varargs += 4), b[(ur.varargs - 4) >> 2];
                },
                getStr: function () {
                  return P(ur.get());
                },
                getStreamFromFD: function (r) {
                  void 0 === r && (r = ur.get());
                  var t = sr.getStream(r);
                  if (!t) throw new sr.ErrnoError(8);
                  return t;
                },
                get64: function () {
                  var r = ur.get();
                  return ur.get(), r;
                },
                getZero: function () {
                  ur.get();
                },
              };
            function cr(r, t, e) {
              t |= 0;
              var n,
                o = 0,
                i = 0,
                a = 0;
              if (
                ((n = ((r |= 0) + (e |= 0)) | 0), (t &= 255), (0 | e) >= 67)
              ) {
                for (; 0 != (3 & r); ) (g[r >> 0] = t), (r = (r + 1) | 0);
                for (
                  a = t | (t << 8) | (t << 16) | (t << 24),
                    i = ((o = (-4 & n) | 0) - 64) | 0;
                  (0 | r) <= (0 | i);

                )
                  (b[r >> 2] = a),
                    (b[(r + 4) >> 2] = a),
                    (b[(r + 8) >> 2] = a),
                    (b[(r + 12) >> 2] = a),
                    (b[(r + 16) >> 2] = a),
                    (b[(r + 20) >> 2] = a),
                    (b[(r + 24) >> 2] = a),
                    (b[(r + 28) >> 2] = a),
                    (b[(r + 32) >> 2] = a),
                    (b[(r + 36) >> 2] = a),
                    (b[(r + 40) >> 2] = a),
                    (b[(r + 44) >> 2] = a),
                    (b[(r + 48) >> 2] = a),
                    (b[(r + 52) >> 2] = a),
                    (b[(r + 56) >> 2] = a),
                    (b[(r + 60) >> 2] = a),
                    (r = (r + 64) | 0);
                for (; (0 | r) < (0 | o); ) (b[r >> 2] = a), (r = (r + 4) | 0);
              }
              for (; (0 | r) < (0 | n); ) (g[r >> 0] = t), (r = (r + 1) | 0);
              return (n - e) | 0;
            }
            var fr = 42,
              lr = 0;
            function dr(r) {
              try {
                return p.grow((r - w.byteLength + 65535) >> 16), M(p.buffer), 1;
              } catch (r) {}
            }
            var pr = {};
            function mr() {
              if (!mr.strings) {
                var r = {
                  USER: 'web_user',
                  LOGNAME: 'web_user',
                  PATH: '/',
                  PWD: '/',
                  HOME: '/home/web_user',
                  LANG:
                    (
                      ('object' == typeof navigator &&
                        navigator.languages &&
                        navigator.languages[0]) ||
                      'C'
                    ).replace('-', '_') + '.UTF-8',
                  _: a || './this.program',
                };
                for (var t in pr) r[t] = pr[t];
                var e = [];
                for (var t in r) e.push(t + '=' + r[t]);
                mr.strings = e;
              }
              return mr.strings;
            }
            function hr(r) {
              return r % 4 == 0 && (r % 100 != 0 || r % 400 == 0);
            }
            function yr(r, t) {
              for (var e = 0, n = 0; n <= t; e += r[n++]);
              return e;
            }
            var vr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              _r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function wr(r, t) {
              for (var e = new Date(r.getTime()); t > 0; ) {
                var n = hr(e.getFullYear()),
                  o = e.getMonth(),
                  i = (n ? vr : _r)[o];
                if (!(t > i - e.getDate()))
                  return e.setDate(e.getDate() + t), e;
                (t -= i - e.getDate() + 1),
                  e.setDate(1),
                  o < 11
                    ? e.setMonth(o + 1)
                    : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
              }
              return e;
            }
            function gr(r, t, e, n) {
              var o = b[(n + 40) >> 2],
                i = {
                  tm_sec: b[n >> 2],
                  tm_min: b[(n + 4) >> 2],
                  tm_hour: b[(n + 8) >> 2],
                  tm_mday: b[(n + 12) >> 2],
                  tm_mon: b[(n + 16) >> 2],
                  tm_year: b[(n + 20) >> 2],
                  tm_wday: b[(n + 24) >> 2],
                  tm_yday: b[(n + 28) >> 2],
                  tm_isdst: b[(n + 32) >> 2],
                  tm_gmtoff: b[(n + 36) >> 2],
                  tm_zone: o ? P(o) : '',
                },
                a = P(e),
                s = {
                  '%c': '%a %b %d %H:%M:%S %Y',
                  '%D': '%m/%d/%y',
                  '%F': '%Y-%m-%d',
                  '%h': '%b',
                  '%r': '%I:%M:%S %p',
                  '%R': '%H:%M',
                  '%T': '%H:%M:%S',
                  '%x': '%m/%d/%y',
                  '%X': '%H:%M:%S',
                  '%Ec': '%c',
                  '%EC': '%C',
                  '%Ex': '%m/%d/%y',
                  '%EX': '%H:%M:%S',
                  '%Ey': '%y',
                  '%EY': '%Y',
                  '%Od': '%d',
                  '%Oe': '%e',
                  '%OH': '%H',
                  '%OI': '%I',
                  '%Om': '%m',
                  '%OM': '%M',
                  '%OS': '%S',
                  '%Ou': '%u',
                  '%OU': '%U',
                  '%OV': '%V',
                  '%Ow': '%w',
                  '%OW': '%W',
                  '%Oy': '%y',
                };
              for (var u in s) a = a.replace(new RegExp(u, 'g'), s[u]);
              var c = [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                f = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ];
              function l(r, t, e) {
                for (
                  var n = 'number' == typeof r ? r.toString() : r || '';
                  n.length < t;

                )
                  n = e[0] + n;
                return n;
              }
              function d(r, t) {
                return l(r, t, '0');
              }
              function p(r, t) {
                function e(r) {
                  return r < 0 ? -1 : r > 0 ? 1 : 0;
                }
                var n;
                return (
                  0 === (n = e(r.getFullYear() - t.getFullYear())) &&
                    0 === (n = e(r.getMonth() - t.getMonth())) &&
                    (n = e(r.getDate() - t.getDate())),
                  n
                );
              }
              function m(r) {
                switch (r.getDay()) {
                  case 0:
                    return new Date(r.getFullYear() - 1, 11, 29);
                  case 1:
                    return r;
                  case 2:
                    return new Date(r.getFullYear(), 0, 3);
                  case 3:
                    return new Date(r.getFullYear(), 0, 2);
                  case 4:
                    return new Date(r.getFullYear(), 0, 1);
                  case 5:
                    return new Date(r.getFullYear() - 1, 11, 31);
                  case 6:
                    return new Date(r.getFullYear() - 1, 11, 30);
                }
              }
              function h(r) {
                var t = wr(new Date(r.tm_year + 1900, 0, 1), r.tm_yday),
                  e = new Date(t.getFullYear(), 0, 4),
                  n = new Date(t.getFullYear() + 1, 0, 4),
                  o = m(e),
                  i = m(n);
                return p(o, t) <= 0
                  ? p(i, t) <= 0
                    ? t.getFullYear() + 1
                    : t.getFullYear()
                  : t.getFullYear() - 1;
              }
              var y = {
                '%a': function (r) {
                  return c[r.tm_wday].substring(0, 3);
                },
                '%A': function (r) {
                  return c[r.tm_wday];
                },
                '%b': function (r) {
                  return f[r.tm_mon].substring(0, 3);
                },
                '%B': function (r) {
                  return f[r.tm_mon];
                },
                '%C': function (r) {
                  return d(((r.tm_year + 1900) / 100) | 0, 2);
                },
                '%d': function (r) {
                  return d(r.tm_mday, 2);
                },
                '%e': function (r) {
                  return l(r.tm_mday, 2, ' ');
                },
                '%g': function (r) {
                  return h(r).toString().substring(2);
                },
                '%G': function (r) {
                  return h(r);
                },
                '%H': function (r) {
                  return d(r.tm_hour, 2);
                },
                '%I': function (r) {
                  var t = r.tm_hour;
                  return 0 == t ? (t = 12) : t > 12 && (t -= 12), d(t, 2);
                },
                '%j': function (r) {
                  return d(
                    r.tm_mday +
                      yr(hr(r.tm_year + 1900) ? vr : _r, r.tm_mon - 1),
                    3,
                  );
                },
                '%m': function (r) {
                  return d(r.tm_mon + 1, 2);
                },
                '%M': function (r) {
                  return d(r.tm_min, 2);
                },
                '%n': function () {
                  return '\n';
                },
                '%p': function (r) {
                  return r.tm_hour >= 0 && r.tm_hour < 12 ? 'AM' : 'PM';
                },
                '%S': function (r) {
                  return d(r.tm_sec, 2);
                },
                '%t': function () {
                  return '\t';
                },
                '%u': function (r) {
                  return r.tm_wday || 7;
                },
                '%U': function (r) {
                  var t = new Date(r.tm_year + 1900, 0, 1),
                    e = 0 === t.getDay() ? t : wr(t, 7 - t.getDay()),
                    n = new Date(r.tm_year + 1900, r.tm_mon, r.tm_mday);
                  if (p(e, n) < 0) {
                    var o =
                        yr(hr(n.getFullYear()) ? vr : _r, n.getMonth() - 1) -
                        31,
                      i = 31 - e.getDate() + o + n.getDate();
                    return d(Math.ceil(i / 7), 2);
                  }
                  return 0 === p(e, t) ? '01' : '00';
                },
                '%V': function (r) {
                  var t,
                    e = new Date(r.tm_year + 1900, 0, 4),
                    n = new Date(r.tm_year + 1901, 0, 4),
                    o = m(e),
                    i = m(n),
                    a = wr(new Date(r.tm_year + 1900, 0, 1), r.tm_yday);
                  return p(a, o) < 0
                    ? '53'
                    : p(i, a) <= 0
                    ? '01'
                    : ((t =
                        o.getFullYear() < r.tm_year + 1900
                          ? r.tm_yday + 32 - o.getDate()
                          : r.tm_yday + 1 - o.getDate()),
                      d(Math.ceil(t / 7), 2));
                },
                '%w': function (r) {
                  return r.tm_wday;
                },
                '%W': function (r) {
                  var t = new Date(r.tm_year, 0, 1),
                    e =
                      1 === t.getDay()
                        ? t
                        : wr(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1),
                    n = new Date(r.tm_year + 1900, r.tm_mon, r.tm_mday);
                  if (p(e, n) < 0) {
                    var o =
                        yr(hr(n.getFullYear()) ? vr : _r, n.getMonth() - 1) -
                        31,
                      i = 31 - e.getDate() + o + n.getDate();
                    return d(Math.ceil(i / 7), 2);
                  }
                  return 0 === p(e, t) ? '01' : '00';
                },
                '%y': function (r) {
                  return (r.tm_year + 1900).toString().substring(2);
                },
                '%Y': function (r) {
                  return r.tm_year + 1900;
                },
                '%z': function (r) {
                  var t = r.tm_gmtoff,
                    e = t >= 0;
                  return (
                    (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
                    (e ? '+' : '-') + String('0000' + t).slice(-4)
                  );
                },
                '%Z': function (r) {
                  return r.tm_zone;
                },
                '%%': function () {
                  return '%';
                },
              };
              for (var u in y)
                a.indexOf(u) >= 0 &&
                  (a = a.replace(new RegExp(u, 'g'), y[u](i)));
              var v = kr(a, !1);
              return v.length > t
                ? 0
                : ((function (r, t) {
                    g.set(r, t);
                  })(v, r),
                  v.length - 1);
            }
            function Er(r, t) {
              Er.array || (Er.array = []);
              var e,
                n = Er.array;
              for (n.length = 0; (e = E[r++]); )
                100 === e || 102 === e
                  ? ((t = (t + 7) & -8), n.push(D[t >> 3]), (t += 8))
                  : ((t = (t + 3) & -4), n.push(b[t >> 2]), (t += 4));
              return n;
            }
            function kr(r, t, e) {
              var n = e > 0 ? e : A(r) + 1,
                o = new Array(n),
                i = x(r, o, 0, o.length);
              return t && (o.length = i), o;
            }
            (tr = function () {
              return performance.now();
            }),
              sr.staticInit();
            var br = {
                M: function (r, t) {
                  return (function (r, t) {
                    var e;
                    if (0 === r) e = Date.now();
                    else {
                      if (1 !== r && 4 !== r) return er(28), -1;
                      e = tr();
                    }
                    return (
                      (b[t >> 2] = (e / 1e3) | 0),
                      (b[(t + 4) >> 2] = ((e % 1e3) * 1e3 * 1e3) | 0),
                      0
                    );
                  })(r, t);
                },
                k: function (r) {
                  return Rr(r);
                },
                j: function (r, t, e) {
                  throw (
                    ('uncaught_exception' in zr
                      ? zr.uncaught_exceptions++
                      : (zr.uncaught_exceptions = 1),
                    r)
                  );
                },
                q: function () {},
                U: function (r, t) {
                  return er(63), -1;
                },
                P: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr();
                    return sr.unlink(e), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                R: function (r, t) {
                  ur.varargs = t;
                  try {
                    return (function (r, t, e, n, o, i) {
                      var a;
                      i <<= 12;
                      var s = !1;
                      if (0 != (16 & n) && r % 16384 != 0) return -28;
                      if (0 != (32 & n)) {
                        if (!(a = Br(16384, t))) return -48;
                        cr(a, 0, t), (s = !0);
                      } else {
                        var u = sr.getStream(o);
                        if (!u) return -8;
                        var c = sr.mmap(u, E, r, t, i, e, n);
                        (a = c.ptr), (s = c.allocated);
                      }
                      return (
                        (ur.mappings[a] = {
                          malloc: a,
                          len: t,
                          allocated: s,
                          fd: o,
                          flags: n,
                          offset: i,
                        }),
                        a
                      );
                    })(
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                    );
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                S: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get();
                    return ur.doStat(sr.stat, e, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                T: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD(),
                      n = ur.get();
                    return ur.doStat(sr.stat, e.path, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                L: function (r, t) {
                  ur.varargs = t;
                  try {
                    return fr;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                y: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD();
                    switch (ur.get()) {
                      case 0:
                        return (n = ur.get()) < 0
                          ? -28
                          : sr.open(e.path, e.flags, 0, n).fd;
                      case 1:
                      case 2:
                        return 0;
                      case 3:
                        return e.flags;
                      case 4:
                        var n = ur.get();
                        return (e.flags |= n), 0;
                      case 12:
                        return (n = ur.get()), (k[(n + 0) >> 1] = 2), 0;
                      case 13:
                      case 14:
                        return 0;
                      case 16:
                      case 8:
                        return -28;
                      case 9:
                        return er(28), -1;
                      default:
                        return -28;
                    }
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                K: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get();
                    return ur.doAccess(e, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                z: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get(),
                      o = ur.get();
                    return sr.open(e, n, o).fd;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                O: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD(),
                      n = ur.get();
                    switch (n) {
                      case 21509:
                      case 21505:
                        return e.tty ? 0 : -59;
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21506:
                      case 21507:
                      case 21508:
                        return e.tty ? 0 : -59;
                      case 21519:
                        if (!e.tty) return -59;
                        var o = ur.get();
                        return (b[o >> 2] = 0), 0;
                      case 21520:
                        return e.tty ? -28 : -59;
                      case 21531:
                        return (o = ur.get()), sr.ioctl(e, n, o);
                      case 21523:
                      case 21524:
                        return e.tty ? 0 : -59;
                      default:
                        J('bad ioctl syscall ' + n);
                    }
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                Q: function (r, t) {
                  ur.varargs = t;
                  try {
                    return (function (r, t) {
                      if (-1 === r || 0 === t) return -28;
                      var e = ur.mappings[r];
                      if (!e) return 0;
                      if (t === e.len) {
                        var n = sr.getStream(e.fd);
                        ur.doMsync(r, n, t, e.flags, e.offset),
                          sr.munmap(n),
                          (ur.mappings[r] = null),
                          e.allocated && Or(e.malloc);
                      }
                      return 0;
                    })(ur.get(), ur.get());
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                m: function () {},
                w: function () {
                  J();
                },
                C: function (r, t, e) {
                  var n = Er(t, e);
                  return Q[r].apply(null, n);
                },
                d: function (r, t) {
                  !(function (r, t) {
                    throw (Tr(r, t || 1), 'longjmp');
                  })(r, t);
                },
                E: function (r, t, e) {
                  E.set(E.subarray(t, t + e), r);
                },
                F: function (r) {
                  var t = E.length;
                  if (r > 2147418112) return !1;
                  for (var e, n, o = 1; o <= 4; o *= 2) {
                    var i = t * (1 + 0.2 / o);
                    if (
                      ((i = Math.min(i, r + 100663296)),
                      dr(
                        Math.min(
                          2147418112,
                          ((e = Math.max(16777216, r, i)) % (n = 65536) > 0 &&
                            (e += n - (e % n)),
                          e),
                        ),
                      ))
                    )
                      return !0;
                  }
                  return !1;
                },
                I: function (r, t) {
                  var e = mr(),
                    n = 0;
                  return (
                    e.forEach(function (e, o) {
                      var i = t + n;
                      (b[(r + 4 * o) >> 2] = i),
                        (function (r, t, e) {
                          for (var n = 0; n < r.length; ++n)
                            g[t++ >> 0] = r.charCodeAt(n);
                          e || (g[t >> 0] = 0);
                        })(e, i),
                        (n += e.length + 1);
                    }),
                    0
                  );
                },
                J: function (r, t) {
                  var e = mr();
                  b[r >> 2] = e.length;
                  var n = 0;
                  return (
                    e.forEach(function (r) {
                      n += r.length + 1;
                    }),
                    (b[t >> 2] = n),
                    0
                  );
                },
                l: function (r) {
                  !(function (r, t) {
                    (t && d && 0 === r) ||
                      (d || ((v = !0), n.onExit && n.onExit(r)),
                      s(r, new rt(r)));
                  })(r);
                },
                p: function (r) {
                  try {
                    var t = ur.getStreamFromFD(r);
                    return sr.close(t), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                H: function (r, t) {
                  try {
                    var e = ur.getStreamFromFD(r),
                      n = e.tty
                        ? 2
                        : sr.isDir(e.mode)
                        ? 3
                        : sr.isLink(e.mode)
                        ? 7
                        : 4;
                    return (g[t >> 0] = n), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                N: function (r, t, e, n) {
                  try {
                    var o = ur.getStreamFromFD(r),
                      i = ur.doReadv(o, t, e);
                    return (b[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                D: function (r, t, e, n, o) {
                  try {
                    var i = ur.getStreamFromFD(r),
                      a = 4294967296 * e + (t >>> 0);
                    return a <= -9007199254740992 || a >= 9007199254740992
                      ? -61
                      : (sr.llseek(i, a, n),
                        (Z = [
                          i.position >>> 0,
                          ((G = i.position),
                          +N(G) >= 1
                            ? G > 0
                              ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                              : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (b[o >> 2] = Z[0]),
                        (b[(o + 4) >> 2] = Z[1]),
                        i.getdents && 0 === a && 0 === n && (i.getdents = null),
                        0);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                x: function (r, t, e, n) {
                  try {
                    var o = ur.getStreamFromFD(r),
                      i = ur.doWritev(o, t, e);
                    return (b[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                a: function () {
                  return 0 | m;
                },
                X: function (r) {
                  var t = Date.now();
                  return (
                    (b[r >> 2] = (t / 1e3) | 0),
                    (b[(r + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                    0
                  );
                },
                Y: function (r) {
                  var t = $r();
                  try {
                    return Zr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                V: function (r, t) {
                  var e = $r();
                  try {
                    return Kr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                v: function (r) {
                  var t = $r();
                  try {
                    return qr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                f: function (r, t) {
                  var e = $r();
                  try {
                    return Yr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                e: function (r, t, e) {
                  var n = $r();
                  try {
                    return Jr(r, t, e);
                  } catch (r) {
                    if ((Qr(n), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                g: function (r, t, e, n) {
                  var o = $r();
                  try {
                    return Vr(r, t, e, n);
                  } catch (r) {
                    if ((Qr(o), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                n: function (r, t, e, n, o) {
                  var i = $r();
                  try {
                    return Xr(r, t, e, n, o);
                  } catch (r) {
                    if ((Qr(i), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                W: function (r, t, e, n, o, i, a) {
                  var s = $r();
                  try {
                    return Gr(r, t, e, n, o, i, a);
                  } catch (r) {
                    if ((Qr(s), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                s: function (r) {
                  var t = $r();
                  try {
                    Nr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                h: function (r, t) {
                  var e = $r();
                  try {
                    Lr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                o: function (r, t, e) {
                  var n = $r();
                  try {
                    Ir(r, t, e);
                  } catch (r) {
                    if ((Qr(n), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                u: function (r, t, e, n) {
                  var o = $r();
                  try {
                    Hr(r, t, e, n);
                  } catch (r) {
                    if ((Qr(o), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                t: function (r, t, e, n, o) {
                  var i = $r();
                  try {
                    Ur(r, t, e, n, o);
                  } catch (r) {
                    if ((Qr(i), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                r: function (r, t, e, n, o, i) {
                  var a = $r();
                  try {
                    Wr(r, t, e, n, o, i);
                  } catch (r) {
                    if ((Qr(a), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                memory: p,
                i: function r(t, e, n, o) {
                  (e |= 0), (n |= 0), (o |= 0);
                  var i = 0;
                  for (
                    lr = (lr + 1) | 0, b[(t |= 0) >> 2] = lr;
                    (0 | i) < (0 | o);

                  ) {
                    if (0 == (0 | b[(n + (i << 3)) >> 2]))
                      return (
                        (b[(n + (i << 3)) >> 2] = lr),
                        (b[(n + (4 + (i << 3))) >> 2] = e),
                        (b[(n + (8 + (i << 3))) >> 2] = 0),
                        h(0 | o),
                        0 | n
                      );
                    i = (i + 1) | 0;
                  }
                  return (
                    (n =
                      0 |
                      r(
                        0 | t,
                        0 | e,
                        0 |
                          (n =
                            0 |
                            jr(0 | n, (8 * ((1 + (o = (2 * o) | 0)) | 0)) | 0)),
                        0 | o,
                      )),
                    h(0 | o),
                    0 | n
                  );
                },
                b: function (r) {
                  h(0 | r);
                },
                G: function (r, t, e, n) {
                  return gr(r, t, e, n);
                },
                table: y,
                c: function (r, t, e) {
                  (r |= 0), (t |= 0), (e |= 0);
                  for (
                    var n = 0, o = 0;
                    (0 | n) < (0 | e) &&
                    0 != (0 | (o = 0 | b[(t + (n << 3)) >> 2]));

                  ) {
                    if ((0 | o) == (0 | r))
                      return 0 | b[(t + (4 + (n << 3))) >> 2];
                    n = (n + 1) | 0;
                  }
                  return 0;
                },
                A: function (r) {
                  var t = (Date.now() / 1e3) | 0;
                  return r && (b[r >> 2] = t), t;
                },
                B: function (r) {
                  return 0 !== r && cr(r, 0, 16), 0;
                },
              },
              Dr = (function () {
                var r = { a: br };
                function t(r, t) {
                  var e = r.exports;
                  (n.asm = e), Y();
                }
                function e(r) {
                  t(r.instance);
                }
                function o(t) {
                  return (
                    l || 'function' != typeof fetch
                      ? new Promise(function (r, t) {
                          r($());
                        })
                      : fetch(K, { credentials: 'same-origin' })
                          .then(function (r) {
                            if (!r.ok)
                              throw (
                                "failed to load wasm binary file at '" + K + "'"
                              );
                            return r.arrayBuffer();
                          })
                          .catch(function () {
                            return $();
                          })
                  )
                    .then(function (t) {
                      return WebAssembly.instantiate(t, r);
                    })
                    .then(t, function (r) {
                      f('failed to asynchronously prepare wasm: ' + r), J(r);
                    });
                }
                if ((q(), n.instantiateWasm))
                  try {
                    return n.instantiateWasm(r, t);
                  } catch (r) {
                    return (
                      f(
                        'Module.instantiateWasm callback failed with error: ' +
                          r,
                      ),
                      !1
                    );
                  }
                return (
                  (function () {
                    if (
                      l ||
                      'function' != typeof WebAssembly.instantiateStreaming ||
                      V(K) ||
                      'function' != typeof fetch
                    )
                      return o(e);
                    fetch(K, { credentials: 'same-origin' }).then(function (t) {
                      return WebAssembly.instantiateStreaming(t, r).then(
                        e,
                        function (r) {
                          f('wasm streaming compile failed: ' + r),
                            f('falling back to ArrayBuffer instantiation'),
                            o(e);
                        },
                      );
                    });
                  })(),
                  {}
                );
              })();
            n.asm = Dr;
            var Sr,
              Fr = (n.___wasm_call_ctors = function () {
                return (Fr = n.___wasm_call_ctors = n.asm.Z).apply(
                  null,
                  arguments,
                );
              }),
              Pr = (n._emscripten_bind_VoidPtr___destroy___0 = function () {
                return (Pr = n._emscripten_bind_VoidPtr___destroy___0 =
                  n.asm._).apply(null, arguments);
              }),
              xr = (n._emscripten_bind_Main_layout_3 = function () {
                return (xr = n._emscripten_bind_Main_layout_3 = n.asm.$).apply(
                  null,
                  arguments,
                );
              }),
              Ar = (n._emscripten_bind_Main_lastError_0 = function () {
                return (Ar = n._emscripten_bind_Main_lastError_0 =
                  n.asm.aa).apply(null, arguments);
              }),
              Mr = (n._emscripten_bind_Main_createFile_2 = function () {
                return (Mr = n._emscripten_bind_Main_createFile_2 =
                  n.asm.ba).apply(null, arguments);
              }),
              Cr = (n._emscripten_bind_Main___destroy___0 = function () {
                return (Cr = n._emscripten_bind_Main___destroy___0 =
                  n.asm.ca).apply(null, arguments);
              }),
              Rr = (n._malloc = function () {
                return (Rr = n._malloc = n.asm.da).apply(null, arguments);
              }),
              Or = (n._free = function () {
                return (Or = n._free = n.asm.ea).apply(null, arguments);
              }),
              jr = (n._realloc = function () {
                return (jr = n._realloc = n.asm.fa).apply(null, arguments);
              }),
              Tr =
                ((n.___errno_location = function () {
                  return (n.___errno_location = n.asm.ga).apply(
                    null,
                    arguments,
                  );
                }),
                (n._setThrew = function () {
                  return (Tr = n._setThrew = n.asm.ha).apply(null, arguments);
                })),
              zr = (n.__ZSt18uncaught_exceptionv = function () {
                return (zr = n.__ZSt18uncaught_exceptionv = n.asm.ia).apply(
                  null,
                  arguments,
                );
              }),
              Br = (n._memalign = function () {
                return (Br = n._memalign = n.asm.ja).apply(null, arguments);
              }),
              Nr = (n.dynCall_v = function () {
                return (Nr = n.dynCall_v = n.asm.ka).apply(null, arguments);
              }),
              Lr = (n.dynCall_vi = function () {
                return (Lr = n.dynCall_vi = n.asm.la).apply(null, arguments);
              }),
              Ir = (n.dynCall_vii = function () {
                return (Ir = n.dynCall_vii = n.asm.ma).apply(null, arguments);
              }),
              Hr = (n.dynCall_viii = function () {
                return (Hr = n.dynCall_viii = n.asm.na).apply(null, arguments);
              }),
              Ur = (n.dynCall_viiii = function () {
                return (Ur = n.dynCall_viiii = n.asm.oa).apply(null, arguments);
              }),
              Wr = (n.dynCall_viiiii = function () {
                return (Wr = n.dynCall_viiiii = n.asm.pa).apply(
                  null,
                  arguments,
                );
              }),
              qr = (n.dynCall_i = function () {
                return (qr = n.dynCall_i = n.asm.qa).apply(null, arguments);
              }),
              Yr = (n.dynCall_ii = function () {
                return (Yr = n.dynCall_ii = n.asm.ra).apply(null, arguments);
              }),
              Jr = (n.dynCall_iii = function () {
                return (Jr = n.dynCall_iii = n.asm.sa).apply(null, arguments);
              }),
              Vr = (n.dynCall_iiii = function () {
                return (Vr = n.dynCall_iiii = n.asm.ta).apply(null, arguments);
              }),
              Xr = (n.dynCall_iiiii = function () {
                return (Xr = n.dynCall_iiiii = n.asm.ua).apply(null, arguments);
              }),
              Gr = (n.dynCall_iiiiiii = function () {
                return (Gr = n.dynCall_iiiiiii = n.asm.va).apply(
                  null,
                  arguments,
                );
              }),
              Zr = (n.dynCall_d = function () {
                return (Zr = n.dynCall_d = n.asm.wa).apply(null, arguments);
              }),
              Kr = (n.dynCall_di = function () {
                return (Kr = n.dynCall_di = n.asm.xa).apply(null, arguments);
              }),
              $r = (n.stackSave = function () {
                return ($r = n.stackSave = n.asm.ya).apply(null, arguments);
              }),
              Qr =
                ((n.stackAlloc = function () {
                  return (n.stackAlloc = n.asm.za).apply(null, arguments);
                }),
                (n.stackRestore = function () {
                  return (Qr = n.stackRestore = n.asm.Aa).apply(
                    null,
                    arguments,
                  );
                }));
            function rt(r) {
              (this.name = 'ExitStatus'),
                (this.message = 'Program terminated with exit(' + r + ')'),
                (this.status = r);
            }
            function tt(r) {
              function t() {
                Sr ||
                  ((Sr = !0),
                  v ||
                    ((B = !0),
                    n.noFSInit || sr.init.initialized || sr.init(),
                    ir.init(),
                    R(j),
                    (sr.ignorePermissions = !1),
                    R(T),
                    n.onRuntimeInitialized && n.onRuntimeInitialized(),
                    (function () {
                      if (n.postRun)
                        for (
                          'function' == typeof n.postRun &&
                          (n.postRun = [n.postRun]);
                          n.postRun.length;

                        )
                          (r = n.postRun.shift()), z.unshift(r);
                      var r;
                      R(z);
                    })()));
              }
              U > 0 ||
                ((function () {
                  if (n.preRun)
                    for (
                      'function' == typeof n.preRun && (n.preRun = [n.preRun]);
                      n.preRun.length;

                    )
                      (r = n.preRun.shift()), O.unshift(r);
                  var r;
                  R(O);
                })(),
                U > 0 ||
                  (n.setStatus
                    ? (n.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          n.setStatus('');
                        }, 1),
                          t();
                      }, 1))
                    : t()));
            }
            if (
              ((n.asm = Dr),
              (n.then = function (r) {
                if (Sr) r(n);
                else {
                  var t = n.onRuntimeInitialized;
                  n.onRuntimeInitialized = function () {
                    t && t(), r(n);
                  };
                }
                return n;
              }),
              (W = function r() {
                Sr || tt(), Sr || (W = r);
              }),
              (n.run = tt),
              n.preInit)
            )
              for (
                'function' == typeof n.preInit && (n.preInit = [n.preInit]);
                n.preInit.length > 0;

              )
                n.preInit.pop()();
            function et() {}
            function nt(r) {
              return (r || et).__cache__;
            }
            function ot(r, t) {
              var e = nt(t),
                n = e[r];
              return (
                n ||
                (((n = Object.create((t || et).prototype)).ptr = r), (e[r] = n))
              );
            }
            (d = !0),
              tt(),
              (et.prototype = Object.create(et.prototype)),
              (et.prototype.constructor = et),
              (et.prototype.__class__ = et),
              (et.__cache__ = {}),
              (n.WrapperObject = et),
              (n.getCache = nt),
              (n.wrapPointer = ot),
              (n.castObject = function (r, t) {
                return ot(r.ptr, t);
              }),
              (n.NULL = ot(0)),
              (n.destroy = function (r) {
                if (!r.__destroy__)
                  throw 'Error: Cannot destroy object. (Did you create it yourself?)';
                r.__destroy__(), delete nt(r.__class__)[r.ptr];
              }),
              (n.compare = function (r, t) {
                return r.ptr === t.ptr;
              }),
              (n.getPointer = function (r) {
                return r.ptr;
              }),
              (n.getClass = function (r) {
                return r.__class__;
              });
            var it,
              at = {
                buffer: 0,
                size: 0,
                pos: 0,
                temps: [],
                needed: 0,
                prepare: function () {
                  if (at.needed) {
                    for (var r = 0; r < at.temps.length; r++)
                      n._free(at.temps[r]);
                    (at.temps.length = 0),
                      n._free(at.buffer),
                      (at.buffer = 0),
                      (at.size += at.needed),
                      (at.needed = 0);
                  }
                  at.buffer ||
                    ((at.size += 128),
                    (at.buffer = n._malloc(at.size)),
                    _(at.buffer)),
                    (at.pos = 0);
                },
                alloc: function (r, t) {
                  _(at.buffer);
                  var e,
                    o = t.BYTES_PER_ELEMENT,
                    i = r.length * o;
                  return (
                    (i = (i + 7) & -8),
                    at.pos + i >= at.size
                      ? (_(i > 0),
                        (at.needed += i),
                        (e = n._malloc(i)),
                        at.temps.push(e))
                      : ((e = at.buffer + at.pos), (at.pos += i)),
                    e
                  );
                },
                copy: function (r, t, e) {
                  var n = e;
                  switch (t.BYTES_PER_ELEMENT) {
                    case 2:
                      n >>= 1;
                      break;
                    case 4:
                      n >>= 2;
                      break;
                    case 8:
                      n >>= 3;
                  }
                  for (var o = 0; o < r.length; o++) t[n + o] = r[o];
                },
              };
            function st(r) {
              if ('string' == typeof r) {
                var t = kr(r),
                  e = at.alloc(t, g);
                return at.copy(t, g, e), e;
              }
              return r;
            }
            function ut() {
              throw 'cannot construct a VoidPtr, no constructor in IDL';
            }
            function ct() {
              throw 'cannot construct a Main, no constructor in IDL';
            }
            return (
              (ut.prototype = Object.create(et.prototype)),
              (ut.prototype.constructor = ut),
              (ut.prototype.__class__ = ut),
              (ut.__cache__ = {}),
              (n.VoidPtr = ut),
              (ut.prototype.__destroy__ = ut.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Pr(r);
                }),
              (ct.prototype = Object.create(et.prototype)),
              (ct.prototype.constructor = ct),
              (ct.prototype.__class__ = ct),
              (ct.__cache__ = {}),
              (n.Main = ct),
              (ct.prototype.layout = ct.prototype.layout =
                function (r, t, e) {
                  var n = this.ptr;
                  return (
                    at.prepare(),
                    (r = r && 'object' == typeof r ? r.ptr : st(r)),
                    (t = t && 'object' == typeof t ? t.ptr : st(t)),
                    (e = e && 'object' == typeof e ? e.ptr : st(e)),
                    P(xr(n, r, t, e))
                  );
                }),
              (ct.prototype.lastError = ct.prototype.lastError =
                function () {
                  var r = this.ptr;
                  return P(Ar(r));
                }),
              (ct.prototype.createFile = ct.prototype.createFile =
                function (r, t) {
                  var e = this.ptr;
                  at.prepare(),
                    (r = r && 'object' == typeof r ? r.ptr : st(r)),
                    (t = t && 'object' == typeof t ? t.ptr : st(t)),
                    Mr(e, r, t);
                }),
              (ct.prototype.__destroy__ = ct.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Cr(r);
                }),
              B || ((it = function () {}), T.unshift(it)),
              r
            );
          });
      r.exports = n;
    }),
    l = Object.freeze({ __proto__: null, default: f, __moduleExports: f }),
    d = function () {
      return (d =
        Object.assign ||
        function (r) {
          for (var t, e = 1, n = arguments.length; e < n; e++)
            for (var o in (t = arguments[e]))
              Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
          return r;
        }).apply(this, arguments);
    },
    p = function () {
      for (var r = 0, t = 0, e = arguments.length; t < e; t++)
        r += arguments[t].length;
      var n = Array(r),
        o = 0;
      for (t = 0; t < e; t++)
        for (var i = arguments[t], a = 0, s = i.length; a < s; a++, o++)
          n[o] = i[a];
      return n;
    };
  function m(r) {
    return {
      path: r.path,
      data:
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="' +
        r.width +
        '" height="' +
        r.height +
        '"></svg>',
    };
  }
  function h(r, t) {
    var e,
      n = d({ images: [], files: [] }, t);
    p(n.files, ((e = n.images), e.map(m))).forEach(function (t) {
      return r.Main.prototype.createFile(t.path, t.data);
    });
  }
  var y = {
      layout: function (r, t, e, n) {
        return (
          void 0 === t && (t = 'svg'),
          void 0 === e && (e = 'dot'),
          r
            ? a(l).then(function (o) {
                h(o, n);
                var i = o.Main.prototype.layout(r, t, e);
                if (!i) throw new Error(o.Main.prototype.lastError());
                return i;
              })
            : Promise.resolve('')
        );
      },
      circo: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'circo', e);
      },
      dot: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'dot', e);
      },
      fdp: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'fdp', e);
      },
      neato: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'neato', e);
      },
      osage: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'osage', e);
      },
      patchwork: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'patchwork', e);
      },
      twopi: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'twopi', e);
      },
    },
    v = (function () {
      function r(r) {
        this._wasm = r;
      }
      return (
        (r.prototype.layout = function (r, t, e, n) {
          if ((void 0 === t && (t = 'svg'), void 0 === e && (e = 'dot'), !r))
            return '';
          h(this._wasm, n);
          var o = this._wasm.Main.prototype.layout(r, t, e);
          if (!o) throw new Error(this._wasm.Main.prototype.lastError());
          return o;
        }),
        (r.prototype.circo = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'circo', e);
        }),
        (r.prototype.dot = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'dot', e);
        }),
        (r.prototype.fdp = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'fdp', e);
        }),
        (r.prototype.neato = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'neato', e);
        }),
        (r.prototype.osage = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'osage', e);
        }),
        (r.prototype.patchwork = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'patchwork', e);
        }),
        (r.prototype.twopi = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'twopi', e);
        }),
        r
      );
    })();
  (r.StackParser = u),
    (r.graphviz = y),
    (r.graphvizSync = function () {
      return a(l).then(function (r) {
        return new v(r);
      });
    }),
    (r.parse = c),
    (r.wasmFolder = i),
    Object.defineProperty(r, '__esModule', { value: !0 });
});
!(function (r, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((r = r || self)['@hpcc-js/wasm'] = {}));
})(this, function (r) {
  'use strict';
  function t(r, t) {
    return r((t = { exports: {} }), t.exports), t.exports;
  }
  var e = t(function (r, t) {
      var e,
        n =
          ((e =
            'undefined' != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          function (r) {
            var t,
              n = void 0 !== (r = r || {}) ? r : {},
              o = {};
            for (t in n) n.hasOwnProperty(t) && (o[t] = n[t]);
            var i,
              a = './this.program',
              s = '';
            document.currentScript && (s = document.currentScript.src),
              e && (s = e),
              (s =
                0 !== s.indexOf('blob:')
                  ? s.substr(0, s.lastIndexOf('/') + 1)
                  : ''),
              (i = function (r) {
                var t = new XMLHttpRequest();
                return t.open('GET', r, !1), t.send(null), t.responseText;
              });
            var u,
              c,
              f = n.print || console.log.bind(console),
              l = n.printErr || console.warn.bind(console);
            for (t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
            (o = null),
              n.arguments && n.arguments,
              n.thisProgram && (a = n.thisProgram),
              n.quit && n.quit,
              n.wasmBinary && (u = n.wasmBinary),
              n.noExitRuntime && n.noExitRuntime,
              'object' != typeof WebAssembly &&
                l('no native wasm support detected');
            var d = new WebAssembly.Table({
                initial: 153,
                maximum: 153,
                element: 'anyfunc',
              }),
              p = !1;
            function m(r, t) {
              r || H('Assertion failed: ' + t);
            }
            var h,
              y,
              v,
              _,
              w,
              g =
                'undefined' != typeof TextDecoder
                  ? new TextDecoder('utf8')
                  : void 0;
            function E(r, t, e) {
              for (var n = t + e, o = t; r[o] && !(o >= n); ) ++o;
              if (o - t > 16 && r.subarray && g)
                return g.decode(r.subarray(t, o));
              for (var i = ''; t < o; ) {
                var a = r[t++];
                if (128 & a) {
                  var s = 63 & r[t++];
                  if (192 != (224 & a)) {
                    var u = 63 & r[t++];
                    if (
                      (a =
                        224 == (240 & a)
                          ? ((15 & a) << 12) | (s << 6) | u
                          : ((7 & a) << 18) |
                            (s << 12) |
                            (u << 6) |
                            (63 & r[t++])) < 65536
                    )
                      i += String.fromCharCode(a);
                    else {
                      var c = a - 65536;
                      i += String.fromCharCode(
                        55296 | (c >> 10),
                        56320 | (1023 & c),
                      );
                    }
                  } else i += String.fromCharCode(((31 & a) << 6) | s);
                } else i += String.fromCharCode(a);
              }
              return i;
            }
            function k(r, t) {
              return r ? E(v, r, t) : '';
            }
            function b(r, t, e, n) {
              if (!(n > 0)) return 0;
              for (var o = e, i = e + n - 1, a = 0; a < r.length; ++a) {
                var s = r.charCodeAt(a);
                if (
                  (s >= 55296 &&
                    s <= 57343 &&
                    (s =
                      (65536 + ((1023 & s) << 10)) |
                      (1023 & r.charCodeAt(++a))),
                  s <= 127)
                ) {
                  if (e >= i) break;
                  t[e++] = s;
                } else if (s <= 2047) {
                  if (e + 1 >= i) break;
                  (t[e++] = 192 | (s >> 6)), (t[e++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (e + 2 >= i) break;
                  (t[e++] = 224 | (s >> 12)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                } else {
                  if (e + 3 >= i) break;
                  (t[e++] = 240 | (s >> 18)),
                    (t[e++] = 128 | ((s >> 12) & 63)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                }
              }
              return (t[e] = 0), e - o;
            }
            function D(r) {
              for (var t = 0, e = 0; e < r.length; ++e) {
                var n = r.charCodeAt(e);
                n >= 55296 &&
                  n <= 57343 &&
                  (n =
                    (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++e))),
                  n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return t;
            }
            function S(r) {
              (h = r),
                (n.HEAP8 = y = new Int8Array(r)),
                (n.HEAP16 = new Int16Array(r)),
                (n.HEAP32 = _ = new Int32Array(r)),
                (n.HEAPU8 = v = new Uint8Array(r)),
                (n.HEAPU16 = new Uint16Array(r)),
                (n.HEAPU32 = new Uint32Array(r)),
                (n.HEAPF32 = new Float32Array(r)),
                (n.HEAPF64 = w = new Float64Array(r));
            }
            'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
            var F = n.TOTAL_MEMORY || 16777216;
            function P(r) {
              for (; r.length > 0; ) {
                var t = r.shift();
                if ('function' != typeof t) {
                  var e = t.func;
                  'number' == typeof e
                    ? void 0 === t.arg
                      ? n.dynCall_v(e)
                      : n.dynCall_vi(e, t.arg)
                    : e(void 0 === t.arg ? null : t.arg);
                } else t();
              }
            }
            (c = n.wasmMemory
              ? n.wasmMemory
              : new WebAssembly.Memory({ initial: F / 65536 })) &&
              (h = c.buffer),
              (F = h.byteLength),
              S(h),
              (_[2080] = 5251360);
            var x = [],
              A = [],
              M = [],
              C = [],
              R = !1,
              O = Math.abs,
              j = Math.ceil,
              T = Math.floor,
              z = Math.min,
              B = 0,
              N = null;
            function L(r) {
              B++, n.monitorRunDependencies && n.monitorRunDependencies(B);
            }
            function I(r) {
              if (
                (B--,
                n.monitorRunDependencies && n.monitorRunDependencies(B),
                0 == B && N)
              ) {
                var t = N;
                (N = null), t();
              }
            }
            function H(r) {
              throw (
                (n.onAbort && n.onAbort(r),
                f((r += '')),
                l(r),
                (p = !0),
                (r =
                  'abort(' +
                  r +
                  '). Build with -s ASSERTIONS=1 for more info.'),
                new WebAssembly.RuntimeError(r))
              );
            }
            function U(r) {
              return String.prototype.startsWith
                ? r.startsWith('data:application/octet-stream;base64,')
                : 0 === r.indexOf('data:application/octet-stream;base64,');
            }
            (n.preloadedImages = {}), (n.preloadedAudios = {});
            var W,
              q,
              Y,
              J = 'expatlib.wasm';
            function V() {
              try {
                if (u) return new Uint8Array(u);
                throw 'both async and sync fetching of the wasm failed';
              } catch (r) {
                H(r);
              }
            }
            U(J) || ((W = J), (J = n.locateFile ? n.locateFile(W, s) : s + W));
            var X = {
              1184: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('startElement'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::startElement.';
                t.startElement();
              },
              1404: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('endElement'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::endElement.';
                t.endElement();
              },
              1616: function (r) {
                var t = n.getCache(n.CExpatJS)[r];
                if (!t.hasOwnProperty('characterData'))
                  throw 'a JSImplementation must implement all functions, you forgot CExpatJS::characterData.';
                t.characterData();
              },
            };
            function G() {
              var r = (function () {
                var r = new Error();
                if (!r.stack) {
                  try {
                    throw new Error();
                  } catch (t) {
                    r = t;
                  }
                  if (!r.stack) return '(no stack trace available)';
                }
                return r.stack.toString();
              })();
              return (
                n.extraStackTrace && (r += '\n' + n.extraStackTrace()),
                r.replace(/\b_Z[\w\d_]+/g, function (r) {
                  return r == r ? r : r + ' [' + r + ']';
                })
              );
            }
            A.push({
              func: function () {
                dr();
              },
            });
            var Z = 42,
              K = {
                splitPath: function (r) {
                  return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(r)
                    .slice(1);
                },
                normalizeArray: function (r, t) {
                  for (var e = 0, n = r.length - 1; n >= 0; n--) {
                    var o = r[n];
                    '.' === o
                      ? r.splice(n, 1)
                      : '..' === o
                      ? (r.splice(n, 1), e++)
                      : e && (r.splice(n, 1), e--);
                  }
                  if (t) for (; e; e--) r.unshift('..');
                  return r;
                },
                normalize: function (r) {
                  var t = '/' === r.charAt(0),
                    e = '/' === r.substr(-1);
                  return (
                    (r = K.normalizeArray(
                      r.split('/').filter(function (r) {
                        return !!r;
                      }),
                      !t,
                    ).join('/')) ||
                      t ||
                      (r = '.'),
                    r && e && (r += '/'),
                    (t ? '/' : '') + r
                  );
                },
                dirname: function (r) {
                  var t = K.splitPath(r),
                    e = t[0],
                    n = t[1];
                  return e || n
                    ? (n && (n = n.substr(0, n.length - 1)), e + n)
                    : '.';
                },
                basename: function (r) {
                  if ('/' === r) return '/';
                  var t = r.lastIndexOf('/');
                  return -1 === t ? r : r.substr(t + 1);
                },
                extname: function (r) {
                  return K.splitPath(r)[3];
                },
                join: function () {
                  var r = Array.prototype.slice.call(arguments, 0);
                  return K.normalize(r.join('/'));
                },
                join2: function (r, t) {
                  return K.normalize(r + '/' + t);
                },
              };
            function $(r) {
              return (
                n.___errno_location && (_[n.___errno_location() >> 2] = r), r
              );
            }
            var Q = {
                resolve: function () {
                  for (
                    var r = '', t = !1, e = arguments.length - 1;
                    e >= -1 && !t;
                    e--
                  ) {
                    var n = e >= 0 ? arguments[e] : er.cwd();
                    if ('string' != typeof n)
                      throw new TypeError(
                        'Arguments to path.resolve must be strings',
                      );
                    if (!n) return '';
                    (r = n + '/' + r), (t = '/' === n.charAt(0));
                  }
                  return (
                    (t ? '/' : '') +
                      (r = K.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !t,
                      ).join('/')) || '.'
                  );
                },
                relative: function (r, t) {
                  function e(r) {
                    for (var t = 0; t < r.length && '' === r[t]; t++);
                    for (var e = r.length - 1; e >= 0 && '' === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1);
                  }
                  (r = Q.resolve(r).substr(1)), (t = Q.resolve(t).substr(1));
                  for (
                    var n = e(r.split('/')),
                      o = e(t.split('/')),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push('..');
                  return (u = u.concat(o.slice(a))).join('/');
                },
              },
              rr = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (r, t) {
                  (rr.ttys[r] = { input: [], output: [], ops: t }),
                    er.registerDevice(r, rr.stream_ops);
                },
                stream_ops: {
                  open: function (r) {
                    var t = rr.ttys[r.node.rdev];
                    if (!t) throw new er.ErrnoError(43);
                    (r.tty = t), (r.seekable = !1);
                  },
                  close: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  flush: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  read: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.get_char)
                      throw new er.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = r.tty.ops.get_char(r.tty);
                      } catch (r) {
                        throw new er.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new er.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[e + a] = s);
                    }
                    return i && (r.node.timestamp = Date.now()), i;
                  },
                  write: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.put_char)
                      throw new er.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        r.tty.ops.put_char(r.tty, t[e + i]);
                    } catch (r) {
                      throw new er.ErrnoError(29);
                    }
                    return n && (r.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: function (r) {
                    if (!r.input.length) {
                      var t = null;
                      if (
                        ('undefined' != typeof window &&
                        'function' == typeof window.prompt
                          ? null !== (t = window.prompt('Input: ')) &&
                            (t += '\n')
                          : 'function' == typeof readline &&
                            null !== (t = readline()) &&
                            (t += '\n'),
                        !t)
                      )
                        return null;
                      r.input = ur(t, !0);
                    }
                    return r.input.shift();
                  },
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (f(E(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (f(E(r.output, 0)), (r.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (l(E(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (l(E(r.output, 0)), (r.output = []));
                  },
                },
              },
              tr = {
                ops_table: null,
                mount: function (r) {
                  return tr.createNode(null, '/', 16895, 0);
                },
                createNode: function (r, t, e, n) {
                  if (er.isBlkdev(e) || er.isFIFO(e))
                    throw new er.ErrnoError(63);
                  tr.ops_table ||
                    (tr.ops_table = {
                      dir: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                          lookup: tr.node_ops.lookup,
                          mknod: tr.node_ops.mknod,
                          rename: tr.node_ops.rename,
                          unlink: tr.node_ops.unlink,
                          rmdir: tr.node_ops.rmdir,
                          readdir: tr.node_ops.readdir,
                          symlink: tr.node_ops.symlink,
                        },
                        stream: { llseek: tr.stream_ops.llseek },
                      },
                      file: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                        },
                        stream: {
                          llseek: tr.stream_ops.llseek,
                          read: tr.stream_ops.read,
                          write: tr.stream_ops.write,
                          allocate: tr.stream_ops.allocate,
                          mmap: tr.stream_ops.mmap,
                          msync: tr.stream_ops.msync,
                        },
                      },
                      link: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                          readlink: tr.node_ops.readlink,
                        },
                        stream: {},
                      },
                      chrdev: {
                        node: {
                          getattr: tr.node_ops.getattr,
                          setattr: tr.node_ops.setattr,
                        },
                        stream: er.chrdev_stream_ops,
                      },
                    });
                  var o = er.createNode(r, t, e, n);
                  return (
                    er.isDir(o.mode)
                      ? ((o.node_ops = tr.ops_table.dir.node),
                        (o.stream_ops = tr.ops_table.dir.stream),
                        (o.contents = {}))
                      : er.isFile(o.mode)
                      ? ((o.node_ops = tr.ops_table.file.node),
                        (o.stream_ops = tr.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : er.isLink(o.mode)
                      ? ((o.node_ops = tr.ops_table.link.node),
                        (o.stream_ops = tr.ops_table.link.stream))
                      : er.isChrdev(o.mode) &&
                        ((o.node_ops = tr.ops_table.chrdev.node),
                        (o.stream_ops = tr.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    r && (r.contents[t] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (r) {
                  if (r.contents && r.contents.subarray) {
                    for (var t = [], e = 0; e < r.usedBytes; ++e)
                      t.push(r.contents[e]);
                    return t;
                  }
                  return r.contents;
                },
                getFileDataAsTypedArray: function (r) {
                  return r.contents
                    ? r.contents.subarray
                      ? r.contents.subarray(0, r.usedBytes)
                      : new Uint8Array(r.contents)
                    : new Uint8Array();
                },
                expandFileStorage: function (r, t) {
                  var e = r.contents ? r.contents.length : 0;
                  if (!(e >= t)) {
                    (t = Math.max(t, (e * (e < 1048576 ? 2 : 1.125)) | 0)),
                      0 != e && (t = Math.max(t, 256));
                    var n = r.contents;
                    (r.contents = new Uint8Array(t)),
                      r.usedBytes > 0 &&
                        r.contents.set(n.subarray(0, r.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (r, t) {
                  if (r.usedBytes != t) {
                    if (0 == t)
                      return (r.contents = null), void (r.usedBytes = 0);
                    if (!r.contents || r.contents.subarray) {
                      var e = r.contents;
                      return (
                        (r.contents = new Uint8Array(t)),
                        e &&
                          r.contents.set(
                            e.subarray(0, Math.min(t, r.usedBytes)),
                          ),
                        void (r.usedBytes = t)
                      );
                    }
                    if (
                      (r.contents || (r.contents = []), r.contents.length > t)
                    )
                      r.contents.length = t;
                    else for (; r.contents.length < t; ) r.contents.push(0);
                    r.usedBytes = t;
                  }
                },
                node_ops: {
                  getattr: function (r) {
                    var t = {};
                    return (
                      (t.dev = er.isChrdev(r.mode) ? r.id : 1),
                      (t.ino = r.id),
                      (t.mode = r.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = r.rdev),
                      er.isDir(r.mode)
                        ? (t.size = 4096)
                        : er.isFile(r.mode)
                        ? (t.size = r.usedBytes)
                        : er.isLink(r.mode)
                        ? (t.size = r.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(r.timestamp)),
                      (t.mtime = new Date(r.timestamp)),
                      (t.ctime = new Date(r.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr: function (r, t) {
                    void 0 !== t.mode && (r.mode = t.mode),
                      void 0 !== t.timestamp && (r.timestamp = t.timestamp),
                      void 0 !== t.size && tr.resizeFileStorage(r, t.size);
                  },
                  lookup: function (r, t) {
                    throw er.genericErrors[44];
                  },
                  mknod: function (r, t, e, n) {
                    return tr.createNode(r, t, e, n);
                  },
                  rename: function (r, t, e) {
                    if (er.isDir(r.mode)) {
                      var n;
                      try {
                        n = er.lookupNode(t, e);
                      } catch (r) {}
                      if (n)
                        for (var o in n.contents) throw new er.ErrnoError(55);
                    }
                    delete r.parent.contents[r.name],
                      (r.name = e),
                      (t.contents[e] = r),
                      (r.parent = t);
                  },
                  unlink: function (r, t) {
                    delete r.contents[t];
                  },
                  rmdir: function (r, t) {
                    var e = er.lookupNode(r, t);
                    for (var n in e.contents) throw new er.ErrnoError(55);
                    delete r.contents[t];
                  },
                  readdir: function (r) {
                    var t = ['.', '..'];
                    for (var e in r.contents)
                      r.contents.hasOwnProperty(e) && t.push(e);
                    return t;
                  },
                  symlink: function (r, t, e) {
                    var n = tr.createNode(r, t, 41471, 0);
                    return (n.link = e), n;
                  },
                  readlink: function (r) {
                    if (!er.isLink(r.mode)) throw new er.ErrnoError(28);
                    return r.link;
                  },
                },
                stream_ops: {
                  read: function (r, t, e, n, o) {
                    var i = r.node.contents;
                    if (o >= r.node.usedBytes) return 0;
                    var a = Math.min(r.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), e);
                    else for (var s = 0; s < a; s++) t[e + s] = i[o + s];
                    return a;
                  },
                  write: function (r, t, e, n, o, i) {
                    if ((t.buffer === y.buffer && (i = !1), !n)) return 0;
                    var a = r.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(e, e + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(e, e + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(e, e + n), o), n;
                    }
                    if (
                      (tr.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(e, e + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[e + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek: function (r, t, e) {
                    var n = t;
                    if (
                      (1 === e
                        ? (n += r.position)
                        : 2 === e &&
                          er.isFile(r.node.mode) &&
                          (n += r.node.usedBytes),
                      n < 0)
                    )
                      throw new er.ErrnoError(28);
                    return n;
                  },
                  allocate: function (r, t, e) {
                    tr.expandFileStorage(r.node, t + e),
                      (r.node.usedBytes = Math.max(r.node.usedBytes, t + e));
                  },
                  mmap: function (r, t, e, n, o, i, a) {
                    if (!er.isFile(r.node.mode)) throw new er.ErrnoError(43);
                    var s,
                      u,
                      c = r.node.contents;
                    if (2 & a || c.buffer !== t.buffer) {
                      (o > 0 || o + n < r.node.usedBytes) &&
                        (c = c.subarray
                          ? c.subarray(o, o + n)
                          : Array.prototype.slice.call(c, o, o + n)),
                        (u = !0);
                      var f = t.buffer == y.buffer;
                      if (!(s = Mr(n))) throw new er.ErrnoError(48);
                      (f ? y : t).set(c, s);
                    } else (u = !1), (s = c.byteOffset);
                    return { ptr: s, allocated: u };
                  },
                  msync: function (r, t, e, n, o) {
                    if (!er.isFile(r.node.mode)) throw new er.ErrnoError(43);
                    return 2 & o || tr.stream_ops.write(r, t, 0, n, e, !1), 0;
                  },
                },
              },
              er = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: '/',
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (r) {
                  if (!(r instanceof er.ErrnoError)) throw r + ' : ' + G();
                  return $(r.errno);
                },
                lookupPath: function (r, t) {
                  if (((t = t || {}), !(r = Q.resolve(er.cwd(), r))))
                    return { path: '', node: null };
                  var e = { follow_mount: !0, recurse_count: 0 };
                  for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                  if (t.recurse_count > 8) throw new er.ErrnoError(32);
                  for (
                    var o = K.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !1,
                      ),
                      i = er.root,
                      a = '/',
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && t.parent) break;
                    if (
                      ((i = er.lookupNode(i, o[s])),
                      (a = K.join2(a, o[s])),
                      er.isMountpoint(i) &&
                        (!u || (u && t.follow_mount)) &&
                        (i = i.mounted.root),
                      !u || t.follow)
                    )
                      for (var c = 0; er.isLink(i.mode); ) {
                        var f = er.readlink(a);
                        if (
                          ((a = Q.resolve(K.dirname(a), f)),
                          (i = er.lookupPath(a, {
                            recurse_count: t.recurse_count,
                          }).node),
                          c++ > 40)
                        )
                          throw new er.ErrnoError(32);
                      }
                  }
                  return { path: a, node: i };
                },
                getPath: function (r) {
                  for (var t; ; ) {
                    if (er.isRoot(r)) {
                      var e = r.mount.mountpoint;
                      return t
                        ? '/' !== e[e.length - 1]
                          ? e + '/' + t
                          : e + t
                        : e;
                    }
                    (t = t ? r.name + '/' + t : r.name), (r = r.parent);
                  }
                },
                hashName: function (r, t) {
                  for (var e = 0, n = 0; n < t.length; n++)
                    e = ((e << 5) - e + t.charCodeAt(n)) | 0;
                  return ((r + e) >>> 0) % er.nameTable.length;
                },
                hashAddNode: function (r) {
                  var t = er.hashName(r.parent.id, r.name);
                  (r.name_next = er.nameTable[t]), (er.nameTable[t] = r);
                },
                hashRemoveNode: function (r) {
                  var t = er.hashName(r.parent.id, r.name);
                  if (er.nameTable[t] === r) er.nameTable[t] = r.name_next;
                  else
                    for (var e = er.nameTable[t]; e; ) {
                      if (e.name_next === r) {
                        e.name_next = r.name_next;
                        break;
                      }
                      e = e.name_next;
                    }
                },
                lookupNode: function (r, t) {
                  var e = er.mayLookup(r);
                  if (e) throw new er.ErrnoError(e, r);
                  for (
                    var n = er.hashName(r.id, t), o = er.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === r.id && i === t) return o;
                  }
                  return er.lookup(r, t);
                },
                createNode: function (r, t, e, n) {
                  er.FSNode ||
                    ((er.FSNode = function (r, t, e, n) {
                      r || (r = this),
                        (this.parent = r),
                        (this.mount = r.mount),
                        (this.mounted = null),
                        (this.id = er.nextInode++),
                        (this.name = t),
                        (this.mode = e),
                        (this.node_ops = {}),
                        (this.stream_ops = {}),
                        (this.rdev = n);
                    }),
                    (er.FSNode.prototype = {}),
                    Object.defineProperties(er.FSNode.prototype, {
                      read: {
                        get: function () {
                          return 365 == (365 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 365) : (this.mode &= -366);
                        },
                      },
                      write: {
                        get: function () {
                          return 146 == (146 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 146) : (this.mode &= -147);
                        },
                      },
                      isFolder: {
                        get: function () {
                          return er.isDir(this.mode);
                        },
                      },
                      isDevice: {
                        get: function () {
                          return er.isChrdev(this.mode);
                        },
                      },
                    }));
                  var o = new er.FSNode(r, t, e, n);
                  return er.hashAddNode(o), o;
                },
                destroyNode: function (r) {
                  er.hashRemoveNode(r);
                },
                isRoot: function (r) {
                  return r === r.parent;
                },
                isMountpoint: function (r) {
                  return !!r.mounted;
                },
                isFile: function (r) {
                  return 32768 == (61440 & r);
                },
                isDir: function (r) {
                  return 16384 == (61440 & r);
                },
                isLink: function (r) {
                  return 40960 == (61440 & r);
                },
                isChrdev: function (r) {
                  return 8192 == (61440 & r);
                },
                isBlkdev: function (r) {
                  return 24576 == (61440 & r);
                },
                isFIFO: function (r) {
                  return 4096 == (61440 & r);
                },
                isSocket: function (r) {
                  return 49152 == (49152 & r);
                },
                flagModes: {
                  r: 0,
                  rs: 1052672,
                  'r+': 2,
                  w: 577,
                  wx: 705,
                  xw: 705,
                  'w+': 578,
                  'wx+': 706,
                  'xw+': 706,
                  a: 1089,
                  ax: 1217,
                  xa: 1217,
                  'a+': 1090,
                  'ax+': 1218,
                  'xa+': 1218,
                },
                modeStringToFlags: function (r) {
                  var t = er.flagModes[r];
                  if (void 0 === t)
                    throw new Error('Unknown file open mode: ' + r);
                  return t;
                },
                flagsToPermissionString: function (r) {
                  var t = ['r', 'w', 'rw'][3 & r];
                  return 512 & r && (t += 'w'), t;
                },
                nodePermissions: function (r, t) {
                  return er.ignorePermissions ||
                    ((-1 === t.indexOf('r') || 292 & r.mode) &&
                      (-1 === t.indexOf('w') || 146 & r.mode) &&
                      (-1 === t.indexOf('x') || 73 & r.mode))
                    ? 0
                    : 2;
                },
                mayLookup: function (r) {
                  var t = er.nodePermissions(r, 'x');
                  return t || (r.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (r, t) {
                  try {
                    return er.lookupNode(r, t), 20;
                  } catch (r) {}
                  return er.nodePermissions(r, 'wx');
                },
                mayDelete: function (r, t, e) {
                  var n;
                  try {
                    n = er.lookupNode(r, t);
                  } catch (r) {
                    return r.errno;
                  }
                  var o = er.nodePermissions(r, 'wx');
                  if (o) return o;
                  if (e) {
                    if (!er.isDir(n.mode)) return 54;
                    if (er.isRoot(n) || er.getPath(n) === er.cwd()) return 10;
                  } else if (er.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (r, t) {
                  return r
                    ? er.isLink(r.mode)
                      ? 32
                      : er.isDir(r.mode) &&
                        ('r' !== er.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : er.nodePermissions(r, er.flagsToPermissionString(t))
                    : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (r, t) {
                  (r = r || 0), (t = t || er.MAX_OPEN_FDS);
                  for (var e = r; e <= t; e++) if (!er.streams[e]) return e;
                  throw new er.ErrnoError(33);
                },
                getStream: function (r) {
                  return er.streams[r];
                },
                createStream: function (r, t, e) {
                  er.FSStream ||
                    ((er.FSStream = function () {}),
                    (er.FSStream.prototype = {}),
                    Object.defineProperties(er.FSStream.prototype, {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (r) {
                          this.node = r;
                        },
                      },
                      isRead: {
                        get: function () {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get: function () {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get: function () {
                          return 1024 & this.flags;
                        },
                      },
                    }));
                  var n = new er.FSStream();
                  for (var o in r) n[o] = r[o];
                  r = n;
                  var i = er.nextfd(t, e);
                  return (r.fd = i), (er.streams[i] = r), r;
                },
                closeStream: function (r) {
                  er.streams[r] = null;
                },
                chrdev_stream_ops: {
                  open: function (r) {
                    var t = er.getDevice(r.node.rdev);
                    (r.stream_ops = t.stream_ops),
                      r.stream_ops.open && r.stream_ops.open(r);
                  },
                  llseek: function () {
                    throw new er.ErrnoError(70);
                  },
                },
                major: function (r) {
                  return r >> 8;
                },
                minor: function (r) {
                  return 255 & r;
                },
                makedev: function (r, t) {
                  return (r << 8) | t;
                },
                registerDevice: function (r, t) {
                  er.devices[r] = { stream_ops: t };
                },
                getDevice: function (r) {
                  return er.devices[r];
                },
                getMounts: function (r) {
                  for (var t = [], e = [r]; e.length; ) {
                    var n = e.pop();
                    t.push(n), e.push.apply(e, n.mounts);
                  }
                  return t;
                },
                syncfs: function (r, t) {
                  'function' == typeof r && ((t = r), (r = !1)),
                    er.syncFSRequests++,
                    er.syncFSRequests > 1 &&
                      l(
                        'warning: ' +
                          er.syncFSRequests +
                          ' FS.syncfs operations in flight at once, probably just doing extra work',
                      );
                  var e = er.getMounts(er.root.mount),
                    n = 0;
                  function o(r) {
                    return er.syncFSRequests--, t(r);
                  }
                  function i(r) {
                    if (r) return i.errored ? void 0 : ((i.errored = !0), o(r));
                    ++n >= e.length && o(null);
                  }
                  e.forEach(function (t) {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, r, i);
                  });
                },
                mount: function (r, t, e) {
                  var n,
                    o = '/' === e,
                    i = !e;
                  if (o && er.root) throw new er.ErrnoError(10);
                  if (!o && !i) {
                    var a = er.lookupPath(e, { follow_mount: !1 });
                    if (((e = a.path), (n = a.node), er.isMountpoint(n)))
                      throw new er.ErrnoError(10);
                    if (!er.isDir(n.mode)) throw new er.ErrnoError(54);
                  }
                  var s = { type: r, opts: t, mountpoint: e, mounts: [] },
                    u = r.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (er.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount: function (r) {
                  var t = er.lookupPath(r, { follow_mount: !1 });
                  if (!er.isMountpoint(t.node)) throw new er.ErrnoError(28);
                  var e = t.node,
                    n = e.mounted,
                    o = er.getMounts(n);
                  Object.keys(er.nameTable).forEach(function (r) {
                    for (var t = er.nameTable[r]; t; ) {
                      var e = t.name_next;
                      -1 !== o.indexOf(t.mount) && er.destroyNode(t), (t = e);
                    }
                  }),
                    (e.mounted = null);
                  var i = e.mount.mounts.indexOf(n);
                  e.mount.mounts.splice(i, 1);
                },
                lookup: function (r, t) {
                  return r.node_ops.lookup(r, t);
                },
                mknod: function (r, t, e) {
                  var n = er.lookupPath(r, { parent: !0 }).node,
                    o = K.basename(r);
                  if (!o || '.' === o || '..' === o)
                    throw new er.ErrnoError(28);
                  var i = er.mayCreate(n, o);
                  if (i) throw new er.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new er.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, e);
                },
                create: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 438),
                    (t &= 4095),
                    (t |= 32768),
                    er.mknod(r, t, 0)
                  );
                },
                mkdir: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 511),
                    (t &= 1023),
                    (t |= 16384),
                    er.mknod(r, t, 0)
                  );
                },
                mkdirTree: function (r, t) {
                  for (var e = r.split('/'), n = '', o = 0; o < e.length; ++o)
                    if (e[o]) {
                      n += '/' + e[o];
                      try {
                        er.mkdir(n, t);
                      } catch (r) {
                        if (20 != r.errno) throw r;
                      }
                    }
                },
                mkdev: function (r, t, e) {
                  return (
                    void 0 === e && ((e = t), (t = 438)),
                    (t |= 8192),
                    er.mknod(r, t, e)
                  );
                },
                symlink: function (r, t) {
                  if (!Q.resolve(r)) throw new er.ErrnoError(44);
                  var e = er.lookupPath(t, { parent: !0 }).node;
                  if (!e) throw new er.ErrnoError(44);
                  var n = K.basename(t),
                    o = er.mayCreate(e, n);
                  if (o) throw new er.ErrnoError(o);
                  if (!e.node_ops.symlink) throw new er.ErrnoError(63);
                  return e.node_ops.symlink(e, n, r);
                },
                rename: function (r, t) {
                  var e,
                    n,
                    o = K.dirname(r),
                    i = K.dirname(t),
                    a = K.basename(r),
                    s = K.basename(t);
                  try {
                    (e = er.lookupPath(r, { parent: !0 }).node),
                      (n = er.lookupPath(t, { parent: !0 }).node);
                  } catch (r) {
                    throw new er.ErrnoError(10);
                  }
                  if (!e || !n) throw new er.ErrnoError(44);
                  if (e.mount !== n.mount) throw new er.ErrnoError(75);
                  var u,
                    c = er.lookupNode(e, a),
                    f = Q.relative(r, i);
                  if ('.' !== f.charAt(0)) throw new er.ErrnoError(28);
                  if ('.' !== (f = Q.relative(t, o)).charAt(0))
                    throw new er.ErrnoError(55);
                  try {
                    u = er.lookupNode(n, s);
                  } catch (r) {}
                  if (c !== u) {
                    var d = er.isDir(c.mode),
                      p = er.mayDelete(e, a, d);
                    if (p) throw new er.ErrnoError(p);
                    if ((p = u ? er.mayDelete(n, s, d) : er.mayCreate(n, s)))
                      throw new er.ErrnoError(p);
                    if (!e.node_ops.rename) throw new er.ErrnoError(63);
                    if (er.isMountpoint(c) || (u && er.isMountpoint(u)))
                      throw new er.ErrnoError(10);
                    if (n !== e && (p = er.nodePermissions(e, 'w')))
                      throw new er.ErrnoError(p);
                    try {
                      er.trackingDelegate.willMovePath &&
                        er.trackingDelegate.willMovePath(r, t);
                    } catch (e) {
                      l(
                        "FS.trackingDelegate['willMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                    er.hashRemoveNode(c);
                    try {
                      e.node_ops.rename(c, n, s);
                    } catch (r) {
                      throw r;
                    } finally {
                      er.hashAddNode(c);
                    }
                    try {
                      er.trackingDelegate.onMovePath &&
                        er.trackingDelegate.onMovePath(r, t);
                    } catch (e) {
                      l(
                        "FS.trackingDelegate['onMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                  }
                },
                rmdir: function (r) {
                  var t = er.lookupPath(r, { parent: !0 }).node,
                    e = K.basename(r),
                    n = er.lookupNode(t, e),
                    o = er.mayDelete(t, e, !0);
                  if (o) throw new er.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new er.ErrnoError(63);
                  if (er.isMountpoint(n)) throw new er.ErrnoError(10);
                  try {
                    er.trackingDelegate.willDeletePath &&
                      er.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.rmdir(t, e), er.destroyNode(n);
                  try {
                    er.trackingDelegate.onDeletePath &&
                      er.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readdir: function (r) {
                  var t = er.lookupPath(r, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new er.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink: function (r) {
                  var t = er.lookupPath(r, { parent: !0 }).node,
                    e = K.basename(r),
                    n = er.lookupNode(t, e),
                    o = er.mayDelete(t, e, !1);
                  if (o) throw new er.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new er.ErrnoError(63);
                  if (er.isMountpoint(n)) throw new er.ErrnoError(10);
                  try {
                    er.trackingDelegate.willDeletePath &&
                      er.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.unlink(t, e), er.destroyNode(n);
                  try {
                    er.trackingDelegate.onDeletePath &&
                      er.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readlink: function (r) {
                  var t = er.lookupPath(r).node;
                  if (!t) throw new er.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new er.ErrnoError(28);
                  return Q.resolve(
                    er.getPath(t.parent),
                    t.node_ops.readlink(t),
                  );
                },
                stat: function (r, t) {
                  var e = er.lookupPath(r, { follow: !t }).node;
                  if (!e) throw new er.ErrnoError(44);
                  if (!e.node_ops.getattr) throw new er.ErrnoError(63);
                  return e.node_ops.getattr(e);
                },
                lstat: function (r) {
                  return er.stat(r, !0);
                },
                chmod: function (r, t, e) {
                  var n;
                  if (
                    !(n =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !e }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod: function (r, t) {
                  er.chmod(r, t, !0);
                },
                fchmod: function (r, t) {
                  var e = er.getStream(r);
                  if (!e) throw new er.ErrnoError(8);
                  er.chmod(e.node, t);
                },
                chown: function (r, t, e, n) {
                  var o;
                  if (
                    !(o =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !n }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (r, t, e) {
                  er.chown(r, t, e, !0);
                },
                fchown: function (r, t, e) {
                  var n = er.getStream(r);
                  if (!n) throw new er.ErrnoError(8);
                  er.chown(n.node, t, e);
                },
                truncate: function (r, t) {
                  if (t < 0) throw new er.ErrnoError(28);
                  var e;
                  if (
                    !(e =
                      'string' == typeof r
                        ? er.lookupPath(r, { follow: !0 }).node
                        : r).node_ops.setattr
                  )
                    throw new er.ErrnoError(63);
                  if (er.isDir(e.mode)) throw new er.ErrnoError(31);
                  if (!er.isFile(e.mode)) throw new er.ErrnoError(28);
                  var n = er.nodePermissions(e, 'w');
                  if (n) throw new er.ErrnoError(n);
                  e.node_ops.setattr(e, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (r, t) {
                  var e = er.getStream(r);
                  if (!e) throw new er.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new er.ErrnoError(28);
                  er.truncate(e.node, t);
                },
                utime: function (r, t, e) {
                  var n = er.lookupPath(r, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, e) });
                },
                open: function (r, t, e, o, i) {
                  if ('' === r) throw new er.ErrnoError(44);
                  var a;
                  if (
                    ((e = void 0 === e ? 438 : e),
                    (e =
                      64 &
                      (t = 'string' == typeof t ? er.modeStringToFlags(t) : t)
                        ? (4095 & e) | 32768
                        : 0),
                    'object' == typeof r)
                  )
                    a = r;
                  else {
                    r = K.normalize(r);
                    try {
                      a = er.lookupPath(r, { follow: !(131072 & t) }).node;
                    } catch (r) {}
                  }
                  var s = !1;
                  if (64 & t)
                    if (a) {
                      if (128 & t) throw new er.ErrnoError(20);
                    } else (a = er.mknod(r, e, 0)), (s = !0);
                  if (!a) throw new er.ErrnoError(44);
                  if (
                    (er.isChrdev(a.mode) && (t &= -513),
                    65536 & t && !er.isDir(a.mode))
                  )
                    throw new er.ErrnoError(54);
                  if (!s) {
                    var u = er.mayOpen(a, t);
                    if (u) throw new er.ErrnoError(u);
                  }
                  512 & t && er.truncate(a, 0), (t &= -641);
                  var c = er.createStream(
                    {
                      node: a,
                      path: er.getPath(a),
                      flags: t,
                      seekable: !0,
                      position: 0,
                      stream_ops: a.stream_ops,
                      ungotten: [],
                      error: !1,
                    },
                    o,
                    i,
                  );
                  c.stream_ops.open && c.stream_ops.open(c),
                    !n.logReadFiles ||
                      1 & t ||
                      (er.readFiles || (er.readFiles = {}),
                      r in er.readFiles ||
                        ((er.readFiles[r] = 1),
                        l('FS.trackingDelegate error on read file: ' + r)));
                  try {
                    if (er.trackingDelegate.onOpenFile) {
                      var f = 0;
                      1 != (2097155 & t) && (f |= er.tracking.openFlags.READ),
                        0 != (2097155 & t) &&
                          (f |= er.tracking.openFlags.WRITE),
                        er.trackingDelegate.onOpenFile(r, f);
                    }
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onOpenFile']('" +
                        r +
                        "', flags) threw an exception: " +
                        t.message,
                    );
                  }
                  return c;
                },
                close: function (r) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  r.getdents && (r.getdents = null);
                  try {
                    r.stream_ops.close && r.stream_ops.close(r);
                  } catch (r) {
                    throw r;
                  } finally {
                    er.closeStream(r.fd);
                  }
                  r.fd = null;
                },
                isClosed: function (r) {
                  return null === r.fd;
                },
                llseek: function (r, t, e) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (!r.seekable || !r.stream_ops.llseek)
                    throw new er.ErrnoError(70);
                  if (0 != e && 1 != e && 2 != e) throw new er.ErrnoError(28);
                  return (
                    (r.position = r.stream_ops.llseek(r, t, e)),
                    (r.ungotten = []),
                    r.position
                  );
                },
                read: function (r, t, e, n, o) {
                  if (n < 0 || o < 0) throw new er.ErrnoError(28);
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (1 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (er.isDir(r.node.mode)) throw new er.ErrnoError(31);
                  if (!r.stream_ops.read) throw new er.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!r.seekable) throw new er.ErrnoError(70);
                  } else o = r.position;
                  var a = r.stream_ops.read(r, t, e, n, o);
                  return i || (r.position += a), a;
                },
                write: function (r, t, e, n, o, i) {
                  if (n < 0 || o < 0) throw new er.ErrnoError(28);
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (0 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (er.isDir(r.node.mode)) throw new er.ErrnoError(31);
                  if (!r.stream_ops.write) throw new er.ErrnoError(28);
                  1024 & r.flags && er.llseek(r, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!r.seekable) throw new er.ErrnoError(70);
                  } else o = r.position;
                  var s = r.stream_ops.write(r, t, e, n, o, i);
                  a || (r.position += s);
                  try {
                    r.path &&
                      er.trackingDelegate.onWriteToFile &&
                      er.trackingDelegate.onWriteToFile(r.path);
                  } catch (t) {
                    l(
                      "FS.trackingDelegate['onWriteToFile']('" +
                        r.path +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  return s;
                },
                allocate: function (r, t, e) {
                  if (er.isClosed(r)) throw new er.ErrnoError(8);
                  if (t < 0 || e <= 0) throw new er.ErrnoError(28);
                  if (0 == (2097155 & r.flags)) throw new er.ErrnoError(8);
                  if (!er.isFile(r.node.mode) && !er.isDir(r.node.mode))
                    throw new er.ErrnoError(43);
                  if (!r.stream_ops.allocate) throw new er.ErrnoError(138);
                  r.stream_ops.allocate(r, t, e);
                },
                mmap: function (r, t, e, n, o, i, a) {
                  if (0 != (2 & i) && 0 == (2 & a) && 2 != (2097155 & r.flags))
                    throw new er.ErrnoError(2);
                  if (1 == (2097155 & r.flags)) throw new er.ErrnoError(2);
                  if (!r.stream_ops.mmap) throw new er.ErrnoError(43);
                  return r.stream_ops.mmap(r, t, e, n, o, i, a);
                },
                msync: function (r, t, e, n, o) {
                  return r && r.stream_ops.msync
                    ? r.stream_ops.msync(r, t, e, n, o)
                    : 0;
                },
                munmap: function (r) {
                  return 0;
                },
                ioctl: function (r, t, e) {
                  if (!r.stream_ops.ioctl) throw new er.ErrnoError(59);
                  return r.stream_ops.ioctl(r, t, e);
                },
                readFile: function (r, t) {
                  if (
                    (((t = t || {}).flags = t.flags || 'r'),
                    (t.encoding = t.encoding || 'binary'),
                    'utf8' !== t.encoding && 'binary' !== t.encoding)
                  )
                    throw new Error(
                      'Invalid encoding type "' + t.encoding + '"',
                    );
                  var e,
                    n = er.open(r, t.flags),
                    o = er.stat(r).size,
                    i = new Uint8Array(o);
                  return (
                    er.read(n, i, 0, o, 0),
                    'utf8' === t.encoding
                      ? (e = E(i, 0))
                      : 'binary' === t.encoding && (e = i),
                    er.close(n),
                    e
                  );
                },
                writeFile: function (r, t, e) {
                  (e = e || {}).flags = e.flags || 'w';
                  var n = er.open(r, e.flags, e.mode);
                  if ('string' == typeof t) {
                    var o = new Uint8Array(D(t) + 1),
                      i = b(t, o, 0, o.length);
                    er.write(n, o, 0, i, void 0, e.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error('Unsupported data type');
                    er.write(n, t, 0, t.byteLength, void 0, e.canOwn);
                  }
                  er.close(n);
                },
                cwd: function () {
                  return er.currentPath;
                },
                chdir: function (r) {
                  var t = er.lookupPath(r, { follow: !0 });
                  if (null === t.node) throw new er.ErrnoError(44);
                  if (!er.isDir(t.node.mode)) throw new er.ErrnoError(54);
                  var e = er.nodePermissions(t.node, 'x');
                  if (e) throw new er.ErrnoError(e);
                  er.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                  er.mkdir('/tmp'),
                    er.mkdir('/home'),
                    er.mkdir('/home/web_user');
                },
                createDefaultDevices: function () {
                  var r;
                  if (
                    (er.mkdir('/dev'),
                    er.registerDevice(er.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (r, t, e, n, o) {
                        return n;
                      },
                    }),
                    er.mkdev('/dev/null', er.makedev(1, 3)),
                    rr.register(er.makedev(5, 0), rr.default_tty_ops),
                    rr.register(er.makedev(6, 0), rr.default_tty1_ops),
                    er.mkdev('/dev/tty', er.makedev(5, 0)),
                    er.mkdev('/dev/tty1', er.makedev(6, 0)),
                    'object' == typeof crypto &&
                      'function' == typeof crypto.getRandomValues)
                  ) {
                    var t = new Uint8Array(1);
                    r = function () {
                      return crypto.getRandomValues(t), t[0];
                    };
                  }
                  r ||
                    (r = function () {
                      H('random_device');
                    }),
                    er.createDevice('/dev', 'random', r),
                    er.createDevice('/dev', 'urandom', r),
                    er.mkdir('/dev/shm'),
                    er.mkdir('/dev/shm/tmp');
                },
                createSpecialDirectories: function () {
                  er.mkdir('/proc'),
                    er.mkdir('/proc/self'),
                    er.mkdir('/proc/self/fd'),
                    er.mount(
                      {
                        mount: function () {
                          var r = er.createNode('/proc/self', 'fd', 16895, 73);
                          return (
                            (r.node_ops = {
                              lookup: function (r, t) {
                                var e = +t,
                                  n = er.getStream(e);
                                if (!n) throw new er.ErrnoError(8);
                                var o = {
                                  parent: null,
                                  mount: { mountpoint: 'fake' },
                                  node_ops: {
                                    readlink: function () {
                                      return n.path;
                                    },
                                  },
                                };
                                return (o.parent = o), o;
                              },
                            }),
                            r
                          );
                        },
                      },
                      {},
                      '/proc/self/fd',
                    );
                },
                createStandardStreams: function () {
                  n.stdin
                    ? er.createDevice('/dev', 'stdin', n.stdin)
                    : er.symlink('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? er.createDevice('/dev', 'stdout', null, n.stdout)
                      : er.symlink('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? er.createDevice('/dev', 'stderr', null, n.stderr)
                      : er.symlink('/dev/tty1', '/dev/stderr'),
                    er.open('/dev/stdin', 'r'),
                    er.open('/dev/stdout', 'w'),
                    er.open('/dev/stderr', 'w');
                },
                ensureErrnoError: function () {
                  er.ErrnoError ||
                    ((er.ErrnoError = function (r, t) {
                      (this.node = t),
                        (this.setErrno = function (r) {
                          this.errno = r;
                        }),
                        this.setErrno(r),
                        (this.message = 'FS error');
                    }),
                    (er.ErrnoError.prototype = new Error()),
                    (er.ErrnoError.prototype.constructor = er.ErrnoError),
                    [44].forEach(function (r) {
                      (er.genericErrors[r] = new er.ErrnoError(r)),
                        (er.genericErrors[r].stack =
                          '<generic error, no stack>');
                    }));
                },
                staticInit: function () {
                  er.ensureErrnoError(),
                    (er.nameTable = new Array(4096)),
                    er.mount(tr, {}, '/'),
                    er.createDefaultDirectories(),
                    er.createDefaultDevices(),
                    er.createSpecialDirectories(),
                    (er.filesystems = { MEMFS: tr });
                },
                init: function (r, t, e) {
                  (er.init.initialized = !0),
                    er.ensureErrnoError(),
                    (n.stdin = r || n.stdin),
                    (n.stdout = t || n.stdout),
                    (n.stderr = e || n.stderr),
                    er.createStandardStreams();
                },
                quit: function () {
                  er.init.initialized = !1;
                  var r = n._fflush;
                  r && r(0);
                  for (var t = 0; t < er.streams.length; t++) {
                    var e = er.streams[t];
                    e && er.close(e);
                  }
                },
                getMode: function (r, t) {
                  var e = 0;
                  return r && (e |= 365), t && (e |= 146), e;
                },
                joinPath: function (r, t) {
                  var e = K.join.apply(null, r);
                  return t && '/' == e[0] && (e = e.substr(1)), e;
                },
                absolutePath: function (r, t) {
                  return Q.resolve(t, r);
                },
                standardizePath: function (r) {
                  return K.normalize(r);
                },
                findObject: function (r, t) {
                  var e = er.analyzePath(r, t);
                  return e.exists ? e.object : ($(e.error), null);
                },
                analyzePath: function (r, t) {
                  try {
                    r = (n = er.lookupPath(r, { follow: !t })).path;
                  } catch (r) {}
                  var e = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = er.lookupPath(r, { parent: !0 });
                    (e.parentExists = !0),
                      (e.parentPath = n.path),
                      (e.parentObject = n.node),
                      (e.name = K.basename(r)),
                      (n = er.lookupPath(r, { follow: !t })),
                      (e.exists = !0),
                      (e.path = n.path),
                      (e.object = n.node),
                      (e.name = n.node.name),
                      (e.isRoot = '/' === n.path);
                  } catch (r) {
                    e.error = r.errno;
                  }
                  return e;
                },
                createFolder: function (r, t, e, n) {
                  var o = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    i = er.getMode(e, n);
                  return er.mkdir(o, i);
                },
                createPath: function (r, t, e, n) {
                  r = 'string' == typeof r ? r : er.getPath(r);
                  for (var o = t.split('/').reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = K.join2(r, i);
                      try {
                        er.mkdir(a);
                      } catch (r) {}
                      r = a;
                    }
                  }
                  return a;
                },
                createFile: function (r, t, e, n, o) {
                  var i = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    a = er.getMode(n, o);
                  return er.create(i, a);
                },
                createDataFile: function (r, t, e, n, o, i) {
                  var a = t
                      ? K.join2('string' == typeof r ? r : er.getPath(r), t)
                      : r,
                    s = er.getMode(n, o),
                    u = er.create(a, s);
                  if (e) {
                    if ('string' == typeof e) {
                      for (
                        var c = new Array(e.length), f = 0, l = e.length;
                        f < l;
                        ++f
                      )
                        c[f] = e.charCodeAt(f);
                      e = c;
                    }
                    er.chmod(u, 146 | s);
                    var d = er.open(u, 'w');
                    er.write(d, e, 0, e.length, 0, i),
                      er.close(d),
                      er.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (r, t, e, n) {
                  var o = K.join2('string' == typeof r ? r : er.getPath(r), t),
                    i = er.getMode(!!e, !!n);
                  er.createDevice.major || (er.createDevice.major = 64);
                  var a = er.makedev(er.createDevice.major++, 0);
                  return (
                    er.registerDevice(a, {
                      open: function (r) {
                        r.seekable = !1;
                      },
                      close: function (r) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (r, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = e();
                          } catch (r) {
                            throw new er.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new er.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (r.node.timestamp = Date.now()), a;
                      },
                      write: function (r, t, e, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[e + a]);
                          } catch (r) {
                            throw new er.ErrnoError(29);
                          }
                        return o && (r.node.timestamp = Date.now()), a;
                      },
                    }),
                    er.mkdev(o, i, a)
                  );
                },
                createLink: function (r, t, e, n, o) {
                  var i = K.join2('string' == typeof r ? r : er.getPath(r), t);
                  return er.symlink(e, i);
                },
                forceLoadFile: function (r) {
                  if (r.isDevice || r.isFolder || r.link || r.contents)
                    return !0;
                  var t = !0;
                  if ('undefined' != typeof XMLHttpRequest)
                    throw new Error(
                      'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
                    );
                  if (!i)
                    throw new Error(
                      'Cannot load without read() or XMLHttpRequest.',
                    );
                  try {
                    (r.contents = ur(i(r.url), !0)),
                      (r.usedBytes = r.contents.length);
                  } catch (r) {
                    t = !1;
                  }
                  return t || $(29), t;
                },
                createLazyFile: function (r, t, e, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (r) {
                      if (!(r > this.length - 1 || r < 0)) {
                        var t = r % this.chunkSize,
                          e = (r / this.chunkSize) | 0;
                        return this.getter(e)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (r) {
                      this.getter = r;
                    }),
                    (i.prototype.cacheLength = function () {
                      var r = new XMLHttpRequest();
                      if (
                        (r.open('HEAD', e, !1),
                        r.send(null),
                        !(
                          (r.status >= 200 && r.status < 300) ||
                          304 === r.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + e + '. Status: ' + r.status,
                        );
                      var t,
                        n = Number(r.getResponseHeader('Content-length')),
                        o =
                          (t = r.getResponseHeader('Accept-Ranges')) &&
                          'bytes' === t,
                        i =
                          (t = r.getResponseHeader('Content-Encoding')) &&
                          'gzip' === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter(function (r) {
                        var t = r * a,
                          o = (r + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[r] &&
                            (s.chunks[r] = (function (r, t) {
                              if (r > t)
                                throw new Error(
                                  'invalid range (' +
                                    r +
                                    ', ' +
                                    t +
                                    ') or no bytes requested!',
                                );
                              if (t > n - 1)
                                throw new Error(
                                  'only ' +
                                    n +
                                    ' bytes available! programmer error!',
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open('GET', e, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    'Range',
                                    'bytes=' + r + '-' + t,
                                  ),
                                'undefined' != typeof Uint8Array &&
                                  (o.responseType = 'arraybuffer'),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    'text/plain; charset=x-user-defined',
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " +
                                    e +
                                    '. Status: ' +
                                    o.status,
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : ur(o.responseText || '', !0);
                            })(t, o)),
                          void 0 === s.chunks[r])
                        )
                          throw new Error('doXHR failed!');
                        return s.chunks[r];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          f(
                            'LazyFiles on gzip forces download of the whole file when length is accessed',
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    'undefined' != typeof XMLHttpRequest)
                  )
                    throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
                  var a = { isDevice: !1, url: e },
                    s = er.createFile(r, t, a, n, o);
                  a.contents
                    ? (s.contents = a.contents)
                    : a.url && ((s.contents = null), (s.url = a.url)),
                    Object.defineProperties(s, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var u = {};
                  return (
                    Object.keys(s.stream_ops).forEach(function (r) {
                      var t = s.stream_ops[r];
                      u[r] = function () {
                        if (!er.forceLoadFile(s)) throw new er.ErrnoError(29);
                        return t.apply(null, arguments);
                      };
                    }),
                    (u.read = function (r, t, e, n, o) {
                      if (!er.forceLoadFile(s)) throw new er.ErrnoError(29);
                      var i = r.node.contents;
                      if (o >= i.length) return 0;
                      var a = Math.min(i.length - o, n);
                      if (i.slice)
                        for (var u = 0; u < a; u++) t[e + u] = i[o + u];
                      else for (u = 0; u < a; u++) t[e + u] = i.get(o + u);
                      return a;
                    }),
                    (s.stream_ops = u),
                    s
                  );
                },
                createPreloadedFile: function (r, t, e, o, i, a, s, u, c, f) {
                  Browser.init();
                  var l = t ? Q.resolve(K.join2(r, t)) : r;
                  function d(e) {
                    function d(e) {
                      f && f(),
                        u || er.createDataFile(r, t, e, o, i, c),
                        a && a(),
                        I();
                    }
                    var p = !1;
                    n.preloadPlugins.forEach(function (r) {
                      p ||
                        (r.canHandle(l) &&
                          (r.handle(e, l, d, function () {
                            s && s(), I();
                          }),
                          (p = !0)));
                    }),
                      p || d(e);
                  }
                  L(),
                    'string' == typeof e
                      ? Browser.asyncLoad(
                          e,
                          function (r) {
                            d(r);
                          },
                          s,
                        )
                      : d(e);
                },
                indexedDB: function () {
                  return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                  );
                },
                DB_NAME: function () {
                  return 'EM_FS_' + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: 'FILE_DATA',
                saveFilesToDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = er.indexedDB();
                  try {
                    var o = n.open(er.DB_NAME(), er.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = function () {
                    f('creating db'),
                      o.result.createObjectStore(er.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction(
                          [er.DB_STORE_NAME],
                          'readwrite',
                        ),
                        i = n.objectStore(er.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        u = r.length;
                      function c() {
                        0 == s ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = i.put(er.analyzePath(r).object.contents, r);
                        (t.onsuccess = function () {
                          ++a + s == u && c();
                        }),
                          (t.onerror = function () {
                            s++, a + s == u && c();
                          });
                      }),
                        (n.onerror = e);
                    }),
                    (o.onerror = e);
                },
                loadFilesFromDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = er.indexedDB();
                  try {
                    var o = n.open(er.DB_NAME(), er.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = e),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var i = n.transaction([er.DB_STORE_NAME], 'readonly');
                      } catch (r) {
                        return void e(r);
                      }
                      var a = i.objectStore(er.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = r.length;
                      function f() {
                        0 == u ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = a.get(r);
                        (t.onsuccess = function () {
                          er.analyzePath(r).exists && er.unlink(r),
                            er.createDataFile(
                              K.dirname(r),
                              K.basename(r),
                              t.result,
                              !0,
                              !0,
                              !0,
                            ),
                            ++s + u == c && f();
                        }),
                          (t.onerror = function () {
                            u++, s + u == c && f();
                          });
                      }),
                        (i.onerror = e);
                    }),
                    (o.onerror = e);
                },
              },
              nr = {
                DEFAULT_POLLMASK: 5,
                mappings: {},
                umask: 511,
                calculateAt: function (r, t) {
                  if ('/' !== t[0]) {
                    var e;
                    if (-100 === r) e = er.cwd();
                    else {
                      var n = er.getStream(r);
                      if (!n) throw new er.ErrnoError(8);
                      e = n.path;
                    }
                    t = K.join2(e, t);
                  }
                  return t;
                },
                doStat: function (r, t, e) {
                  try {
                    var n = r(t);
                  } catch (r) {
                    if (
                      r &&
                      r.node &&
                      K.normalize(t) !== K.normalize(er.getPath(r.node))
                    )
                      return -54;
                    throw r;
                  }
                  return (
                    (_[e >> 2] = n.dev),
                    (_[(e + 4) >> 2] = 0),
                    (_[(e + 8) >> 2] = n.ino),
                    (_[(e + 12) >> 2] = n.mode),
                    (_[(e + 16) >> 2] = n.nlink),
                    (_[(e + 20) >> 2] = n.uid),
                    (_[(e + 24) >> 2] = n.gid),
                    (_[(e + 28) >> 2] = n.rdev),
                    (_[(e + 32) >> 2] = 0),
                    (Y = [
                      n.size >>> 0,
                      ((q = n.size),
                      +O(q) >= 1
                        ? q > 0
                          ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                          : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (_[(e + 40) >> 2] = Y[0]),
                    (_[(e + 44) >> 2] = Y[1]),
                    (_[(e + 48) >> 2] = 4096),
                    (_[(e + 52) >> 2] = n.blocks),
                    (_[(e + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (_[(e + 60) >> 2] = 0),
                    (_[(e + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (_[(e + 68) >> 2] = 0),
                    (_[(e + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (_[(e + 76) >> 2] = 0),
                    (Y = [
                      n.ino >>> 0,
                      ((q = n.ino),
                      +O(q) >= 1
                        ? q > 0
                          ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                          : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (_[(e + 80) >> 2] = Y[0]),
                    (_[(e + 84) >> 2] = Y[1]),
                    0
                  );
                },
                doMsync: function (r, t, e, n, o) {
                  var i = v.slice(r, r + e);
                  er.msync(t, i, o, e, n);
                },
                doMkdir: function (r, t) {
                  return (
                    '/' === (r = K.normalize(r))[r.length - 1] &&
                      (r = r.substr(0, r.length - 1)),
                    er.mkdir(r, t, 0),
                    0
                  );
                },
                doMknod: function (r, t, e) {
                  switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return er.mknod(r, t, e), 0;
                },
                doReadlink: function (r, t, e) {
                  if (e <= 0) return -28;
                  var n = er.readlink(r),
                    o = Math.min(e, D(n)),
                    i = y[t + o];
                  return b(n, v, t, e + 1), (y[t + o] = i), o;
                },
                doAccess: function (r, t) {
                  if (-8 & t) return -28;
                  var e;
                  if (!(e = er.lookupPath(r, { follow: !0 }).node)) return -44;
                  var n = '';
                  return (
                    4 & t && (n += 'r'),
                    2 & t && (n += 'w'),
                    1 & t && (n += 'x'),
                    n && er.nodePermissions(e, n) ? -2 : 0
                  );
                },
                doDup: function (r, t, e) {
                  var n = er.getStream(e);
                  return n && er.close(n), er.open(r, t, 0, e, e).fd;
                },
                doReadv: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = _[(t + 8 * i) >> 2],
                      s = _[(t + (8 * i + 4)) >> 2],
                      u = er.read(r, y, a, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = _[(t + 8 * i) >> 2],
                      s = _[(t + (8 * i + 4)) >> 2],
                      u = er.write(r, y, a, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: 0,
                get: function (r) {
                  return (nr.varargs += 4), _[(nr.varargs - 4) >> 2];
                },
                getStr: function () {
                  return k(nr.get());
                },
                getStreamFromFD: function (r) {
                  void 0 === r && (r = nr.get());
                  var t = er.getStream(r);
                  if (!t) throw new er.ErrnoError(8);
                  return t;
                },
                get64: function () {
                  var r = nr.get();
                  return nr.get(), r;
                },
                getZero: function () {
                  nr.get();
                },
              };
            function or(r) {
              try {
                return c.grow((r - h.byteLength + 65535) >> 16), S(c.buffer), 1;
              } catch (r) {}
            }
            var ir = {};
            function ar() {
              if (!ar.strings) {
                var r = {
                  USER: 'web_user',
                  LOGNAME: 'web_user',
                  PATH: '/',
                  PWD: '/',
                  HOME: '/home/web_user',
                  LANG:
                    (
                      ('object' == typeof navigator &&
                        navigator.languages &&
                        navigator.languages[0]) ||
                      'C'
                    ).replace('-', '_') + '.UTF-8',
                  _: a || './this.program',
                };
                for (var t in ir) r[t] = ir[t];
                var e = [];
                for (var t in r) e.push(t + '=' + r[t]);
                ar.strings = e;
              }
              return ar.strings;
            }
            function sr(r, t) {
              sr.array || (sr.array = []);
              var e,
                n = sr.array;
              for (n.length = 0; (e = v[r++]); )
                100 === e || 102 === e
                  ? ((t = (t + 7) & -8), n.push(w[t >> 3]), (t += 8))
                  : ((t = (t + 3) & -4), n.push(_[t >> 2]), (t += 4));
              return n;
            }
            function ur(r, t, e) {
              var n = e > 0 ? e : D(r) + 1,
                o = new Array(n),
                i = b(r, o, 0, o.length);
              return t && (o.length = i), o;
            }
            er.staticInit();
            var cr = {
                h: function (r, t) {
                  nr.varargs = t;
                  try {
                    return Z;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      -r.errno
                    );
                  }
                },
                e: function () {
                  H();
                },
                a: function (r, t, e) {
                  var n = sr(t, e);
                  return X[r].apply(null, n);
                },
                c: function (r, t, e) {
                  v.set(v.subarray(t, t + e), r);
                },
                d: function (r) {
                  var t = v.length;
                  if (r > 2147418112) return !1;
                  for (var e, n, o = 1; o <= 4; o *= 2) {
                    var i = t * (1 + 0.2 / o);
                    if (
                      ((i = Math.min(i, r + 100663296)),
                      or(
                        Math.min(
                          2147418112,
                          ((e = Math.max(16777216, r, i)) % (n = 65536) > 0 &&
                            (e += n - (e % n)),
                          e),
                        ),
                      ))
                    )
                      return !0;
                  }
                  return !1;
                },
                f: function (r, t) {
                  var e = ar(),
                    n = 0;
                  return (
                    e.forEach(function (e, o) {
                      var i = t + n;
                      (_[(r + 4 * o) >> 2] = i),
                        (function (r, t, e) {
                          for (var n = 0; n < r.length; ++n)
                            y[t++ >> 0] = r.charCodeAt(n);
                          e || (y[t >> 0] = 0);
                        })(e, i),
                        (n += e.length + 1);
                    }),
                    0
                  );
                },
                g: function (r, t) {
                  var e = ar();
                  _[r >> 2] = e.length;
                  var n = 0;
                  return (
                    e.forEach(function (r) {
                      n += r.length + 1;
                    }),
                    (_[t >> 2] = n),
                    0
                  );
                },
                j: function (r) {
                  try {
                    var t = nr.getStreamFromFD(r);
                    return er.close(t), 0;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                i: function (r, t, e, n, o) {
                  try {
                    var i = nr.getStreamFromFD(r),
                      a = 4294967296 * e + (t >>> 0);
                    return a <= -9007199254740992 || a >= 9007199254740992
                      ? -61
                      : (er.llseek(i, a, n),
                        (Y = [
                          i.position >>> 0,
                          ((q = i.position),
                          +O(q) >= 1
                            ? q > 0
                              ? (0 | z(+T(q / 4294967296), 4294967295)) >>> 0
                              : ~~+j((q - +(~~q >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (_[o >> 2] = Y[0]),
                        (_[(o + 4) >> 2] = Y[1]),
                        i.getdents && 0 === a && 0 === n && (i.getdents = null),
                        0);
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                b: function (r, t, e, n) {
                  try {
                    var o = nr.getStreamFromFD(r),
                      i = nr.doWritev(o, t, e);
                    return (_[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== er && r instanceof er.ErrnoError) || H(r),
                      r.errno
                    );
                  }
                },
                k: function (r) {
                  var t = Date.now();
                  return (
                    (_[r >> 2] = (t / 1e3) | 0),
                    (_[(r + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                    0
                  );
                },
                memory: c,
                table: d,
              },
              fr = (function () {
                var r = { a: cr };
                function t(r, t) {
                  var e = r.exports;
                  (n.asm = e), I();
                }
                function e(r) {
                  t(r.instance);
                }
                function o(t) {
                  return (
                    u || 'function' != typeof fetch
                      ? new Promise(function (r, t) {
                          r(V());
                        })
                      : fetch(J, { credentials: 'same-origin' })
                          .then(function (r) {
                            if (!r.ok)
                              throw (
                                "failed to load wasm binary file at '" + J + "'"
                              );
                            return r.arrayBuffer();
                          })
                          .catch(function () {
                            return V();
                          })
                  )
                    .then(function (t) {
                      return WebAssembly.instantiate(t, r);
                    })
                    .then(t, function (r) {
                      l('failed to asynchronously prepare wasm: ' + r), H(r);
                    });
                }
                if ((L(), n.instantiateWasm))
                  try {
                    return n.instantiateWasm(r, t);
                  } catch (r) {
                    return (
                      l(
                        'Module.instantiateWasm callback failed with error: ' +
                          r,
                      ),
                      !1
                    );
                  }
                return (
                  (function () {
                    if (
                      u ||
                      'function' != typeof WebAssembly.instantiateStreaming ||
                      U(J) ||
                      'function' != typeof fetch
                    )
                      return o(e);
                    fetch(J, { credentials: 'same-origin' }).then(function (t) {
                      return WebAssembly.instantiateStreaming(t, r).then(
                        e,
                        function (r) {
                          l('wasm streaming compile failed: ' + r),
                            l('falling back to ArrayBuffer instantiation'),
                            o(e);
                        },
                      );
                    });
                  })(),
                  {}
                );
              })();
            n.asm = fr;
            var lr,
              dr = (n.___wasm_call_ctors = function () {
                return (dr = n.___wasm_call_ctors = n.asm.l).apply(
                  null,
                  arguments,
                );
              }),
              pr = (n._emscripten_bind_CExpat_CExpat_0 = function () {
                return (pr = n._emscripten_bind_CExpat_CExpat_0 =
                  n.asm.m).apply(null, arguments);
              }),
              mr = (n._emscripten_bind_CExpat_create_0 = function () {
                return (mr = n._emscripten_bind_CExpat_create_0 =
                  n.asm.n).apply(null, arguments);
              }),
              hr = (n._emscripten_bind_CExpat_destroy_0 = function () {
                return (hr = n._emscripten_bind_CExpat_destroy_0 =
                  n.asm.o).apply(null, arguments);
              }),
              yr = (n._emscripten_bind_CExpat_parse_1 = function () {
                return (yr = n._emscripten_bind_CExpat_parse_1 = n.asm.p).apply(
                  null,
                  arguments,
                );
              }),
              vr = (n._emscripten_bind_CExpat_tag_0 = function () {
                return (vr = n._emscripten_bind_CExpat_tag_0 = n.asm.q).apply(
                  null,
                  arguments,
                );
              }),
              _r = (n._emscripten_bind_CExpat_attrs_0 = function () {
                return (_r = n._emscripten_bind_CExpat_attrs_0 = n.asm.r).apply(
                  null,
                  arguments,
                );
              }),
              wr = (n._emscripten_bind_CExpat_content_0 = function () {
                return (wr = n._emscripten_bind_CExpat_content_0 =
                  n.asm.s).apply(null, arguments);
              }),
              gr = (n._emscripten_bind_CExpat_startElement_0 = function () {
                return (gr = n._emscripten_bind_CExpat_startElement_0 =
                  n.asm.t).apply(null, arguments);
              }),
              Er = (n._emscripten_bind_CExpat_endElement_0 = function () {
                return (Er = n._emscripten_bind_CExpat_endElement_0 =
                  n.asm.u).apply(null, arguments);
              }),
              kr = (n._emscripten_bind_CExpat_characterData_0 = function () {
                return (kr = n._emscripten_bind_CExpat_characterData_0 =
                  n.asm.v).apply(null, arguments);
              }),
              br = (n._emscripten_bind_CExpat___destroy___0 = function () {
                return (br = n._emscripten_bind_CExpat___destroy___0 =
                  n.asm.w).apply(null, arguments);
              }),
              Dr = (n._emscripten_bind_CExpatJS_CExpatJS_0 = function () {
                return (Dr = n._emscripten_bind_CExpatJS_CExpatJS_0 =
                  n.asm.x).apply(null, arguments);
              }),
              Sr = (n._emscripten_bind_CExpatJS_startElement_0 = function () {
                return (Sr = n._emscripten_bind_CExpatJS_startElement_0 =
                  n.asm.y).apply(null, arguments);
              }),
              Fr = (n._emscripten_bind_CExpatJS_endElement_0 = function () {
                return (Fr = n._emscripten_bind_CExpatJS_endElement_0 =
                  n.asm.z).apply(null, arguments);
              }),
              Pr = (n._emscripten_bind_CExpatJS_characterData_0 = function () {
                return (Pr = n._emscripten_bind_CExpatJS_characterData_0 =
                  n.asm.A).apply(null, arguments);
              }),
              xr = (n._emscripten_bind_CExpatJS___destroy___0 = function () {
                return (xr = n._emscripten_bind_CExpatJS___destroy___0 =
                  n.asm.B).apply(null, arguments);
              }),
              Ar = (n._emscripten_bind_VoidPtr___destroy___0 = function () {
                return (Ar = n._emscripten_bind_VoidPtr___destroy___0 =
                  n.asm.C).apply(null, arguments);
              }),
              Mr = (n._malloc = function () {
                return (Mr = n._malloc = n.asm.D).apply(null, arguments);
              });
            function Cr(r) {
              function t() {
                lr ||
                  ((lr = !0),
                  p ||
                    ((R = !0),
                    n.noFSInit || er.init.initialized || er.init(),
                    rr.init(),
                    P(A),
                    (er.ignorePermissions = !1),
                    P(M),
                    n.onRuntimeInitialized && n.onRuntimeInitialized(),
                    (function () {
                      if (n.postRun)
                        for (
                          'function' == typeof n.postRun &&
                          (n.postRun = [n.postRun]);
                          n.postRun.length;

                        )
                          (r = n.postRun.shift()), C.unshift(r);
                      var r;
                      P(C);
                    })()));
              }
              B > 0 ||
                ((function () {
                  if (n.preRun)
                    for (
                      'function' == typeof n.preRun && (n.preRun = [n.preRun]);
                      n.preRun.length;

                    )
                      (r = n.preRun.shift()), x.unshift(r);
                  var r;
                  P(x);
                })(),
                B > 0 ||
                  (n.setStatus
                    ? (n.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          n.setStatus('');
                        }, 1),
                          t();
                      }, 1))
                    : t()));
            }
            if (
              ((n._free = function () {
                return (n._free = n.asm.E).apply(null, arguments);
              }),
              (n.___errno_location = function () {
                return (n.___errno_location = n.asm.F).apply(null, arguments);
              }),
              (n.stackAlloc = function () {
                return (n.stackAlloc = n.asm.G).apply(null, arguments);
              }),
              (n.dynCall_vi = function () {
                return (n.dynCall_vi = n.asm.H).apply(null, arguments);
              }),
              (n.asm = fr),
              (n.then = function (r) {
                if (lr) r(n);
                else {
                  var t = n.onRuntimeInitialized;
                  n.onRuntimeInitialized = function () {
                    t && t(), r(n);
                  };
                }
                return n;
              }),
              (N = function r() {
                lr || Cr(), lr || (N = r);
              }),
              (n.run = Cr),
              n.preInit)
            )
              for (
                'function' == typeof n.preInit && (n.preInit = [n.preInit]);
                n.preInit.length > 0;

              )
                n.preInit.pop()();
            function Rr() {}
            function Or(r) {
              return (r || Rr).__cache__;
            }
            function jr(r, t) {
              var e = Or(t),
                n = e[r];
              return (
                n ||
                (((n = Object.create((t || Rr).prototype)).ptr = r), (e[r] = n))
              );
            }
            Cr(),
              (Rr.prototype = Object.create(Rr.prototype)),
              (Rr.prototype.constructor = Rr),
              (Rr.prototype.__class__ = Rr),
              (Rr.__cache__ = {}),
              (n.WrapperObject = Rr),
              (n.getCache = Or),
              (n.wrapPointer = jr),
              (n.castObject = function (r, t) {
                return jr(r.ptr, t);
              }),
              (n.NULL = jr(0)),
              (n.destroy = function (r) {
                if (!r.__destroy__)
                  throw 'Error: Cannot destroy object. (Did you create it yourself?)';
                r.__destroy__(), delete Or(r.__class__)[r.ptr];
              }),
              (n.compare = function (r, t) {
                return r.ptr === t.ptr;
              }),
              (n.getPointer = function (r) {
                return r.ptr;
              }),
              (n.getClass = function (r) {
                return r.__class__;
              });
            var Tr,
              zr = {
                buffer: 0,
                size: 0,
                pos: 0,
                temps: [],
                needed: 0,
                prepare: function () {
                  if (zr.needed) {
                    for (var r = 0; r < zr.temps.length; r++)
                      n._free(zr.temps[r]);
                    (zr.temps.length = 0),
                      n._free(zr.buffer),
                      (zr.buffer = 0),
                      (zr.size += zr.needed),
                      (zr.needed = 0);
                  }
                  zr.buffer ||
                    ((zr.size += 128),
                    (zr.buffer = n._malloc(zr.size)),
                    m(zr.buffer)),
                    (zr.pos = 0);
                },
                alloc: function (r, t) {
                  m(zr.buffer);
                  var e,
                    o = t.BYTES_PER_ELEMENT,
                    i = r.length * o;
                  return (
                    (i = (i + 7) & -8),
                    zr.pos + i >= zr.size
                      ? (m(i > 0),
                        (zr.needed += i),
                        (e = n._malloc(i)),
                        zr.temps.push(e))
                      : ((e = zr.buffer + zr.pos), (zr.pos += i)),
                    e
                  );
                },
                copy: function (r, t, e) {
                  var n = e;
                  switch (t.BYTES_PER_ELEMENT) {
                    case 2:
                      n >>= 1;
                      break;
                    case 4:
                      n >>= 2;
                      break;
                    case 8:
                      n >>= 3;
                  }
                  for (var o = 0; o < r.length; o++) t[n + o] = r[o];
                },
              };
            function Br() {
              (this.ptr = pr()), (Or(Br)[this.ptr] = this);
            }
            function Nr() {
              (this.ptr = Dr()), (Or(Nr)[this.ptr] = this);
            }
            function Lr() {
              throw 'cannot construct a VoidPtr, no constructor in IDL';
            }
            return (
              (Br.prototype = Object.create(Rr.prototype)),
              (Br.prototype.constructor = Br),
              (Br.prototype.__class__ = Br),
              (Br.__cache__ = {}),
              (n.CExpat = Br),
              (Br.prototype.create = Br.prototype.create =
                function () {
                  var r = this.ptr;
                  return !!mr(r);
                }),
              (Br.prototype.destroy = Br.prototype.destroy =
                function () {
                  var r = this.ptr;
                  hr(r);
                }),
              (Br.prototype.parse = Br.prototype.parse =
                function (r) {
                  var t = this.ptr;
                  return (
                    zr.prepare(),
                    (r =
                      r && 'object' == typeof r
                        ? r.ptr
                        : (function (r) {
                            if ('string' == typeof r) {
                              var t = ur(r),
                                e = zr.alloc(t, y);
                              return zr.copy(t, y, e), e;
                            }
                            return r;
                          })(r)),
                    !!yr(t, r)
                  );
                }),
              (Br.prototype.tag = Br.prototype.tag =
                function () {
                  var r = this.ptr;
                  return k(vr(r));
                }),
              (Br.prototype.attrs = Br.prototype.attrs =
                function () {
                  var r = this.ptr;
                  return k(_r(r));
                }),
              (Br.prototype.content = Br.prototype.content =
                function () {
                  var r = this.ptr;
                  return k(wr(r));
                }),
              (Br.prototype.startElement = Br.prototype.startElement =
                function () {
                  var r = this.ptr;
                  gr(r);
                }),
              (Br.prototype.endElement = Br.prototype.endElement =
                function () {
                  var r = this.ptr;
                  Er(r);
                }),
              (Br.prototype.characterData = Br.prototype.characterData =
                function () {
                  var r = this.ptr;
                  kr(r);
                }),
              (Br.prototype.__destroy__ = Br.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  br(r);
                }),
              (Nr.prototype = Object.create(Br.prototype)),
              (Nr.prototype.constructor = Nr),
              (Nr.prototype.__class__ = Nr),
              (Nr.__cache__ = {}),
              (n.CExpatJS = Nr),
              (Nr.prototype.startElement = Nr.prototype.startElement =
                function () {
                  var r = this.ptr;
                  Sr(r);
                }),
              (Nr.prototype.endElement = Nr.prototype.endElement =
                function () {
                  var r = this.ptr;
                  Fr(r);
                }),
              (Nr.prototype.characterData = Nr.prototype.characterData =
                function () {
                  var r = this.ptr;
                  Pr(r);
                }),
              (Nr.prototype.__destroy__ = Nr.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  xr(r);
                }),
              (Lr.prototype = Object.create(Rr.prototype)),
              (Lr.prototype.constructor = Lr),
              (Lr.prototype.__class__ = Lr),
              (Lr.__cache__ = {}),
              (n.VoidPtr = Lr),
              (Lr.prototype.__destroy__ = Lr.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Ar(r);
                }),
              R || ((Tr = function () {}), M.unshift(Tr)),
              r
            );
          });
      r.exports = n;
    }),
    n = Object.freeze({ __proto__: null, default: e, __moduleExports: e }),
    o = new Function('return this;')().__hpcc_wasmFolder || void 0;
  function i(r) {
    if (void 0 === r) return o;
    var t = o;
    return (o = r), t;
  }
  function a(r) {
    var t = r.default || r;
    return (
      t.__hpcc_promise ||
        (t.__hpcc_promise = new Promise(function (r) {
          t({
            locateFile: function (r, t) {
              return (i() || t) + (r ? '/' : '') + r;
            },
          }).then(function (t) {
            delete t.then, r(t);
          });
        })),
      t.__hpcc_promise
    );
  }
  var s = (function () {
      function r(r, t) {
        (this.tag = r), (this.attrs = t), (this._content = '');
      }
      return (
        Object.defineProperty(r.prototype, 'content', {
          get: function () {
            return this._content;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (r.prototype.appendContent = function (r) {
          this._content += r;
        }),
        r
      );
    })(),
    u = (function () {
      function r() {
        this._stack = [];
      }
      return (
        (r.prototype.parse = function (r) {
          return c(r, this);
        }),
        (r.prototype.top = function () {
          return this._stack[this._stack.length - 1];
        }),
        (r.prototype.startElement = function (r, t) {
          var e = new s(r, t);
          return this._stack.push(e), e;
        }),
        (r.prototype.endElement = function (r) {
          return this._stack.pop();
        }),
        (r.prototype.characterData = function (r) {
          this.top().appendContent(r);
        }),
        r
      );
    })();
  function c(r, t) {
    return a(n).then(function (e) {
      var n = new e.CExpatJS();
      (n.startElement = function () {
        t.startElement(
          this.tag(),
          (function (r) {
            var t = {},
              e = r,
              n = '' + String.fromCharCode(1),
              o = '' + n + n;
            return (
              e
                .split(o)
                .filter(function (r) {
                  return !!r;
                })
                .forEach(function (r) {
                  var e = r.split(n);
                  t[e[0]] = e[1];
                }),
              t
            );
          })(this.attrs()),
        );
      }),
        (n.endElement = function () {
          t.endElement(this.tag());
        }),
        (n.characterData = function () {
          t.characterData(this.content());
        }),
        n.create();
      var o = n.parse(r);
      return n.destroy(), e.destroy(n), o;
    });
  }
  var f = t(function (r, t) {
      var e,
        n =
          ((e =
            'undefined' != typeof document && document.currentScript
              ? document.currentScript.src
              : void 0),
          function (r) {
            var t,
              n = void 0 !== (r = r || {}) ? r : {},
              o = {};
            for (t in n) n.hasOwnProperty(t) && (o[t] = n[t]);
            var i,
              a = './this.program',
              s = function (r, t) {
                throw t;
              },
              u = '';
            document.currentScript && (u = document.currentScript.src),
              e && (u = e),
              (u =
                0 !== u.indexOf('blob:')
                  ? u.substr(0, u.lastIndexOf('/') + 1)
                  : ''),
              (i = function (r) {
                var t = new XMLHttpRequest();
                return t.open('GET', r, !1), t.send(null), t.responseText;
              });
            var c = n.print || console.log.bind(console),
              f = n.printErr || console.warn.bind(console);
            for (t in o) o.hasOwnProperty(t) && (n[t] = o[t]);
            (o = null),
              n.arguments && n.arguments,
              n.thisProgram && (a = n.thisProgram),
              n.quit && (s = n.quit);
            var l,
              d,
              p,
              m = 0,
              h = function (r) {
                m = r;
              };
            n.wasmBinary && (l = n.wasmBinary),
              n.noExitRuntime && (d = n.noExitRuntime),
              'object' != typeof WebAssembly &&
                f('no native wasm support detected');
            var y = new WebAssembly.Table({
                initial: 928,
                maximum: 928,
                element: 'anyfunc',
              }),
              v = !1;
            function _(r, t) {
              r || J('Assertion failed: ' + t);
            }
            var w,
              g,
              E,
              k,
              b,
              D,
              S =
                'undefined' != typeof TextDecoder
                  ? new TextDecoder('utf8')
                  : void 0;
            function F(r, t, e) {
              for (var n = t + e, o = t; r[o] && !(o >= n); ) ++o;
              if (o - t > 16 && r.subarray && S)
                return S.decode(r.subarray(t, o));
              for (var i = ''; t < o; ) {
                var a = r[t++];
                if (128 & a) {
                  var s = 63 & r[t++];
                  if (192 != (224 & a)) {
                    var u = 63 & r[t++];
                    if (
                      (a =
                        224 == (240 & a)
                          ? ((15 & a) << 12) | (s << 6) | u
                          : ((7 & a) << 18) |
                            (s << 12) |
                            (u << 6) |
                            (63 & r[t++])) < 65536
                    )
                      i += String.fromCharCode(a);
                    else {
                      var c = a - 65536;
                      i += String.fromCharCode(
                        55296 | (c >> 10),
                        56320 | (1023 & c),
                      );
                    }
                  } else i += String.fromCharCode(((31 & a) << 6) | s);
                } else i += String.fromCharCode(a);
              }
              return i;
            }
            function P(r, t) {
              return r ? F(E, r, t) : '';
            }
            function x(r, t, e, n) {
              if (!(n > 0)) return 0;
              for (var o = e, i = e + n - 1, a = 0; a < r.length; ++a) {
                var s = r.charCodeAt(a);
                if (
                  (s >= 55296 &&
                    s <= 57343 &&
                    (s =
                      (65536 + ((1023 & s) << 10)) |
                      (1023 & r.charCodeAt(++a))),
                  s <= 127)
                ) {
                  if (e >= i) break;
                  t[e++] = s;
                } else if (s <= 2047) {
                  if (e + 1 >= i) break;
                  (t[e++] = 192 | (s >> 6)), (t[e++] = 128 | (63 & s));
                } else if (s <= 65535) {
                  if (e + 2 >= i) break;
                  (t[e++] = 224 | (s >> 12)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                } else {
                  if (e + 3 >= i) break;
                  (t[e++] = 240 | (s >> 18)),
                    (t[e++] = 128 | ((s >> 12) & 63)),
                    (t[e++] = 128 | ((s >> 6) & 63)),
                    (t[e++] = 128 | (63 & s));
                }
              }
              return (t[e] = 0), e - o;
            }
            function A(r) {
              for (var t = 0, e = 0; e < r.length; ++e) {
                var n = r.charCodeAt(e);
                n >= 55296 &&
                  n <= 57343 &&
                  (n =
                    (65536 + ((1023 & n) << 10)) | (1023 & r.charCodeAt(++e))),
                  n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
              }
              return t;
            }
            function M(r) {
              (w = r),
                (n.HEAP8 = g = new Int8Array(r)),
                (n.HEAP16 = k = new Int16Array(r)),
                (n.HEAP32 = b = new Int32Array(r)),
                (n.HEAPU8 = E = new Uint8Array(r)),
                (n.HEAPU16 = new Uint16Array(r)),
                (n.HEAPU32 = new Uint32Array(r)),
                (n.HEAPF32 = new Float32Array(r)),
                (n.HEAPF64 = D = new Float64Array(r));
            }
            'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
            var C = n.TOTAL_MEMORY || 16777216;
            function R(r) {
              for (; r.length > 0; ) {
                var t = r.shift();
                if ('function' != typeof t) {
                  var e = t.func;
                  'number' == typeof e
                    ? void 0 === t.arg
                      ? n.dynCall_v(e)
                      : n.dynCall_vi(e, t.arg)
                    : e(void 0 === t.arg ? null : t.arg);
                } else t();
              }
            }
            (p = n.wasmMemory
              ? n.wasmMemory
              : new WebAssembly.Memory({ initial: C / 65536 })) &&
              (w = p.buffer),
              (C = w.byteLength),
              M(w),
              (b[54044] = 5459216);
            var O = [],
              j = [],
              T = [],
              z = [],
              B = !1,
              N = Math.abs,
              L = Math.ceil,
              I = Math.floor,
              H = Math.min,
              U = 0,
              W = null;
            function q(r) {
              U++, n.monitorRunDependencies && n.monitorRunDependencies(U);
            }
            function Y(r) {
              if (
                (U--,
                n.monitorRunDependencies && n.monitorRunDependencies(U),
                0 == U && W)
              ) {
                var t = W;
                (W = null), t();
              }
            }
            function J(r) {
              throw (
                (n.onAbort && n.onAbort(r),
                c((r += '')),
                f(r),
                (v = !0),
                (r =
                  'abort(' +
                  r +
                  '). Build with -s ASSERTIONS=1 for more info.'),
                new WebAssembly.RuntimeError(r))
              );
            }
            function V(r) {
              return String.prototype.startsWith
                ? r.startsWith('data:application/octet-stream;base64,')
                : 0 === r.indexOf('data:application/octet-stream;base64,');
            }
            (n.preloadedImages = {}), (n.preloadedAudios = {});
            var X,
              G,
              Z,
              K = 'graphvizlib.wasm';
            function $() {
              try {
                if (l) return new Uint8Array(l);
                throw 'both async and sync fetching of the wasm failed';
              } catch (r) {
                J(r);
              }
            }
            V(K) || ((X = K), (K = n.locateFile ? n.locateFile(X, u) : u + X));
            var Q = {
              1088: function (r, t) {
                var e = P(r),
                  n = P(t);
                sr.createPath('/', nr.dirname(e)),
                  sr.writeFile(nr.join('/', e), n);
              },
            };
            function rr() {
              var r = (function () {
                var r = new Error();
                if (!r.stack) {
                  try {
                    throw new Error();
                  } catch (t) {
                    r = t;
                  }
                  if (!r.stack) return '(no stack trace available)';
                }
                return r.stack.toString();
              })();
              return (
                n.extraStackTrace && (r += '\n' + n.extraStackTrace()),
                r.replace(/\b_Z[\w\d_]+/g, function (r) {
                  return r == r ? r : r + ' [' + r + ']';
                })
              );
            }
            function tr() {
              J();
            }
            function er(r) {
              return (
                n.___errno_location && (b[n.___errno_location() >> 2] = r), r
              );
            }
            j.push({
              func: function () {
                Fr();
              },
            });
            var nr = {
                splitPath: function (r) {
                  return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
                    .exec(r)
                    .slice(1);
                },
                normalizeArray: function (r, t) {
                  for (var e = 0, n = r.length - 1; n >= 0; n--) {
                    var o = r[n];
                    '.' === o
                      ? r.splice(n, 1)
                      : '..' === o
                      ? (r.splice(n, 1), e++)
                      : e && (r.splice(n, 1), e--);
                  }
                  if (t) for (; e; e--) r.unshift('..');
                  return r;
                },
                normalize: function (r) {
                  var t = '/' === r.charAt(0),
                    e = '/' === r.substr(-1);
                  return (
                    (r = nr
                      .normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !t,
                      )
                      .join('/')) ||
                      t ||
                      (r = '.'),
                    r && e && (r += '/'),
                    (t ? '/' : '') + r
                  );
                },
                dirname: function (r) {
                  var t = nr.splitPath(r),
                    e = t[0],
                    n = t[1];
                  return e || n
                    ? (n && (n = n.substr(0, n.length - 1)), e + n)
                    : '.';
                },
                basename: function (r) {
                  if ('/' === r) return '/';
                  var t = r.lastIndexOf('/');
                  return -1 === t ? r : r.substr(t + 1);
                },
                extname: function (r) {
                  return nr.splitPath(r)[3];
                },
                join: function () {
                  var r = Array.prototype.slice.call(arguments, 0);
                  return nr.normalize(r.join('/'));
                },
                join2: function (r, t) {
                  return nr.normalize(r + '/' + t);
                },
              },
              or = {
                resolve: function () {
                  for (
                    var r = '', t = !1, e = arguments.length - 1;
                    e >= -1 && !t;
                    e--
                  ) {
                    var n = e >= 0 ? arguments[e] : sr.cwd();
                    if ('string' != typeof n)
                      throw new TypeError(
                        'Arguments to path.resolve must be strings',
                      );
                    if (!n) return '';
                    (r = n + '/' + r), (t = '/' === n.charAt(0));
                  }
                  return (
                    (t ? '/' : '') +
                      (r = nr
                        .normalizeArray(
                          r.split('/').filter(function (r) {
                            return !!r;
                          }),
                          !t,
                        )
                        .join('/')) || '.'
                  );
                },
                relative: function (r, t) {
                  function e(r) {
                    for (var t = 0; t < r.length && '' === r[t]; t++);
                    for (var e = r.length - 1; e >= 0 && '' === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1);
                  }
                  (r = or.resolve(r).substr(1)), (t = or.resolve(t).substr(1));
                  for (
                    var n = e(r.split('/')),
                      o = e(t.split('/')),
                      i = Math.min(n.length, o.length),
                      a = i,
                      s = 0;
                    s < i;
                    s++
                  )
                    if (n[s] !== o[s]) {
                      a = s;
                      break;
                    }
                  var u = [];
                  for (s = a; s < n.length; s++) u.push('..');
                  return (u = u.concat(o.slice(a))).join('/');
                },
              },
              ir = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (r, t) {
                  (ir.ttys[r] = { input: [], output: [], ops: t }),
                    sr.registerDevice(r, ir.stream_ops);
                },
                stream_ops: {
                  open: function (r) {
                    var t = ir.ttys[r.node.rdev];
                    if (!t) throw new sr.ErrnoError(43);
                    (r.tty = t), (r.seekable = !1);
                  },
                  close: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  flush: function (r) {
                    r.tty.ops.flush(r.tty);
                  },
                  read: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.get_char)
                      throw new sr.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                      var s;
                      try {
                        s = r.tty.ops.get_char(r.tty);
                      } catch (r) {
                        throw new sr.ErrnoError(29);
                      }
                      if (void 0 === s && 0 === i) throw new sr.ErrnoError(6);
                      if (null == s) break;
                      i++, (t[e + a] = s);
                    }
                    return i && (r.node.timestamp = Date.now()), i;
                  },
                  write: function (r, t, e, n, o) {
                    if (!r.tty || !r.tty.ops.put_char)
                      throw new sr.ErrnoError(60);
                    try {
                      for (var i = 0; i < n; i++)
                        r.tty.ops.put_char(r.tty, t[e + i]);
                    } catch (r) {
                      throw new sr.ErrnoError(29);
                    }
                    return n && (r.node.timestamp = Date.now()), i;
                  },
                },
                default_tty_ops: {
                  get_char: function (r) {
                    if (!r.input.length) {
                      var t = null;
                      if (
                        ('undefined' != typeof window &&
                        'function' == typeof window.prompt
                          ? null !== (t = window.prompt('Input: ')) &&
                            (t += '\n')
                          : 'function' == typeof readline &&
                            null !== (t = readline()) &&
                            (t += '\n'),
                        !t)
                      )
                        return null;
                      r.input = kr(t, !0);
                    }
                    return r.input.shift();
                  },
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (c(F(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (c(F(r.output, 0)), (r.output = []));
                  },
                },
                default_tty1_ops: {
                  put_char: function (r, t) {
                    null === t || 10 === t
                      ? (f(F(r.output, 0)), (r.output = []))
                      : 0 != t && r.output.push(t);
                  },
                  flush: function (r) {
                    r.output &&
                      r.output.length > 0 &&
                      (f(F(r.output, 0)), (r.output = []));
                  },
                },
              },
              ar = {
                ops_table: null,
                mount: function (r) {
                  return ar.createNode(null, '/', 16895, 0);
                },
                createNode: function (r, t, e, n) {
                  if (sr.isBlkdev(e) || sr.isFIFO(e))
                    throw new sr.ErrnoError(63);
                  ar.ops_table ||
                    (ar.ops_table = {
                      dir: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                          lookup: ar.node_ops.lookup,
                          mknod: ar.node_ops.mknod,
                          rename: ar.node_ops.rename,
                          unlink: ar.node_ops.unlink,
                          rmdir: ar.node_ops.rmdir,
                          readdir: ar.node_ops.readdir,
                          symlink: ar.node_ops.symlink,
                        },
                        stream: { llseek: ar.stream_ops.llseek },
                      },
                      file: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                        },
                        stream: {
                          llseek: ar.stream_ops.llseek,
                          read: ar.stream_ops.read,
                          write: ar.stream_ops.write,
                          allocate: ar.stream_ops.allocate,
                          mmap: ar.stream_ops.mmap,
                          msync: ar.stream_ops.msync,
                        },
                      },
                      link: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                          readlink: ar.node_ops.readlink,
                        },
                        stream: {},
                      },
                      chrdev: {
                        node: {
                          getattr: ar.node_ops.getattr,
                          setattr: ar.node_ops.setattr,
                        },
                        stream: sr.chrdev_stream_ops,
                      },
                    });
                  var o = sr.createNode(r, t, e, n);
                  return (
                    sr.isDir(o.mode)
                      ? ((o.node_ops = ar.ops_table.dir.node),
                        (o.stream_ops = ar.ops_table.dir.stream),
                        (o.contents = {}))
                      : sr.isFile(o.mode)
                      ? ((o.node_ops = ar.ops_table.file.node),
                        (o.stream_ops = ar.ops_table.file.stream),
                        (o.usedBytes = 0),
                        (o.contents = null))
                      : sr.isLink(o.mode)
                      ? ((o.node_ops = ar.ops_table.link.node),
                        (o.stream_ops = ar.ops_table.link.stream))
                      : sr.isChrdev(o.mode) &&
                        ((o.node_ops = ar.ops_table.chrdev.node),
                        (o.stream_ops = ar.ops_table.chrdev.stream)),
                    (o.timestamp = Date.now()),
                    r && (r.contents[t] = o),
                    o
                  );
                },
                getFileDataAsRegularArray: function (r) {
                  if (r.contents && r.contents.subarray) {
                    for (var t = [], e = 0; e < r.usedBytes; ++e)
                      t.push(r.contents[e]);
                    return t;
                  }
                  return r.contents;
                },
                getFileDataAsTypedArray: function (r) {
                  return r.contents
                    ? r.contents.subarray
                      ? r.contents.subarray(0, r.usedBytes)
                      : new Uint8Array(r.contents)
                    : new Uint8Array();
                },
                expandFileStorage: function (r, t) {
                  var e = r.contents ? r.contents.length : 0;
                  if (!(e >= t)) {
                    (t = Math.max(t, (e * (e < 1048576 ? 2 : 1.125)) | 0)),
                      0 != e && (t = Math.max(t, 256));
                    var n = r.contents;
                    (r.contents = new Uint8Array(t)),
                      r.usedBytes > 0 &&
                        r.contents.set(n.subarray(0, r.usedBytes), 0);
                  }
                },
                resizeFileStorage: function (r, t) {
                  if (r.usedBytes != t) {
                    if (0 == t)
                      return (r.contents = null), void (r.usedBytes = 0);
                    if (!r.contents || r.contents.subarray) {
                      var e = r.contents;
                      return (
                        (r.contents = new Uint8Array(t)),
                        e &&
                          r.contents.set(
                            e.subarray(0, Math.min(t, r.usedBytes)),
                          ),
                        void (r.usedBytes = t)
                      );
                    }
                    if (
                      (r.contents || (r.contents = []), r.contents.length > t)
                    )
                      r.contents.length = t;
                    else for (; r.contents.length < t; ) r.contents.push(0);
                    r.usedBytes = t;
                  }
                },
                node_ops: {
                  getattr: function (r) {
                    var t = {};
                    return (
                      (t.dev = sr.isChrdev(r.mode) ? r.id : 1),
                      (t.ino = r.id),
                      (t.mode = r.mode),
                      (t.nlink = 1),
                      (t.uid = 0),
                      (t.gid = 0),
                      (t.rdev = r.rdev),
                      sr.isDir(r.mode)
                        ? (t.size = 4096)
                        : sr.isFile(r.mode)
                        ? (t.size = r.usedBytes)
                        : sr.isLink(r.mode)
                        ? (t.size = r.link.length)
                        : (t.size = 0),
                      (t.atime = new Date(r.timestamp)),
                      (t.mtime = new Date(r.timestamp)),
                      (t.ctime = new Date(r.timestamp)),
                      (t.blksize = 4096),
                      (t.blocks = Math.ceil(t.size / t.blksize)),
                      t
                    );
                  },
                  setattr: function (r, t) {
                    void 0 !== t.mode && (r.mode = t.mode),
                      void 0 !== t.timestamp && (r.timestamp = t.timestamp),
                      void 0 !== t.size && ar.resizeFileStorage(r, t.size);
                  },
                  lookup: function (r, t) {
                    throw sr.genericErrors[44];
                  },
                  mknod: function (r, t, e, n) {
                    return ar.createNode(r, t, e, n);
                  },
                  rename: function (r, t, e) {
                    if (sr.isDir(r.mode)) {
                      var n;
                      try {
                        n = sr.lookupNode(t, e);
                      } catch (r) {}
                      if (n)
                        for (var o in n.contents) throw new sr.ErrnoError(55);
                    }
                    delete r.parent.contents[r.name],
                      (r.name = e),
                      (t.contents[e] = r),
                      (r.parent = t);
                  },
                  unlink: function (r, t) {
                    delete r.contents[t];
                  },
                  rmdir: function (r, t) {
                    var e = sr.lookupNode(r, t);
                    for (var n in e.contents) throw new sr.ErrnoError(55);
                    delete r.contents[t];
                  },
                  readdir: function (r) {
                    var t = ['.', '..'];
                    for (var e in r.contents)
                      r.contents.hasOwnProperty(e) && t.push(e);
                    return t;
                  },
                  symlink: function (r, t, e) {
                    var n = ar.createNode(r, t, 41471, 0);
                    return (n.link = e), n;
                  },
                  readlink: function (r) {
                    if (!sr.isLink(r.mode)) throw new sr.ErrnoError(28);
                    return r.link;
                  },
                },
                stream_ops: {
                  read: function (r, t, e, n, o) {
                    var i = r.node.contents;
                    if (o >= r.node.usedBytes) return 0;
                    var a = Math.min(r.node.usedBytes - o, n);
                    if (a > 8 && i.subarray) t.set(i.subarray(o, o + a), e);
                    else for (var s = 0; s < a; s++) t[e + s] = i[o + s];
                    return a;
                  },
                  write: function (r, t, e, n, o, i) {
                    if ((t.buffer === g.buffer && (i = !1), !n)) return 0;
                    var a = r.node;
                    if (
                      ((a.timestamp = Date.now()),
                      t.subarray && (!a.contents || a.contents.subarray))
                    ) {
                      if (i)
                        return (
                          (a.contents = t.subarray(e, e + n)),
                          (a.usedBytes = n),
                          n
                        );
                      if (0 === a.usedBytes && 0 === o)
                        return (
                          (a.contents = t.slice(e, e + n)), (a.usedBytes = n), n
                        );
                      if (o + n <= a.usedBytes)
                        return a.contents.set(t.subarray(e, e + n), o), n;
                    }
                    if (
                      (ar.expandFileStorage(a, o + n),
                      a.contents.subarray && t.subarray)
                    )
                      a.contents.set(t.subarray(e, e + n), o);
                    else
                      for (var s = 0; s < n; s++) a.contents[o + s] = t[e + s];
                    return (a.usedBytes = Math.max(a.usedBytes, o + n)), n;
                  },
                  llseek: function (r, t, e) {
                    var n = t;
                    if (
                      (1 === e
                        ? (n += r.position)
                        : 2 === e &&
                          sr.isFile(r.node.mode) &&
                          (n += r.node.usedBytes),
                      n < 0)
                    )
                      throw new sr.ErrnoError(28);
                    return n;
                  },
                  allocate: function (r, t, e) {
                    ar.expandFileStorage(r.node, t + e),
                      (r.node.usedBytes = Math.max(r.node.usedBytes, t + e));
                  },
                  mmap: function (r, t, e, n, o, i, a) {
                    if (!sr.isFile(r.node.mode)) throw new sr.ErrnoError(43);
                    var s,
                      u,
                      c = r.node.contents;
                    if (2 & a || c.buffer !== t.buffer) {
                      (o > 0 || o + n < r.node.usedBytes) &&
                        (c = c.subarray
                          ? c.subarray(o, o + n)
                          : Array.prototype.slice.call(c, o, o + n)),
                        (u = !0);
                      var f = t.buffer == g.buffer;
                      if (!(s = Rr(n))) throw new sr.ErrnoError(48);
                      (f ? g : t).set(c, s);
                    } else (u = !1), (s = c.byteOffset);
                    return { ptr: s, allocated: u };
                  },
                  msync: function (r, t, e, n, o) {
                    if (!sr.isFile(r.node.mode)) throw new sr.ErrnoError(43);
                    return 2 & o || ar.stream_ops.write(r, t, 0, n, e, !1), 0;
                  },
                },
              },
              sr = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: '/',
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (r) {
                  if (!(r instanceof sr.ErrnoError)) throw r + ' : ' + rr();
                  return er(r.errno);
                },
                lookupPath: function (r, t) {
                  if (((t = t || {}), !(r = or.resolve(sr.cwd(), r))))
                    return { path: '', node: null };
                  var e = { follow_mount: !0, recurse_count: 0 };
                  for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                  if (t.recurse_count > 8) throw new sr.ErrnoError(32);
                  for (
                    var o = nr.normalizeArray(
                        r.split('/').filter(function (r) {
                          return !!r;
                        }),
                        !1,
                      ),
                      i = sr.root,
                      a = '/',
                      s = 0;
                    s < o.length;
                    s++
                  ) {
                    var u = s === o.length - 1;
                    if (u && t.parent) break;
                    if (
                      ((i = sr.lookupNode(i, o[s])),
                      (a = nr.join2(a, o[s])),
                      sr.isMountpoint(i) &&
                        (!u || (u && t.follow_mount)) &&
                        (i = i.mounted.root),
                      !u || t.follow)
                    )
                      for (var c = 0; sr.isLink(i.mode); ) {
                        var f = sr.readlink(a);
                        if (
                          ((a = or.resolve(nr.dirname(a), f)),
                          (i = sr.lookupPath(a, {
                            recurse_count: t.recurse_count,
                          }).node),
                          c++ > 40)
                        )
                          throw new sr.ErrnoError(32);
                      }
                  }
                  return { path: a, node: i };
                },
                getPath: function (r) {
                  for (var t; ; ) {
                    if (sr.isRoot(r)) {
                      var e = r.mount.mountpoint;
                      return t
                        ? '/' !== e[e.length - 1]
                          ? e + '/' + t
                          : e + t
                        : e;
                    }
                    (t = t ? r.name + '/' + t : r.name), (r = r.parent);
                  }
                },
                hashName: function (r, t) {
                  for (var e = 0, n = 0; n < t.length; n++)
                    e = ((e << 5) - e + t.charCodeAt(n)) | 0;
                  return ((r + e) >>> 0) % sr.nameTable.length;
                },
                hashAddNode: function (r) {
                  var t = sr.hashName(r.parent.id, r.name);
                  (r.name_next = sr.nameTable[t]), (sr.nameTable[t] = r);
                },
                hashRemoveNode: function (r) {
                  var t = sr.hashName(r.parent.id, r.name);
                  if (sr.nameTable[t] === r) sr.nameTable[t] = r.name_next;
                  else
                    for (var e = sr.nameTable[t]; e; ) {
                      if (e.name_next === r) {
                        e.name_next = r.name_next;
                        break;
                      }
                      e = e.name_next;
                    }
                },
                lookupNode: function (r, t) {
                  var e = sr.mayLookup(r);
                  if (e) throw new sr.ErrnoError(e, r);
                  for (
                    var n = sr.hashName(r.id, t), o = sr.nameTable[n];
                    o;
                    o = o.name_next
                  ) {
                    var i = o.name;
                    if (o.parent.id === r.id && i === t) return o;
                  }
                  return sr.lookup(r, t);
                },
                createNode: function (r, t, e, n) {
                  sr.FSNode ||
                    ((sr.FSNode = function (r, t, e, n) {
                      r || (r = this),
                        (this.parent = r),
                        (this.mount = r.mount),
                        (this.mounted = null),
                        (this.id = sr.nextInode++),
                        (this.name = t),
                        (this.mode = e),
                        (this.node_ops = {}),
                        (this.stream_ops = {}),
                        (this.rdev = n);
                    }),
                    (sr.FSNode.prototype = {}),
                    Object.defineProperties(sr.FSNode.prototype, {
                      read: {
                        get: function () {
                          return 365 == (365 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 365) : (this.mode &= -366);
                        },
                      },
                      write: {
                        get: function () {
                          return 146 == (146 & this.mode);
                        },
                        set: function (r) {
                          r ? (this.mode |= 146) : (this.mode &= -147);
                        },
                      },
                      isFolder: {
                        get: function () {
                          return sr.isDir(this.mode);
                        },
                      },
                      isDevice: {
                        get: function () {
                          return sr.isChrdev(this.mode);
                        },
                      },
                    }));
                  var o = new sr.FSNode(r, t, e, n);
                  return sr.hashAddNode(o), o;
                },
                destroyNode: function (r) {
                  sr.hashRemoveNode(r);
                },
                isRoot: function (r) {
                  return r === r.parent;
                },
                isMountpoint: function (r) {
                  return !!r.mounted;
                },
                isFile: function (r) {
                  return 32768 == (61440 & r);
                },
                isDir: function (r) {
                  return 16384 == (61440 & r);
                },
                isLink: function (r) {
                  return 40960 == (61440 & r);
                },
                isChrdev: function (r) {
                  return 8192 == (61440 & r);
                },
                isBlkdev: function (r) {
                  return 24576 == (61440 & r);
                },
                isFIFO: function (r) {
                  return 4096 == (61440 & r);
                },
                isSocket: function (r) {
                  return 49152 == (49152 & r);
                },
                flagModes: {
                  r: 0,
                  rs: 1052672,
                  'r+': 2,
                  w: 577,
                  wx: 705,
                  xw: 705,
                  'w+': 578,
                  'wx+': 706,
                  'xw+': 706,
                  a: 1089,
                  ax: 1217,
                  xa: 1217,
                  'a+': 1090,
                  'ax+': 1218,
                  'xa+': 1218,
                },
                modeStringToFlags: function (r) {
                  var t = sr.flagModes[r];
                  if (void 0 === t)
                    throw new Error('Unknown file open mode: ' + r);
                  return t;
                },
                flagsToPermissionString: function (r) {
                  var t = ['r', 'w', 'rw'][3 & r];
                  return 512 & r && (t += 'w'), t;
                },
                nodePermissions: function (r, t) {
                  return sr.ignorePermissions ||
                    ((-1 === t.indexOf('r') || 292 & r.mode) &&
                      (-1 === t.indexOf('w') || 146 & r.mode) &&
                      (-1 === t.indexOf('x') || 73 & r.mode))
                    ? 0
                    : 2;
                },
                mayLookup: function (r) {
                  var t = sr.nodePermissions(r, 'x');
                  return t || (r.node_ops.lookup ? 0 : 2);
                },
                mayCreate: function (r, t) {
                  try {
                    return sr.lookupNode(r, t), 20;
                  } catch (r) {}
                  return sr.nodePermissions(r, 'wx');
                },
                mayDelete: function (r, t, e) {
                  var n;
                  try {
                    n = sr.lookupNode(r, t);
                  } catch (r) {
                    return r.errno;
                  }
                  var o = sr.nodePermissions(r, 'wx');
                  if (o) return o;
                  if (e) {
                    if (!sr.isDir(n.mode)) return 54;
                    if (sr.isRoot(n) || sr.getPath(n) === sr.cwd()) return 10;
                  } else if (sr.isDir(n.mode)) return 31;
                  return 0;
                },
                mayOpen: function (r, t) {
                  return r
                    ? sr.isLink(r.mode)
                      ? 32
                      : sr.isDir(r.mode) &&
                        ('r' !== sr.flagsToPermissionString(t) || 512 & t)
                      ? 31
                      : sr.nodePermissions(r, sr.flagsToPermissionString(t))
                    : 44;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (r, t) {
                  (r = r || 0), (t = t || sr.MAX_OPEN_FDS);
                  for (var e = r; e <= t; e++) if (!sr.streams[e]) return e;
                  throw new sr.ErrnoError(33);
                },
                getStream: function (r) {
                  return sr.streams[r];
                },
                createStream: function (r, t, e) {
                  sr.FSStream ||
                    ((sr.FSStream = function () {}),
                    (sr.FSStream.prototype = {}),
                    Object.defineProperties(sr.FSStream.prototype, {
                      object: {
                        get: function () {
                          return this.node;
                        },
                        set: function (r) {
                          this.node = r;
                        },
                      },
                      isRead: {
                        get: function () {
                          return 1 != (2097155 & this.flags);
                        },
                      },
                      isWrite: {
                        get: function () {
                          return 0 != (2097155 & this.flags);
                        },
                      },
                      isAppend: {
                        get: function () {
                          return 1024 & this.flags;
                        },
                      },
                    }));
                  var n = new sr.FSStream();
                  for (var o in r) n[o] = r[o];
                  r = n;
                  var i = sr.nextfd(t, e);
                  return (r.fd = i), (sr.streams[i] = r), r;
                },
                closeStream: function (r) {
                  sr.streams[r] = null;
                },
                chrdev_stream_ops: {
                  open: function (r) {
                    var t = sr.getDevice(r.node.rdev);
                    (r.stream_ops = t.stream_ops),
                      r.stream_ops.open && r.stream_ops.open(r);
                  },
                  llseek: function () {
                    throw new sr.ErrnoError(70);
                  },
                },
                major: function (r) {
                  return r >> 8;
                },
                minor: function (r) {
                  return 255 & r;
                },
                makedev: function (r, t) {
                  return (r << 8) | t;
                },
                registerDevice: function (r, t) {
                  sr.devices[r] = { stream_ops: t };
                },
                getDevice: function (r) {
                  return sr.devices[r];
                },
                getMounts: function (r) {
                  for (var t = [], e = [r]; e.length; ) {
                    var n = e.pop();
                    t.push(n), e.push.apply(e, n.mounts);
                  }
                  return t;
                },
                syncfs: function (r, t) {
                  'function' == typeof r && ((t = r), (r = !1)),
                    sr.syncFSRequests++,
                    sr.syncFSRequests > 1 &&
                      f(
                        'warning: ' +
                          sr.syncFSRequests +
                          ' FS.syncfs operations in flight at once, probably just doing extra work',
                      );
                  var e = sr.getMounts(sr.root.mount),
                    n = 0;
                  function o(r) {
                    return sr.syncFSRequests--, t(r);
                  }
                  function i(r) {
                    if (r) return i.errored ? void 0 : ((i.errored = !0), o(r));
                    ++n >= e.length && o(null);
                  }
                  e.forEach(function (t) {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, r, i);
                  });
                },
                mount: function (r, t, e) {
                  var n,
                    o = '/' === e,
                    i = !e;
                  if (o && sr.root) throw new sr.ErrnoError(10);
                  if (!o && !i) {
                    var a = sr.lookupPath(e, { follow_mount: !1 });
                    if (((e = a.path), (n = a.node), sr.isMountpoint(n)))
                      throw new sr.ErrnoError(10);
                    if (!sr.isDir(n.mode)) throw new sr.ErrnoError(54);
                  }
                  var s = { type: r, opts: t, mountpoint: e, mounts: [] },
                    u = r.mount(s);
                  return (
                    (u.mount = s),
                    (s.root = u),
                    o
                      ? (sr.root = u)
                      : n &&
                        ((n.mounted = s), n.mount && n.mount.mounts.push(s)),
                    u
                  );
                },
                unmount: function (r) {
                  var t = sr.lookupPath(r, { follow_mount: !1 });
                  if (!sr.isMountpoint(t.node)) throw new sr.ErrnoError(28);
                  var e = t.node,
                    n = e.mounted,
                    o = sr.getMounts(n);
                  Object.keys(sr.nameTable).forEach(function (r) {
                    for (var t = sr.nameTable[r]; t; ) {
                      var e = t.name_next;
                      -1 !== o.indexOf(t.mount) && sr.destroyNode(t), (t = e);
                    }
                  }),
                    (e.mounted = null);
                  var i = e.mount.mounts.indexOf(n);
                  e.mount.mounts.splice(i, 1);
                },
                lookup: function (r, t) {
                  return r.node_ops.lookup(r, t);
                },
                mknod: function (r, t, e) {
                  var n = sr.lookupPath(r, { parent: !0 }).node,
                    o = nr.basename(r);
                  if (!o || '.' === o || '..' === o)
                    throw new sr.ErrnoError(28);
                  var i = sr.mayCreate(n, o);
                  if (i) throw new sr.ErrnoError(i);
                  if (!n.node_ops.mknod) throw new sr.ErrnoError(63);
                  return n.node_ops.mknod(n, o, t, e);
                },
                create: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 438),
                    (t &= 4095),
                    (t |= 32768),
                    sr.mknod(r, t, 0)
                  );
                },
                mkdir: function (r, t) {
                  return (
                    (t = void 0 !== t ? t : 511),
                    (t &= 1023),
                    (t |= 16384),
                    sr.mknod(r, t, 0)
                  );
                },
                mkdirTree: function (r, t) {
                  for (var e = r.split('/'), n = '', o = 0; o < e.length; ++o)
                    if (e[o]) {
                      n += '/' + e[o];
                      try {
                        sr.mkdir(n, t);
                      } catch (r) {
                        if (20 != r.errno) throw r;
                      }
                    }
                },
                mkdev: function (r, t, e) {
                  return (
                    void 0 === e && ((e = t), (t = 438)),
                    (t |= 8192),
                    sr.mknod(r, t, e)
                  );
                },
                symlink: function (r, t) {
                  if (!or.resolve(r)) throw new sr.ErrnoError(44);
                  var e = sr.lookupPath(t, { parent: !0 }).node;
                  if (!e) throw new sr.ErrnoError(44);
                  var n = nr.basename(t),
                    o = sr.mayCreate(e, n);
                  if (o) throw new sr.ErrnoError(o);
                  if (!e.node_ops.symlink) throw new sr.ErrnoError(63);
                  return e.node_ops.symlink(e, n, r);
                },
                rename: function (r, t) {
                  var e,
                    n,
                    o = nr.dirname(r),
                    i = nr.dirname(t),
                    a = nr.basename(r),
                    s = nr.basename(t);
                  try {
                    (e = sr.lookupPath(r, { parent: !0 }).node),
                      (n = sr.lookupPath(t, { parent: !0 }).node);
                  } catch (r) {
                    throw new sr.ErrnoError(10);
                  }
                  if (!e || !n) throw new sr.ErrnoError(44);
                  if (e.mount !== n.mount) throw new sr.ErrnoError(75);
                  var u,
                    c = sr.lookupNode(e, a),
                    l = or.relative(r, i);
                  if ('.' !== l.charAt(0)) throw new sr.ErrnoError(28);
                  if ('.' !== (l = or.relative(t, o)).charAt(0))
                    throw new sr.ErrnoError(55);
                  try {
                    u = sr.lookupNode(n, s);
                  } catch (r) {}
                  if (c !== u) {
                    var d = sr.isDir(c.mode),
                      p = sr.mayDelete(e, a, d);
                    if (p) throw new sr.ErrnoError(p);
                    if ((p = u ? sr.mayDelete(n, s, d) : sr.mayCreate(n, s)))
                      throw new sr.ErrnoError(p);
                    if (!e.node_ops.rename) throw new sr.ErrnoError(63);
                    if (sr.isMountpoint(c) || (u && sr.isMountpoint(u)))
                      throw new sr.ErrnoError(10);
                    if (n !== e && (p = sr.nodePermissions(e, 'w')))
                      throw new sr.ErrnoError(p);
                    try {
                      sr.trackingDelegate.willMovePath &&
                        sr.trackingDelegate.willMovePath(r, t);
                    } catch (e) {
                      f(
                        "FS.trackingDelegate['willMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                    sr.hashRemoveNode(c);
                    try {
                      e.node_ops.rename(c, n, s);
                    } catch (r) {
                      throw r;
                    } finally {
                      sr.hashAddNode(c);
                    }
                    try {
                      sr.trackingDelegate.onMovePath &&
                        sr.trackingDelegate.onMovePath(r, t);
                    } catch (e) {
                      f(
                        "FS.trackingDelegate['onMovePath']('" +
                          r +
                          "', '" +
                          t +
                          "') threw an exception: " +
                          e.message,
                      );
                    }
                  }
                },
                rmdir: function (r) {
                  var t = sr.lookupPath(r, { parent: !0 }).node,
                    e = nr.basename(r),
                    n = sr.lookupNode(t, e),
                    o = sr.mayDelete(t, e, !0);
                  if (o) throw new sr.ErrnoError(o);
                  if (!t.node_ops.rmdir) throw new sr.ErrnoError(63);
                  if (sr.isMountpoint(n)) throw new sr.ErrnoError(10);
                  try {
                    sr.trackingDelegate.willDeletePath &&
                      sr.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.rmdir(t, e), sr.destroyNode(n);
                  try {
                    sr.trackingDelegate.onDeletePath &&
                      sr.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readdir: function (r) {
                  var t = sr.lookupPath(r, { follow: !0 }).node;
                  if (!t.node_ops.readdir) throw new sr.ErrnoError(54);
                  return t.node_ops.readdir(t);
                },
                unlink: function (r) {
                  var t = sr.lookupPath(r, { parent: !0 }).node,
                    e = nr.basename(r),
                    n = sr.lookupNode(t, e),
                    o = sr.mayDelete(t, e, !1);
                  if (o) throw new sr.ErrnoError(o);
                  if (!t.node_ops.unlink) throw new sr.ErrnoError(63);
                  if (sr.isMountpoint(n)) throw new sr.ErrnoError(10);
                  try {
                    sr.trackingDelegate.willDeletePath &&
                      sr.trackingDelegate.willDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['willDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  t.node_ops.unlink(t, e), sr.destroyNode(n);
                  try {
                    sr.trackingDelegate.onDeletePath &&
                      sr.trackingDelegate.onDeletePath(r);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onDeletePath']('" +
                        r +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                },
                readlink: function (r) {
                  var t = sr.lookupPath(r).node;
                  if (!t) throw new sr.ErrnoError(44);
                  if (!t.node_ops.readlink) throw new sr.ErrnoError(28);
                  return or.resolve(
                    sr.getPath(t.parent),
                    t.node_ops.readlink(t),
                  );
                },
                stat: function (r, t) {
                  var e = sr.lookupPath(r, { follow: !t }).node;
                  if (!e) throw new sr.ErrnoError(44);
                  if (!e.node_ops.getattr) throw new sr.ErrnoError(63);
                  return e.node_ops.getattr(e);
                },
                lstat: function (r) {
                  return sr.stat(r, !0);
                },
                chmod: function (r, t, e) {
                  var n;
                  if (
                    !(n =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !e }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  n.node_ops.setattr(n, {
                    mode: (4095 & t) | (-4096 & n.mode),
                    timestamp: Date.now(),
                  });
                },
                lchmod: function (r, t) {
                  sr.chmod(r, t, !0);
                },
                fchmod: function (r, t) {
                  var e = sr.getStream(r);
                  if (!e) throw new sr.ErrnoError(8);
                  sr.chmod(e.node, t);
                },
                chown: function (r, t, e, n) {
                  var o;
                  if (
                    !(o =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !n }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (r, t, e) {
                  sr.chown(r, t, e, !0);
                },
                fchown: function (r, t, e) {
                  var n = sr.getStream(r);
                  if (!n) throw new sr.ErrnoError(8);
                  sr.chown(n.node, t, e);
                },
                truncate: function (r, t) {
                  if (t < 0) throw new sr.ErrnoError(28);
                  var e;
                  if (
                    !(e =
                      'string' == typeof r
                        ? sr.lookupPath(r, { follow: !0 }).node
                        : r).node_ops.setattr
                  )
                    throw new sr.ErrnoError(63);
                  if (sr.isDir(e.mode)) throw new sr.ErrnoError(31);
                  if (!sr.isFile(e.mode)) throw new sr.ErrnoError(28);
                  var n = sr.nodePermissions(e, 'w');
                  if (n) throw new sr.ErrnoError(n);
                  e.node_ops.setattr(e, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (r, t) {
                  var e = sr.getStream(r);
                  if (!e) throw new sr.ErrnoError(8);
                  if (0 == (2097155 & e.flags)) throw new sr.ErrnoError(28);
                  sr.truncate(e.node, t);
                },
                utime: function (r, t, e) {
                  var n = sr.lookupPath(r, { follow: !0 }).node;
                  n.node_ops.setattr(n, { timestamp: Math.max(t, e) });
                },
                open: function (r, t, e, o, i) {
                  if ('' === r) throw new sr.ErrnoError(44);
                  var a;
                  if (
                    ((e = void 0 === e ? 438 : e),
                    (e =
                      64 &
                      (t = 'string' == typeof t ? sr.modeStringToFlags(t) : t)
                        ? (4095 & e) | 32768
                        : 0),
                    'object' == typeof r)
                  )
                    a = r;
                  else {
                    r = nr.normalize(r);
                    try {
                      a = sr.lookupPath(r, { follow: !(131072 & t) }).node;
                    } catch (r) {}
                  }
                  var s = !1;
                  if (64 & t)
                    if (a) {
                      if (128 & t) throw new sr.ErrnoError(20);
                    } else (a = sr.mknod(r, e, 0)), (s = !0);
                  if (!a) throw new sr.ErrnoError(44);
                  if (
                    (sr.isChrdev(a.mode) && (t &= -513),
                    65536 & t && !sr.isDir(a.mode))
                  )
                    throw new sr.ErrnoError(54);
                  if (!s) {
                    var u = sr.mayOpen(a, t);
                    if (u) throw new sr.ErrnoError(u);
                  }
                  512 & t && sr.truncate(a, 0), (t &= -641);
                  var c = sr.createStream(
                    {
                      node: a,
                      path: sr.getPath(a),
                      flags: t,
                      seekable: !0,
                      position: 0,
                      stream_ops: a.stream_ops,
                      ungotten: [],
                      error: !1,
                    },
                    o,
                    i,
                  );
                  c.stream_ops.open && c.stream_ops.open(c),
                    !n.logReadFiles ||
                      1 & t ||
                      (sr.readFiles || (sr.readFiles = {}),
                      r in sr.readFiles ||
                        ((sr.readFiles[r] = 1),
                        f('FS.trackingDelegate error on read file: ' + r)));
                  try {
                    if (sr.trackingDelegate.onOpenFile) {
                      var l = 0;
                      1 != (2097155 & t) && (l |= sr.tracking.openFlags.READ),
                        0 != (2097155 & t) &&
                          (l |= sr.tracking.openFlags.WRITE),
                        sr.trackingDelegate.onOpenFile(r, l);
                    }
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onOpenFile']('" +
                        r +
                        "', flags) threw an exception: " +
                        t.message,
                    );
                  }
                  return c;
                },
                close: function (r) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  r.getdents && (r.getdents = null);
                  try {
                    r.stream_ops.close && r.stream_ops.close(r);
                  } catch (r) {
                    throw r;
                  } finally {
                    sr.closeStream(r.fd);
                  }
                  r.fd = null;
                },
                isClosed: function (r) {
                  return null === r.fd;
                },
                llseek: function (r, t, e) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (!r.seekable || !r.stream_ops.llseek)
                    throw new sr.ErrnoError(70);
                  if (0 != e && 1 != e && 2 != e) throw new sr.ErrnoError(28);
                  return (
                    (r.position = r.stream_ops.llseek(r, t, e)),
                    (r.ungotten = []),
                    r.position
                  );
                },
                read: function (r, t, e, n, o) {
                  if (n < 0 || o < 0) throw new sr.ErrnoError(28);
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (1 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (sr.isDir(r.node.mode)) throw new sr.ErrnoError(31);
                  if (!r.stream_ops.read) throw new sr.ErrnoError(28);
                  var i = void 0 !== o;
                  if (i) {
                    if (!r.seekable) throw new sr.ErrnoError(70);
                  } else o = r.position;
                  var a = r.stream_ops.read(r, t, e, n, o);
                  return i || (r.position += a), a;
                },
                write: function (r, t, e, n, o, i) {
                  if (n < 0 || o < 0) throw new sr.ErrnoError(28);
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (0 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (sr.isDir(r.node.mode)) throw new sr.ErrnoError(31);
                  if (!r.stream_ops.write) throw new sr.ErrnoError(28);
                  1024 & r.flags && sr.llseek(r, 0, 2);
                  var a = void 0 !== o;
                  if (a) {
                    if (!r.seekable) throw new sr.ErrnoError(70);
                  } else o = r.position;
                  var s = r.stream_ops.write(r, t, e, n, o, i);
                  a || (r.position += s);
                  try {
                    r.path &&
                      sr.trackingDelegate.onWriteToFile &&
                      sr.trackingDelegate.onWriteToFile(r.path);
                  } catch (t) {
                    f(
                      "FS.trackingDelegate['onWriteToFile']('" +
                        r.path +
                        "') threw an exception: " +
                        t.message,
                    );
                  }
                  return s;
                },
                allocate: function (r, t, e) {
                  if (sr.isClosed(r)) throw new sr.ErrnoError(8);
                  if (t < 0 || e <= 0) throw new sr.ErrnoError(28);
                  if (0 == (2097155 & r.flags)) throw new sr.ErrnoError(8);
                  if (!sr.isFile(r.node.mode) && !sr.isDir(r.node.mode))
                    throw new sr.ErrnoError(43);
                  if (!r.stream_ops.allocate) throw new sr.ErrnoError(138);
                  r.stream_ops.allocate(r, t, e);
                },
                mmap: function (r, t, e, n, o, i, a) {
                  if (0 != (2 & i) && 0 == (2 & a) && 2 != (2097155 & r.flags))
                    throw new sr.ErrnoError(2);
                  if (1 == (2097155 & r.flags)) throw new sr.ErrnoError(2);
                  if (!r.stream_ops.mmap) throw new sr.ErrnoError(43);
                  return r.stream_ops.mmap(r, t, e, n, o, i, a);
                },
                msync: function (r, t, e, n, o) {
                  return r && r.stream_ops.msync
                    ? r.stream_ops.msync(r, t, e, n, o)
                    : 0;
                },
                munmap: function (r) {
                  return 0;
                },
                ioctl: function (r, t, e) {
                  if (!r.stream_ops.ioctl) throw new sr.ErrnoError(59);
                  return r.stream_ops.ioctl(r, t, e);
                },
                readFile: function (r, t) {
                  if (
                    (((t = t || {}).flags = t.flags || 'r'),
                    (t.encoding = t.encoding || 'binary'),
                    'utf8' !== t.encoding && 'binary' !== t.encoding)
                  )
                    throw new Error(
                      'Invalid encoding type "' + t.encoding + '"',
                    );
                  var e,
                    n = sr.open(r, t.flags),
                    o = sr.stat(r).size,
                    i = new Uint8Array(o);
                  return (
                    sr.read(n, i, 0, o, 0),
                    'utf8' === t.encoding
                      ? (e = F(i, 0))
                      : 'binary' === t.encoding && (e = i),
                    sr.close(n),
                    e
                  );
                },
                writeFile: function (r, t, e) {
                  (e = e || {}).flags = e.flags || 'w';
                  var n = sr.open(r, e.flags, e.mode);
                  if ('string' == typeof t) {
                    var o = new Uint8Array(A(t) + 1),
                      i = x(t, o, 0, o.length);
                    sr.write(n, o, 0, i, void 0, e.canOwn);
                  } else {
                    if (!ArrayBuffer.isView(t))
                      throw new Error('Unsupported data type');
                    sr.write(n, t, 0, t.byteLength, void 0, e.canOwn);
                  }
                  sr.close(n);
                },
                cwd: function () {
                  return sr.currentPath;
                },
                chdir: function (r) {
                  var t = sr.lookupPath(r, { follow: !0 });
                  if (null === t.node) throw new sr.ErrnoError(44);
                  if (!sr.isDir(t.node.mode)) throw new sr.ErrnoError(54);
                  var e = sr.nodePermissions(t.node, 'x');
                  if (e) throw new sr.ErrnoError(e);
                  sr.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                  sr.mkdir('/tmp'),
                    sr.mkdir('/home'),
                    sr.mkdir('/home/web_user');
                },
                createDefaultDevices: function () {
                  var r;
                  if (
                    (sr.mkdir('/dev'),
                    sr.registerDevice(sr.makedev(1, 3), {
                      read: function () {
                        return 0;
                      },
                      write: function (r, t, e, n, o) {
                        return n;
                      },
                    }),
                    sr.mkdev('/dev/null', sr.makedev(1, 3)),
                    ir.register(sr.makedev(5, 0), ir.default_tty_ops),
                    ir.register(sr.makedev(6, 0), ir.default_tty1_ops),
                    sr.mkdev('/dev/tty', sr.makedev(5, 0)),
                    sr.mkdev('/dev/tty1', sr.makedev(6, 0)),
                    'object' == typeof crypto &&
                      'function' == typeof crypto.getRandomValues)
                  ) {
                    var t = new Uint8Array(1);
                    r = function () {
                      return crypto.getRandomValues(t), t[0];
                    };
                  }
                  r ||
                    (r = function () {
                      J('random_device');
                    }),
                    sr.createDevice('/dev', 'random', r),
                    sr.createDevice('/dev', 'urandom', r),
                    sr.mkdir('/dev/shm'),
                    sr.mkdir('/dev/shm/tmp');
                },
                createSpecialDirectories: function () {
                  sr.mkdir('/proc'),
                    sr.mkdir('/proc/self'),
                    sr.mkdir('/proc/self/fd'),
                    sr.mount(
                      {
                        mount: function () {
                          var r = sr.createNode('/proc/self', 'fd', 16895, 73);
                          return (
                            (r.node_ops = {
                              lookup: function (r, t) {
                                var e = +t,
                                  n = sr.getStream(e);
                                if (!n) throw new sr.ErrnoError(8);
                                var o = {
                                  parent: null,
                                  mount: { mountpoint: 'fake' },
                                  node_ops: {
                                    readlink: function () {
                                      return n.path;
                                    },
                                  },
                                };
                                return (o.parent = o), o;
                              },
                            }),
                            r
                          );
                        },
                      },
                      {},
                      '/proc/self/fd',
                    );
                },
                createStandardStreams: function () {
                  n.stdin
                    ? sr.createDevice('/dev', 'stdin', n.stdin)
                    : sr.symlink('/dev/tty', '/dev/stdin'),
                    n.stdout
                      ? sr.createDevice('/dev', 'stdout', null, n.stdout)
                      : sr.symlink('/dev/tty', '/dev/stdout'),
                    n.stderr
                      ? sr.createDevice('/dev', 'stderr', null, n.stderr)
                      : sr.symlink('/dev/tty1', '/dev/stderr'),
                    sr.open('/dev/stdin', 'r'),
                    sr.open('/dev/stdout', 'w'),
                    sr.open('/dev/stderr', 'w');
                },
                ensureErrnoError: function () {
                  sr.ErrnoError ||
                    ((sr.ErrnoError = function (r, t) {
                      (this.node = t),
                        (this.setErrno = function (r) {
                          this.errno = r;
                        }),
                        this.setErrno(r),
                        (this.message = 'FS error');
                    }),
                    (sr.ErrnoError.prototype = new Error()),
                    (sr.ErrnoError.prototype.constructor = sr.ErrnoError),
                    [44].forEach(function (r) {
                      (sr.genericErrors[r] = new sr.ErrnoError(r)),
                        (sr.genericErrors[r].stack =
                          '<generic error, no stack>');
                    }));
                },
                staticInit: function () {
                  sr.ensureErrnoError(),
                    (sr.nameTable = new Array(4096)),
                    sr.mount(ar, {}, '/'),
                    sr.createDefaultDirectories(),
                    sr.createDefaultDevices(),
                    sr.createSpecialDirectories(),
                    (sr.filesystems = { MEMFS: ar });
                },
                init: function (r, t, e) {
                  (sr.init.initialized = !0),
                    sr.ensureErrnoError(),
                    (n.stdin = r || n.stdin),
                    (n.stdout = t || n.stdout),
                    (n.stderr = e || n.stderr),
                    sr.createStandardStreams();
                },
                quit: function () {
                  sr.init.initialized = !1;
                  var r = n._fflush;
                  r && r(0);
                  for (var t = 0; t < sr.streams.length; t++) {
                    var e = sr.streams[t];
                    e && sr.close(e);
                  }
                },
                getMode: function (r, t) {
                  var e = 0;
                  return r && (e |= 365), t && (e |= 146), e;
                },
                joinPath: function (r, t) {
                  var e = nr.join.apply(null, r);
                  return t && '/' == e[0] && (e = e.substr(1)), e;
                },
                absolutePath: function (r, t) {
                  return or.resolve(t, r);
                },
                standardizePath: function (r) {
                  return nr.normalize(r);
                },
                findObject: function (r, t) {
                  var e = sr.analyzePath(r, t);
                  return e.exists ? e.object : (er(e.error), null);
                },
                analyzePath: function (r, t) {
                  try {
                    r = (n = sr.lookupPath(r, { follow: !t })).path;
                  } catch (r) {}
                  var e = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null,
                  };
                  try {
                    var n = sr.lookupPath(r, { parent: !0 });
                    (e.parentExists = !0),
                      (e.parentPath = n.path),
                      (e.parentObject = n.node),
                      (e.name = nr.basename(r)),
                      (n = sr.lookupPath(r, { follow: !t })),
                      (e.exists = !0),
                      (e.path = n.path),
                      (e.object = n.node),
                      (e.name = n.node.name),
                      (e.isRoot = '/' === n.path);
                  } catch (r) {
                    e.error = r.errno;
                  }
                  return e;
                },
                createFolder: function (r, t, e, n) {
                  var o = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    i = sr.getMode(e, n);
                  return sr.mkdir(o, i);
                },
                createPath: function (r, t, e, n) {
                  r = 'string' == typeof r ? r : sr.getPath(r);
                  for (var o = t.split('/').reverse(); o.length; ) {
                    var i = o.pop();
                    if (i) {
                      var a = nr.join2(r, i);
                      try {
                        sr.mkdir(a);
                      } catch (r) {}
                      r = a;
                    }
                  }
                  return a;
                },
                createFile: function (r, t, e, n, o) {
                  var i = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    a = sr.getMode(n, o);
                  return sr.create(i, a);
                },
                createDataFile: function (r, t, e, n, o, i) {
                  var a = t
                      ? nr.join2('string' == typeof r ? r : sr.getPath(r), t)
                      : r,
                    s = sr.getMode(n, o),
                    u = sr.create(a, s);
                  if (e) {
                    if ('string' == typeof e) {
                      for (
                        var c = new Array(e.length), f = 0, l = e.length;
                        f < l;
                        ++f
                      )
                        c[f] = e.charCodeAt(f);
                      e = c;
                    }
                    sr.chmod(u, 146 | s);
                    var d = sr.open(u, 'w');
                    sr.write(d, e, 0, e.length, 0, i),
                      sr.close(d),
                      sr.chmod(u, s);
                  }
                  return u;
                },
                createDevice: function (r, t, e, n) {
                  var o = nr.join2('string' == typeof r ? r : sr.getPath(r), t),
                    i = sr.getMode(!!e, !!n);
                  sr.createDevice.major || (sr.createDevice.major = 64);
                  var a = sr.makedev(sr.createDevice.major++, 0);
                  return (
                    sr.registerDevice(a, {
                      open: function (r) {
                        r.seekable = !1;
                      },
                      close: function (r) {
                        n && n.buffer && n.buffer.length && n(10);
                      },
                      read: function (r, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                          var u;
                          try {
                            u = e();
                          } catch (r) {
                            throw new sr.ErrnoError(29);
                          }
                          if (void 0 === u && 0 === a)
                            throw new sr.ErrnoError(6);
                          if (null == u) break;
                          a++, (t[n + s] = u);
                        }
                        return a && (r.node.timestamp = Date.now()), a;
                      },
                      write: function (r, t, e, o, i) {
                        for (var a = 0; a < o; a++)
                          try {
                            n(t[e + a]);
                          } catch (r) {
                            throw new sr.ErrnoError(29);
                          }
                        return o && (r.node.timestamp = Date.now()), a;
                      },
                    }),
                    sr.mkdev(o, i, a)
                  );
                },
                createLink: function (r, t, e, n, o) {
                  var i = nr.join2('string' == typeof r ? r : sr.getPath(r), t);
                  return sr.symlink(e, i);
                },
                forceLoadFile: function (r) {
                  if (r.isDevice || r.isFolder || r.link || r.contents)
                    return !0;
                  var t = !0;
                  if ('undefined' != typeof XMLHttpRequest)
                    throw new Error(
                      'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.',
                    );
                  if (!i)
                    throw new Error(
                      'Cannot load without read() or XMLHttpRequest.',
                    );
                  try {
                    (r.contents = kr(i(r.url), !0)),
                      (r.usedBytes = r.contents.length);
                  } catch (r) {
                    t = !1;
                  }
                  return t || er(29), t;
                },
                createLazyFile: function (r, t, e, n, o) {
                  function i() {
                    (this.lengthKnown = !1), (this.chunks = []);
                  }
                  if (
                    ((i.prototype.get = function (r) {
                      if (!(r > this.length - 1 || r < 0)) {
                        var t = r % this.chunkSize,
                          e = (r / this.chunkSize) | 0;
                        return this.getter(e)[t];
                      }
                    }),
                    (i.prototype.setDataGetter = function (r) {
                      this.getter = r;
                    }),
                    (i.prototype.cacheLength = function () {
                      var r = new XMLHttpRequest();
                      if (
                        (r.open('HEAD', e, !1),
                        r.send(null),
                        !(
                          (r.status >= 200 && r.status < 300) ||
                          304 === r.status
                        ))
                      )
                        throw new Error(
                          "Couldn't load " + e + '. Status: ' + r.status,
                        );
                      var t,
                        n = Number(r.getResponseHeader('Content-length')),
                        o =
                          (t = r.getResponseHeader('Accept-Ranges')) &&
                          'bytes' === t,
                        i =
                          (t = r.getResponseHeader('Content-Encoding')) &&
                          'gzip' === t,
                        a = 1048576;
                      o || (a = n);
                      var s = this;
                      s.setDataGetter(function (r) {
                        var t = r * a,
                          o = (r + 1) * a - 1;
                        if (
                          ((o = Math.min(o, n - 1)),
                          void 0 === s.chunks[r] &&
                            (s.chunks[r] = (function (r, t) {
                              if (r > t)
                                throw new Error(
                                  'invalid range (' +
                                    r +
                                    ', ' +
                                    t +
                                    ') or no bytes requested!',
                                );
                              if (t > n - 1)
                                throw new Error(
                                  'only ' +
                                    n +
                                    ' bytes available! programmer error!',
                                );
                              var o = new XMLHttpRequest();
                              if (
                                (o.open('GET', e, !1),
                                n !== a &&
                                  o.setRequestHeader(
                                    'Range',
                                    'bytes=' + r + '-' + t,
                                  ),
                                'undefined' != typeof Uint8Array &&
                                  (o.responseType = 'arraybuffer'),
                                o.overrideMimeType &&
                                  o.overrideMimeType(
                                    'text/plain; charset=x-user-defined',
                                  ),
                                o.send(null),
                                !(
                                  (o.status >= 200 && o.status < 300) ||
                                  304 === o.status
                                ))
                              )
                                throw new Error(
                                  "Couldn't load " +
                                    e +
                                    '. Status: ' +
                                    o.status,
                                );
                              return void 0 !== o.response
                                ? new Uint8Array(o.response || [])
                                : kr(o.responseText || '', !0);
                            })(t, o)),
                          void 0 === s.chunks[r])
                        )
                          throw new Error('doXHR failed!');
                        return s.chunks[r];
                      }),
                        (!i && n) ||
                          ((a = n = 1),
                          (n = this.getter(0).length),
                          (a = n),
                          c(
                            'LazyFiles on gzip forces download of the whole file when length is accessed',
                          )),
                        (this._length = n),
                        (this._chunkSize = a),
                        (this.lengthKnown = !0);
                    }),
                    'undefined' != typeof XMLHttpRequest)
                  )
                    throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
                  var a = { isDevice: !1, url: e },
                    s = sr.createFile(r, t, a, n, o);
                  a.contents
                    ? (s.contents = a.contents)
                    : a.url && ((s.contents = null), (s.url = a.url)),
                    Object.defineProperties(s, {
                      usedBytes: {
                        get: function () {
                          return this.contents.length;
                        },
                      },
                    });
                  var u = {};
                  return (
                    Object.keys(s.stream_ops).forEach(function (r) {
                      var t = s.stream_ops[r];
                      u[r] = function () {
                        if (!sr.forceLoadFile(s)) throw new sr.ErrnoError(29);
                        return t.apply(null, arguments);
                      };
                    }),
                    (u.read = function (r, t, e, n, o) {
                      if (!sr.forceLoadFile(s)) throw new sr.ErrnoError(29);
                      var i = r.node.contents;
                      if (o >= i.length) return 0;
                      var a = Math.min(i.length - o, n);
                      if (i.slice)
                        for (var u = 0; u < a; u++) t[e + u] = i[o + u];
                      else for (u = 0; u < a; u++) t[e + u] = i.get(o + u);
                      return a;
                    }),
                    (s.stream_ops = u),
                    s
                  );
                },
                createPreloadedFile: function (r, t, e, o, i, a, s, u, c, f) {
                  Browser.init();
                  var l = t ? or.resolve(nr.join2(r, t)) : r;
                  function d(e) {
                    function d(e) {
                      f && f(),
                        u || sr.createDataFile(r, t, e, o, i, c),
                        a && a(),
                        Y();
                    }
                    var p = !1;
                    n.preloadPlugins.forEach(function (r) {
                      p ||
                        (r.canHandle(l) &&
                          (r.handle(e, l, d, function () {
                            s && s(), Y();
                          }),
                          (p = !0)));
                    }),
                      p || d(e);
                  }
                  q(),
                    'string' == typeof e
                      ? Browser.asyncLoad(
                          e,
                          function (r) {
                            d(r);
                          },
                          s,
                        )
                      : d(e);
                },
                indexedDB: function () {
                  return (
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB
                  );
                },
                DB_NAME: function () {
                  return 'EM_FS_' + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: 'FILE_DATA',
                saveFilesToDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = sr.indexedDB();
                  try {
                    var o = n.open(sr.DB_NAME(), sr.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = function () {
                    c('creating db'),
                      o.result.createObjectStore(sr.DB_STORE_NAME);
                  }),
                    (o.onsuccess = function () {
                      var n = o.result.transaction(
                          [sr.DB_STORE_NAME],
                          'readwrite',
                        ),
                        i = n.objectStore(sr.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        u = r.length;
                      function c() {
                        0 == s ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = i.put(sr.analyzePath(r).object.contents, r);
                        (t.onsuccess = function () {
                          ++a + s == u && c();
                        }),
                          (t.onerror = function () {
                            s++, a + s == u && c();
                          });
                      }),
                        (n.onerror = e);
                    }),
                    (o.onerror = e);
                },
                loadFilesFromDB: function (r, t, e) {
                  (t = t || function () {}), (e = e || function () {});
                  var n = sr.indexedDB();
                  try {
                    var o = n.open(sr.DB_NAME(), sr.DB_VERSION);
                  } catch (r) {
                    return e(r);
                  }
                  (o.onupgradeneeded = e),
                    (o.onsuccess = function () {
                      var n = o.result;
                      try {
                        var i = n.transaction([sr.DB_STORE_NAME], 'readonly');
                      } catch (r) {
                        return void e(r);
                      }
                      var a = i.objectStore(sr.DB_STORE_NAME),
                        s = 0,
                        u = 0,
                        c = r.length;
                      function f() {
                        0 == u ? t() : e();
                      }
                      r.forEach(function (r) {
                        var t = a.get(r);
                        (t.onsuccess = function () {
                          sr.analyzePath(r).exists && sr.unlink(r),
                            sr.createDataFile(
                              nr.dirname(r),
                              nr.basename(r),
                              t.result,
                              !0,
                              !0,
                              !0,
                            ),
                            ++s + u == c && f();
                        }),
                          (t.onerror = function () {
                            u++, s + u == c && f();
                          });
                      }),
                        (i.onerror = e);
                    }),
                    (o.onerror = e);
                },
              },
              ur = {
                DEFAULT_POLLMASK: 5,
                mappings: {},
                umask: 511,
                calculateAt: function (r, t) {
                  if ('/' !== t[0]) {
                    var e;
                    if (-100 === r) e = sr.cwd();
                    else {
                      var n = sr.getStream(r);
                      if (!n) throw new sr.ErrnoError(8);
                      e = n.path;
                    }
                    t = nr.join2(e, t);
                  }
                  return t;
                },
                doStat: function (r, t, e) {
                  try {
                    var n = r(t);
                  } catch (r) {
                    if (
                      r &&
                      r.node &&
                      nr.normalize(t) !== nr.normalize(sr.getPath(r.node))
                    )
                      return -54;
                    throw r;
                  }
                  return (
                    (b[e >> 2] = n.dev),
                    (b[(e + 4) >> 2] = 0),
                    (b[(e + 8) >> 2] = n.ino),
                    (b[(e + 12) >> 2] = n.mode),
                    (b[(e + 16) >> 2] = n.nlink),
                    (b[(e + 20) >> 2] = n.uid),
                    (b[(e + 24) >> 2] = n.gid),
                    (b[(e + 28) >> 2] = n.rdev),
                    (b[(e + 32) >> 2] = 0),
                    (Z = [
                      n.size >>> 0,
                      ((G = n.size),
                      +N(G) >= 1
                        ? G > 0
                          ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                          : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (b[(e + 40) >> 2] = Z[0]),
                    (b[(e + 44) >> 2] = Z[1]),
                    (b[(e + 48) >> 2] = 4096),
                    (b[(e + 52) >> 2] = n.blocks),
                    (b[(e + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                    (b[(e + 60) >> 2] = 0),
                    (b[(e + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                    (b[(e + 68) >> 2] = 0),
                    (b[(e + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                    (b[(e + 76) >> 2] = 0),
                    (Z = [
                      n.ino >>> 0,
                      ((G = n.ino),
                      +N(G) >= 1
                        ? G > 0
                          ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                          : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                        : 0),
                    ]),
                    (b[(e + 80) >> 2] = Z[0]),
                    (b[(e + 84) >> 2] = Z[1]),
                    0
                  );
                },
                doMsync: function (r, t, e, n, o) {
                  var i = E.slice(r, r + e);
                  sr.msync(t, i, o, e, n);
                },
                doMkdir: function (r, t) {
                  return (
                    '/' === (r = nr.normalize(r))[r.length - 1] &&
                      (r = r.substr(0, r.length - 1)),
                    sr.mkdir(r, t, 0),
                    0
                  );
                },
                doMknod: function (r, t, e) {
                  switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                      break;
                    default:
                      return -28;
                  }
                  return sr.mknod(r, t, e), 0;
                },
                doReadlink: function (r, t, e) {
                  if (e <= 0) return -28;
                  var n = sr.readlink(r),
                    o = Math.min(e, A(n)),
                    i = g[t + o];
                  return x(n, E, t, e + 1), (g[t + o] = i), o;
                },
                doAccess: function (r, t) {
                  if (-8 & t) return -28;
                  var e;
                  if (!(e = sr.lookupPath(r, { follow: !0 }).node)) return -44;
                  var n = '';
                  return (
                    4 & t && (n += 'r'),
                    2 & t && (n += 'w'),
                    1 & t && (n += 'x'),
                    n && sr.nodePermissions(e, n) ? -2 : 0
                  );
                },
                doDup: function (r, t, e) {
                  var n = sr.getStream(e);
                  return n && sr.close(n), sr.open(r, t, 0, e, e).fd;
                },
                doReadv: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = b[(t + 8 * i) >> 2],
                      s = b[(t + (8 * i + 4)) >> 2],
                      u = sr.read(r, g, a, s, n);
                    if (u < 0) return -1;
                    if (((o += u), u < s)) break;
                  }
                  return o;
                },
                doWritev: function (r, t, e, n) {
                  for (var o = 0, i = 0; i < e; i++) {
                    var a = b[(t + 8 * i) >> 2],
                      s = b[(t + (8 * i + 4)) >> 2],
                      u = sr.write(r, g, a, s, n);
                    if (u < 0) return -1;
                    o += u;
                  }
                  return o;
                },
                varargs: 0,
                get: function (r) {
                  return (ur.varargs += 4), b[(ur.varargs - 4) >> 2];
                },
                getStr: function () {
                  return P(ur.get());
                },
                getStreamFromFD: function (r) {
                  void 0 === r && (r = ur.get());
                  var t = sr.getStream(r);
                  if (!t) throw new sr.ErrnoError(8);
                  return t;
                },
                get64: function () {
                  var r = ur.get();
                  return ur.get(), r;
                },
                getZero: function () {
                  ur.get();
                },
              };
            function cr(r, t, e) {
              t |= 0;
              var n,
                o = 0,
                i = 0,
                a = 0;
              if (
                ((n = ((r |= 0) + (e |= 0)) | 0), (t &= 255), (0 | e) >= 67)
              ) {
                for (; 0 != (3 & r); ) (g[r >> 0] = t), (r = (r + 1) | 0);
                for (
                  a = t | (t << 8) | (t << 16) | (t << 24),
                    i = ((o = (-4 & n) | 0) - 64) | 0;
                  (0 | r) <= (0 | i);

                )
                  (b[r >> 2] = a),
                    (b[(r + 4) >> 2] = a),
                    (b[(r + 8) >> 2] = a),
                    (b[(r + 12) >> 2] = a),
                    (b[(r + 16) >> 2] = a),
                    (b[(r + 20) >> 2] = a),
                    (b[(r + 24) >> 2] = a),
                    (b[(r + 28) >> 2] = a),
                    (b[(r + 32) >> 2] = a),
                    (b[(r + 36) >> 2] = a),
                    (b[(r + 40) >> 2] = a),
                    (b[(r + 44) >> 2] = a),
                    (b[(r + 48) >> 2] = a),
                    (b[(r + 52) >> 2] = a),
                    (b[(r + 56) >> 2] = a),
                    (b[(r + 60) >> 2] = a),
                    (r = (r + 64) | 0);
                for (; (0 | r) < (0 | o); ) (b[r >> 2] = a), (r = (r + 4) | 0);
              }
              for (; (0 | r) < (0 | n); ) (g[r >> 0] = t), (r = (r + 1) | 0);
              return (n - e) | 0;
            }
            var fr = 42,
              lr = 0;
            function dr(r) {
              try {
                return p.grow((r - w.byteLength + 65535) >> 16), M(p.buffer), 1;
              } catch (r) {}
            }
            var pr = {};
            function mr() {
              if (!mr.strings) {
                var r = {
                  USER: 'web_user',
                  LOGNAME: 'web_user',
                  PATH: '/',
                  PWD: '/',
                  HOME: '/home/web_user',
                  LANG:
                    (
                      ('object' == typeof navigator &&
                        navigator.languages &&
                        navigator.languages[0]) ||
                      'C'
                    ).replace('-', '_') + '.UTF-8',
                  _: a || './this.program',
                };
                for (var t in pr) r[t] = pr[t];
                var e = [];
                for (var t in r) e.push(t + '=' + r[t]);
                mr.strings = e;
              }
              return mr.strings;
            }
            function hr(r) {
              return r % 4 == 0 && (r % 100 != 0 || r % 400 == 0);
            }
            function yr(r, t) {
              for (var e = 0, n = 0; n <= t; e += r[n++]);
              return e;
            }
            var vr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
              _r = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            function wr(r, t) {
              for (var e = new Date(r.getTime()); t > 0; ) {
                var n = hr(e.getFullYear()),
                  o = e.getMonth(),
                  i = (n ? vr : _r)[o];
                if (!(t > i - e.getDate()))
                  return e.setDate(e.getDate() + t), e;
                (t -= i - e.getDate() + 1),
                  e.setDate(1),
                  o < 11
                    ? e.setMonth(o + 1)
                    : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
              }
              return e;
            }
            function gr(r, t, e, n) {
              var o = b[(n + 40) >> 2],
                i = {
                  tm_sec: b[n >> 2],
                  tm_min: b[(n + 4) >> 2],
                  tm_hour: b[(n + 8) >> 2],
                  tm_mday: b[(n + 12) >> 2],
                  tm_mon: b[(n + 16) >> 2],
                  tm_year: b[(n + 20) >> 2],
                  tm_wday: b[(n + 24) >> 2],
                  tm_yday: b[(n + 28) >> 2],
                  tm_isdst: b[(n + 32) >> 2],
                  tm_gmtoff: b[(n + 36) >> 2],
                  tm_zone: o ? P(o) : '',
                },
                a = P(e),
                s = {
                  '%c': '%a %b %d %H:%M:%S %Y',
                  '%D': '%m/%d/%y',
                  '%F': '%Y-%m-%d',
                  '%h': '%b',
                  '%r': '%I:%M:%S %p',
                  '%R': '%H:%M',
                  '%T': '%H:%M:%S',
                  '%x': '%m/%d/%y',
                  '%X': '%H:%M:%S',
                  '%Ec': '%c',
                  '%EC': '%C',
                  '%Ex': '%m/%d/%y',
                  '%EX': '%H:%M:%S',
                  '%Ey': '%y',
                  '%EY': '%Y',
                  '%Od': '%d',
                  '%Oe': '%e',
                  '%OH': '%H',
                  '%OI': '%I',
                  '%Om': '%m',
                  '%OM': '%M',
                  '%OS': '%S',
                  '%Ou': '%u',
                  '%OU': '%U',
                  '%OV': '%V',
                  '%Ow': '%w',
                  '%OW': '%W',
                  '%Oy': '%y',
                };
              for (var u in s) a = a.replace(new RegExp(u, 'g'), s[u]);
              var c = [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                f = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ];
              function l(r, t, e) {
                for (
                  var n = 'number' == typeof r ? r.toString() : r || '';
                  n.length < t;

                )
                  n = e[0] + n;
                return n;
              }
              function d(r, t) {
                return l(r, t, '0');
              }
              function p(r, t) {
                function e(r) {
                  return r < 0 ? -1 : r > 0 ? 1 : 0;
                }
                var n;
                return (
                  0 === (n = e(r.getFullYear() - t.getFullYear())) &&
                    0 === (n = e(r.getMonth() - t.getMonth())) &&
                    (n = e(r.getDate() - t.getDate())),
                  n
                );
              }
              function m(r) {
                switch (r.getDay()) {
                  case 0:
                    return new Date(r.getFullYear() - 1, 11, 29);
                  case 1:
                    return r;
                  case 2:
                    return new Date(r.getFullYear(), 0, 3);
                  case 3:
                    return new Date(r.getFullYear(), 0, 2);
                  case 4:
                    return new Date(r.getFullYear(), 0, 1);
                  case 5:
                    return new Date(r.getFullYear() - 1, 11, 31);
                  case 6:
                    return new Date(r.getFullYear() - 1, 11, 30);
                }
              }
              function h(r) {
                var t = wr(new Date(r.tm_year + 1900, 0, 1), r.tm_yday),
                  e = new Date(t.getFullYear(), 0, 4),
                  n = new Date(t.getFullYear() + 1, 0, 4),
                  o = m(e),
                  i = m(n);
                return p(o, t) <= 0
                  ? p(i, t) <= 0
                    ? t.getFullYear() + 1
                    : t.getFullYear()
                  : t.getFullYear() - 1;
              }
              var y = {
                '%a': function (r) {
                  return c[r.tm_wday].substring(0, 3);
                },
                '%A': function (r) {
                  return c[r.tm_wday];
                },
                '%b': function (r) {
                  return f[r.tm_mon].substring(0, 3);
                },
                '%B': function (r) {
                  return f[r.tm_mon];
                },
                '%C': function (r) {
                  return d(((r.tm_year + 1900) / 100) | 0, 2);
                },
                '%d': function (r) {
                  return d(r.tm_mday, 2);
                },
                '%e': function (r) {
                  return l(r.tm_mday, 2, ' ');
                },
                '%g': function (r) {
                  return h(r).toString().substring(2);
                },
                '%G': function (r) {
                  return h(r);
                },
                '%H': function (r) {
                  return d(r.tm_hour, 2);
                },
                '%I': function (r) {
                  var t = r.tm_hour;
                  return 0 == t ? (t = 12) : t > 12 && (t -= 12), d(t, 2);
                },
                '%j': function (r) {
                  return d(
                    r.tm_mday +
                      yr(hr(r.tm_year + 1900) ? vr : _r, r.tm_mon - 1),
                    3,
                  );
                },
                '%m': function (r) {
                  return d(r.tm_mon + 1, 2);
                },
                '%M': function (r) {
                  return d(r.tm_min, 2);
                },
                '%n': function () {
                  return '\n';
                },
                '%p': function (r) {
                  return r.tm_hour >= 0 && r.tm_hour < 12 ? 'AM' : 'PM';
                },
                '%S': function (r) {
                  return d(r.tm_sec, 2);
                },
                '%t': function () {
                  return '\t';
                },
                '%u': function (r) {
                  return r.tm_wday || 7;
                },
                '%U': function (r) {
                  var t = new Date(r.tm_year + 1900, 0, 1),
                    e = 0 === t.getDay() ? t : wr(t, 7 - t.getDay()),
                    n = new Date(r.tm_year + 1900, r.tm_mon, r.tm_mday);
                  if (p(e, n) < 0) {
                    var o =
                        yr(hr(n.getFullYear()) ? vr : _r, n.getMonth() - 1) -
                        31,
                      i = 31 - e.getDate() + o + n.getDate();
                    return d(Math.ceil(i / 7), 2);
                  }
                  return 0 === p(e, t) ? '01' : '00';
                },
                '%V': function (r) {
                  var t,
                    e = new Date(r.tm_year + 1900, 0, 4),
                    n = new Date(r.tm_year + 1901, 0, 4),
                    o = m(e),
                    i = m(n),
                    a = wr(new Date(r.tm_year + 1900, 0, 1), r.tm_yday);
                  return p(a, o) < 0
                    ? '53'
                    : p(i, a) <= 0
                    ? '01'
                    : ((t =
                        o.getFullYear() < r.tm_year + 1900
                          ? r.tm_yday + 32 - o.getDate()
                          : r.tm_yday + 1 - o.getDate()),
                      d(Math.ceil(t / 7), 2));
                },
                '%w': function (r) {
                  return r.tm_wday;
                },
                '%W': function (r) {
                  var t = new Date(r.tm_year, 0, 1),
                    e =
                      1 === t.getDay()
                        ? t
                        : wr(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1),
                    n = new Date(r.tm_year + 1900, r.tm_mon, r.tm_mday);
                  if (p(e, n) < 0) {
                    var o =
                        yr(hr(n.getFullYear()) ? vr : _r, n.getMonth() - 1) -
                        31,
                      i = 31 - e.getDate() + o + n.getDate();
                    return d(Math.ceil(i / 7), 2);
                  }
                  return 0 === p(e, t) ? '01' : '00';
                },
                '%y': function (r) {
                  return (r.tm_year + 1900).toString().substring(2);
                },
                '%Y': function (r) {
                  return r.tm_year + 1900;
                },
                '%z': function (r) {
                  var t = r.tm_gmtoff,
                    e = t >= 0;
                  return (
                    (t = ((t = Math.abs(t) / 60) / 60) * 100 + (t % 60)),
                    (e ? '+' : '-') + String('0000' + t).slice(-4)
                  );
                },
                '%Z': function (r) {
                  return r.tm_zone;
                },
                '%%': function () {
                  return '%';
                },
              };
              for (var u in y)
                a.indexOf(u) >= 0 &&
                  (a = a.replace(new RegExp(u, 'g'), y[u](i)));
              var v = kr(a, !1);
              return v.length > t
                ? 0
                : ((function (r, t) {
                    g.set(r, t);
                  })(v, r),
                  v.length - 1);
            }
            function Er(r, t) {
              Er.array || (Er.array = []);
              var e,
                n = Er.array;
              for (n.length = 0; (e = E[r++]); )
                100 === e || 102 === e
                  ? ((t = (t + 7) & -8), n.push(D[t >> 3]), (t += 8))
                  : ((t = (t + 3) & -4), n.push(b[t >> 2]), (t += 4));
              return n;
            }
            function kr(r, t, e) {
              var n = e > 0 ? e : A(r) + 1,
                o = new Array(n),
                i = x(r, o, 0, o.length);
              return t && (o.length = i), o;
            }
            (tr = function () {
              return performance.now();
            }),
              sr.staticInit();
            var br = {
                M: function (r, t) {
                  return (function (r, t) {
                    var e;
                    if (0 === r) e = Date.now();
                    else {
                      if (1 !== r && 4 !== r) return er(28), -1;
                      e = tr();
                    }
                    return (
                      (b[t >> 2] = (e / 1e3) | 0),
                      (b[(t + 4) >> 2] = ((e % 1e3) * 1e3 * 1e3) | 0),
                      0
                    );
                  })(r, t);
                },
                k: function (r) {
                  return Rr(r);
                },
                j: function (r, t, e) {
                  throw (
                    ('uncaught_exception' in zr
                      ? zr.uncaught_exceptions++
                      : (zr.uncaught_exceptions = 1),
                    r)
                  );
                },
                q: function () {},
                U: function (r, t) {
                  return er(63), -1;
                },
                P: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr();
                    return sr.unlink(e), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                R: function (r, t) {
                  ur.varargs = t;
                  try {
                    return (function (r, t, e, n, o, i) {
                      var a;
                      i <<= 12;
                      var s = !1;
                      if (0 != (16 & n) && r % 16384 != 0) return -28;
                      if (0 != (32 & n)) {
                        if (!(a = Br(16384, t))) return -48;
                        cr(a, 0, t), (s = !0);
                      } else {
                        var u = sr.getStream(o);
                        if (!u) return -8;
                        var c = sr.mmap(u, E, r, t, i, e, n);
                        (a = c.ptr), (s = c.allocated);
                      }
                      return (
                        (ur.mappings[a] = {
                          malloc: a,
                          len: t,
                          allocated: s,
                          fd: o,
                          flags: n,
                          offset: i,
                        }),
                        a
                      );
                    })(
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                      ur.get(),
                    );
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                S: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get();
                    return ur.doStat(sr.stat, e, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                T: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD(),
                      n = ur.get();
                    return ur.doStat(sr.stat, e.path, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                L: function (r, t) {
                  ur.varargs = t;
                  try {
                    return fr;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                y: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD();
                    switch (ur.get()) {
                      case 0:
                        return (n = ur.get()) < 0
                          ? -28
                          : sr.open(e.path, e.flags, 0, n).fd;
                      case 1:
                      case 2:
                        return 0;
                      case 3:
                        return e.flags;
                      case 4:
                        var n = ur.get();
                        return (e.flags |= n), 0;
                      case 12:
                        return (n = ur.get()), (k[(n + 0) >> 1] = 2), 0;
                      case 13:
                      case 14:
                        return 0;
                      case 16:
                      case 8:
                        return -28;
                      case 9:
                        return er(28), -1;
                      default:
                        return -28;
                    }
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                K: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get();
                    return ur.doAccess(e, n);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                z: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStr(),
                      n = ur.get(),
                      o = ur.get();
                    return sr.open(e, n, o).fd;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                O: function (r, t) {
                  ur.varargs = t;
                  try {
                    var e = ur.getStreamFromFD(),
                      n = ur.get();
                    switch (n) {
                      case 21509:
                      case 21505:
                        return e.tty ? 0 : -59;
                      case 21510:
                      case 21511:
                      case 21512:
                      case 21506:
                      case 21507:
                      case 21508:
                        return e.tty ? 0 : -59;
                      case 21519:
                        if (!e.tty) return -59;
                        var o = ur.get();
                        return (b[o >> 2] = 0), 0;
                      case 21520:
                        return e.tty ? -28 : -59;
                      case 21531:
                        return (o = ur.get()), sr.ioctl(e, n, o);
                      case 21523:
                      case 21524:
                        return e.tty ? 0 : -59;
                      default:
                        J('bad ioctl syscall ' + n);
                    }
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                Q: function (r, t) {
                  ur.varargs = t;
                  try {
                    return (function (r, t) {
                      if (-1 === r || 0 === t) return -28;
                      var e = ur.mappings[r];
                      if (!e) return 0;
                      if (t === e.len) {
                        var n = sr.getStream(e.fd);
                        ur.doMsync(r, n, t, e.flags, e.offset),
                          sr.munmap(n),
                          (ur.mappings[r] = null),
                          e.allocated && Or(e.malloc);
                      }
                      return 0;
                    })(ur.get(), ur.get());
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      -r.errno
                    );
                  }
                },
                m: function () {},
                w: function () {
                  J();
                },
                C: function (r, t, e) {
                  var n = Er(t, e);
                  return Q[r].apply(null, n);
                },
                d: function (r, t) {
                  !(function (r, t) {
                    throw (Tr(r, t || 1), 'longjmp');
                  })(r, t);
                },
                E: function (r, t, e) {
                  E.set(E.subarray(t, t + e), r);
                },
                F: function (r) {
                  var t = E.length;
                  if (r > 2147418112) return !1;
                  for (var e, n, o = 1; o <= 4; o *= 2) {
                    var i = t * (1 + 0.2 / o);
                    if (
                      ((i = Math.min(i, r + 100663296)),
                      dr(
                        Math.min(
                          2147418112,
                          ((e = Math.max(16777216, r, i)) % (n = 65536) > 0 &&
                            (e += n - (e % n)),
                          e),
                        ),
                      ))
                    )
                      return !0;
                  }
                  return !1;
                },
                I: function (r, t) {
                  var e = mr(),
                    n = 0;
                  return (
                    e.forEach(function (e, o) {
                      var i = t + n;
                      (b[(r + 4 * o) >> 2] = i),
                        (function (r, t, e) {
                          for (var n = 0; n < r.length; ++n)
                            g[t++ >> 0] = r.charCodeAt(n);
                          e || (g[t >> 0] = 0);
                        })(e, i),
                        (n += e.length + 1);
                    }),
                    0
                  );
                },
                J: function (r, t) {
                  var e = mr();
                  b[r >> 2] = e.length;
                  var n = 0;
                  return (
                    e.forEach(function (r) {
                      n += r.length + 1;
                    }),
                    (b[t >> 2] = n),
                    0
                  );
                },
                l: function (r) {
                  !(function (r, t) {
                    (t && d && 0 === r) ||
                      (d || ((v = !0), n.onExit && n.onExit(r)),
                      s(r, new rt(r)));
                  })(r);
                },
                p: function (r) {
                  try {
                    var t = ur.getStreamFromFD(r);
                    return sr.close(t), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                H: function (r, t) {
                  try {
                    var e = ur.getStreamFromFD(r),
                      n = e.tty
                        ? 2
                        : sr.isDir(e.mode)
                        ? 3
                        : sr.isLink(e.mode)
                        ? 7
                        : 4;
                    return (g[t >> 0] = n), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                N: function (r, t, e, n) {
                  try {
                    var o = ur.getStreamFromFD(r),
                      i = ur.doReadv(o, t, e);
                    return (b[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                D: function (r, t, e, n, o) {
                  try {
                    var i = ur.getStreamFromFD(r),
                      a = 4294967296 * e + (t >>> 0);
                    return a <= -9007199254740992 || a >= 9007199254740992
                      ? -61
                      : (sr.llseek(i, a, n),
                        (Z = [
                          i.position >>> 0,
                          ((G = i.position),
                          +N(G) >= 1
                            ? G > 0
                              ? (0 | H(+I(G / 4294967296), 4294967295)) >>> 0
                              : ~~+L((G - +(~~G >>> 0)) / 4294967296) >>> 0
                            : 0),
                        ]),
                        (b[o >> 2] = Z[0]),
                        (b[(o + 4) >> 2] = Z[1]),
                        i.getdents && 0 === a && 0 === n && (i.getdents = null),
                        0);
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                x: function (r, t, e, n) {
                  try {
                    var o = ur.getStreamFromFD(r),
                      i = ur.doWritev(o, t, e);
                    return (b[n >> 2] = i), 0;
                  } catch (r) {
                    return (
                      (void 0 !== sr && r instanceof sr.ErrnoError) || J(r),
                      r.errno
                    );
                  }
                },
                a: function () {
                  return 0 | m;
                },
                X: function (r) {
                  var t = Date.now();
                  return (
                    (b[r >> 2] = (t / 1e3) | 0),
                    (b[(r + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
                    0
                  );
                },
                Y: function (r) {
                  var t = $r();
                  try {
                    return Zr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                V: function (r, t) {
                  var e = $r();
                  try {
                    return Kr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                v: function (r) {
                  var t = $r();
                  try {
                    return qr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                f: function (r, t) {
                  var e = $r();
                  try {
                    return Yr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                e: function (r, t, e) {
                  var n = $r();
                  try {
                    return Jr(r, t, e);
                  } catch (r) {
                    if ((Qr(n), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                g: function (r, t, e, n) {
                  var o = $r();
                  try {
                    return Vr(r, t, e, n);
                  } catch (r) {
                    if ((Qr(o), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                n: function (r, t, e, n, o) {
                  var i = $r();
                  try {
                    return Xr(r, t, e, n, o);
                  } catch (r) {
                    if ((Qr(i), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                W: function (r, t, e, n, o, i, a) {
                  var s = $r();
                  try {
                    return Gr(r, t, e, n, o, i, a);
                  } catch (r) {
                    if ((Qr(s), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                s: function (r) {
                  var t = $r();
                  try {
                    Nr(r);
                  } catch (r) {
                    if ((Qr(t), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                h: function (r, t) {
                  var e = $r();
                  try {
                    Lr(r, t);
                  } catch (r) {
                    if ((Qr(e), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                o: function (r, t, e) {
                  var n = $r();
                  try {
                    Ir(r, t, e);
                  } catch (r) {
                    if ((Qr(n), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                u: function (r, t, e, n) {
                  var o = $r();
                  try {
                    Hr(r, t, e, n);
                  } catch (r) {
                    if ((Qr(o), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                t: function (r, t, e, n, o) {
                  var i = $r();
                  try {
                    Ur(r, t, e, n, o);
                  } catch (r) {
                    if ((Qr(i), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                r: function (r, t, e, n, o, i) {
                  var a = $r();
                  try {
                    Wr(r, t, e, n, o, i);
                  } catch (r) {
                    if ((Qr(a), r !== r + 0 && 'longjmp' !== r)) throw r;
                    Tr(1, 0);
                  }
                },
                memory: p,
                i: function r(t, e, n, o) {
                  (e |= 0), (n |= 0), (o |= 0);
                  var i = 0;
                  for (
                    lr = (lr + 1) | 0, b[(t |= 0) >> 2] = lr;
                    (0 | i) < (0 | o);

                  ) {
                    if (0 == (0 | b[(n + (i << 3)) >> 2]))
                      return (
                        (b[(n + (i << 3)) >> 2] = lr),
                        (b[(n + (4 + (i << 3))) >> 2] = e),
                        (b[(n + (8 + (i << 3))) >> 2] = 0),
                        h(0 | o),
                        0 | n
                      );
                    i = (i + 1) | 0;
                  }
                  return (
                    (n =
                      0 |
                      r(
                        0 | t,
                        0 | e,
                        0 |
                          (n =
                            0 |
                            jr(0 | n, (8 * ((1 + (o = (2 * o) | 0)) | 0)) | 0)),
                        0 | o,
                      )),
                    h(0 | o),
                    0 | n
                  );
                },
                b: function (r) {
                  h(0 | r);
                },
                G: function (r, t, e, n) {
                  return gr(r, t, e, n);
                },
                table: y,
                c: function (r, t, e) {
                  (r |= 0), (t |= 0), (e |= 0);
                  for (
                    var n = 0, o = 0;
                    (0 | n) < (0 | e) &&
                    0 != (0 | (o = 0 | b[(t + (n << 3)) >> 2]));

                  ) {
                    if ((0 | o) == (0 | r))
                      return 0 | b[(t + (4 + (n << 3))) >> 2];
                    n = (n + 1) | 0;
                  }
                  return 0;
                },
                A: function (r) {
                  var t = (Date.now() / 1e3) | 0;
                  return r && (b[r >> 2] = t), t;
                },
                B: function (r) {
                  return 0 !== r && cr(r, 0, 16), 0;
                },
              },
              Dr = (function () {
                var r = { a: br };
                function t(r, t) {
                  var e = r.exports;
                  (n.asm = e), Y();
                }
                function e(r) {
                  t(r.instance);
                }
                function o(t) {
                  return (
                    l || 'function' != typeof fetch
                      ? new Promise(function (r, t) {
                          r($());
                        })
                      : fetch(K, { credentials: 'same-origin' })
                          .then(function (r) {
                            if (!r.ok)
                              throw (
                                "failed to load wasm binary file at '" + K + "'"
                              );
                            return r.arrayBuffer();
                          })
                          .catch(function () {
                            return $();
                          })
                  )
                    .then(function (t) {
                      return WebAssembly.instantiate(t, r);
                    })
                    .then(t, function (r) {
                      f('failed to asynchronously prepare wasm: ' + r), J(r);
                    });
                }
                if ((q(), n.instantiateWasm))
                  try {
                    return n.instantiateWasm(r, t);
                  } catch (r) {
                    return (
                      f(
                        'Module.instantiateWasm callback failed with error: ' +
                          r,
                      ),
                      !1
                    );
                  }
                return (
                  (function () {
                    if (
                      l ||
                      'function' != typeof WebAssembly.instantiateStreaming ||
                      V(K) ||
                      'function' != typeof fetch
                    )
                      return o(e);
                    fetch(K, { credentials: 'same-origin' }).then(function (t) {
                      return WebAssembly.instantiateStreaming(t, r).then(
                        e,
                        function (r) {
                          f('wasm streaming compile failed: ' + r),
                            f('falling back to ArrayBuffer instantiation'),
                            o(e);
                        },
                      );
                    });
                  })(),
                  {}
                );
              })();
            n.asm = Dr;
            var Sr,
              Fr = (n.___wasm_call_ctors = function () {
                return (Fr = n.___wasm_call_ctors = n.asm.Z).apply(
                  null,
                  arguments,
                );
              }),
              Pr = (n._emscripten_bind_VoidPtr___destroy___0 = function () {
                return (Pr = n._emscripten_bind_VoidPtr___destroy___0 =
                  n.asm._).apply(null, arguments);
              }),
              xr = (n._emscripten_bind_Main_layout_3 = function () {
                return (xr = n._emscripten_bind_Main_layout_3 = n.asm.$).apply(
                  null,
                  arguments,
                );
              }),
              Ar = (n._emscripten_bind_Main_lastError_0 = function () {
                return (Ar = n._emscripten_bind_Main_lastError_0 =
                  n.asm.aa).apply(null, arguments);
              }),
              Mr = (n._emscripten_bind_Main_createFile_2 = function () {
                return (Mr = n._emscripten_bind_Main_createFile_2 =
                  n.asm.ba).apply(null, arguments);
              }),
              Cr = (n._emscripten_bind_Main___destroy___0 = function () {
                return (Cr = n._emscripten_bind_Main___destroy___0 =
                  n.asm.ca).apply(null, arguments);
              }),
              Rr = (n._malloc = function () {
                return (Rr = n._malloc = n.asm.da).apply(null, arguments);
              }),
              Or = (n._free = function () {
                return (Or = n._free = n.asm.ea).apply(null, arguments);
              }),
              jr = (n._realloc = function () {
                return (jr = n._realloc = n.asm.fa).apply(null, arguments);
              }),
              Tr =
                ((n.___errno_location = function () {
                  return (n.___errno_location = n.asm.ga).apply(
                    null,
                    arguments,
                  );
                }),
                (n._setThrew = function () {
                  return (Tr = n._setThrew = n.asm.ha).apply(null, arguments);
                })),
              zr = (n.__ZSt18uncaught_exceptionv = function () {
                return (zr = n.__ZSt18uncaught_exceptionv = n.asm.ia).apply(
                  null,
                  arguments,
                );
              }),
              Br = (n._memalign = function () {
                return (Br = n._memalign = n.asm.ja).apply(null, arguments);
              }),
              Nr = (n.dynCall_v = function () {
                return (Nr = n.dynCall_v = n.asm.ka).apply(null, arguments);
              }),
              Lr = (n.dynCall_vi = function () {
                return (Lr = n.dynCall_vi = n.asm.la).apply(null, arguments);
              }),
              Ir = (n.dynCall_vii = function () {
                return (Ir = n.dynCall_vii = n.asm.ma).apply(null, arguments);
              }),
              Hr = (n.dynCall_viii = function () {
                return (Hr = n.dynCall_viii = n.asm.na).apply(null, arguments);
              }),
              Ur = (n.dynCall_viiii = function () {
                return (Ur = n.dynCall_viiii = n.asm.oa).apply(null, arguments);
              }),
              Wr = (n.dynCall_viiiii = function () {
                return (Wr = n.dynCall_viiiii = n.asm.pa).apply(
                  null,
                  arguments,
                );
              }),
              qr = (n.dynCall_i = function () {
                return (qr = n.dynCall_i = n.asm.qa).apply(null, arguments);
              }),
              Yr = (n.dynCall_ii = function () {
                return (Yr = n.dynCall_ii = n.asm.ra).apply(null, arguments);
              }),
              Jr = (n.dynCall_iii = function () {
                return (Jr = n.dynCall_iii = n.asm.sa).apply(null, arguments);
              }),
              Vr = (n.dynCall_iiii = function () {
                return (Vr = n.dynCall_iiii = n.asm.ta).apply(null, arguments);
              }),
              Xr = (n.dynCall_iiiii = function () {
                return (Xr = n.dynCall_iiiii = n.asm.ua).apply(null, arguments);
              }),
              Gr = (n.dynCall_iiiiiii = function () {
                return (Gr = n.dynCall_iiiiiii = n.asm.va).apply(
                  null,
                  arguments,
                );
              }),
              Zr = (n.dynCall_d = function () {
                return (Zr = n.dynCall_d = n.asm.wa).apply(null, arguments);
              }),
              Kr = (n.dynCall_di = function () {
                return (Kr = n.dynCall_di = n.asm.xa).apply(null, arguments);
              }),
              $r = (n.stackSave = function () {
                return ($r = n.stackSave = n.asm.ya).apply(null, arguments);
              }),
              Qr =
                ((n.stackAlloc = function () {
                  return (n.stackAlloc = n.asm.za).apply(null, arguments);
                }),
                (n.stackRestore = function () {
                  return (Qr = n.stackRestore = n.asm.Aa).apply(
                    null,
                    arguments,
                  );
                }));
            function rt(r) {
              (this.name = 'ExitStatus'),
                (this.message = 'Program terminated with exit(' + r + ')'),
                (this.status = r);
            }
            function tt(r) {
              function t() {
                Sr ||
                  ((Sr = !0),
                  v ||
                    ((B = !0),
                    n.noFSInit || sr.init.initialized || sr.init(),
                    ir.init(),
                    R(j),
                    (sr.ignorePermissions = !1),
                    R(T),
                    n.onRuntimeInitialized && n.onRuntimeInitialized(),
                    (function () {
                      if (n.postRun)
                        for (
                          'function' == typeof n.postRun &&
                          (n.postRun = [n.postRun]);
                          n.postRun.length;

                        )
                          (r = n.postRun.shift()), z.unshift(r);
                      var r;
                      R(z);
                    })()));
              }
              U > 0 ||
                ((function () {
                  if (n.preRun)
                    for (
                      'function' == typeof n.preRun && (n.preRun = [n.preRun]);
                      n.preRun.length;

                    )
                      (r = n.preRun.shift()), O.unshift(r);
                  var r;
                  R(O);
                })(),
                U > 0 ||
                  (n.setStatus
                    ? (n.setStatus('Running...'),
                      setTimeout(function () {
                        setTimeout(function () {
                          n.setStatus('');
                        }, 1),
                          t();
                      }, 1))
                    : t()));
            }
            if (
              ((n.asm = Dr),
              (n.then = function (r) {
                if (Sr) r(n);
                else {
                  var t = n.onRuntimeInitialized;
                  n.onRuntimeInitialized = function () {
                    t && t(), r(n);
                  };
                }
                return n;
              }),
              (W = function r() {
                Sr || tt(), Sr || (W = r);
              }),
              (n.run = tt),
              n.preInit)
            )
              for (
                'function' == typeof n.preInit && (n.preInit = [n.preInit]);
                n.preInit.length > 0;

              )
                n.preInit.pop()();
            function et() {}
            function nt(r) {
              return (r || et).__cache__;
            }
            function ot(r, t) {
              var e = nt(t),
                n = e[r];
              return (
                n ||
                (((n = Object.create((t || et).prototype)).ptr = r), (e[r] = n))
              );
            }
            (d = !0),
              tt(),
              (et.prototype = Object.create(et.prototype)),
              (et.prototype.constructor = et),
              (et.prototype.__class__ = et),
              (et.__cache__ = {}),
              (n.WrapperObject = et),
              (n.getCache = nt),
              (n.wrapPointer = ot),
              (n.castObject = function (r, t) {
                return ot(r.ptr, t);
              }),
              (n.NULL = ot(0)),
              (n.destroy = function (r) {
                if (!r.__destroy__)
                  throw 'Error: Cannot destroy object. (Did you create it yourself?)';
                r.__destroy__(), delete nt(r.__class__)[r.ptr];
              }),
              (n.compare = function (r, t) {
                return r.ptr === t.ptr;
              }),
              (n.getPointer = function (r) {
                return r.ptr;
              }),
              (n.getClass = function (r) {
                return r.__class__;
              });
            var it,
              at = {
                buffer: 0,
                size: 0,
                pos: 0,
                temps: [],
                needed: 0,
                prepare: function () {
                  if (at.needed) {
                    for (var r = 0; r < at.temps.length; r++)
                      n._free(at.temps[r]);
                    (at.temps.length = 0),
                      n._free(at.buffer),
                      (at.buffer = 0),
                      (at.size += at.needed),
                      (at.needed = 0);
                  }
                  at.buffer ||
                    ((at.size += 128),
                    (at.buffer = n._malloc(at.size)),
                    _(at.buffer)),
                    (at.pos = 0);
                },
                alloc: function (r, t) {
                  _(at.buffer);
                  var e,
                    o = t.BYTES_PER_ELEMENT,
                    i = r.length * o;
                  return (
                    (i = (i + 7) & -8),
                    at.pos + i >= at.size
                      ? (_(i > 0),
                        (at.needed += i),
                        (e = n._malloc(i)),
                        at.temps.push(e))
                      : ((e = at.buffer + at.pos), (at.pos += i)),
                    e
                  );
                },
                copy: function (r, t, e) {
                  var n = e;
                  switch (t.BYTES_PER_ELEMENT) {
                    case 2:
                      n >>= 1;
                      break;
                    case 4:
                      n >>= 2;
                      break;
                    case 8:
                      n >>= 3;
                  }
                  for (var o = 0; o < r.length; o++) t[n + o] = r[o];
                },
              };
            function st(r) {
              if ('string' == typeof r) {
                var t = kr(r),
                  e = at.alloc(t, g);
                return at.copy(t, g, e), e;
              }
              return r;
            }
            function ut() {
              throw 'cannot construct a VoidPtr, no constructor in IDL';
            }
            function ct() {
              throw 'cannot construct a Main, no constructor in IDL';
            }
            return (
              (ut.prototype = Object.create(et.prototype)),
              (ut.prototype.constructor = ut),
              (ut.prototype.__class__ = ut),
              (ut.__cache__ = {}),
              (n.VoidPtr = ut),
              (ut.prototype.__destroy__ = ut.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Pr(r);
                }),
              (ct.prototype = Object.create(et.prototype)),
              (ct.prototype.constructor = ct),
              (ct.prototype.__class__ = ct),
              (ct.__cache__ = {}),
              (n.Main = ct),
              (ct.prototype.layout = ct.prototype.layout =
                function (r, t, e) {
                  var n = this.ptr;
                  return (
                    at.prepare(),
                    (r = r && 'object' == typeof r ? r.ptr : st(r)),
                    (t = t && 'object' == typeof t ? t.ptr : st(t)),
                    (e = e && 'object' == typeof e ? e.ptr : st(e)),
                    P(xr(n, r, t, e))
                  );
                }),
              (ct.prototype.lastError = ct.prototype.lastError =
                function () {
                  var r = this.ptr;
                  return P(Ar(r));
                }),
              (ct.prototype.createFile = ct.prototype.createFile =
                function (r, t) {
                  var e = this.ptr;
                  at.prepare(),
                    (r = r && 'object' == typeof r ? r.ptr : st(r)),
                    (t = t && 'object' == typeof t ? t.ptr : st(t)),
                    Mr(e, r, t);
                }),
              (ct.prototype.__destroy__ = ct.prototype.__destroy__ =
                function () {
                  var r = this.ptr;
                  Cr(r);
                }),
              B || ((it = function () {}), T.unshift(it)),
              r
            );
          });
      r.exports = n;
    }),
    l = Object.freeze({ __proto__: null, default: f, __moduleExports: f }),
    d = function () {
      return (d =
        Object.assign ||
        function (r) {
          for (var t, e = 1, n = arguments.length; e < n; e++)
            for (var o in (t = arguments[e]))
              Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
          return r;
        }).apply(this, arguments);
    },
    p = function () {
      for (var r = 0, t = 0, e = arguments.length; t < e; t++)
        r += arguments[t].length;
      var n = Array(r),
        o = 0;
      for (t = 0; t < e; t++)
        for (var i = arguments[t], a = 0, s = i.length; a < s; a++, o++)
          n[o] = i[a];
      return n;
    };
  function m(r) {
    return {
      path: r.path,
      data:
        '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="' +
        r.width +
        '" height="' +
        r.height +
        '"></svg>',
    };
  }
  function h(r, t) {
    var e,
      n = d({ images: [], files: [] }, t);
    p(n.files, ((e = n.images), e.map(m))).forEach(function (t) {
      return r.Main.prototype.createFile(t.path, t.data);
    });
  }
  var y = {
      layout: function (r, t, e, n) {
        return (
          void 0 === t && (t = 'svg'),
          void 0 === e && (e = 'dot'),
          r
            ? a(l).then(function (o) {
                h(o, n);
                var i = o.Main.prototype.layout(r, t, e);
                if (!i) throw new Error(o.Main.prototype.lastError());
                return i;
              })
            : Promise.resolve('')
        );
      },
      circo: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'circo', e);
      },
      dot: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'dot', e);
      },
      fdp: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'fdp', e);
      },
      neato: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'neato', e);
      },
      osage: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'osage', e);
      },
      patchwork: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'patchwork', e);
      },
      twopi: function (r, t, e) {
        return void 0 === t && (t = 'svg'), this.layout(r, t, 'twopi', e);
      },
    },
    v = (function () {
      function r(r) {
        this._wasm = r;
      }
      return (
        (r.prototype.layout = function (r, t, e, n) {
          if ((void 0 === t && (t = 'svg'), void 0 === e && (e = 'dot'), !r))
            return '';
          h(this._wasm, n);
          var o = this._wasm.Main.prototype.layout(r, t, e);
          if (!o) throw new Error(this._wasm.Main.prototype.lastError());
          return o;
        }),
        (r.prototype.circo = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'circo', e);
        }),
        (r.prototype.dot = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'dot', e);
        }),
        (r.prototype.fdp = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'fdp', e);
        }),
        (r.prototype.neato = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'neato', e);
        }),
        (r.prototype.osage = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'osage', e);
        }),
        (r.prototype.patchwork = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'patchwork', e);
        }),
        (r.prototype.twopi = function (r, t, e) {
          return void 0 === t && (t = 'svg'), this.layout(r, t, 'twopi', e);
        }),
        r
      );
    })();
  (r.StackParser = u),
    (r.graphviz = y),
    (r.graphvizSync = function () {
      return a(l).then(function (r) {
        return new v(r);
      });
    }),
    (r.parse = c),
    (r.wasmFolder = i),
    Object.defineProperty(r, '__esModule', { value: !0 });
});
