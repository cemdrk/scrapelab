// api/fetchUrl/route.ts

import { type CustomHeader, Header } from "@/types/api"

import { fetchUrl } from "@/lib/utils"

interface RequestBody {
    targetUrl: string,
    method: string,
    customHeaders: CustomHeader[],
}

async function POST(request: Request) {
    const { targetUrl, method, customHeaders }:RequestBody = await request.json()

    let h:Header = {}

    if (customHeaders.length) {
        customHeaders.forEach((header: CustomHeader) => {
            h[header.key] = header.value
        });
    }

    const result = await fetchUrl(targetUrl, method, h)
    return new Response(result)
}

export { POST }
