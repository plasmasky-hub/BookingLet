import { useGetUserQuery } from "../../store/api/userApi";
import { BookingHistory } from "./components/BookingHistory/BookingHistory";
import { UserBookingHeader } from "./components/Header/Header";

export const UserBookingPage = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const { data, isLoading } = useGetUserQuery(userId);

  if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <UserBookingHeader user={data} />
      <BookingHistory user={data} />
    </div>
  );
};
