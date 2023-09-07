'use client'
import React, { useState } from 'react'
import Popover from '@/components/popOver'

function App() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const openPopover = () => {
    setIsPopoverOpen(true)
  }

  const closePopover = () => {
    setIsPopoverOpen(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={openPopover}
      >
        Open Popover
      </button>

      <Popover isOpen={isPopoverOpen} onClose={closePopover}>
        <div>
          <h1 className="text-lg font-semibold mb-2">Popover Content</h1>
          <p>This is the content of the popover.</p>
        </div>
      </Popover>
    </div>
  )
}

export default App
