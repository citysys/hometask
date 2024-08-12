import { FC } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Row, Col, message } from 'antd';
import '../style/RegistrationForm.scss';

const RegistrationForm: FC = () => {

  return (
    <div className="form-container">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="שם מלא">
              <Input />
            </Form.Item>
            <Form.Item label="תאריך לידה">
              <DatePicker style={{ width: '100%', direction: "rtl" }} format="MM/DD/YY" />
            </Form.Item>
            <Form.Item label="עיר">
              <Select>
                <Select.Option value="">בחר עיר</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="סיסמא">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="תעודת זהות">
              <Input />
            </Form.Item>
            <Form.Item label="אימייל">
              <Input />
            </Form.Item>
            <Form.Item label="כתובת">
              <Input.Group style={{ display: "flex" }}>
                <Select style={{ width: '70%', marginLeft: 10 }} placeholder="רחוב">
                  <Select.Option value="">בחר רחוב</Select.Option>
                </Select>
                <InputNumber placeholder="מספר" min={1} />
              </Input.Group>
            </Form.Item>
            <Form.Item label="סיסמא אימות">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Checkbox>זכור אותי</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>קראתי ואני מאשר את <a style={{ textDecoration: "underline" }}>תנאי השימוש</a></Checkbox>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Button type="default" block style={{ fontWeight: 600 }}>
              להתחברות עם גוגל
              <img src="/googleLogo.svg" />
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block style={{ fontWeight: 600 }}>צור חשבון</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegistrationForm;