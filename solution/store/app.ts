// store/app.ts

import type { ReqHeader, AppStore } from '@/types/store';

import { create } from 'zustand';


const useAppStore = create<AppStore>(set => (
    {
        requestHeaders: [],
        addRequestHeader: (newReqHeader: ReqHeader) => set(state => (
            {
                requestHeaders: [...state.requestHeaders, { ...newReqHeader }]
            }
        )),
        deleteRequestHeader: (index: number) => set(state => (
            {
                requestHeaders: state.requestHeaders.filter((_, i) => i !== index)
            }
        )),
        updateReqHeaderKey: (index:number, k:string) => set(
            state=> (
                {
                    requestHeaders:state.requestHeaders.map((rh,i) => {
                        if (i===index) {
                            rh.key=k
                        }
                        return rh
                    })
                }
            ) 
        ),
        updateReqHeaderVal: (index:number, v:string) => set(
            state=> (
                {
                    requestHeaders:state.requestHeaders.map((rh,i) => {
                        if (i===index) {
                            rh.value=v
                        }
                        return rh
                    })
                }
            ) 
        ),
        dataToBeProcessed: "<a href='localhost'>Test link</a>",

        updateDataToBeProcessed: (h: string) => set(_ => ({ dataToBeProcessed: h })),

        urlToFetch: "",
        updateUrlToFetch: (url: string) => set(_ => ({ urlToFetch: url })),
        dataExtractModel: "{ links: ['a (href|trim)'] }",
        updateDataExtractModel: (model: string) => set(_ => ({ dataExtractModel: model })),

        extractedData: {},
        updateExtractedData: (ed: object) => set(_ => ({ extractedData: { ...ed } })),

        requestMethod: "get",
        updateRequestMethod: (rm:string) => set(_=>({requestMethod:rm})),
    }
))

export { useAppStore };
