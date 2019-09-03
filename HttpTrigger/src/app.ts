import { customElement } from '@aurelia/runtime';

@customElement({ name: 'app', template: `<main
as-element="au-viewport"
default="blog-post(creating-a-typed-version-of-aurelias-computedfrom-decorator-with-typescript)"
used-by="blog-post"
></main>` })
export class App {
    constructor() {
        console.log('ctor app');
    }
}
