import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

function Mansion() {
  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          マンション名
        </label>
        <Input 
          placeholder="※ 3文字以上入力でサジ��スト" 
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            広さ (㎡)
          </label>
          <Input type="number" className="w-full" />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            階数
          </label>
          <Select defaultValue="3">
            <SelectTrigger>
              <SelectValue placeholder="階数を選択" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(30)].map((_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}階
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12l-4-4-4 4M12 16V8"
              />
            </svg>
            方位
          </label>
          <Select defaultValue="east">
            <SelectTrigger>
              <SelectValue placeholder="方位を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="east">東向き</SelectItem>
              <SelectItem value="west">西向き</SelectItem>
              <SelectItem value="south">南向き</SelectItem>
              <SelectItem value="north">北向き</SelectItem>
              <SelectItem value="northeast">北東向き</SelectItem>
              <SelectItem value="northwest">北西向き</SelectItem>
              <SelectItem value="southeast">南東向き</SelectItem>
              <SelectItem value="southwest">南西向き</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        className="w-full bg-[#5BA7B3] hover:bg-[#4A96A2] text-white py-6"
      >
        <Search className="w-5 h-5 mr-2" />
        査定する
      </Button>
    </div>
  );
}

export default Mansion;