'use client';

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ClustersPage() {
  const [clusters, setClusters] = useState<any>([]);

  // use useEffect to fetch cluster data from supabase db
  useEffect(() => {
    const supabase = createClient();
    const fetchClusters = async () => {
      const { data, error } = await supabase.from('clusters').select('*');
      if (error) {
        console.error('Error fetching clusters:', error);
      } else {
        setClusters(data);
      }
    };
    fetchClusters();
  }, []);

  return (
    <div>
      <Table className="border-green-200">
        <TableCaption>list of clusters</TableCaption>
        <TableHeader>
          <TableRow className="bg-green-50 border-green-200">
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Trimesters</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Menu</TableHead>
            <TableHead>Kalori</TableHead>
            <TableHead>Protein</TableHead>
            <TableHead>Karbo</TableHead>
            <TableHead>Lemak</TableHead>
            <TableHead>Zat Besi</TableHead>
            <TableHead>Cluster</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clusters.map((cluster:any, index:number) => (
            <TableRow className="border-green-200" key={cluster.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{cluster.trimester}</TableCell>
              <TableCell>{cluster.waktu}</TableCell>
              <TableCell>{cluster.menu}</TableCell>
              <TableCell>{cluster.kalori}</TableCell>
              <TableCell>{cluster.protein}</TableCell>
              <TableCell>{cluster.karbo}</TableCell>
              <TableCell>{cluster.lemak}</TableCell>
              <TableCell>{cluster.zat_besi}</TableCell>
              <TableCell>{cluster.cluster}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}