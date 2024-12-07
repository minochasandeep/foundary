import { signOut } from 'next-auth/react';
import { HttpResponse } from './HttpResponse';


export async function http<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  let response: HttpResponse<T> = {} as HttpResponse<T>;
  let actualResponse: any;


  response = await fetch(
    request
  ).then(x => {
    actualResponse = x;
    return actualResponse;
  }).then(x => x.json()).then(x => {
    actualResponse.result = x?.data ? x.data : x;
    actualResponse.message = x?.message;
    actualResponse.validations = x?.validations || [];
    return actualResponse;
  })
    .catch(ex => {
      console.error(ex);
      return Promise.reject(ex?.message);
    });

  if (!response.ok) {
    if (response.status == 401) {
      signOut();
      // localStorage.clear();
      // window.location.href = window.location.origin;
    }
    else if (response.status == 403) {
      console.error("Your role does not allow to perform this action");
    }
    else {
      console.error(response.result ? response.result : response);
    }

    return Promise.reject(response);
  }

  return response;
}


export class HttpWrapper {
  get<T>(
    path: string,
    token?: string,
    params?: any,
    args: RequestInit = {
      method: "get"
    }
  ): Promise<HttpResponse<T>> {
    this.setHeader(args, token);
    if (params && Object.keys(params).length > 0) {
      path += '?';
      Object.keys(params).forEach(key => {
        path += `${key}=${typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]}&`;
      });
      path = path.substring(0, path.length - 1);
    }
    return http<T>(new Request(`path`, args));
  };

  delete<T>(
    path: string,
    body?: any,
    token?: string,
    args: RequestInit = {
      method: "delete",
      body: JSON.stringify(body)
    }
  ): Promise<HttpResponse<T>> {
    this.setHeader(args, token);
    return http<T>(new Request(`${process.env.NEXT_PUBLIC_API_URL}${path}`, args));
  };

  async post<T>(
    path: string,
    body: any,
    token?: string,
    args: RequestInit = {
      method: "post", body: JSON.stringify(body)
    }
  ): Promise<HttpResponse<T>> {
    this.setHeader(args, token);
    return await http<T>(new Request(`${process.env.NEXT_PUBLIC_API_URL}${path}`, args));
  };

  async put<T>(
    path: string,
    body: any,
    token?: string,
    args: RequestInit = {
      method: "put", body: JSON.stringify(body)
    }
  ): Promise<HttpResponse<T>> {
    this.setHeader(args, token);
    return await http<T>(new Request(`${process.env.NEXT_PUBLIC_API_URL}${path}`, args));
  };


  async patch<T>(
    path: string,
    body: any,
    token?: string,
    args: RequestInit = {
      method: "PATCH", body: JSON.stringify(body)
    }
  ): Promise<HttpResponse<T>> {
    this.setHeader(args, token);
    return await http<T>(new Request(`${process.env.NEXT_PUBLIC_API_URL}${path}`, args));
  };

  async getFileByPost(
    path: string,
    body: any,
    token?: string,
    args: RequestInit = {
      method: "post", body: JSON.stringify(body)
    }
  ): Promise<any> {
    this.setHeader(args, token);
    return await fetch(
      new Request(path, args)
    ).then(x => x.arrayBuffer());
  };

  private setHeader(args: RequestInit, token?: string) {
    let headers = new Headers();
    headers.append("Content-Type", 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    args.headers = headers;
  }
}