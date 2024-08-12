import axios, { AxiosResponse } from 'axios'

export const cityService = {
    getCities,
    getStreets
}

interface ApiResponse<T = any> {
    help: string;
    success: boolean;
    result: Response<T>;
}

const CITIES_ENDPOINT = 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba'
const STREETS_ENDPOINT = 'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b'

interface Response<T = any> {
    records: Record[]
}

interface Record {
    _id: number;
    שם_ישוב: string;
    שם_רחוב?: string
}

export interface Street {
    streetName: string | null;
    cityName: string | null;
}



async function getCities(): Promise<string[]> {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(CITIES_ENDPOINT)
        const cities = response.data.result.records.map(record => record.שם_ישוב)
        return cities
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message)
        } else {
            console.error('Unexpected error:', error)
        }
        throw error
    }
}

async function getStreets(city: string): Promise<Street[]> {
    try {
        const response: AxiosResponse<ApiResponse<Record>> = await axios.get<ApiResponse<Record>>(STREETS_ENDPOINT)
        const streets: Street[] = response.data.result.records
            .map((record: Record) => {
                const currStreet= {
                    streetName: record.שם_רחוב || null,
                    cityName: record.שם_ישוב
                }
                return currStreet
            })
            .filter(street => (street.streetName && (street.cityName === city)))

        return streets

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message)
        } else {
            console.error('Unexpected error:', error)
        }
        throw error
    }
}

