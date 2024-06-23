// components/MethodSelect.tsx

import { type AppStore } from "@/types/store";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppStore } from "@/store/app";

const MethodSelect = () => {
  const { requestMethod, updateRequestMethod }: AppStore = useAppStore();
  return (
    <Select
      defaultValue={requestMethod}
      onValueChange={(v: string) => updateRequestMethod(v)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="get">GET</SelectItem>
          <SelectItem value="post">POST</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MethodSelect;
