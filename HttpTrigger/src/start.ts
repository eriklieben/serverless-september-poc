import { RouterConfiguration, Router } from '@aurelia/router';
import { routeTransformer } from './routerTransformer';
import { Aurelia } from '@aurelia/runtime';

import { App } from './app';
import { BlogPostComponent } from './Components/blog-post';
import { IRegistry } from '@aurelia/kernel';

export async function start(host: Node, ...registrations: IRegistry[]): Promise<Aurelia> {
  const globalResources = [
    BlogPostComponent
  ] as any;

  const au = new Aurelia()
    .register(
      //RouterConfiguration.customize({ ...routeTransformer, useUrlFragmentHash: true }),
      RouterConfiguration,
      ...globalResources,
      ...registrations
    )
    .app({
      host,
      component: App
    });

  await au.start().wait();

  return au;
}