import { customElement } from '@aurelia/runtime';
import { HTMLDOM } from '@aurelia/runtime-html';

import * as MarkdownIt from 'markdown-it';

@customElement({ name: 'blog-post', template: `<article>
<h1>\${title}</h1>
<section innerhtml.bind="rawContent"></section>
</article>` })
export class BlogPostComponent {
    constructor(private readonly dom: HTMLDOM) {}

    public title = '';
    public rawContent = '';

    public async enter(params) {
        console.log('enter blog post', params);

        this.title = params;

        try {
            const response = await status(await fetch(`https://au2.azurewebsites.net/api/Get?slug=${params}`, { headers: { Accept: 'application/json' } }));

            const md = new MarkdownIt();
            md.use(require('markdown-it-meta'));
            md.use(require('markdown-it-footnote'));
            md.use(require('markdown-it-inline-comments'));

            this.rawContent = md.render(response);
            this.title = (md as any).meta.title;

        } catch (error) {
            console.log(error);
        }
    }

}

function status(response: Response) {   
    if (response.status >= 200 && response.status < 400) {

        if (
            response.headers.get('content-type')!.includes('text/html') ||
            response.headers.get('content-type')!.includes('text/markdown')
        ) {
            return response.text();
        }
        if (response.headers.get('content-type')!.includes('application/json')) {
            return response.json();
        }
    }

    throw new HttpError(response);
}
  
class HttpError extends Error {
    public msg: Response;
    constructor(msg: Response) {
        super();
        this.msg = msg;
    }
}