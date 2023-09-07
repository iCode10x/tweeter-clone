const Popover = ({ isOpen, onClose, children }: any) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-50 blur"></div>
      <div className="relative z-10 bg-white p-4 rounded-lg shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popover
