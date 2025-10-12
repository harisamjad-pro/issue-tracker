import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-200'>
      <nav className='text-center p-6'>
        Copyright &copy; {new Date().getFullYear()} Issue Tracker
      </nav>
    </footer>
  )
}
