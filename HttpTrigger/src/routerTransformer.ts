export const routeTransformer = {
    transformFromUrl: (route: string) => {
      console.log(route);
      if (route.startsWith('/blog')) {
        return `blog-post(${ route.split('/')[2] })`;
      }
      
      return route;
    }
  };