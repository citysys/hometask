import React, { useState } from "react";
import "./styles.scss";
import logo from "../../assets/images/logo.png";
import getTheApp from "../../assets/images/app.png";
import google from "../../assets/images/google.png";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Checkbox,
  Modal,
} from "antd";
import type { FormProps, CheckboxProps } from "antd";
import { isValidIsraeliID } from "../../utils/utils";
import { getCities, getStreets } from "../../services/addressService";

const LoginForm: React.FC = () => {
  const [componentVariant, setComponentVariant] =
    useState<FormProps["variant"]>("filled");
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [streets, setStreets] = useState<{ id: string; name: string }[]>([]);
  const [isSelectedCity, setIsSelectedCity] = useState(false);
  const [selectedCity, setCity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCitySearch = async (value: string) => {
    if (value) {
      try {
        const cityList = await getCities(value);
        setCities(cityList);
        setIsSelectedCity(true);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };
  

  const handleCityChange=(selectedCity: string)=>{
    console.log('selectedCity',selectedCity)
    setCity(selectedCity)
  }

  const handleStreetSearch = async (value: string) => {
    console.log('Selected City:', selectedCity);  
    if (value && selectedCity) {
      try {
        const streetList = await getStreets(value, selectedCity);
        console.log("Street list returned:", streetList); 
        setStreets(streetList);
      } catch (error) {
        console.error("Error fetching streets:", error);
      }
    } else {
      setStreets([]);
    }
  };
  
  
  

  const formFields = [
    { label: "שם מלא", name: "fullName", component: <Input />, colSpan: 12 },
    {
      label: "תעודת זהות",
      name: "ID",
      component: <InputNumber style={{ width: "100%" }} />,
      colSpan: 12,
      hasFeedback: true,
      rules: [
        {
          validator: (_: any, value: number) => {
            if (!value) {
              return Promise.reject(new Error("אנא הזן תעודת זהות"));
            }
            if (!isValidIsraeliID(value)) {
              return Promise.reject(new Error("תעודת זהות לא תקינה"));
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: "תאריך לידה (MM/DD/YY)",
      name: "birthDate",
      component: <DatePicker style={{ width: "100%" }} />,
      colSpan: 12,
    },
    {
      label: "אימייל",
      name: "email",
      component: <Input />,
      colSpan: 12,
    },
    {
      label: "עיר",
      name: "city",
      component: (
        <Select
          showSearch
          placeholder="הקלד שם עיר"
          onSearch={handleCitySearch}
          onChange={handleCityChange}
          filterOption={false}
          allowClear
        >
          {cities?.map((city) => (
            <Select.Option key={city.id} value={city.name}>
              {city.name}
            </Select.Option>
          ))}
        </Select>
      ),
      colSpan: 12,
    },
    {
      label: "רחוב",
      name: "street",
      component: (
        <Select
          placeholder="בחר רחוב"
          disabled={!isSelectedCity}
          onSearch={handleStreetSearch}
          showSearch
        >
          {streets?.map((street) => (
            <Select.Option key={street.id} value={street.id}>
              {street.name}
            </Select.Option>
          ))}
        </Select>
      ),
      colSpan: 8,
    },
    {
      label: "מספר בית",
      name: "houseNumber",
      component: <Input />,
      colSpan: 4,
    },
    {
      label: "סיסמה",
      name: "password",
      component: <Input.Password />,
      rules: [{ message: "Please input your password!" }],
      hasFeedback: true,
      colSpan: 12,
    },
    {
      label: "אימות סיסמה",
      name: "confirm",
      component: <Input.Password />,
      dependencies: ["password"],
      rules: [
        { message: "Please confirm your password!" },
        ({ getFieldValue }: any) => ({
          validator(_: any, value: string) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("The passwords do not match!"));
          },
        }),
      ],
      hasFeedback: true,
      colSpan: 12,
    },
  ];

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <main>
      <header className="form-header">
        <img src={logo} alt="logo" />
      </header>
      <div className="create-account">
        <h5>צור חשבון</h5>
        <h6>
          לחברות או אדם פרטי <span> *שים לב כל השדות הם שדות חובה</span>
        </h6>
      </div>
      <Form
        onValuesChange={({ variant }) =>
          setComponentVariant(variant as FormProps["variant"])
        }
        variant="outlined"
        style={{
          maxWidth: 800,
          direction: "rtl",
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "Poppins",
        }}
        initialValues={{ variant: componentVariant }}
      >
        <Row gutter={16} style={{ width: "100%" }}>
          {formFields.map((field) => (
            <Col key={field.name} span={field.colSpan}>
              <div className="form-input">
                <Form.Item
                  colon={false}
                  layout="vertical"
                  label={field.label}
                  name={field.name}
                  rules={field.rules || []}
                  dependencies={field.dependencies || []}
                  hasFeedback={field.hasFeedback || false}
                >
                  {field.component}
                </Form.Item>
              </div>
            </Col>
          ))}
        </Row>
      </Form>
      <div className="form-checkbox">
        <Checkbox onChange={onChange}>זכור אותי</Checkbox>
        <Checkbox onChange={onChange}>
          קראתי ואני מאשר את <span className="conditions">תנאי השימוש</span>
        </Checkbox>
      </div>

      <div className="form-buttons">
        <Button className="google-button" type="primary">
          <img src={google} alt="google-icon" />
          להתחברות עם חשבון גוגל
        </Button>

        <Button
          className="create-account-button"
          type="primary"
          onClick={showModal}
        >
          צור חשבון
        </Button>
      </div>
      <p className="member-login">
        יש לך חשבון קיים? <span>להתחברות</span>
      </p>
      <Modal
        title="יצירת החשבון בוצעה בהצלחה!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <div className="get-app">
        <img src={getTheApp} alt="get-the-app" />
      </div>
    </main>
  );
};

export default LoginForm;
