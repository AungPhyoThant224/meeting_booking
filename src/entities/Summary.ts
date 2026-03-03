export interface UsageSummary {
  id: string;
  name: string;
  _count: {
    bookings: number;
  };
}

export interface GroupedBooking {
  id: string;
  name: string;
  bookings: {
    id: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface SummaryResponseData {
  usageSummary: UsageSummary[];
  groupedBookings: GroupedBooking[];
}