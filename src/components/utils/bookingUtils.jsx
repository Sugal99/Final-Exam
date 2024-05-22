const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getAllBookings();
        setBookings(bookingsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBookings();
  }, []);
};

if (error) {
  return <div>Error: {error}</div>;
}

export default Bookings;
