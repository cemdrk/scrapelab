// api/extract/route.ts

import { extract } from "@/lib/utils"
import { stringify } from "@/lib/utils";

async function POST(request: Request) {
    const { dataToBeProcessed, dataExtractModel } = await request.json()
    const result = extract(dataToBeProcessed, dataExtractModel)
    return new Response(stringify(result))
}

export { POST }
