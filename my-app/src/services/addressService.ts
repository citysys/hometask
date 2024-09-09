import axios from "axios";

const CITIES_API_URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1300`;

const STREETS_API_URL = `https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=1000`;

export const getCities = async (searchText: string) => {
  if (!searchText) return [];

  try {
    const response = await axios.get(CITIES_API_URL, {});
    const cityList = response.data.result.records.map((record: any) => ({
      id: record._id,
      name: record.שם_ישוב,
    }));
    const filteredCityList = cityList.filter((cityName: { name: string }) =>
      cityName.name.startsWith(searchText)
    );
    return filteredCityList;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};

export const getStreets = async (searchText: string, selectedCity: string) => {
  if (!searchText || !selectedCity) return [];

  try {
    const response = await axios.get(STREETS_API_URL, {
      params: {
        q: searchText,
      },
    });

    const streetList = response.data.result.records.map((record: any) => ({
      id: record._id,
      name: record.שם_רחוב.trim(),
      cityName: record.שם_ישוב.trim(),
    }));
    const filteredStreetList = streetList.filter((street: { cityName: string; name: string }) => 
      street.cityName.trim() === selectedCity.trim()
    );

    return filteredStreetList;
  } catch (error) {
    console.error("Error fetching streets:", error);
    throw error;
  }
};


