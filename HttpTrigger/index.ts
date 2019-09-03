import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { transform } from './run';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const value = await transform();
    context.res = {
        body: value,
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    };
};

export default httpTrigger;
