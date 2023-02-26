import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOrder, setSearchOrder] = useState("asc");
  const [sortOrder, setSortOrder] = useState("petName");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then(setAppointmentList);
  }, []);

  useEffect(fetchData, [fetchData]);

  const filteredAppointmentList = appointmentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  filteredAppointmentList.sort((a, b) => {
    const order = searchOrder === "asc" ? 1 : -1;
    return a[sortOrder] > b[sortOrder] ? order * 1 : order * -1;
  });

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />
        Your Appointments
      </h1>
      <AddAppointment
        appointmentList={appointmentList}
        onsendNewAppointment={(theNewAppt) =>
          setAppointmentList([...appointmentList, theNewAppt])
        }
      />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={(theSearchText) => setSearchTerm(theSearchText)}
        sortOrder={sortOrder}
        setSortOrder={(theOrder) => setSortOrder(theOrder)}
        searchOrder={searchOrder}
        setSearchOrder={(theSearch) => setSearchOrder(theSearch)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointmentList.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onSendDeletedElement={(theID) =>
              setAppointmentList(
                appointmentList.filter((item) => item.id !== theID)
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
