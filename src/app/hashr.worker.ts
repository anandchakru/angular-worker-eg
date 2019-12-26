/// <reference lib="webworker" />

import { Md5 } from '../../node_modules/ts-md5/dist/md5';

addEventListener('message', ({ data }) => {
  postMessage({
    data,
    md5: Md5.hashStr(data)
  });
});


