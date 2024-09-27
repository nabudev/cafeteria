'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { id: 1, name: 'Espresso', category: 'cafeteria', image: '/placeholder.svg?height=300&width=400&text=Espresso' },
  { id: 2, name: 'Cappuccino', category: 'cafeteria', image: '/placeholder.svg?height=300&width=400&text=Cappuccino' },
  { id: 3, name: 'Latte', category: 'cafeteria', image: '/placeholder.svg?height=300&width=400&text=Latte' },
  { id: 4, name: 'Croissant', category: 'comida', image: '/placeholder.svg?height=300&width=400&text=Croissant' },
  { id: 5, name: 'Sandwich', category: 'comida', image: '/placeholder.svg?height=300&width=400&text=Sandwich' },
  { id: 6, name: 'Pastel', category: 'comida', image: '/placeholder.svg?height=300&width=400&text=Pastel' },
]

export function CafeteriaLandingUpdated() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('todos')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const filteredItems = activeFilter === 'todos' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeFilter)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navbar */}
      <nav className="bg-brown-900 text-white p-4 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Coffee className="h-8 w-8" />
            <span className="text-2xl font-bold">Café Delicia</span>
          </motion.div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <motion.ul
            className={`md:flex space-x-4 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-brown-900 p-4' : 'hidden'} md:relative md:bg-transparent md:p-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <li><button onClick={() => scrollToSection('home')} className="hover:text-amber-300">Inicio</button></li>
            <li><button onClick={() => scrollToSection('menu')} className="hover:text-amber-300">Menú</button></li>
            <li><button onClick={() => scrollToSection('about')} className="hover:text-amber-300">Nosotros</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-300">Contacto</button></li>
          </motion.ul>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative h-screen flex items-center justify-center pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Café interior"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="z-10 text-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bienvenido a Café Delicia
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Descubre el arte del café perfecto
          </motion.p>
          <motion.button
            className="bg-amber-500 text-brown-900 px-6 py-2 rounded-full text-lg font-semibold hover:bg-amber-400 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('menu')}
          >
            Ver Menú
          </motion.button>
        </div>
      </motion.section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Nuestro Menú</h2>
          <div className="mb-8">
            <button
              onClick={() => setActiveFilter('todos')}
              className={`mx-2 px-4 py-2 rounded-full ${activeFilter === 'todos' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('cafeteria')}
              className={`mx-2 px-4 py-2 rounded-full ${activeFilter === 'cafeteria' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
            >
              Cafetería
            </button>
            <button
              onClick={() => setActiveFilter('comida')}
              className={`mx-2 px-4 py-2 rounded-full ${activeFilter === 'comida' ? 'bg-amber-500 text-white' : 'bg-gray-200'}`}
            >
              Comida
            </button>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-amber-100 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600">{item.category === 'cafeteria' ? 'Delicioso café' : 'Exquisita comida'}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-16 bg-brown-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/placeholder.svg?height=600&width=800&text=Nuestra Historia"
              alt="Nuestra Historia"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold mb-6">Nuestra Historia</h2>
            <p className="text-lg mb-4">
              Café Delicia nació de la pasión por el café de calidad y el deseo de crear un espacio acogedor para nuestra comunidad.
            </p>
            <p className="text-lg mb-4">
              Desde nuestros humildes comienzos, nos hemos dedicado a servir el mejor café y a crear momentos inolvidables para nuestros clientes.
            </p>
            <motion.button
              className="bg-brown-700 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-brown-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conoce más
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-amber-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Contáctanos</h2>
          <p className="text-xl mb-12">¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte!</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Ubicación</h3>
              <p>123 Calle del Café, Ciudad</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Teléfono</h3>
              <p>+1 234 567 8900</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-2">Email</h3>
              <p>info@cafedelicia.com</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brown-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Café Delicia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}