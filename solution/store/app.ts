// store/app.ts

import { type ReqHeader, AppStore } from '@/types/store';

import { create } from 'zustand';


const useAppStore = create<AppStore>(set => (
    {
        requestHeaders: [],

        customHeadersEnabled: true,

        addRequestHeader: (newReqHeader: ReqHeader) => set(state => (
            {
                requestHeaders: [...state.requestHeaders, { ...newReqHeader }]
            }
        )),
        deleteRequestHeader: (index: number) => set(state => (
            {
                requestHeaders: state.requestHeaders.filter((_, i:number) => i !== index)
            }
        )),
        updateReqHeaderKey: (index:number, k:string) => set(
            state=> (
                {
                    requestHeaders:state.requestHeaders.map((rh:ReqHeader,i:number) => {
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
                    requestHeaders:state.requestHeaders.map((rh:ReqHeader,i:number) => {
                        if (i===index) {
                            rh.value=v
                        }
                        return rh
                    })
                }
            )
        ),
        updateReqHeaderActive: (index:number, checked:boolean) => set(
            state=> (
                {
                    requestHeaders:state.requestHeaders.map((rh:ReqHeader,i:number) => {
                        if (i===index) {
                            rh.active=checked
                        }
                        return rh
                    })
                }
        )
        ),
        toggleCustomHeadersEnabled: (checked:boolean) => set(
            _=> (
                {
                    customHeadersEnabled: checked
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
