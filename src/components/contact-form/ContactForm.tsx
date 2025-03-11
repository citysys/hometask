import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Checkbox,
  Modal,
  message,
} from "antd";
import { CityRecord, StreetRecord, FormValues } from "../../types/form-data";
import { validateIsraeliID } from "../../utils/validation";
import { fetchCities, fetchStreets } from "../../utils/api";
import googleIcon from "../../assets/icons/google.svg";

import "./ContactForm.css";

function ContactForm() {
  const [form] = Form.useForm<FormValues>();
  const [cities, setCities] = useState<CityRecord[]>([]);
  const [streets, setStreets] = useState<StreetRecord[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cities from the API
  useEffect(() => {
    const loadCities = async () => {
      const citiesData = await fetchCities();
      setCities(citiesData);
    };

    loadCities();
  }, []);

  // Fetch streets based on selected city
  useEffect(() => {
    const loadStreets = async () => {
      if (!selectedCity) {
        setStreets([]);
        return;
      }

      const streetsData = await fetchStreets(selectedCity);
      setStreets(streetsData);
    };

    loadStreets();
  }, [selectedCity]);

  // Handle city selection
  const handleCityChange = (value: string) => {
    console.log("City selected:", value);

    setSelectedCity(value);
    // Clear the street field when city changes
    form.setFieldsValue({ street: undefined });
  };

  // Handle form submission
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      console.log("Form submitted with values:", values);

      // Here you would normally send the data to your backend
      // For this task, we'll just simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsModalOpen(true);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("שגיאה בשליחת הטופס");
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contact-form-container">
      <Form
        form={form}
        name="contact"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="contact-form"
      >
        {/* Full Name */}
        <Form.Item
          name="fullName"
          label="שם מלא"
          rules={[{ required: true, message: "שם מלא הוא שדה חובה" }]}
          className="form-item"
        >
          <Input />
        </Form.Item>

        {/* ID Number */}
        <Form.Item
          name="idNumber"
          label="תעודת זהות"
          rules={[{ validator: validateIsraeliID }]}
          className="form-item"
        >
          <Input />
        </Form.Item>

        {/* Birth Date */}
        <Form.Item
          name="birthDate"
          label="תאריך לידה"
          rules={[{ required: true, message: "תאריך לידה הוא שדה חובה" }]}
          className="form-item"
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="אימייל"
          rules={[
            { required: true, message: "אימייל הוא שדה חובה" },
            { type: "email", message: "אימייל לא תקין" },
          ]}
          className="form-item"
        >
          <Input />
        </Form.Item>

        {/* City */}
        <Form.Item
          name="city"
          label="עיר"
          rules={[{ required: true, message: "עיר היא שדה חובה" }]}
          className="form-item"
        >
          <Select
            showSearch
            placeholder="בחר עיר"
            optionFilterProp="children"
            onChange={handleCityChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              value: city.שם_ישוב.trim(),
              label: city.שם_ישוב.trim(),
            }))}
          />
        </Form.Item>

        {/* Street and House Number */}
        <div className="street-house-container form-item">
          <Form.Item
            name="street"
            label="רחוב"
            rules={[{ required: true, message: "רחוב הוא שדה חובה" }]}
            className="street-field"
          >
            <Select
              showSearch
              placeholder="בחר רחוב"
              optionFilterProp="children"
              disabled={!selectedCity}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={streets.map((street) => ({
                value: street.שם_רחוב.trim(),
                label: street.שם_רחוב.trim(),
              }))}
            />
          </Form.Item>

          <Form.Item
            name="houseNumber"
            label="מספר בית"
            rules={[{ required: true, message: "מספר בית הוא שדה חובה" }]}
            className="house-number-field"
          >
            <Input placeholder="מספר" />
          </Form.Item>
        </div>

        {/* Password */}
        <Form.Item
          name="password"
          label="סיסמא"
          rules={[
            { required: true, message: "סיסמא היא שדה חובה" },
            { min: 6, message: "סיסמא חייבת להכיל לפחות 6 תווים" },
          ]}
          className="form-item"
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label="אימות סיסמא"
          dependencies={["password"]}
          rules={[
            { required: true, message: "אימות סיסמא הוא שדה חובה" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("הסיסמאות אינן תואמות");
              },
            }),
          ]}
          className="form-item"
        >
          <Input.Password />
        </Form.Item>

        {/* Checkboxes */}
        <div className="checkbox-container">
          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            className="form-item-checkbox"
          >
            <Checkbox>זכור אותי</Checkbox>
          </Form.Item>

          <Form.Item
            name="termsAgreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("יש לאשר את תנאי השימוש"),
              },
            ]}
            className="form-item-checkbox"
          >
            <Checkbox>
              קראתי ואני מאשר את <a href="#">תנאי השימוש</a>
            </Checkbox>
          </Form.Item>
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            צור חשבון
          </Button>

          <Button className="google-button">
            <img src={googleIcon} alt="Google" />
            להתחברות עם חשבון גוגל
          </Button>
        </div>

        {/* Login Link */}
        <div className="login-option">
          יש לך חשבון קיים? <a href="#">להתחברות</a>
        </div>
      </Form>

      {/* Success Modal */}
      <Modal
        title="הרשמה הושלמה בהצלחה"
        open={isModalOpen}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            אישור
          </Button>,
        ]}
      >
        <p>הרשמתך הושלמה בהצלחה!</p>
      </Modal>
    </div>
  );
}

export default ContactForm;
