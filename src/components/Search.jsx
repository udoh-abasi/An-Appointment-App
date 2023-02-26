import { useEffect, useRef, useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({
  sortOrder,
  setSortOrder,
  searchOrder,
  setSearchOrder,
  petNameRef,
  ownerNameRef,
  dateRef,
  ascOrderRef,
  descOrderRef,
}) => {
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          ref={petNameRef}
          onClick={() => setSortOrder("petName")}
        >
          Pet Name {sortOrder === "petName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          ref={ownerNameRef}
          onClick={() => setSortOrder("ownerName")}
        >
          Owner Name {sortOrder === "ownerName" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          ref={dateRef}
          onClick={() => setSortOrder("aptDate")}
        >
          Date {sortOrder === "aptDate" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
          role="menuitem"
          onClick={() => setSearchOrder("asc")}
          ref={ascOrderRef}
        >
          Asc {searchOrder === "asc" && <BiCheck />}
        </div>
        <div
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
          role="menuitem"
          ref={descOrderRef}
          onClick={() => setSearchOrder("des")}
        >
          Desc {searchOrder === "des" && <BiCheck />}
        </div>
      </div>
    </div>
  );
};

const Search = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  searchOrder,
  setSearchOrder,
}) => {
  const [dropdownToggle, setDropdownToggle] = useState(false);

  const trackOutsideClicksRef = useRef(false);
  const petNameRef = useRef();
  const ownerNameRef = useRef();
  const dateRef = useRef();
  const ascOrderRef = useRef();
  const descOrderRef = useRef();

  useEffect(() => {
    const toggleOffSort = (event) => {
      console.log(trackOutsideClicksRef);
      if (
        trackOutsideClicksRef.current &&
        trackOutsideClicksRef.current.contains(event.target)
      ) {
        setDropdownToggle(true);
      }

      if (petNameRef.current && petNameRef.current.contains(event.target)) {
        setSortOrder("petName");
      }

      if (ownerNameRef.current && ownerNameRef.current.contains(event.target)) {
        setSortOrder("ownerName");
      }

      if (dateRef.current && dateRef.current.contains(event.target)) {
        setSortOrder("aptDate");
      }

      if (ascOrderRef.current && ascOrderRef.current.contains(event.target)) {
        setSearchOrder("asc");
      }

      if (descOrderRef.current && descOrderRef.current.contains(event.target)) {
        setSearchOrder("des");
      }
      setDropdownToggle(false);
      return document.removeEventListener("mousedown", toggleOffSort);
    };
    document.addEventListener("mousedown", toggleOffSort);

    return () => document.removeEventListener("mousedown", toggleOffSort);
  }, [dropdownToggle]);

  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div>
            <button
              type="button"
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setDropdownToggle(!dropdownToggle)}
              ref={trackOutsideClicksRef}
            >
              Sort By <BiCaretDown className="ml-2" />
            </button>
            {dropdownToggle && (
              <DropDown
                sortOrder={sortOrder}
                setSortOrder={(theOrder) => setSortOrder(theOrder)}
                searchOrder={searchOrder}
                setSearchOrder={(theSearchOrder) =>
                  setSearchOrder(theSearchOrder)
                }
                petNameRef={petNameRef}
                ownerNameRef={ownerNameRef}
                dateRef={dateRef}
                ascOrderRef={ascOrderRef}
                descOrderRef={descOrderRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
