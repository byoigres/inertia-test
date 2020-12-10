import { IInertia } from "inertia-node";

declare global {
  
  namespace Express {
    // interface IRenderData {
    //   component: string;
    //   props: object;
    //   pageRest?: any[];
    // }

    // interface IInertia {
    //   setViewData(viewData: object): this;
    //   shareProps(sharedProps: object): this;
    //   setStatusCode(statusCode: number): this;
    //   setHeaders(headers: Array<object>): Function;
    //   render(args: IRenderData): void;
    //   redirect(url: string): void;
    // }
    export interface Request {
      auth: {
        isAuthenticated: boolean;
        credentials: object;
      };
      Inertia: IInertia;
    }
  }

}
export {};