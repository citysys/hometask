import axios from "axios";
import { message } from "antd";
import {
  ApiResponse,
  CityApiResult,
  StreetApiResult,
  CityRecord,
  StreetRecord,
  API_RESOURCES,
} from "../types/form-data";

// Probably better to add in a .env, but for this simple demo it's fine. (free usage api)
const API_BASE_URL = "https://data.gov.il/api/3/action/datastore_search";

export const fetchCities = async (): Promise<CityRecord[]> => {
  try {
    const response = await axios.get<ApiResponse<CityApiResult>>(API_BASE_URL, {
      params: {
        resource_id: API_RESOURCES.CITIES,
        limit: 1500,
      },
    });
    // console.log("Cities API response:", response.data);

    if (response.data.success && response.data.result.records) {
      return response.data.result.records;
    }
    return [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    message.error("שגיאה בטעינת רשימת הערים");
    return [];
  }
};

export const fetchStreets = async (
  cityName: string
): Promise<StreetRecord[]> => {
  if (!cityName) {
    return [];
  }

  try {
    // console.log(`Fetching streets for city: ${cityName}`);
    const response = await axios.get<ApiResponse<StreetApiResult>>(
      API_BASE_URL,
      {
        params: {
          resource_id: API_RESOURCES.STREETS,
          q: cityName,
          limit: 1500,
        },
      }
    );
    // console.log("Streets API response:", response.data);
    if (response.data.success && response.data.result.records) {
      return response.data.result.records;
    }
    return [];
  } catch (error) {
    console.error("Error fetching streets:", error);
    message.error("שגיאה בטעינת רשימת הרחובות");
    return [];
  }
};
