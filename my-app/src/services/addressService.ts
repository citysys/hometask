import axios from "axios";

const API_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = "d4901968-dad3-4845-a9b0-a57d027f11ab"; 

export const getCities = async (searchText: string) => {
  if (!searchText) return []; 

  try {
    const response = await axios.get(API_URL, {
      params: {
        resource_id: RESOURCE_ID,
        q: searchText, 
      },
    });

    const cityList = response.data.result.records.map((record: any) => ({
      id: record.city_id, 
      city: record.שם_ישוב, 
    }));

    return cityList; 
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error; 
  }
};



export const getStreets = async (searchText: string) => {
  if (!searchText) return []; 

  try {
    const response = await axios.get(API_URL, {
      params: {
        resource_id: RESOURCE_ID,
        q: searchText, 
      },
    });

    const streetList = response.data.result.records.map((record: any) => ({
      id: record.city_id, 
      street: record.שם_רחוב, 
    }));

    return streetList; 
  } catch (error) {
    console.error("Error fetching streets:", error);
    throw error; 
  }
};


