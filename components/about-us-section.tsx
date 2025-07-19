"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Heart, Shield, Award, TrendingUp, MessageCircle, Star, Smartphone } from "lucide-react"

const stats = [
  { icon: Users, label: "Clientes Satisfechos", value: "1000+", color: "blue" },
  { icon: Award, label: "Año en el Mercado", value: "1+", color: "purple" },
  { icon: Smartphone, label: "Productos Vendidos", value: "500+", color: "green" },
  { icon: Star, label: "Calificación Promedio", value: "4.9", color: "yellow" },
]

const values = [
  {
    icon: Shield,
    title: "Confiabilidad",
    description: "Productos originales con garantía oficial y respaldo total.",
    color: "blue",
  },
  {
    icon: Heart,
    title: "Pasión por la Tecnología",
    description: "Amamos lo que hacemos y eso se refleja en nuestro servicio.",
    color: "red",
  },
  {
    icon: Target,
    title: "Enfoque al Cliente",
    description: "Tu satisfacción es nuestra prioridad número uno.",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Innovación Constante",
    description: "Siempre a la vanguardia de las últimas tendencias tecnológicas.",
    color: "purple",
  },
]

const testimonials = [
  {
    name: "María González",
    role: "Cliente Frecuente",
    content: "Excelente atención y productos de calidad. Siempre encuentro lo que busco a los mejores precios.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Empresario",
    content: "Compré varios equipos para mi empresa. Servicio impecable y entrega puntual. Muy recomendable.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Estudiante",
    content: "Me ayudaron a encontrar el iPhone perfecto dentro de mi presupuesto. Atención personalizada increíble.",
    rating: 5,
  },
]

const timeline = [
  {
    year: "2024",
    title: "Fundación de TecnoCore",
    description: "Iniciamos nuestro camino con la visión de democratizar el acceso a la tecnología de calidad.",
  },
  {
    year: "2024",
    title: "Primeros 100 Clientes",
    description: "Alcanzamos nuestros primeros 100 clientes satisfechos, construyendo una base sólida de confianza.",
  },
  {
    year: "2025",
    title: "Expansión de Catálogo",
    description: "Ampliamos nuestro catálogo incluyendo las últimas novedades en smartphones y accesorios.",
  },
]

export function AboutUsSection() {
  const handleWhatsAppContact = () => {
    const phoneNumber = "5493413887729"
    const message = "¡Hola! Me gustaría conocer más sobre TecnoCore y sus servicios. ¡Gracias!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="nosotros" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">🏢 Conoce Nuestra Historia</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Sobre{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Nosotros</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Somos más que una tienda de tecnología. Somos tu socio confiable en el mundo digital, comprometidos con
            brindarte la mejor experiencia de compra.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="mb-4 bg-purple-100 text-purple-700">📖 Nuestra Historia</Badge>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Un Año de Crecimiento y Confianza</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                En TecnoCore, llevamos un año posicionándonos como uno de los negocios más grandes y confiables en la
                venta de smartphones, tablets y accesorios tecnológicos en Rosario.
              </p>
              <p>
                Nuestra pasión por la tecnología y el compromiso inquebrantable con nuestros clientes nos han permitido
                crecer exponencialmente y consolidarnos como líderes en el mercado local.
              </p>
              <p>
                Cada producto que vendemos viene respaldado por nuestra garantía de calidad y un servicio al cliente que
                va más allá de la venta, construyendo relaciones duraderas basadas en la confianza.
              </p>
            </div>
            <Button
              onClick={handleWhatsAppContact}
              className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Conoce Más Sobre Nosotros
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold mb-4">TecnoCore</h4>
                <p className="text-blue-100 mb-6">Tu tienda de confianza en tecnología</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-lg">2024</div>
                    <div className="text-blue-100">Fundación</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-lg">Rosario</div>
                    <div className="text-blue-100">Ubicación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700">💎 Nuestros Valores</Badge>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Lo Que Nos Define</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Estos son los pilares fundamentales que guían cada decisión y acción en TecnoCore
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-${value.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <value.icon className={`w-8 h-8 text-${value.color}-600`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-700">🚀 Nuestro Camino</Badge>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Historia de Crecimiento</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Un recorrido por los hitos más importantes de TecnoCore
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mr-6"></div>
                <div className="flex-1">
                  <Card className="border-0 shadow-lg bg-white">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <Card className="mb-20 border-0 shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Nuestra Comunidad</h3>
            <div className="max-w-3xl mx-auto space-y-4 text-purple-100 text-lg leading-relaxed">
              <p>
                En TecnoCore, no solo vendemos tecnología, sino que también construimos una comunidad vibrante de
                entusiastas de la tecnología.
              </p>
              <p>
                Nuestros clientes son parte de nuestra familia, y nos enorgullece brindar un servicio personalizado que
                va más allá de sus expectativas.
              </p>
              <p>
                Únete a nuestra comunidad y mantente al día con las últimas novedades, ofertas especiales y consejos
                tecnológicos exclusivos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={handleWhatsAppContact}
                className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Únete a Nuestro Grupo
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Síguenos en Redes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">⭐ Testimonios</Badge>
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Lo Que Dicen Nuestros Clientes</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestro mayor logro
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-4xl font-bold mb-4">¿Listo para Ser Parte de TecnoCore?</h3>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
              Únete a nuestra familia de clientes satisfechos y descubre por qué somos la opción preferida en tecnología
              en Rosario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsAppContact}
                className="bg-white text-green-600 hover:bg-green-50 font-semibold text-lg px-8 py-3"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contáctanos Ahora
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent text-lg px-8 py-3"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Ver Productos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
