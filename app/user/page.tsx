'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useMemo } from "react";
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
    gejala: ["Mudah lesu / cepat lelah", "Wajah pucat", "Pusing", "Anemia", "Kulit kering"],
  },
  {
    nama_penyakit: "Hiperemesis gravidarum",
    gejala: ["Mual / muntah berat", "Penurunan berat badan", "Lemas", "Dehidrasi", "Pusing"],
  },
  {
    nama_penyakit: "Preeklampsia",
    gejala: ["Peningkatan berat badan mendadak", "Timbul bengkak (edema)", "Pusing", "Nyeri perut bagian atas", "Gangguan penglihatan"],
  },
  {
    nama_penyakit: "Kehamilan ektopik",
    gejala: ["Nyeri perut tajam atau menusuk", "Pusing", "Wajah pucat", "Lemas", "Perdarahan tidak normal"],
  },
  {
    nama_penyakit: "Gangguan pencernaan selama kehamilan",
    gejala: ["Kembung", "Nyeri perut ringan", "Mual", "Rasa penuh di perut", "Sulit buang angin"],
  },
  {
    nama_penyakit: "Gangguan tiroid pada kehamilan",
    gejala: ["Kulit kering", "Mudah lelah", "Penurunan atau peningkatan berat badan", "Pusing", "Wajah pucat"],
  },
];

export default function AdminPage() {
  const [formData, setFormData] = useState<any>({
    nama: "",
    trimester: "",
    gejala: [],
  });

  const [loading, setLoading] = useState(false);
  const [rekomendasi, setRekomendasi] = useState<any>(null);
  const [error, setError] = useState<string>("");

  // 🔹 Semua gejala unik
  const semuaGejala = useMemo(() => {
    const all: string[] = [];
    penyakitList.forEach((p) => all.push(...p.gejala));
    return [...new Set(all)];
  }, []);

  // 🔹 Hitung kemiripan penyakit
  const penyakitCocok = useMemo(() => {
    if (formData.gejala.length === 0) return [];
    return penyakitList
      .map((p) => {
        const matchCount = p.gejala.filter((g) => formData.gejala.includes(g)).length;
        const similarity = Math.round((matchCount / p.gejala.length) * 100);
        return { ...p, matchCount, similarity };
      })
      .filter((p) => p.matchCount > 0)
      .sort((a, b) => b.similarity - a.similarity);
  }, [formData.gejala]);

  // 🔹 Input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGejalaChange = (value: string, checked: boolean) => {
    let newGejala = [...formData.gejala];
    if (checked) newGejala.push(value);
    else newGejala = newGejala.filter((g) => g !== value);
    setFormData({ ...formData, gejala: newGejala });
  };

  // 🔹 Submit — kirim penyakit dengan similarity tertinggi
  const handleSubmit = async () => {
    setError("");
    setLoading(true);

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
    if (formData.gejala.length === 0) {
      setError("Pilih minimal satu gejala.");
      setLoading(false);
      return;
    }

    if (penyakitCocok.length === 0) {
      setError("Tidak ditemukan penyakit yang mirip dengan gejala yang dipilih.");
      setLoading(false);
      return;
    }

    // 🔹 Ambil nilai similarity tertinggi
    const maxSimilarity = penyakitCocok[0].similarity;
    const penyakitTertinggi = penyakitCocok.filter((p) => p.similarity === maxSimilarity);

    const payload = {
      nama: formData.nama,
      trimester: formData.trimester,
      gejala: formData.gejala,
      hasil_rekomendasi: penyakitTertinggi.map((p) => ({
        nama_penyakit: p.nama_penyakit,
        similarity: p.similarity,
        gejala_cocok: p.matchCount,
      })),
    };

    try {
      console.log("📤 Mengirim penyakit tertinggi ke /api/clusters:", payload);
      
      const dataPayload = {
        nama: formData.nama,
        trimester: formData.trimester,
        keluhan: formData.gejala,
      }

      const res = await fetch("/api/clusters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPayload),
      });

      if (!res.ok) throw new Error("Gagal mengirim data.");

      const data = await res.json();
      setRekomendasi(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat mengirim data ke API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl w-full m-auto shadow-none border-green-200">
      <CardHeader>
        <h2 className="text-md font-semibold">Form Input Data Gejala Pasien</h2>
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

          {/* Pilih Gejala */}
          <div className="flex flex-col gap-4 mt-4">
            <Label>Pilih Gejala yang Dirasakan</Label>
            <p className="text-sm text-muted-foreground">
              Centang semua gejala yang sesuai dengan kondisi pasien.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {semuaGejala.map((g, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox
                    id={g}
                    checked={formData.gejala.includes(g)}
                    onCheckedChange={(checked) => handleGejalaChange(g, Boolean(checked))}
                  />
                  <Label htmlFor={g}>{g}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Hasil Penyakit Mirip */}
          {penyakitCocok.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <Label className="font-semibold text-green-700">
                Kemungkinan Penyakit yang Mirip:
              </Label>
              <ul className="mt-2 space-y-3">
                {penyakitCocok.map((p, i) => (
                  <li key={i} className="border p-3 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{p.nama_penyakit}</p>
                      <span
                        className={`text-sm font-semibold ${
                          p.similarity >= 80
                            ? "text-green-600"
                            : p.similarity >= 60
                            ? "text-yellow-600"
                            : "text-gray-500"
                        }`}
                      >
                        {p.similarity}% cocok
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {p.matchCount} dari {p.gejala.length} gejala cocok
                    </p>
                    <ul className="list-disc pl-6 text-sm text-gray-600 mt-1">
                      {p.gejala.map((g, j) => (
                        <li
                          key={j}
                          className={
                            formData.gejala.includes(g)
                              ? "text-green-700 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {g}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-red-600 font-medium mt-2 border border-red-300 bg-red-50 p-2 rounded">
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <div className="border-t py-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Kirim Rekomendasi"}
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
