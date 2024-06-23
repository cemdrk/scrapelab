// types/store.ts

interface ReqHeader {
    key: string,
    value: string,
}

interface AppStore {
    requestHeaders: [ReqHeader] | [],
    dataToBeProcessed: string,
    urlToFetch: string,
    dataExtractModel: string,
    extractedData: object,
    requestMethod: string,
    addRequestHeader: (rh: ReqHeader) => void,
    deleteRequestHeader: (i: number) => void,
    updateReqHeaderKey: (i:number, k:string) => void,
    updateReqHeaderVal: (i:number, v:string) => void,
    updateDataToBeProcessed: (h: string) => void,
    updateUrlToFetch: (u: string) => void,
    updateDataExtractModel: (m: string) => void,
    updateExtractedData: (ed: object) => void,
    updateRequestMethod: (rm: string) => void,
}

export type { ReqHeader, AppStore }
