import axios from 'axios'
import { City, Street } from '../types'

export const addressService = {
  getAllCities,
  getStreetsByCity,
}

async function getAllCities() {
  try {
    const res = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1300`
    )
    const allCities = res.data.result.records.map((city: City) => ({
      ...city,
      שם_ישוב: city.שם_ישוב.trim(),
    }))

    return allCities
  } catch (error) {
    console.error(error)
  }
}

async function getStreetsByCity(city: string) {
  try {
    const res = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca&q=${city}`
    )
    const cityStreets = res.data.result.records.map((street: Street) => ({
      ...street,
      street_name: street.street_name.trim(),
    }))
    return cityStreets
  } catch (error) {
    console.error(error)
  }
}
