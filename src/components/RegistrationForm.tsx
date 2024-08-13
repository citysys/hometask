import { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Row, Col, message } from 'antd';
import { Rule } from 'antd/es/form';

import { EMAIL_RULE, REQUIRED_RULE } from "../consts/formRules";

import '../styles/RegistrationForm.scss';

const { Option } = Select;

interface Street {
  _id: number,
  שם_רחוב: string,
  סמל_ישוב: number,
  שם_ישוב: string,
}

interface City {
  _id: number,
  שם_ישוב: string,
}

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const [streets, setStreets] = useState<Street[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { result: { records: streetsRecords } } } = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b")
        setStreets(streetsRecords);

        const { data: { result: { records: citiesRecords } } } = await axios.get("https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba")
        setCities(citiesRecords);
      } catch (error) {
        console.log(error)
        message.error("אירעה שגיאה, נסו לרען.")
      }
    }

    fetchData();
  }, []);

  const ID_NUMBER_RULE: Rule = {
    validator: (_, value) => {
      if (!value || validateIdNumber()) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('תעודת זהות לא תקינה'))
    }, message: "יש להכניס תעודת זהות ישראלית תקינה"
  };

  const handleSaveForm = () => {
    message.success("הטופס נשלח בהצלחה!");
  };

  const handleSaveFormFailed = (errorInfo: any) => {
    console.error('Error while send form:', errorInfo);
    message.error("שליחת הטופס נכשלה.");
  };

  const handleLoginWithGoogle = () => {
    message.success("התחברת בהצלחה עם גוגל.");
  }

  const validateIdNumber = () => {
    let id = form.getFieldValue("idNumber")?.toString().trim();
    if (!id || id.length > 9 || isNaN(Number(id))) {
      return false;
    }

    const isValid = Array.from(id, Number).reduce((sum, digit, index) => {
      const step = digit * ((index % 2) + 1);
      return sum + (step > 9 ? step - 9 : step);
    }, 0) % 10 === 0;

    return isValid;
  }

  return (
    <>
      <div className="form-container">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSaveForm}
          onFinishFailed={handleSaveFormFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="שם מלא"
                name="fullName"
                rules={[REQUIRED_RULE]}
                required={false}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="תאריך לידה (MM/DD/YY) "
                name="birthDate"
                rules={[REQUIRED_RULE]}
                required={false}
              >
                <DatePicker
                  style={{ width: '100%', direction: 'rtl' }}
                  format="MM/DD/YY"
                  placeholder="בחר תאריך"
                />
              </Form.Item>

              <Form.Item
                label="עיר"
                name="city"
                rules={[REQUIRED_RULE]}
                required={false}
              >
                <Select style={{ width: '100%' }}>
                  {cities.map(({ _id, שם_ישוב }) => (
                    <Option key={_id} value={_id}>{שם_ישוב}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="סיסמא"
                name="password"
                rules={[REQUIRED_RULE]}
                required={false}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="תעודת זהות"
                name="idNumber"
                rules={[REQUIRED_RULE, ID_NUMBER_RULE]}
                required={false}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="אימייל"
                name="email"
                rules={[REQUIRED_RULE, EMAIL_RULE]}
                required={false}
              >
                <Input />
              </Form.Item>

              <Row gutter={10}>
                <Col span={14}>
                  <Form.Item label="רחוב" name="street">
                    <Select style={{ width: '100%' }}>
                      {streets.map(({ _id, שם_רחוב, שם_ישוב, סמל_ישוב }) => (
                        <Option key={_id} value={_id}>{`${שם_רחוב}, ${שם_ישוב}`}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item label="מספר">
                    <InputNumber min={1} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="אימות סיסמא"
                name="confirmPassword"
                rules={[REQUIRED_RULE]}
                required={false}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            initialValue={false}
            required={false}
          >
            <Checkbox>זכור אותי</Checkbox>
          </Form.Item>

          <Form.Item
            name="termsAccepted"
            valuePropName="checked"
            rules={[REQUIRED_RULE]}
            required={false}
          >
            <Checkbox>
              קראתי ואני מאשר את <a>תנאי השימוש</a>
            </Checkbox>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="default"
                block
                style={{ backgroundColor: "#2D3748", color: "white" }}
                onClick={handleLoginWithGoogle}
                className="create-account-btn"
              >
                להתחברות עם גוגל
                <img src="/google-logo.svg" alt="גוגל לוגו" style={{ marginLeft: 8 }} />
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                block
                htmlType="submit"
                className="create-account-btn"
              >
                צור חשבון
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <p className="login-text">
        יש לך חשבון קיים? <a>להתחברות</a>
      </p>
      <img src="/apps-logo.svg" alt="חנויות אפליקציות לוגו" className="apps-logo" />
    </>
  );
}

export default RegistrationForm;
