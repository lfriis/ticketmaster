import axios from "axios";
import { type IPayload, type IResponse } from "interfaces/global";

const TICKETMASTER_EVENT_API_URL =
  "https://app.ticketmaster.com/discovery/v2/events";
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

export default async function searchTicketmaster({
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
