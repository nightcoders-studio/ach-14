import fs from 'fs';
import path from 'path';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { FileText, Download, Eye } from 'lucide-react';

export default async function DocumentsPage() {
  // Membaca isi folder public/pdf secara dinamis saat build/render server
  const pdfDirectory = path.join(process.cwd(), 'public', 'pdf');
  let files: string[] = [];

  try {
    files = fs.readdirSync(pdfDirectory).filter(file => file.endsWith('.pdf'));
  } catch (error) {
    console.error("Gagal membaca folder PDF:", error);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Galeri Dokumen (PDF)</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Kumpulan dokumen perencanaan, ide, BMC, Pitch Deck, serta pedoman QA Gampong Alert Hub.
      </p>

      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <FileText className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Tidak ada dokumen PDF yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file, index) => (
            <Card key={index} className="overflow-hidden bg-background/50 backdrop-blur-sm border-white/10 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg leading-tight line-clamp-2" title={file}>
                    {file.replace('.pdf', '')}
                  </CardTitle>
                  <CardDescription className="mt-1.5 font-mono text-xs">PDF Document</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between gap-2 bg-muted/50 p-4 border-t">
                <a 
                  href={`/pdf/${encodeURIComponent(file)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm", className: "w-full gap-2" })}
                >
                  <Eye className="h-4 w-4" /> Lihat
                </a>
                <a 
                  href={`/pdf/${encodeURIComponent(file)}`} 
                  download
                  className={buttonVariants({ variant: "default", size: "sm", className: "w-full gap-2" })}
                >
                  <Download className="h-4 w-4" /> Unduh
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
