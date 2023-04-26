import { useState, useEffect } from "react";
import { api } from "~/utils/api";

const RESULT_SIZE_DEFAULT = "25";

export const BrowseEvents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [resultSize, setResultSize] = useState(RESULT_SIZE_DEFAULT);

  // Converting to acceptable format
  function convertDateToISO(date: string) {
    return new Date(date).toISOString().slice(0, 19) + "Z";
  }

  // Only sending data that is populated
  const constructPayload = () => {
    const searchTermIsNotEmpty = searchTerm !== "";

    return {
      ...(searchTermIsNotEmpty && { searchTerm }),
      ...(startDate && { startDate: convertDateToISO(startDate) }),
      ...(endDate && { endDate: convertDateToISO(endDate) }),
      ...(resultSize && { resultSize }),
    };
  };

  const {
    data: result,
    refetch: refetchSearch,
    isFetching,
    isError,
    isSuccess,
  } = api.ticketmaster.search.useQuery(
    { ...constructPayload() },
    { enabled: false }
  );

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleTicketmasterSearch = () => {
    void refetchSearch();
  };

  const handleClearInputs = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setResultSize("25");
  };

  const todaysDate = new Date().toISOString().split("T")[0];
  const successfulWithResults = result && result.data.length > 0 && isSuccess;
  const successfulWithNoResults =
    result && result.data.length === 0 && isSuccess;

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
        Browse and discover events
      </h1>
      <h1 className="text-white">
        Powered by{" "}
        <span className="text-[hsl(280,100%,70%)]">Ticketmaster API</span>
      </h1>
      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-5 md:gap-8	">
        <input
          value={searchTerm}
          type="text"
          placeholder="Search event location"
          className="input-bordered input w-full max-w-md"
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isFetching}
        />
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            value={startDate}
            type="date"
            placeholder="Start date"
            className="input-bordered input w-full max-w-xs"
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isFetching}
            min={todaysDate}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            value={endDate}
            type="date"
            placeholder="End date"
            className="input-bordered input w-full max-w-xs"
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isFetching}
            min={startDate}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Result Size</span>
          </label>
          <select
            value={resultSize}
            className="select-bordered select w-full max-w-xs"
            onChange={(e) => setResultSize(e.target.value)}
            disabled={isFetching}
          >
            <option>25</option>
            <option>50</option>
            <option>75</option>
            <option>100</option>
          </select>
        </div>
        <div className={`center-items g-10 flex`}>
          <button
            className="btn"
            onClick={handleTicketmasterSearch}
            disabled={isFetching}
          >
            Search
          </button>
          <button
            className="btn"
            onClick={handleClearInputs}
            disabled={isFetching}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        {successfulWithResults && (
          <>
            <div className="divider">
              Events Results [{result.payload.resultSize}]
            </div>

            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3 md:gap-8	">
              {result.data.map((column) => (
                <div
                  key={column.id}
                  className="card w-96 bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      {column.name}
                      <div className="badge-secondary badge">
                        {column.type.toLocaleUpperCase()}
                      </div>
                    </h2>
                    <div className="card-actions justify-end">
                      <a
                        target="_blank"
                        href={column.url}
                        rel="noopener noreferrer"
                        className="btn-primary btn"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {successfulWithNoResults && (
          <h1>No events found, please try again...</h1>
        )}
        {isError && <h1>An error occurred, please try again...</h1>}
        {isFetching && <h1>Searching Ticketmaster...</h1>}
      </div>
    </div>
  );
};
