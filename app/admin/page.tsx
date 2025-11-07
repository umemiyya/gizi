'use client';

import { Button } from '@/components/ui/button';
import { use, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const penyakitList = [
  {
    nama_penyakit: "Anemia pada kehamilan",
    gejala: [
      "Mudah lesu / cepat lelah",
      "Wajah pucat",
      "Pusing",
      "Anemia",
      "Kulit kering",
      "Jantung berdebar",
      "Sesak napas ringan",
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
      "Tidak nafsu makan",
      "Mulut terasa kering",
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
      "Tekanan darah tinggi",
      "Sakit kepala berat",
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
      "Nyeri bahu",
      "Pingsan atau hampir pingsan",
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
      "Sering bersendawa",
      "Rasa panas di dada (heartburn)",
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
      "Detak jantung cepat atau lambat",
      "Tangan gemetar",
    ],
  },
  {
    nama_penyakit: "Infeksi saluran kemih (ISK) pada kehamilan",
    gejala: [
      "Sering buang air kecil",
      "Rasa nyeri atau panas saat buang air kecil",
      "Demam ringan",
      "Perut bagian bawah terasa nyeri",
      "Urine berbau tajam",
      "Urine keruh atau bercampur darah",
    ],
  },
  {
    nama_penyakit: "Diabetes gestasional",
    gejala: [
      "Sering haus",
      "Sering buang air kecil",
      "Lelah berlebihan",
      "Penglihatan kabur",
      "Mual ringan",
      "Berat badan meningkat cepat",
    ],
  },
  {
    nama_penyakit: "Infeksi jamur vagina (Candidiasis)",
    gejala: [
      "Gatal di area vagina",
      "Keputihan kental seperti susu",
      "Rasa terbakar saat buang air kecil",
      "Kemerahan di area intim",
      "Bau tidak sedap dari vagina",
    ],
  },
  {
    nama_penyakit: "Hipertensi gestasional",
    gejala: [
      "Tekanan darah tinggi",
      "Sakit kepala terus menerus",
      "Penglihatan kabur",
      "Pembengkakan pada tangan dan kaki",
      "Nyeri di sekitar rusuk atau perut bagian atas",
    ],
  },
  {
    nama_penyakit: "Plasenta previa",
    gejala: [
      "Perdarahan tanpa nyeri pada trimester ketiga",
      "Kontraksi ringan",
      "Rasa tertekan di panggul",
      "Anemia akibat kehilangan darah",
    ],
  },
  {
    nama_penyakit: "Solusio plasenta",
    gejala: [
      "Nyeri perut hebat",
      "Perdarahan vagina",
      "Rahim terasa keras",
      "Gerakan janin berkurang",
      "Syok atau tekanan darah rendah",
    ],
  },
  {
    nama_penyakit: "Infeksi TORCH",
    gejala: [
      "Demam ringan",
      "Ruam di kulit",
      "Pembengkakan kelenjar getah bening",
      "Sakit tenggorokan",
      "Nyeri otot",
    ],
  },
];


export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const supabase = createClient();

  const [gejalas, setGejalas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error: dataError } = await supabase
        .from('gejala')
        .select('*');

      if (dataError) {
        console.error('Error fetching related gejala:', dataError);
        return;
      }

      const filteredData = (data || []).filter((item) => item.gejala !== '');
      setGejalas(filteredData);
    };
    fetchData();
  }, [id, supabase]);

  // Fungsi update ke database
  const handleSave = async (itemId: string, penyakit: string) => {
    const { error } = await supabase
      .from('gejala')
      .update({
        penyakit: penyakit,
        status: 'Terverifikasi',
      })
      .eq('id', itemId);

    if (error) {
      console.error('Gagal update:', error);
      alert('Gagal menyimpan perubahan!');
    } else {
      alert('Berhasil disimpan dan diverifikasi!');
      // Refresh tampilan
      setGejalas((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, penyakit, status: 'Terverifikasi' } : item
        )
      );
    }
  };

  return (
    <div>
      <div className="mt-8">
        <Label className="font-semibold text-green-700 mb-2 block">
          Hasil Data Pasien:
        </Label>

        <Table>
          <TableCaption>
            Data hasil rekomendasi berdasarkan input gejala
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {/* 🔹 Tambahkan kolom usia */}
              <TableHead>Trimester</TableHead>
              <TableHead>Usia</TableHead>
              <TableHead>Gejala</TableHead>
              <TableHead>Penyakit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gejalas.length > 0 ? (
              gejalas.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>

                  {/* 🔹 Menampilkan usia */}

                  <TableCell className="capitalize">
                    {item.trimester || '-'}
                  </TableCell>

                  <TableCell>{item.usia || '-'}</TableCell>
                  {/* 🔹 Gejala sebagai daftar <ul> */}
                  <TableCell>
                    {item.gejala ? (
                      <ul className="list-disc ml-4">
                        {item.gejala.split(',').map((g: string, i: number) => (
                          <li key={i}>{g.trim()}</li>
                        ))}
                      </ul>
                    ) : (
                      '-'
                    )}
                  </TableCell>

                  <TableCell>
                    <Select
                      value={item.penyakit || ''}
                      onValueChange={(val) =>
                        setGejalas((prev) =>
                          prev.map((g) =>
                            g.id === item.id ? { ...g, penyakit: val } : g
                          )
                        )
                      }
                      disabled={item.status === 'Terverifikasi'}
                    >
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Pilih penyakit" />
                      </SelectTrigger>
                      <SelectContent>
                        {penyakitList.map((p) => (
                          <SelectItem key={p.nama_penyakit} value={p.nama_penyakit}>
                            {p.nama_penyakit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>{item.status || '-'}</TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={
                        item.status === 'Terverifikasi' || !item.penyakit
                      }
                      onClick={() => handleSave(item.id, item.penyakit)}
                    >
                      Simpan
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  Tidak ada data gejala ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
