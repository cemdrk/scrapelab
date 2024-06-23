"use client";

import { type AppStore } from "@/types/store";

import { useState, useEffect } from "react";

import {
  RequestHeaders,
  ThemeSwitcher,
  Button,
  Form,
  Input,
  Label,
  Textarea,
  Footer,
  MethodSelect,
} from "@/components/index";

import { useAppStore } from "@/store/app";

import { parse, stringify, httpClient, exportData } from "@/lib/utils";

const Home = () => {
  const {
    dataToBeProcessed,
    updateDataToBeProcessed,
    urlToFetch,
    updateUrlToFetch,
    dataExtractModel,
    updateDataExtractModel,
    extractedData,
    updateExtractedData,
    requestMethod,
    requestHeaders,
  }: AppStore = useAppStore();

  const [srcDoc, setSrcDoc] = useState("");

  const showPreview = () => {
    setSrcDoc(dataToBeProcessed);
  };

  const handleFetch = async () => {
    const res = await httpClient().post(`api/fetchUrl`, {
      targetUrl: urlToFetch,
      method: requestMethod,
      customHeaders: requestHeaders.filter((rH) => rH.active === true),
    });
    updateDataToBeProcessed(res.data);
  };

  const applyModel = async () => {
    const res = await httpClient().post(`api/extract`, {
      dataToBeProcessed: dataToBeProcessed,
      dataExtractModel: parse(dataExtractModel),
    });
    updateExtractedData(parse(res.data));
  };

  useEffect(() => {
    applyModel();
    showPreview();
  }, []);

  return (
    <main className="mt-10 container">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>

      <Form action="javascript:void(0);">
        <div className="flex mt-5 gap-2">
          <MethodSelect />
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Url to be fetch"
              defaultValue={urlToFetch}
              onChange={(e) => updateUrlToFetch(e.target.value)}
            />
            <Button onClick={handleFetch}>Fetch</Button>
          </div>
        </div>
        <div className="mt-5">
          <RequestHeaders />
        </div>
      </Form>

      <div className="mt-5">
        <Label>Data To Be Extracted</Label>

        <div>
          <Textarea
            rows="15"
            value={dataToBeProcessed}
            onChange={(e) => updateDataToBeProcessed(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={() => exportData(dataToBeProcessed)}
            className="w-full"
          >
            Download
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between mb-2">
          <Label>Data Extract Model (only for html)</Label>
        </div>
        <div>
          <Textarea
            rows="15"
            value={stringify(parse(dataExtractModel))}
            onChange={(e) => updateDataExtractModel(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button className="w-full" onClick={applyModel}>
            Apply
          </Button>
          <Button
            className="w-full"
            onClick={() =>
              updateDataExtractModel(stringify(parse(dataExtractModel)))
            }
          >
            Prettify
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <Textarea rows="20" value={stringify(extractedData)} readOnly />
      </div>

      <div className="mt-5 mb-5">
        <div className="mb-5">
          <Button className="w-full" onClick={showPreview}>
            Show Preview
          </Button>
        </div>
        <iframe className="w-full" srcDoc={srcDoc}></iframe>
      </div>

      <Footer />
    </main>
  );
};

export default Home;
