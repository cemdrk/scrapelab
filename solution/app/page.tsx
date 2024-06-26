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
    customHeadersEnabled,
  }: AppStore = useAppStore();

  const [srcDoc, setSrcDoc] = useState("");

  const showPreview = () => {
    setSrcDoc(dataToBeProcessed);
  };

  const handleFetch = async () => {
    let ch = {};
    if (customHeadersEnabled) {
      ch = requestHeaders.filter((rH) => rH.active === true);
    }
    const res = await httpClient().post(`api/fetchUrl`, {
      targetUrl: urlToFetch,
      method: requestMethod,
      customHeaders: ch,
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

  const prettify = async () => {
    updateDataExtractModel(stringify(parse(dataExtractModel)));
  };

  useEffect(() => {
    applyModel();
    prettify();
    showPreview();
  }, []);

  return (
    <main className="mt-2 flex flex-col justify-between container h-screen">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>

      <Form action="javascript:void(0);">
        <div className="flex mt-5 gap-2">
          <MethodSelect />
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Url to fetch"
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
        <div className="mb-3">
          <Textarea
            rows="10"
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

      <div className="mt-1">
        <div className="flex justify-between mb-2">
          <Label>Data Extract Model (only for html)</Label>
        </div>
        <div className="mb-3">
          <Textarea
            rows="7"
            value={dataExtractModel}
            onChange={(e) => updateDataExtractModel(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button className="w-full" onClick={applyModel}>
            Apply
          </Button>
          <Button className="w-full" onClick={prettify}>
            Prettify
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <Textarea rows="7" value={stringify(extractedData)} readOnly />
      </div>

      <div className="mt-5 mb-5">
        <div className="mb-5">
          <Button className="w-full" onClick={showPreview}>
            Show Preview
          </Button>
        </div>
        <iframe className="w-full border" srcDoc={srcDoc}></iframe>
      </div>

      <Footer />
    </main>
  );
};

export default Home;
