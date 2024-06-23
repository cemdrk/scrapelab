// api/fetchUrl/route.ts

import { type CustomHeader, Header } from "@/types/api"

import { fetchUrl } from "@/lib/utils"


async function POST(request: Request) {
    const { targetUrl, method, customHeaders } = await request.json()

    const h: Header = {}
    customHeaders.forEach((header: CustomHeader) => {
        h[header.key] = header.value
    });

    const result = await fetchUrl(targetUrl, method, h)
    return new Response(result)
}

export { POST }
