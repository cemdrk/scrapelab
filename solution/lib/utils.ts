// lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { type Header } from "@/types/api";

import { twMerge } from "tailwind-merge"
import { extract as scrapyExtract } from "node-scrapy"
import axios from "axios";
import JSON5 from "json5";

delete axios.defaults.headers.common["Content-Type"];
delete axios.defaults.headers.common["Accept"];


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const httpClient = () => {
  return axios.create()
}

const exportData = (data:string) => {
  const elem = document.createElement("a");
  const blob = new Blob([data], { type: "text/plain" });

  elem.href = URL.createObjectURL(blob);
  elem.download = "source.html";
  document.body.appendChild(elem);
  elem.click();
};

const fetchUrl = async (targetUrl: string, method:string, customHeaders:Header = {}) => {
  // customHeaders -> [ { key: 'Content-Type', value: 'text/html; charset=utf-8' } ]
  const requestConfig = {
    url: targetUrl,
    method: method,
    headers:customHeaders,
    config: {
      timeout: 60_000,
    }
  }
  const response = await httpClient().request(requestConfig);
  return response.data;
}

const extract = (html: string, model: object) => {
  return scrapyExtract(html, model)
}

const stringify = (obj:object) => {
  return JSON5.stringify(obj, { space: 2, quote: '"' });
};

const parse = (_str:string) => {
  return JSON5.parse(_str);
};

export {
  fetchUrl,
  cn,
  extract,
  stringify,
  parse,
  httpClient,
  exportData,
};
