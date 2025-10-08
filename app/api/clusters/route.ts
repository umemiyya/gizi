import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function POST(req: Request) {
  const { nama, trimester, keluhan } = await req.json();

  // --- Definisi Kelompok Penyakit per Cluster ---
  const clusterMap: Record<number, string[]> = {
    0: ["Hiperemesis gravidarum", "Gangguan pencernaan selama kehamilan"],
    1: ["Anemia pada kehamilan", "Kehamilan ektopik", "Gangguan tiroid pada kehamilan"],
    2: ["Preeklampsia", "Retensi cairan", "Edema pada kehamilan"],
  };

  // --- Hitung Kemiripan antara keluhan user dan tiap cluster ---
  const clusterScores = Object.entries(clusterMap).map(([cluster, list]) => {
    const matches = keluhan.filter((k: string) =>
      list.some((d) => k.toLowerCase().includes(d.toLowerCase()))
    ).length;
    return { cluster: Number(cluster), score: matches };
  });

  // --- Tentukan cluster dengan nilai kecocokan tertinggi ---
  const bestCluster =
    clusterScores.sort((a, b) => b.score - a.score)[0]?.cluster ?? 0;

  // --- Query ke Supabase berdasarkan hasil cluster terbaik ---
  const { data, error } = await supabase
    .from("clusters")
    .select("*")
    .eq("trimester", trimester.toString())
    .eq("cluster", bestCluster);

  if (error) {
    console.error("Error fetching data:", error);
  }

  // --- Kelompokkan hasil berdasarkan waktu makan (misal: pagi, siang, malam) ---
  const grouped = (data ?? []).reduce((acc: any, item: any) => {
    if (!acc[item.waktu]) acc[item.waktu] = [];
    acc[item.waktu].push(item);
    return acc;
  }, {});

  return NextResponse.json({
    nama,
    trimester,
    keluhan,
    cluster: bestCluster,
    rekomendasi: grouped,
  });
}
