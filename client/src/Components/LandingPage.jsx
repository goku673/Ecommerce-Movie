import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Play } from 'lucide-react'

// Importa las imágenes
import seya from '../image/seya.jpg'
import demon from '../image/demon.jpg'
import boku from '../image/boku.jpg'
import naruto from '../image/naruto.jpg'

const images = [
  {
    src: seya,
    alt: "Saint Seiya",
    title: "Saint Seiya"
  },
  {
    src: demon,
    alt: "Demon Slayer",
    title: "Demon Slayer"
  },
  {
    src: boku,
    alt: "Boku no Hero",
    title: "Boku no Hero"
  },
  {
    src: naruto,
    alt: "Naruto",
    title: "Naruto"
  }
]

const  LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Vista Móvil */}
      <div className="lg:hidden flex flex-col items-center px-4 py-8 space-y-8">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
          <img
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
        
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
            Las mejores películas de anime al mejor precio
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Disfruta de una amplia colección de anime en alta calidad. Nuevos títulos agregados semanalmente.
          </p>
          <Link to="/home" className="block">
            <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium transition-all duration-200 flex items-center justify-center">
              <Play className="mr-2 h-4 w-4" /> Comenzar ahora
            </button>
          </Link>
        </div>
      </div>

      {/* Vista Desktop */}
      <div className="hidden lg:flex min-h-screen">
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-xl space-y-8">
            <h1 className="text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
              Las mejores películas de anime al mejor precio
            </h1>
            <p className="text-gray-400 text-lg">
              Disfruta de una amplia colección de anime en alta calidad. Nuevos títulos agregados semanalmente.
            </p>
            <div className="flex gap-4">
              <Link to="/home">
                <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium transition-all duration-200 flex items-center">
                  <Play className="mr-2 h-4 w-4" /> Comenzar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 relative p-12">
          <div className="grid grid-cols-2 gap-4 h-full">
            {images.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl group shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;