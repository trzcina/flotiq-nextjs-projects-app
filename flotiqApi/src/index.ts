/* tslint:disable */
/* eslint-disable */
/* Flotiq customised */
export * from './runtime';
export * from './apis/index';
export * from './models/index';

import * as runtime from './runtime';
import * as Api from './apis/index';
import type { RequestContext }  from "./runtime";

const hydrateMiddleware = async (ctx: RequestContext) => {
    
    if(ctx.init.method == 'GET'){

      const url = new URL(ctx.url);
      if(!url.searchParams.has('hydrate')) {
        if (ctx.url.indexOf('?') > 0) {
          ctx.url = ctx.url + '&hydrate=1';
        } else {
          ctx.url = ctx.url + '?hydrate=1';
        }
      }

    }

    return {
        ...ctx,
        init: {
            ...ctx.init,
        }
    }
};

export class FlotiqApi {
    public MediaInternalAPI : Api.MediaInternalAPI;
    public ProjectAPI : Api.ProjectAPI;
    public TagInternalAPI : Api.TagInternalAPI;

    constructor(key: string | undefined){


        if(!key) {
          throw new Error("FLOTIQ_API_KEY must be passed to the FlotiqAPI constructor.");
        }

        const configParameters: runtime.ConfigurationParameters = {
          apiKey: key
        };
        const configuration = new runtime.Configuration(configParameters);
        this.MediaInternalAPI = new Api.MediaInternalAPI(configuration);
        this.MediaInternalAPI = this.MediaInternalAPI.withPreMiddleware( hydrateMiddleware );
        this.ProjectAPI = new Api.ProjectAPI(configuration);
        this.ProjectAPI = this.ProjectAPI.withPreMiddleware( hydrateMiddleware );
        this.TagInternalAPI = new Api.TagInternalAPI(configuration);
        this.TagInternalAPI = this.TagInternalAPI.withPreMiddleware( hydrateMiddleware );
    }
}