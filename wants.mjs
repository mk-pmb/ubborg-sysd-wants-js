// -*- coding: utf-8, tab-width: 2 -*-

import pathLib from 'path';


const isAry = Array.isArray;
const sds = '/systemd/system/';


function flatMap(l, f) { return [].concat(...l.map(f)); }


function isSimplePath(x) { return (x && (!x.path) && x.substr && x); }


function fullPath(f) {
  if (isSimplePath(f)) { return '/lib' + sds + f; }
  return (f.pathPre || '') + f.path + (f.pathSuf || '');
}


function mustBool(val, optName) {
  if (typeof val === 'boolean') { return val; }
  throw new TypeError('Unsupported value for "' + optName + '" param');
}


function maybeSym(d) {
  return { mimeType: (d ? 'sym' : null), ...(d && { content: d }) };
}


function sysdWants(who, wants, what) {
  if (isAry(who)) { return flatMap(who, u => sysdWants(u, wants, what)); }
  if (isAry(what)) { return flatMap(what, u => sysdWants(who, wants, u)); }
  const dest = fullPath(what);
  return {
    pathPre: '/etc' + sds,
    path: who,
    pathSuf: '.wants/' + pathLib.basename(dest),
    ...maybeSym(mustBool(wants, 'wants') && dest),
  };
}


function mask(unitName, masked) {
  if (Array.isArray(unitName)) { return unitName.map(u => mask(u, masked)); }
  return {
    path: '/etc' + sds + unitName,
    ...maybeSym(mustBool(masked, 'masked') && '/dev/null'),
  };
}


function preset(ovr, lines) {
  if (isSimplePath(ovr)) { return preset({ path: ovr }, lines); }
  return {
    pathPre: '/lib/systemd/system-preset/',
    pathSuf: '.preset',
    mimeType: 'text/plain',
    ...ovr,
    lines: undefined,
    content: [].concat(ovr.content || lines).join('\n').trim() + '\n',
  };
}


Object.assign(sysdWants, {

  mask,
  preset,

});


export default sysdWants;
