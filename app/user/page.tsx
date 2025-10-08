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
import { RekomendasiTable } from "../admin/components/rekomendasi-table";

// 🔹 Data penyakit & gejala
const penyakitList = [
  {
    nama_penyakit: "Anemia pada kehamilan",
    gejala: [
      "Mudah lesu / cepat lelah",
      "Wajah pucat",
      "Pusing",
      "Anemia",
      "Kulit kering",
    ],
  },
  {
    nama_penyakit: "Hiperemesis gravidarum",
    gejala: [
      "Mual / muntah berat",
      "Penurunan berat badan",
      "Lemas",
      "Dehidrasi",
      "Pusing",
    ],
  },
  {
    nama_penyakit: "Preeklampsia",
    gejala: [
      "Peningkatan berat badan mendadak",
      "Timbul bengkak (edema)",
      "Pusing",
      "Nyeri perut bagian atas",
      "Gangguan penglihatan",
    ],
  },
  {
    nama_penyakit: "Kehamilan ektopik",
    gejala: [
      "Nyeri perut tajam atau menusuk",
      "Pusing",
      "Wajah pucat",
      "Lemas",
      "Perdarahan tidak normal",
    ],
  },
  {
    nama_penyakit: "Gangguan pencernaan selama kehamilan",
    gejala: [
      "Kembung",
      "Nyeri perut ringan",
      "Mual",
      "Rasa penuh di perut",
      "Sulit buang angin",
    ],
  },
  {
    nama_penyakit: "Gangguan tiroid pada kehamilan",
    gejala: [
      "Kulit kering",
      "Mudah lelah",
      "Penurunan atau peningkatan berat badan",
      "Pusing",
      "Wajah pucat",
    ],
  },
];

export default function AdminPage() {
  const [formData, setFormData] = useState<any>({
    nama: "",
    trimester: "",
    keluhan: [],
  });

  const [loading, setLoading] = useState(false);
  const [rekomendasi, setRekomendasi] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // 🔹 Handler input nama
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handler checkbox penyakit
  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newKeluhan = [...formData.keluhan];
    if (checked) {
      newKeluhan.push(value);
    } else {
      newKeluhan = newKeluhan.filter((k) => k !== value);
    }
    setFormData({ ...formData, keluhan: newKeluhan });
  };

  // 🔹 Submit ke API
  const handleSubmit = async () => {
    setError(""); // Reset error
    setLoading(true);

    // ✅ Validasi form sebelum submit
    if (!formData.nama.trim()) {
      setError("Nama harus diisi.");
      setLoading(false);
      return;
    }
    if (!formData.trimester) {
      setError("Silakan pilih trimester terlebih dahulu.");
      setLoading(false);
      return;
    }
    if (formData.keluhan.length === 0) {
      setError("Pilih minimal satu penyakit/gejala yang sesuai.");
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const res = await fetch("/api/clusters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setRekomendasi(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat mengambil data rekomendasi.");
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
                <SelectValue placeholder="Pilih trimester" />
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

          {/* Daftar Penyakit */}
          <div className="flex flex-col gap-4 mt-4">
            <Label>Pilih Penyakit yang Sesuai dengan Gejala Pasien</Label>
            <p className="text-sm text-muted-foreground">
              Centang penyakit yang paling menggambarkan kondisi pasien.
            </p>

            <div className="flex flex-col gap-4">
              {penyakitList.map((penyakit, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                      id={penyakit.nama_penyakit}
                      checked={formData.keluhan.includes(penyakit.nama_penyakit)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          penyakit.nama_penyakit,
                          Boolean(checked)
                        )
                      }
                    />
                    <Label
                      htmlFor={penyakit.nama_penyakit}
                      className="font-semibold text-green-700"
                    >
                      {penyakit.nama_penyakit}
                    </Label>
                  </div>

                  {/* Gejala list (tanpa checkbox) */}
                  <ul className="list-disc pl-8 text-sm text-gray-600">
                    {penyakit.gejala.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Pesan error */}
          {error && (
            <div className="text-red-600 font-medium mt-2 border border-red-300 bg-red-50 p-2 rounded">
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <div className="border-t py-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Berikan Rekomendasi"}
            </Button>
          </div>

          {/* Hasil Rekomendasi */}
          {rekomendasi && (
            <RekomendasiTable rekomendasi={rekomendasi.rekomendasi} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
