import React from 'react'
import VendorSidebar from '../Layout/VendorSidebar'
import UserSaleBookings from './UserSaleBookings'
import UserRentBookings from './UserRentBookings'

function BookingDetails() {
  return (
    <div>
      <VendorSidebar/>
      <div>
      <div className="mb-8">
        {/* Render UserSaleBookings at the top */}
        <h2 className="text-2xl font-semibold mb-4">Sale Bookings</h2>
        <UserSaleBookings />
      </div>

      <div>
        {/* Render UserRentBookings at the bottom */}
        <h2 className="text-2xl font-semibold mb-4">Rent Bookings</h2>
        <UserRentBookings />
      </div>
    </div>
    </div>
  )
}

export default BookingDetails