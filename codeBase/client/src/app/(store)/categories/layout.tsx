import React from 'react'

interface CategoriesLayoutProps {
    electronics: React.ReactNode;
    baverage: React.ReactNode;
}

function CategoriesLayout({electronics, baverage}: CategoriesLayoutProps) {
  return (
     <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15 mt-10">
        <div className="w-full mx-auto max-w-10xl px-4 md:px-20 mt-10">
            <h1 className="text-5xl font-bold  mt-10 mb-5">Categories</h1>
        </div>
        <div className="w-full max-w-10xl px-4 md:px-20 mt-10">
            <div className="grid grid-cols-1 gap-4">
                {electronics}
                {baverage}
            </div>
        </div>

     </main>
  )
}

export default CategoriesLayout