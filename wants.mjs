// -*- coding: utf-8, tab-width: 2 -*-

import pathLib from 'path';


function fullPath(f) { return (f.pathPre || '') + f.path + (f.pathSuf || ''); }


function sysdWants(who, wants, what) {
  const dest = fullPath(what);
  const sym = {
    pathPre: '/etc/systemd/system/',
    path: who,
    pathSuf: '.wants/' + pathLib.basename(dest),
    mimeType: null,
    ...(wants && { mimeType: 'sym', content: dest }),
  };
  return sym;
}


export default sysdWants;
