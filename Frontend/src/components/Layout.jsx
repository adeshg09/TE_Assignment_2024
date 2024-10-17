import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-center items-center lg:justify-start">
          <Link to="/" className="text-xl font-bold">TE Assignment 2024</Link>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-primary text-primary-foreground mt-8">
        <div className="container mx-auto px-4 py-4 text-center">
          &copy; 2024 TE Assignment. All rights reserved.
        </div>
      </footer>
    </div>
  )
}