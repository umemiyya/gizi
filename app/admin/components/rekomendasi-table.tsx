import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RekomendasiTable({ rekomendasi }: { rekomendasi: any }) {
  // 🔹 Helper: Normalisasi nama waktu makan
  const normalizeWaktu = (waktu: string) => {
    const lower = waktu.toLowerCase();
    if (lower.includes("pagi")) return "Pagi";
    if (lower.includes("siang")) return "Siang";
    if (lower.includes("malam")) return "Malam";
    if (lower.includes("sarapan")) return "Pagi";
    if (lower.includes("snack")) {
      if (lower.includes("pagi")) return "Pagi";
      if (lower.includes("siang")) return "Siang";
      if (lower.includes("malam")) return "Malam";
      return "Snack";
    }
    return waktu.charAt(0).toUpperCase() + waktu.slice(1);
  };

  // 🔹 Helper: Konversi string angka yang pakai koma jadi number
  const toNumber = (value: any) => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    const cleaned = String(value).replace(",", ".").trim();
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // 🔹 Gabungkan semua data & hilangkan duplikat menu
  const uniqueData = Object.entries(rekomendasi)
    .flatMap(([waktu, items]: [string, any]) =>
      (Array.isArray(items) ? items : []).map((item: any) => ({
        ...item,
        waktu: normalizeWaktu(waktu),
        kalori: toNumber(item.kalori),
        protein: toNumber(item.protein),
        karbo: toNumber(item.karbo),
        lemak: toNumber(item.lemak),
        zat_besi: toNumber(item.zat_besi),
      }))
    )
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.menu === item.menu && t.waktu === item.waktu)
    );

  // 🔹 Kelompokkan kembali berdasarkan waktu
  const grouped = uniqueData.reduce((acc: any, item: any) => {
    if (!acc[item.waktu]) acc[item.waktu] = [];
    acc[item.waktu].push(item);
    return acc;
  }, {});

  // 🔹 Hitung total harian
  const total = uniqueData.reduce(
    (acc: any, item: any) => {
      acc.kalori += item.kalori;
      acc.protein += item.protein;
      acc.karbo += item.karbo;
      acc.lemak += item.lemak;
      acc.zat_besi += item.zat_besi;
      return acc;
    },
    { kalori: 0, protein: 0, karbo: 0, lemak: 0, zat_besi: 0 }
  );

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>
          Rekomendasi menu berdasarkan keluhan & trimester
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Waktu</TableHead>
            <TableHead>Menu</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Kalori (kkal)</TableHead>
            <TableHead>Protein (g)</TableHead>
            <TableHead>Karbo (g)</TableHead>
            <TableHead>Lemak (g)</TableHead>
            <TableHead>Zat Besi (mg)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(grouped).map(([waktu, items]: [string, any]) =>
            items.map((item: any, idx: number) => (
              <TableRow key={`${waktu}-${idx}`}>
                <TableCell className="font-medium">
                  {idx === 0 ? waktu : ""}
                </TableCell>
                <TableCell>{item.menu} <Badge className={item.jenis === "Makanan Utama" ? "bg-green-500" : "bg-yellow-500"}>{item.jenis}</Badge></TableCell>
                <TableCell>{item.jam.split('�').join('-')}</TableCell>
                <TableCell>{item.kalori}</TableCell>
                <TableCell>{item.protein}</TableCell>
                <TableCell>{item.karbo}</TableCell>
                <TableCell>{item.lemak}</TableCell>
                <TableCell>{item.zat_besi}</TableCell>
              </TableRow>
            ))
          )}

          {/* Baris total harian */}
          <TableRow className="font-semibold border-t-2 border-gray-400">
            <TableCell colSpan={2}>Total / Hari</TableCell>
            <TableCell>{total.kalori.toFixed(0)}</TableCell>
            <TableCell>{total.protein.toFixed(1)}</TableCell>
            <TableCell>{total.karbo.toFixed(0)}</TableCell>
            <TableCell>{total.lemak.toFixed(1)}</TableCell>
            <TableCell>{total.zat_besi.toFixed(1)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
