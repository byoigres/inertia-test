declare module "inertia-node" {
  import * as express from "express";

  interface IRenderData {
    component: string;
    props: object;
    pageRest?: any[];
  }

  interface IInertia {
    setViewData(viewData: object): this;
    shareProps(sharedProps: object): this;
    setStatusCode(statusCode: number): this;
    setHeaders(headers: Array<object>): Function;
    render(args: IRenderData): void;
    redirect(url: string): void;
  }

  interface ViewData {
    title: string;
  }

  function Html(page: object, viewData: ViewData): string;

  function inertia(html: typeof Html, version?: string) : express.RequestHandler;

  // export = inertia;
  export { inertia, IInertia, ViewData };
}
