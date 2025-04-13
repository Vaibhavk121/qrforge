import { useState } from 'react'

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          QR<span className="text-yellow-300">Forge</span>
        </h1>
        <p className="text-blue-100 mt-2 text-lg">Transform your content into stunning QR codes</p>
      </div>
    </header>
  )
}

export default Header