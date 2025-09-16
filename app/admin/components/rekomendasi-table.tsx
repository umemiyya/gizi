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
  return (
    <div className="mt-6">
      <Table>
        <TableCaption>Rekomendasi menu berdasarkan keluhan & trimester</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Waktu</TableHead>
            <TableHead>Menu</TableHead>
            <TableHead>Kalori</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(rekomendasi).map(([waktu, items]: [string, any]) =>
            Array.isArray(items) ? (
              items.map((item: any, idx: number) => (
                <TableRow key={`${waktu}-${idx}`}>
                  <TableCell className="font-medium">{waktu}</TableCell>
                  <TableCell>{item.menu}</TableCell>
                  <TableCell>{item.kalori} kkal</TableCell>
                </TableRow>
              ))
            ) : null
          )}
        </TableBody>
      </Table>
    </div>
  );
}
