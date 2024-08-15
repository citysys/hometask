import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ApiRequest: React.FC = () => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://data.gov.il/api/3/action/datastore_search?resource_id=bf185c7f-1a4e-4662-88c5-fa118a244bda&limit=10'
                )
                if (response.data && response.data.result && response.data.result.records) {
                    setData(response.data.result.records);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        
    }, [])
    console.log(data);

    return (
        <div>
        </div>
    );
}

export default ApiRequest;
