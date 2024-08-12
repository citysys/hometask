import React, { useEffect, useState } from "react";
interface CityRecord {
    _id: number;
    שם_רשות: string;
    סוג_רשות: string;
    // אפשר להוסיף כאן שדות נוספים לפי הצורך
  }
  
  interface ApiResponse {
    result: {
      records: CityRecord[];
    };
  }
const CityList: React.FC = () => {
  const [cities, setCities] = useState<CityRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=94b4461c-ea4c-42b6-b16d-9a9f7b8c59a2&q=עיר&limit=1000"
        );

        if (!response.ok) {
          throw new Error("שגיאה בעת טעינת הנתונים");
        }

        const data: ApiResponse = await response.json();
        const cityRecords = data.result.records.filter(
          (record) => record.סוג_רשות.includes("עיר")
        );
        setCities(cityRecords);
      } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("משהו לא צפוי קרה");
          };
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>List of Cities in Israel</h1>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>{city.שם_רשות}</li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
