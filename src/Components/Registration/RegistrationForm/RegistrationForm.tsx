import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, AutoComplete, Row, Col } from 'antd';
import './RegistrationForm.scss'
import axios from 'axios';

const FormBody:React.FC=()=>{    
    const [cities, setCities] = useState<string[]>([]);
    const [streets, setStreets]= useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
    useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search', {
            params: {
                resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
                limit: 1000
            }
        })
        .then(response => {
            const cityNames = response.data.result.records.map((city: any) => city.שם_ישוב);
            if (cityNames.length !== cities.length) {
                setCities(cityNames);
                console.log('setCities executed')
            }
        })
        .catch(error => {
            console.error('Error fetching cities: ', error);
        });
    }, [cities]);
    useEffect(() => {
        if (selectedCity) {
            axios.get('https://data.gov.il/api/3/action/datastore_search', {
                params: {
                    resource_id: '9ad3862c-8391-4b2f-84a4-2d4c68625f4b',
                    filters: JSON.stringify({ "שם_ישוב": selectedCity })
                }
            })
            .then(response => {
                const streetNames = response.data.result.records.map((street: any) => street.שם_רחוב);
                setStreets(streetNames);
                console.log('setStreet executed')
            })
            .catch(error => {
                console.error('Error fetching streets:', error);
            });
        } else {
            setStreets([]); 
        }
    }, [selectedCity]);
    
    
    console.log('FormBody rendered')

    return (
        <div>
            <Form layout="vertical" className="form-container">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name='client-full-name' label='שם מלא' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='client-birthday' label='תאריך לידה (MM/DD/YY)' rules={[{ required: true }]}>
                            <DatePicker format="MM/DD/YY" />
                        </Form.Item>
                        <Form.Item name='city' label='עיר' rules={[{ required: true }]}>
                            <AutoComplete
                                options={cities.map(city => ({ value: city }))}
                                placeholder='הקלד שם ישוב'
                                onSelect={setSelectedCity}
                                filterOption={(inputValue, option) =>
                                    option?.value.includes(inputValue) || false
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name='registration-password'
                            label='סיסמא'
                            rules={[
                                { required: true, message: 'אנא הזן סיסמה' },
                                { min: 6, message: 'הסיסמה חייבת להיות לפחות 6 תווים' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='id' label='תעודת זהות' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='client-email' label='אימייל' rules={[{ required: true }, { type: 'email', message: 'אנא הזן כתובת אימייל חוקית' }]}>
                            <Input />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item name="street" label="רחוב" rules={[{ required: true }]}>
                                    <AutoComplete
                                        options={streets.map(street => ({ value: street }))}
                                        placeholder="בחר רחוב"
                                        onSelect={(value) => {
                                            setSelectedStreet(value);
                                        }}
                                        filterOption={(inputValue, option) =>
                                            option?.value.includes(inputValue) || false
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name='house-number' label='מספר בית' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name='confirm-registration-password'
                            label='אימות סיסמא'
                            dependencies={['registration-password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'אנא אשר את הסיסמה' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('registration-password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('הסיסמאות אינן תואמות'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
    
}

export default FormBody;
