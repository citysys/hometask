import React, { useEffect, useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Row, Select, Col, Modal } from 'antd';
import axios from 'axios';
import './FormComponent.scss';
import Logo from "../../assets/logo.png";
import google from "../../assets/GetItOnGooglePlay_Badge_Web_color_English.png";
import appStoreLogo from "../../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";

const { Option } = Select;

interface City {
  city_name: string;
}

interface Street {
  id: number;
  city_name: string;
  street_name: string;
}

interface FormValues {
  fullName: string;
  id: string;
  email: string;
  city: string;
  street: string;
  homeNumber: string;
  password: string;
  validatePassword: string;
  dateOfBirth: string;
}

const FormComponent: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [cities, setCities] = useState<City[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchIsraelCities();
  }, []);

  const fetchIsraelCities = async () => {
    try {
      const response = await axios.get(
        'https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca'
      );
      const cityNames = response.data.result.records
        .reduce((acc: City[], city: City) => {
          if (!acc.some((c) => c.city_name === city.city_name)) {
            acc.push(city);
          }
          return acc;
        }, [])
        .sort((a: City, b: City) => a.city_name.localeCompare(b.city_name));
      setCities(cityNames);
    } catch (error) {
      console.error('שגיאה באחזור ערים:', error);
    }
  };

  const handleCity = async (city: string) => {
    try {
      const response = await axios.get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca&q=${encodeURIComponent(city)}`
      );
      const streetsByCity: Street[] = response.data.result.records.filter(
        (record: Street) => record.city_name === city
      );
      setStreets(streetsByCity);
    } catch (error) {
      console.error('שגיאה באחזור רחובות:', error);
    }
  };

  const validateIsraeliID = (id: string): boolean => {
    id = id.trim();
    if (id.length !== 9 || isNaN(Number(id))) return false;
    const digits = id.split('').map(Number);
    const sum = digits.reduce((acc, digit, index) => {
      const step = digit * ((index % 2) + 1);
      return acc + (step > 9 ? step - 9 : step);
    }, 0);
    return sum % 10 === 0;
  };

  const handleSubmit = (values: FormValues) => {
    if (validateIsraeliID(values.id)) {
      console.log('Form values:', values);
      setIsModalVisible(true);
    } else {
      form.setFields([
        {
          name: 'id',
          errors: ['תעודת זהות לא תקינה'],
        },
      ]);
    }
  };

  return (
    <div className="form-container">
      <img className="logo" src={Logo} alt="City Systems Logo" />
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="signup-form">
        <FormHeader />
        <FormFields 
          cities={cities} 
          streets={streets} 
          handleCity={handleCity} 
          validateIsraeliID={validateIsraeliID}
        />
        <FormActions />
        <SignInLink />
        <AppDownloadLinks />
      </Form>
      <SuccessModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </div>
  );
};

const FormHeader: React.FC = () => (
  <div className="form-header">
    <h1>צור חשבון</h1>
    <div className='p_form_flex_container'>
      <p>לחברות או אדם פרטי</p>
      <p className="required-fields">* שים לב כל השדות הם שדות חובה</p>
    </div>
  </div>
);

interface FormFieldsProps {
  cities: City[];
  streets: Street[];
  handleCity: (city: string) => void;
  validateIsraeliID: (id: string) => boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({ cities, streets, handleCity, validateIsraeliID }) => (
  <>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="fullName"
          label="שם מלא"
          rules={[{ required: true, message: 'נא להזין שם מלא' }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="id"
          label="תעודת זהות"
          rules={[
            { required: true, message: 'נא להזין תעודת זהות' },
            () => ({
              validator(_, value) {
                if (!value || validateIsraeliID(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('תעודת זהות לא תקינה'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="dateOfBirth"
          label=" תאריך לידה (MM/DD/YY)"
          rules={[{ required: true, message: 'נא לבחור תאריך לידה' }]}
        >
          <DatePicker format="MM/DD/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="email"
          label="אימייל"
          rules={[
            { required: true, message: 'נא להזין כתובת אימייל' },
            { type: 'email', message: 'כתובת אימייל לא תקינה' },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="city"
          label="עיר"
          rules={[{ required: true, message: 'נא לבחור עיר' }]}
        >
          <Select onChange={handleCity}>
            {cities.map((city) => (
              <Option key={city.city_name} value={city.city_name}>
                {city.city_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="street"
          label="רחוב"
          rules={[{ required: true, message: 'נא לבחור רחוב' }]}
        >
          <Select disabled={!streets.length}>
            {streets.map((street) => (
              <Option key={street.id} value={street.street_name}>
                {street.street_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col style={{ paddingLeft: "0", paddingRight: "0" }} span={4}>
        <Form.Item
          name="homeNumber"
          label="מספר בית"
          rules={[{ required: true, message: 'נא להזין מספר בית' }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="password"
          label="סיסמא"
          rules={[
            { required: true, message: 'נא להזין סיסמא' },
            { min: 8, message: 'הסיסמא חייבת להכיל לפחות 8 תווים' },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="validate-password"
          label="אימות סיסמא"
          dependencies={['password']}
          rules={[
            { required: true, message: 'נא לאמת את הסיסמא' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
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

    <div className='checkbox-container'>
      <Checkbox>זכור אותי</Checkbox>
      <Form.Item
        name="termsAgreed"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('יש לאשר את תנאי השימוש')),
          },
        ]}
      >
        <Checkbox>
          קראתי ואני מאשר את <a href="#">תנאי השימוש</a>
        </Checkbox>
      </Form.Item>
    </div>
  </>
);

const FormActions: React.FC = () => (
  <div className="form-actions">
    <div>
      <Button className="google-button">
        להתחברות עם חשבון גוגל
      </Button>
    </div>
    <div>
      <Button type="primary" htmlType="submit" className="submit-button">
        צור חשבון
      </Button>
    </div>
  </div>
);

const SignInLink: React.FC = () => (
  <div className='signin_link_container'>
    <p>יש לך חשבון קיים? <a href="#">להתחברות</a></p>
  </div>
);

const AppDownloadLinks: React.FC = () => (
  <div className='google-app-container'>
    <a href="#">
      <img src={google} style={{ width: "100px", height: "40px" }} alt="Get it on Google Play" />
    </a>
    <a href="#">
      <img src={appStoreLogo} style={{ marginLeft: "10px" }} alt="Download on the App Store" />
    </a>
  </div>
);

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose }) => (
  <Modal
    title="הרשמה הושלמה"
    visible={isVisible}
    onOk={onClose}
    onCancel={onClose}
  >
    <p>ההרשמה הושלמה בהצלחה!</p>
  </Modal>
);

export default FormComponent;