import React from 'react'
import {X} from 'lucide-react'
import { useData } from '../context/DataContext'

const GoogleCalender = () => {

    const {setShowScheduler}=useData();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
      
      <div className="relative w-full max-w-7xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
  
        <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50 flex-shrink-0">
          <h3 className="font-semibold text-gray-800">
            Schedule a Free Call
          </h3>
  
          <button
            onClick={() => setShowScheduler(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl px-3 py-2 font-medium transition cursor-pointer"
          >
            Close
            <X className="w-4 h-4" />
          </button>
        </div>
  
        <div className="flex-1">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1qBQ8xWguYTLTJPnlXghCByGNqv3KkQonnRzr0TUgV8x1lvrIh-xZMPH_Nzvst3TJe5xnl5o6l?gv=true"
            className="w-full h-full border-0"
            title="Schedule call"
          />
        </div>
  
      </div>
    </div>
  )
}

export default GoogleCalender