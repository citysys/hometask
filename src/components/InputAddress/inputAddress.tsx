import { Form, TreeSelect } from 'antd';
import './inputAddress.scss';
import Input from 'antd/es/input/Input';
import { useState, useEffect } from 'react';
import { axiosReq } from '../../api/useAxiosReq';

interface selectOption {
    title: string;
    value: string;
}

interface InputAddressProps {
    setValue: (key: string, value: string) => void;
}

function InputAddress({ setValue }: InputAddressProps) {
    const [cities, setCities] = useState<selectOption[]>([]);
    const [streets, setStreets] = useState<selectOption[]>([]);
    const [cityValue, setCityValue] = useState<string | null>(null);

    const getCitiesFromApiService = async () => {
        const { result } = await axiosReq({
            method: "GET",
            url: "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1200",
        });
        const selectFormat = result?.records?.map((c: any) => ({ value: c["שם_ישוב"], title: c["שם_ישוב"] }));
        setCities(selectFormat || []);

    };

    const handleCityChange = async (value: string) => {
        setCityValue(value);
        setValue("city", value);
        setStreets([]);
        const { result } = await axiosReq({
            method: "GET",
            url: `https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&q=${encodeURIComponent(value)}`,
        });
        const streetOptions = result?.records?.map((s: any) => ({ value: s["שם_רחוב"], title: s["שם_רחוב"] }));
        setStreets(streetOptions || []);

    };

    const handleStreetChange = (value: string) => {
        setValue("street", value);
    };

    useEffect(() => {
        getCitiesFromApiService();
    }, []);

    return (
        <>
            <label className='selectData'>
                <span className='spanLabel'>עיר</span>
                <Form.Item
                    name={"city"}
                    rules={[{ required: true, message: `נא הכנס עיר` }]}
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={cityValue || undefined}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="בחר עיר"
                        treeDefaultExpandAll
                        onChange={handleCityChange}
                        treeData={cities}
                    />
                </Form.Item>
            </label>
            <div className='smallInput'>
                <label>
                    <span className='spanLabel'>רחוב</span>
                    <Form.Item
                        name={"street"}
                        rules={[{ required: true, message: `נא הכנס רחוב` }]}
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="בחר רחוב"
                            treeDefaultExpandAll
                            onChange={handleStreetChange}
                            treeData={streets}
                            disabled={!cityValue}
                        />
                    </Form.Item>
                </label>
                <label>
                    <span className='spanLabel'>מספר בית</span>
                    <Form.Item
                        name={"houseNumber"}
                        rules={[{ required: true, message: `נא הכנס מס בית` }]}
                    >
                        <Input
                            name="houseNumber"
                            onChange={(e) => setValue("houseNumber", e.target.value)}
                        />
                    </Form.Item>
                </label>
            </div>
        </>
    );
}

export default InputAddress;
