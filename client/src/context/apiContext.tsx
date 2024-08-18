import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


type CityStreetContextType = {
    cityStreetData: { [city: string]: string[] };
};


const CityStreetContext = createContext<CityStreetContextType | undefined>(undefined);


export const CityStreetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cityStreetData, setCityStreetData] = useState<{ [city: string]: string[] }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=1000&offset=75000');
                const records = response.data.result.records;

                const data = records.reduce((acc: { [city: string]: string[] }, record: any) => {
                    const city = record.city_name;
                    const street = record.street_name;

                    if (city && street) {
                        if (!acc[city]) {
                            acc[city] = [];
                        }
                        if (!acc[city].includes(street)) {
                            acc[city].push(street);
                        }
                    }
                    return acc;
                }, {});

                setCityStreetData(data);
            } catch (error) {
                console.error('Error fetching city and street data:', error);
            }
        };

        fetchData();
    }, []);

    

    return (
        <CityStreetContext.Provider value={{ cityStreetData }}>
            {children}
        </CityStreetContext.Provider>
    );
};


export const useCityStreetContext = () => {
    const context = useContext(CityStreetContext);
    if (context === undefined) {
        throw new Error('useCityStreetContext must be used within a CityStreetProvider');
    }
    return context;
};
