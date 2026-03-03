import type Response from "@/entities/Response";
import { type SummaryResponseData } from "@/entities/Summary";
import APIClient from "@/api/apiClient";

export default new APIClient<Response<SummaryResponseData>>("/bookings/summary");