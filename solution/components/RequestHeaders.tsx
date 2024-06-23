// components/RequestHeaders.tsx

import { type AppStore } from "@/types/store";

import { useState } from "react";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { useAppStore } from "@/store/app";

const RequestHeaders = () => {
  const {
    requestHeaders,
    addRequestHeader,
    deleteRequestHeader,
    updateReqHeaderKey,
    updateReqHeaderVal,
    updateReqHeaderActive,
  }: AppStore = useAppStore();

  const [active, setActive] = useState(true);
  return (
    <>
      <Label>Custom Headers</Label>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={active}
                onCheckedChange={(checked: boolean) => setActive(!!checked)}
              />
              <Label className="ml-1">{active ? "On" : "Off"}</Label>
            </TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="flex justify-end pr-0">
              <Button
                onClick={() =>
                  addRequestHeader({ key: "", value: "", active: true })
                }
              >
                Add
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestHeaders.map((rh, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Checkbox
                  checked={rh.active}
                  onCheckedChange={(checked: boolean) =>
                    updateReqHeaderActive(idx, !!checked)
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  name="rhKey"
                  defaultValue={rh.key}
                  onChange={(e) => updateReqHeaderKey(idx, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="rhVal"
                  defaultValue={rh.value}
                  onChange={(e) => updateReqHeaderVal(idx, e.target.value)}
                />
              </TableCell>
              <TableCell className="flex justify-end">
                <Button onClick={() => deleteRequestHeader(idx)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { RequestHeaders };
