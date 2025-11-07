'use client';

import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { use } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

// 🔹 Daftar penyakit (masih disimpan jika dibutuhkan nanti)
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

// 🔹 18 gejala unik hasil penyederhanaan
const semuaGejala = [
  "Mudah lesu / cepat lelah",
  "Pusing",
  "Kulit kering",
  "Penurunan atau peningkatan berat badan",
  "Dehidrasi",
  "Timbul bengkak (edema)",
  "Gangguan penglihatan",
  "Perdarahan tidak normal",
  "Nyeri perut ringan",
  "Rasa penuh di perut",
  "Wajah pucat",
  "Anemia",
  "Mual / muntah berat",
  "Lemas",
  "Nyeri perut bagian atas",
  "Nyeri perut tajam atau menusuk",
  "Kembung",
  "Sulit buang angin",
];

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const supabase = createClient();

  const [formData, setFormData] = useState<any>({
    nama: "",
    usia: "",
    trimester: "",
    gejala: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [nama, setNama] = useState<string>("");

  // 🔹 Handle input teks
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle checkbox gejala
  const handleGejalaChange = (value: string, checked: boolean) => {
    let newGejala = [...formData.gejala];
    if (checked) newGejala.push(value);
    else newGejala = newGejala.filter((g) => g !== value);
    setFormData({ ...formData, gejala: newGejala });
  };

  // 🔹 Submit data ke tabel `gejala`
  const handleSubmit = async () => {
    setError("");
    setLoading(true);

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

    if (!formData.usia || Number(formData.usia) <= 0) {
      setError("Silakan masukkan usia yang valid.");
      setLoading(false);
      return;
    }

    try {
      const userId = Math.floor(Math.random() * (1000 - 7 + 1)) + 7;

      const newData = {
        id: userId,
        nama: nama,
        usia: formData.usia,
        trimester: formData.trimester,
        gejala: formData.gejala.join(", "),
        status: "Belum diverifikasi",
        penyakit: "",
      };

      const { data, error: insertError } = await supabase
        .from("gejala")
        .insert([newData])
        .select();

      if (insertError) {
        console.error(insertError);
        setError("Gagal menambahkan data ke tabel gejala.");
      } else {
        alert("✅ Data berhasil disimpan ke tabel gejala!");
        setFormData({ nama: "", usia: "", trimester: "", gejala: [] });
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat menyimpan data ke Supabase.");
    } finally {
      redirect(`/user/${id}`);
    }
  };

  // 🔹 Ambil nama user dari tabel gejala berdasarkan id
  useEffect(() => {
    const fetchData = async () => {
      const { data: gejala } = await supabase
        .from("gejala")
        .select("*")
        .eq("id", id);

      if (gejala && gejala.length > 0) {
        setNama(gejala[0].nama);
      }
    };
    fetchData();
  }, [id]);

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
              disabled
              value={nama}
              name="nama"
              onChange={handleInputChange}
              placeholder="Masukkan nama!"
            />
          </div>

          {/* Usia */}
          <div className="flex flex-col gap-2 mt-4">
            <Label>Usia</Label>
            <Input
              type="number"
              name="usia"
              value={formData.usia}
              onChange={handleInputChange}
              placeholder="Masukkan usia (dalam tahun)"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {semuaGejala.map((g, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Checkbox
                    id={g}
                    checked={formData.gejala.includes(g)}
                    onCheckedChange={(checked) =>
                      handleGejalaChange(g, Boolean(checked))
                    }
                  />
                  <Label htmlFor={g}>{g}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 font-medium mt-2 border border-red-300 bg-red-50 p-2 rounded">
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <div className="border-t py-4">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Simpan ke Tabel Gejala"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
