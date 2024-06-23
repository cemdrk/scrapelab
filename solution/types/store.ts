// types/store.ts

interface ReqHeader {
    key: string,
    value: string,
    active: boolean,
}

interface AppStore {
    requestHeaders: [ReqHeader] | [],
    dataToBeProcessed: string,
    urlToFetch: string,
    dataExtractModel: string,
    extractedData: object,
    requestMethod: string,
    customHeadersEnabled: boolean,
    addRequestHeader: (rh: ReqHeader) => void,
    deleteRequestHeader: (i: number) => void,
    updateReqHeaderKey: (i:number, k:string) => void,
    updateReqHeaderVal: (i:number, v:string) => void,
    updateReqHeaderActive: (i:number, c:boolean) => void,
    updateDataToBeProcessed: (h: string) => void,
    updateUrlToFetch: (u: string) => void,
    updateDataExtractModel: (m: string) => void,
    updateExtractedData: (ed: object) => void,
    updateRequestMethod: (rm: string) => void,
    toggleCustomHeadersEnabled: (b: boolean) => void,
}

export type { ReqHeader, AppStore }
