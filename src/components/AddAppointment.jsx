import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

const AddAppointment = ({ appointmentList, onsendNewAppointment }) => {
  const [toggleApptSection, setToggleApptSection] = useState(false);

  const clearAppointment = {
    id: "",
    petName: "",
    ownerName: "",
    aptNotes: "",
    aptDate: "",
    aptTime: "",
  };

  const [newAppointment, setNewAppointment] = useState(clearAppointment);

  const lastID = appointmentList.reduce((accumVal, currentVal) => {
    return Number(accumVal.id) > Number(currentVal.id)
      ? accumVal.id
      : currentVal.id;
  }, 0);

  const appointmentFunc = () => {
    const builtAppointment = {
      id: lastID + 1,
      petName: newAppointment.petName,
      ownerName: newAppointment.ownerName,
      aptNotes: newAppointment.aptNotes,
      aptDate: `${newAppointment.aptDate} ${newAppointment.aptTime}`,
    };

    onsendNewAppointment(builtAppointment);
    setNewAppointment(clearAppointment);
    setToggleApptSection(!toggleApptSection);
  };

  return (
    <div>
      <button
        className="bg-blue-400 text-white px-2 py-3 w-full text-left rounded-t-md"
        onClick={() => setToggleApptSection(!toggleApptSection)}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add
          Appointment
        </div>
      </button>

      {toggleApptSection && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Owner Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="ownerName"
                id="ownerName"
                value={newAppointment.ownerName}
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    ownerName: event.target.value,
                  })
                }
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Pet Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="petName"
                id="petName"
                value={newAppointment.petName}
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    petName: event.target.value,
                  })
                }
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="date"
                name="aptDate"
                id="aptDate"
                value={newAppointment.aptDate}
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    aptDate: event.target.value,
                  })
                }
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="time"
                name="aptTime"
                id="aptTime"
                value={newAppointment.aptTime}
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    aptTime: event.target.value,
                  })
                }
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptNotes"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Appointment Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                id="aptNotes"
                name="aptNotes"
                rows="3"
                value={newAppointment.aptNotes}
                onChange={(event) =>
                  setNewAppointment({
                    ...newAppointment,
                    aptNotes: event.target.value,
                  })
                }
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Detailed comments about the condition"
              ></textarea>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={appointmentFunc}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
