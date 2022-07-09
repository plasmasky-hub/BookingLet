import { BookingHistory } from './components/BookingHistory/BookingHistory';
import { UserBookingHeader } from './components/Header/Header';

export const UserBookingPage = () => {
    return (
        <div>
            <UserBookingHeader />
            <BookingHistory />
        </div>
    )
};