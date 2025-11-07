'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import { RekomendasiTable } from '@/app/admin/components/rekomendasi-table';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const supabase = createClient();

  const [, setNama] = useState<string>('');
  const [gejalas, setGejalas] = useState<any[]>([]);
  const [rekomendasi, setRekomendasi] = useState<Record<number, any>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: gejala, error } = await supabase
        .from('gejala')
        .select('*')
        .eq('id', id);

      if (error) {
        console.error('Error fetching gejala by id:', error);
        return;
      }

      if (gejala && gejala.length > 0) {
        setNama(gejala[0].nama);

        const { data, error: dataError } = await supabase
          .from('gejala')
          .select('*')
          .eq('nama', gejala[0].nama);

        if (dataError) {
          console.error('Error fetching related gejala:', dataError);
          return;
        }

        const filteredData = (data || []).filter(
          (item) => item.id !== parseInt(id)
        );

        setGejalas(filteredData);
      }
    };

    fetchData();
  }, [id]);

  const handleLihatDetail = async (item: any) => {
    const itemId = item.id;

    // klik baris yang sama => collapse
    if (expandedRow === itemId) {
      setExpandedRow(null);
      return;
    }

    setExpandedRow(itemId);
    setLoadingId(itemId);

    try {
      const dataPayload = {
        nama: item.nama,
        trimester: item.trimester,
        keluhan: item.gejala.split(','),
      };

      const res = await fetch('/api/clusters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataPayload),
      });

      if (!res.ok) throw new Error('Gagal mengirim data.');

      const data = await res.json();

      setRekomendasi((prev) => ({
        ...prev,
        [itemId]: data,
      }));
    } catch (err) {
      console.error('Error:', err);
      alert('Terjadi kesalahan saat mengambil rekomendasi.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div>
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={`/user/${id}/add`}
        >
          Gejala Baru
        </Link>
      </div>

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
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    {/* 🔹 Tampilkan usia dari database */}
                    <TableCell className="capitalize">
                      {item.trimester || '-'}
                    </TableCell>
                    <TableCell>{item.usia || '-'}</TableCell>
                    <TableCell>{item.gejala || '-'}</TableCell>
                    <TableCell>{item.penyakit || '-'}</TableCell>
                    <TableCell>{item.status || '-'}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLihatDetail(item)}
                        disabled={item.status === 'Belum diverifikasi'}
                      >
                        {loadingId === item.id
                          ? 'Memuat...'
                          : expandedRow === item.id
                          ? 'Tutup Detail'
                          : 'Lihat Detail'}
                      </Button>
                    </TableCell>
                  </TableRow>

                  {expandedRow === item.id && (
                    <TableRow key={`${item.id}-expanded`}>
                      <TableCell colSpan={7}>
                        {loadingId === item.id ? (
                          <p className="text-gray-500">
                            Memuat hasil rekomendasi...
                          </p>
                        ) : rekomendasi[item.id] ? (
                          <div className="mt-2 space-y-3">
                            <p className="text-sm">
                              <strong>Trimester:</strong>{' '}
                              {rekomendasi[item.id].trimester}
                            </p>
                            <p className="font-semibold">Rekomendasi:</p>
                            <RekomendasiTable
                              rekomendasi={rekomendasi[item.id].rekomendasi}
                            />
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            Tidak ada data rekomendasi.
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
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
