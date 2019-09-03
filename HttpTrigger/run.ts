import { BasicConfiguration } from '@aurelia/jit-html-jsdom';
import { JSDOM, VirtualConsole } from 'jsdom';

import { start } from './src/start';

import fetch from 'node-fetch';
import { PLATFORM } from '@aurelia/kernel';


export async function transform() {
  global['fetch'] = fetch;

  const html = `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <title>Aurelia</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/">
  
    <link href="https://fonts.googleapis.com/css?family=Fauna+One|Playfair+Display" rel="stylesheet">
    <link href="main.css" rel="stylesheet">
  </head>
  <body>
    <app-root></app-root>
  </body>
  </html>`;
  
  const virtualConsole = new VirtualConsole();
  
  const dom = new JSDOM(html, {
    contentType: "text/html",
    includeNodeLocations: true,
    pretendToBeVisual: true,
    storageQuota: 10000000,
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole
  });
  
  virtualConsole.sendTo(console);
  return await new Promise(resolve => {
     dom.window.document.addEventListener("DOMContentLoaded", async function () {
       const au = await start(dom.window.document.querySelector("app-root"), BasicConfiguration);      
       await new Promise(resolve => PLATFORM.setTimeout(resolve, 1000));
       const content = dom.serialize();
       await au.stop().wait();
       resolve(content);
     });
  });
}
