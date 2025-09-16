import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectTrimester() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a trimester" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Trimester</SelectLabel>
          <SelectItem value="1">Pertama</SelectItem>
          <SelectItem value="2">Kedua</SelectItem>
          <SelectItem value="3">Ketiga</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
