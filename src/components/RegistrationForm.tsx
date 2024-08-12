import { FC } from 'react';
import { Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Row, Col } from 'antd';

const RegistrationForm: FC = () => {
  return (
    <div className="form-container">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="שם מלא">
              <Input />
            </Form.Item>
            <Form.Item label="תאריך לידה">
              <DatePicker placeholder='' />
            </Form.Item>
            <Form.Item label="עיר">
              <Select>
                <Select.Option>עיר</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="סיסמא">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Checkbox>זכור אותי</Checkbox>
            </Form.Item>
            <Form.Item>
              <Checkbox>קראתי את הוראות השימוש</Checkbox>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="תעודת זהות">
              <Input />
            </Form.Item>
            <Form.Item label="אימייל">
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label="רחוב">
                  <Select>
                    <Select.Option>רחוב</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="מספר בית">
                  <InputNumber min={1} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="סיסמא אימות">
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Button type="primary" block>צור חשבון</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button type="default" block>GOOGLE צור חשבון</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegistrationForm;
