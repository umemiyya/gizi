import { createClient } from "@/lib/supabase/client";
import { NextResponse } from "next/server";


const supabase = createClient();

export async function POST(req: Request) {

  const { nama, trimester, keluhan } = await req.json();

  // --- Mapping Keluhan → Cluster ---
  let targetCluster = 0; // default

  if (keluhan?.some((k:any) => ["Anemia", "Wajah pucat"].includes(k))) {
    targetCluster = 0; // cluster zat besi
  } else if (keluhan?.some((k:any) => ["Mudah lesu", "Cepat lelah", "Penurunan berat badan"].includes(k))) {
    targetCluster = 1; // cluster energi
  } else if (keluhan?.some((k:any) => ["Mual", "Muntah", "Kembung", "Nyeri perut", "Timbul bengkak"].includes(k))) {
    targetCluster = 2; // cluster makanan ringan / rendah garam
  }

  // --- Query ke Supabase ---
  const { data } = await supabase
    .from("clusters")
    .select("*")
    .eq("trimester", trimester.toString())
    .eq("cluster", targetCluster);


  // --- Kelompokkan menu berdasarkan waktu ---
  // const rekomendasi = {
  //   pagi: (data ?? []).find((row) => row.waktu.toLowerCase() === "pagi")?.menu || "Tidak ada",
  //   siang: (data ?? []).find((row) => row.waktu.toLowerCase() === "siang")?.menu || "Tidak ada",
  //   malam: (data ?? []).find((row) => row.waktu.toLowerCase() === "malam")?.menu || "Tidak ada",
  //   snack: (data ?? []).find((row) => row.waktu.toLowerCase() === "snack")?.menu || "Tidak ada",
  // };
  const grouped = (data ?? []).reduce((acc, item) => {
  if (!acc[item.waktu]) {
    acc[item.waktu] = [];
  }
  acc[item.waktu].push(item);
  return acc;
  }, {});

  return NextResponse.json({
    nama,
    trimester,
    keluhan,
    cluster: targetCluster,
    rekomendasi: grouped,
  });

  // return (JSON.stringify({
  //   nama,
  //   trimester,
  //   keluhan,
  //   cluster: targetCluster,
  //   rekomendasi: grouped,
  // }));
}
