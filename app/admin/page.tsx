'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RekomendasiTable } from "./components/rekomendasi-table";

export default function AdminPage() {
  const [formData, setFormData] = useState<any>({
    nama: "",
    trimester: "",
    keluhan: [],
  });

  const [loading, setLoading] = useState(false);
  const [rekomendasi, setRekomendasi] = useState<any>(null);

  // 🔹 Handler untuk nama
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handler untuk checkbox keluhan
  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newKeluhan = [...formData.keluhan];
    if (checked) {
      newKeluhan.push(value);
    } else {
      newKeluhan = newKeluhan.filter((k) => k !== value);
    }
    setFormData({ ...formData, keluhan: newKeluhan });
  };

  // 🔹 Handler submit ke API
  const handleSubmit = async () => {
    setLoading(true);
    console.log("Form Data Submitted:", formData);
    try {
      const res = await fetch("/api/clusters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Response from API:", data);
      setRekomendasi(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl w-full m-auto shadow-none border-green-200">
      <CardHeader>
        <h2 className="text-md font-semibold">Form Input Data</h2>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          {/* Nama */}
          <div className="flex flex-col gap-2 mt-4">
            <Label>Nama Lengkap</Label>
            <Input
              value={formData.nama}
              name="nama"
              onChange={handleInputChange}
              placeholder="Masukkan nama!"
            />
          </div>

          {/* Trimester */}
          <div className="flex flex-col gap-2 mt-4">
            <Label>Trimester</Label>
            <Select
              value={formData.trimester}
              onValueChange={(value) =>
                setFormData({ ...formData, trimester: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a trimester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Trimester</SelectLabel>
                  <SelectItem value="pertama">Pertama</SelectItem>
                  <SelectItem value="kedua">Kedua</SelectItem>
                  <SelectItem value="ketiga">Ketiga</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Keluhan */}
          <div className="flex flex-col gap-2 mt-4">
            <Label>Keluhan</Label>
            <p className="text-sm py-2 text-muted-foreground">
              Pilih keluhan yang anda rasakan!
            </p>
            <div className="flex flex-col gap-6">
              {[
                "Mudah lesu / Cepat lelah",
                "Penurunan berat badan",
                "Peningkatan berat badan",
                "Timbul bengkak (edema)",
                "Anemia",
                "Pusing",
                "Kembung",
                "Mual / Muntah",
                "Kulit kering",
                "Wajah pucat",
                "Nyeri perut",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Checkbox
                    id={item}
                    checked={formData.keluhan.includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(item, Boolean(checked))
                    }
                  />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="border-t py-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Berikan Rekomendasi"}
            </Button>
          </div>

          {/* Hasil Rekomendasi */}
          {rekomendasi && (<RekomendasiTable rekomendasi={rekomendasi.rekomendasi} />)}
        </div>
      </CardContent>
    </Card>
  );
}
