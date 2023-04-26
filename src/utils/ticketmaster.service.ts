import axios from "axios";
import { type IPayload, type IResponse } from "interfaces/global";
import { TICKETMASTER_API_KEY, TICKETMASTER_EVENT_API_URL } from "./constants";

/**
 * Function to query Ticketmaster API
 * Only provide configured query params
 */
export async function searchTicketmaster({
  searchTerm,
  startDate,
  endDate,
  resultSize,
}: IPayload) {
  const res: IResponse = await axios.request({
    url: TICKETMASTER_EVENT_API_URL,
    method: "get",
    params: {
      apikey: TICKETMASTER_API_KEY,
      locale: "*",
      ...(searchTerm && { keyword: searchTerm }),
      ...(startDate && { startDateTime: startDate }),
      ...(endDate && { endDateTime: endDate }),
      ...(resultSize && { size: resultSize }),
    },
  });

  return res.data._embedded.events;
}
