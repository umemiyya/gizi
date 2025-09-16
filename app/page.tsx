import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Apple, Shield, Users, Star, ArrowRight, Baby, Utensils, CheckCircle } from "lucide-react"
import { AuthButton } from "@/components/auth-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Baby className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NutriMama</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fitur
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimoni
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Tentang
            </a>
          </nav>
          <AuthButton/>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Heart className="w-3 h-3 mr-1" />
                  Dipercaya oleh 50.000+ ibu hamil
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Nutrisi Terbaik untuk Perjalanan Kehamilan:
                  <span className="text-primary"> Rekomendasi Personal</span> untuk Ibu Hamil
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                  Temukan rekomendasi makanan yang disesuaikan dengan kebutuhan Anda, pantau nutrisi harian, dan dukung
                  perkembangan bayi dengan panduan ahli sepanjang kehamilan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Mulai Perjalanan Anda
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Gratis untuk memulai
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Saran dari ahli
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Dipersonalisasi untuk Anda
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <img
                  src="/happy-pregnant-woman-eating-healthy-colorful-salad.jpg"
                  alt="Happy pregnant woman enjoying healthy food"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Apple className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Rekomendasi Hari Ini</p>
                    <p className="text-xs text-muted-foreground">Mangkuk Bayam & Quinoa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Semua yang Anda Butuhkan untuk Kehamilan Sehat
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Platform komprehensif kami menyediakan panduan nutrisi personal yang disesuaikan dengan perjalanan
              kehamilan unik Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Rencana Makan Personal</CardTitle>
                <CardDescription>
                  Dapatkan rekomendasi makanan yang disesuaikan berdasarkan trimester, preferensi diet, dan kebutuhan
                  nutrisi Anda.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Keamanan Utama</CardTitle>
                <CardDescription>
                  Pelajari makanan apa yang harus dihindari dan dapatkan peringatan tentang risiko potensial untuk
                  menjaga keamanan Anda dan bayi.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Pelacakan Nutrisi</CardTitle>
                <CardDescription>
                  Pantau asupan vitamin dan mineral penting yang krusial untuk perkembangan bayi Anda.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Dukungan Ahli</CardTitle>
                <CardDescription>
                  Akses saran dari ahli gizi dan nutrisionis terdaftar yang mengkhususkan diri dalam perawatan prenatal.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Baby className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Panduan Trimester</CardTitle>
                <CardDescription>
                  Terima rekomendasi khusus tahap yang beradaptasi seiring perkembangan kehamilan Anda.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Perpustakaan Resep</CardTitle>
                <CardDescription>
                  Jelajahi ribuan resep aman untuk kehamilan dengan informasi nutrisi yang detail.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Dicintai oleh Ibu Hamil di Mana-mana</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Bergabunglah dengan ribuan wanita yang mempercayai NutriMama untuk perjalanan nutrisi kehamilan mereka.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  NutriMama membantu saya menavigasi kehamilan pertama dengan percaya diri. Rencana makan personal
                  benar-benar mengubah segalanya!
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sarah M.</p>
                    <p className="text-xs text-muted-foreground">Ibu baru pertama kali</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  Saran ahli dan peringatan keamanan memberikan ketenangan pikiran sepanjang perjalanan kehamilan
                  saya.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">JL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Jessica L.</p>
                    <p className="text-xs text-muted-foreground">Ibu dari dua anak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  Saya suka bagaimana aplikasi ini beradaptasi dengan setiap trimester. Saran resepnya lezat dan
                  bergizi!
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Maria R.</p>
                    <p className="text-xs text-muted-foreground">Ibu hamil</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Siap Memulai Perjalanan Kehamilan Sehat Anda?
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Bergabunglah dengan ribuan ibu hamil yang mempercayai NutriMama untuk panduan nutrisi personal. Mulai uji
              coba gratis Anda hari ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Mulai Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Unduh Aplikasi
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Tidak perlu kartu kredit • Uji coba gratis 14 hari • Batal kapan saja
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">NutriMama</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Memberdayakan ibu hamil dengan panduan nutrisi personal untuk perjalanan kehamilan yang sehat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produk</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Harga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Aplikasi Mobile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Resep
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Dukungan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Pusat Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Hubungi Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Saran Ahli
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Komunitas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Syarat Layanan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 NutriMama. Semua hak dilindungi. Dibuat dengan ❤️ untuk ibu hamil.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
