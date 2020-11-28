import { Options } from 'http-proxy-middleware';
import { ParsedUrlQueryInput } from 'querystring';

export interface Config {
  allowedDomains: string[];
  proxies: Proxy[];
}

export interface Proxy extends Options {
  route: string;
  allowedMethods: string[];
  queryparams?: ParsedUrlQueryInput;
  allowedDomains?: string[];
}

const config: Config = {
  allowedDomains: ['https://prewsh.github.io/git-profile'],
  proxies: [
    {
      route: '/graphql',
      allowedMethods: ['POST'],
      target: 'https://api.github.com/graphql',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        query: `
        query { 
            viewer {
                login
                bio
                email
                avatarUrl
                following {
                    totalCount
                  }
                followers {
                    totalCount
                  }
                name
                websiteUrl
                twitterUsername
                repositories(orderBy: {field: CREATED_AT, direction: DESC}, first: 20) {
                  nodes {
                    name
                    description
                  }
                }
              }
          }
        `
    })
    },
  ],
};

export default config;
