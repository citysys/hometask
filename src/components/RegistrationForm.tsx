import { FC } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Row, Col, message } from 'antd';
import { Rule } from 'antd/es/form';
import '../style/RegistrationForm.scss';

const { Option } = Select;

const EMAIL_RULE: Rule = { type: 'email', message: 'הדוא"ל לא תקין!' };
const REQUIRED_RULE: Rule = { required: true, message: 'שדה זה הוא חובה!' };

const CITY_OPTIONS = [
  { value: '', label: 'בחר עיר' },
  { value: '1', label: 'בחר עיר1' },
  { value: '2', label: 'בחר עיר2' },
  { value: '3', label: 'בחר עיר3' },
];

interface RegistrationFormValues {
  fullName: string;
  birthDate: string;
  city: string;
  password: string;
  idNumber: string;
  email: string;
  address: string;
  confirmPassword: string;
  rememberMe: boolean;
  termsAccepted: boolean;
}

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();

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

  const isFormValid = form.isFieldsTouched(true) && form.getFieldsError().every(({ errors }) => errors.length === 0);

  return (
    <div className="full-container">
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <div>
          <img src="/citysys-logo.svg" className="web-logo" />
          <h3>צור חשבון</h3>
          <h4>לחברות או אדם פרטי</h4>
        </div>
        <p style={{ alignSelf: "end", fontSize: "0.8rem" }}>
          *שים לב כל השדות הם שדות חובה
        </p>
      </div>

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
                label="תאריך לידה"
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
                <Select>
                  {CITY_OPTIONS.map(option => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
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
                rules={[REQUIRED_RULE]}
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
                  <Form.Item label="רחוב">
                    <Select style={{ width: '100%' }}>
                      <Select.Option value="">בחר רחוב</Select.Option>
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
                style={{ fontWeight: 600, backgroundColor: "#2D3748", color: "white" }}
                onClick={handleLoginWithGoogle}
              >
                להתחברות עם גוגל
                <img src="/google-logo.svg" alt="Google Logo" style={{ marginLeft: 8 }} />
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontWeight: 600 }}
              >
                צור חשבון
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default RegistrationForm;
