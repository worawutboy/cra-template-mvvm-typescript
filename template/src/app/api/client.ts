import axios, { AxiosError, AxiosResponse } from "axios";

import configApi from "../../config";

export default class Client<T> {

    private client = axios.create(configApi.api);
    private controller: string;
    private responseBody = <T>(response: AxiosResponse<T>) => response.data;
    constructor(_controller: string) {
        this.controller = _controller;

        this.client.interceptors.request.use((config) => {
            let user = localStorage.getItem("user") as any;

            if (user) {
                user = JSON.parse(user) as any;
                const token = user.token;
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }


            return config;
        });

        this.client.interceptors.response.use(
            async (response) => {
                // set sleep for testing
                //await sleep(1000);
                return response;
            },
            (error: AxiosError) => {
                const { data, status, config } = error.response!;
                switch (status) {
                    case 400:
                        if (typeof data === "string") {
                            //TODO: set alert here
                        }
                        // TODO: id not found
                        // if (config.method === "get" && false) {
                        // //   history.push("/not-found");
                        // }
                        if (data.errors) {
                            const modalStateErrors = [];
                            for (const key in data.errors) {
                                if (data.errors[key]) {
                                    modalStateErrors.push(data.errors[key]);
                                }
                            }
                            throw modalStateErrors.flat();
                        }
                        break;
                    case 401:
                        //TODO: set alert here
                        console.log("unauthorized");
                        break;
                    case 404:
                        // history.push("/not-found");
                        break;
                    case 500:
                        // store.commonStore.setServerError(data);
                        // history.push("/server-error");
                        break;
                }
                return Promise.reject(error);
            }
        );
    }
    getAll(method: string = "getAll"): Promise<Array<T>> {

        return this.client.get(`${this.controller}/${method}`).then(this.responseBody);

    }
    get(param: { method?: string, id: string; }): Promise<T> {
        if (!param.method) {
            param.method = "get";
        }
        return this.client.get(`${this.controller}/${param.method}/${param.id}`).then(this.responseBody);

    }
    create(param: { method?: string, request: any; }): Promise<T> {
        if (!param.method) {
            param.method = "create";
        }
        return this.client.post(`${this.controller}/${param.method}`, param.request).then(this.responseBody);

    }
    update(param: { method?: string, id: string, request: any; }): Promise<T> {
        if (!param.method) {
            param.method = "update";
        }
        return this.client.put(`${this.controller}/${param.method}/${param.id}`, param.request).then(this.responseBody);
    }
    delete(param: { method?: string, id: string; }): Promise<void> {
        if (!param.method) {
            param.method = "delete";
        }
        return new Promise((resolve, reject) => {
            this.client.delete(`${this.controller}/${param.method}/${param.id}`).then(() => resolve()).catch(err => reject(err));
        });
    }
    blobToBase64(blob: any, callback: (base64: string) => void) {
        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result;

            const base64 = (dataUrl as string).split(',')[1];
            callback(base64);

        };
        reader.readAsDataURL(blob);
    }
    toArrayBuffer(buf: any) {
        const ab = new ArrayBuffer(buf.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }
    download(method: string, request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.post(`${this.controller}${method}`, request, { responseType: 'arraybuffer' }).then((response) => {


                resolve(response.data);
            }).catch(err => {
                reject(err);
            });
        });
    }



}        
