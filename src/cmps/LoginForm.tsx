import { useState, useEffect } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Button,
  Row,
  Col,
  AutoComplete,
  notification,
  Modal,
} from 'antd'
import moment from 'moment'
import { addressService } from '../services/address.service'
import { City, Street } from '../types'

const { Item } = Form
const { Option } = AutoComplete

export default function LoginForm() {
  const [form] = Form.useForm()
  const [cities, setCities] = useState<City[]>([])
  const [streets, setStreets] = useState<Street[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [filteredStreets, setFilteredStreets] = useState<Street[]>([])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [selectedStreet, setSelectedStreet] = useState<Street | null>(null)

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    try {
      const cities = await addressService.getAllCities()
      if (cities) setCities(cities)
    } catch (error) {
      notification.error({ message: 'לא ניתן למצוא רשויות' })
    }
  }

  const handleCitySearch = (term: string) => {
    if (term && cities) {
      const filtered = cities.filter((city) =>
        (city['שם_ישוב'] as string).toLowerCase().startsWith(term.toLowerCase())
      )
      setFilteredCities(filtered)
    } else {
      setFilteredCities([])
    }
  }

  const handleCitySelect = async (value: string) => {
    const selectedCity = cities.find((city) => city['שם_ישוב'] === value)

    if (selectedCity) {
      setSelectedCity(selectedCity)
      setFilteredCities([])
      form.setFieldsValue({ city: value })

      try {
        const streets = await addressService.getStreetsByCity(
          selectedCity['שם_ישוב']
        )
        setStreets(streets)
      } catch (error) {
        notification.error({ message: 'לא ניתן למצוא רחובות' })
      }
    } else {
      setSelectedCity(null)
    }
  }

  const handleStreetSearch = (value: string) => {
    if (value && streets) {
      const filtered = streets.filter((street) =>
        (street.street_name as string)
          .toLowerCase()
          .startsWith(value.toLowerCase())
      )
      setFilteredStreets(filtered)
    } else {
      setFilteredStreets([])
    }
  }

  const handleStreetSelect = (value: string) => {
    const selectedStreet = streets.find(
      (street) => street.street_name === value
    )
    if (selectedStreet) {
      setSelectedStreet(selectedStreet)
      form.setFieldsValue({ street: value })
    } else {
      setSelectedStreet(null)
    }
  }

  const validateCity = (_: any, value: string) => {
    const isValid = cities.some((city) => city['שם_ישוב'] === value)
    return isValid ? Promise.resolve() : Promise.reject('עיר לא תקינה')
  }

  const validateStreet = (_: any, value: string) => {
    const isValid = streets.some((street) => street.street_name === value)
    return isValid ? Promise.resolve() : Promise.reject('רחוב לא תקין')
  }

  const validateIsraeliID = (rule: any, value: string) => {
    if (!value) return Promise.resolve()
    const isValid = /^[0-9]{9}$/.test(value) && validateCheckDigit(value)
    return isValid ? Promise.resolve() : Promise.reject('תעודת זהות לא תקינה')
  }

  const validateCheckDigit = (id: string) => {
    const sum = [...id].reduce((acc, digit, idx) => {
      const num = parseInt(digit) * ((idx % 2) + 1)
      return acc + (num > 9 ? num - 9 : num)
    }, 0)
    return sum % 10 === 0
  }

  const validatePasswordsMatch = (_: any, value: string) => {
    if (!value || form.getFieldValue('password') === value) {
      return Promise.resolve()
    }
    return Promise.reject('הסיסמאות אינן תואמות')
  }

  const onFinish = (values: object) => {
    console.log('Form values:', values)
    Modal.success({
      content: 'הטופס הוגש בהצלחה!',
    })
  }

  return (
    <section className='login-form'>
      <div className='right-side'>
        <header>
          <h1>רישוי עסקים מהמשרד ומכל מקום</h1>
          <h1>אפליקציית שטח למפקח</h1>
        </header>
        <div className='ball'></div>
        <div className='images'>
          <img src='mobile.svg' alt='' />
          <img src='mobile.svg' alt='' />
          <img src='mobile.svg' alt='' />
        </div>
      </div>
      <div className='left-side'>
        <img className='logo' src='logo.svg' alt='' />
        <header>
          <h1>צור חשבון</h1>
          <div className='sub-header'>
            <span>שים לב כל השדות הם שדות חובה*</span>
            <span>לחברות או אדם פרטי</span>
          </div>
        </header>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          style={{ direction: 'rtl' }}
          requiredMark={false}
        >
          <Row gutter={16}>
            {/* First Column */}
            <Col span={12}>
              <Item
                label='שם מלא'
                name='fullName'
                rules={[{ required: true, message: 'הכנס שם מלא' }]}
              >
                <Input />
              </Item>

              <Item
                label='תאריך לידה  (DD/MM/YY)'
                name='birthDate'
                rules={[{ required: true, message: 'הכנס תאריך לידה' }]}
              >
                <DatePicker
                  format='DD/MM/YY'
                  style={{ width: '100%', direction: 'ltr' }}
                  disabledDate={(current) =>
                    current && current > moment().endOf('day')
                  }
                />
              </Item>

              <Item
                label='עיר'
                name='city'
                rules={[
                  { required: true, message: 'בחר עיר' },
                  { validator: validateCity },
                ]}
              >
                <AutoComplete
                  onSearch={handleCitySearch}
                  onSelect={handleCitySelect}
                  value={selectedCity ? selectedCity['שם_ישוב'] : ''}
                >
                  {filteredCities.map((city) => (
                    <Option
                      style={{ direction: 'rtl' }}
                      key={city._id}
                      value={city['שם_ישוב']}
                    >
                      {city['שם_ישוב']}
                    </Option>
                  ))}
                </AutoComplete>
              </Item>

              <Item
                label='סיסמא'
                name='password'
                rules={[{ required: true, message: 'הכנס סיסמא' }]}
              >
                <Input.Password />
              </Item>
            </Col>

            {/* Second Column */}
            <Col span={12}>
              <Item
                label='תעודת זהות'
                name='idNumber'
                rules={[
                  { validator: validateIsraeliID },
                  { required: true, message: 'הכנס תעודת זהות' },
                ]}
              >
                <Input />
              </Item>

              <Item
                label='אימייל'
                name='email'
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'הכנס אימייל תקין',
                  },
                ]}
              >
                <Input type='email' />
              </Item>

              <Row gutter={16}>
                <Col span={16}>
                  <Item
                    label='רחוב'
                    name='street'
                    rules={[
                      { required: true, message: 'בחר רחוב' },
                      { validator: validateStreet },
                    ]}
                  >
                    <AutoComplete
                      onSearch={handleStreetSearch}
                      onSelect={handleStreetSelect}
                      value={selectedStreet ? selectedStreet.street_name : ''}
                    >
                      {filteredStreets.map((street) => (
                        <Option
                          style={{ direction: 'rtl' }}
                          key={street._id}
                          value={street.street_name}
                        >
                          {street.street_name}
                        </Option>
                      ))}
                    </AutoComplete>
                  </Item>
                </Col>
                <Col span={8}>
                  <Item
                    label='מספר בית'
                    name='houseNumber'
                    rules={[{ required: true, message: 'הכנס מספר בית' }]}
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>

              <Item
                label='אימות סיסמא'
                name='passwordConfirmation'
                rules={[
                  { required: true, message: 'הכנס סיסמא בשנית' },
                  { validator: validatePasswordsMatch },
                ]}
              >
                <Input.Password />
              </Item>
            </Col>
          </Row>

          {/* Bottom section with checkboxes */}
          <Row gutter={16}>
            <Col span={24}>
              <Item style={{ marginBlockEnd: 'unset' }}>
                <Checkbox>זכור אותי</Checkbox>
              </Item>

              <Item
                style={{ marginBlockEnd: 'unset' }}
                name='terms'
                valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('אתה חייב לאשר את תנאי השימוש'),
                  },
                ]}
              >
                <Checkbox>
                  קראתי ואני מאשר את <a href='#'>תנאי השימוש</a>
                </Checkbox>
              </Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBlockStart: '1rem' }}>
            <Col span={12}>
              <Button
                size='large'
                style={{
                  backgroundColor: '#4a4a4a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
                icon={
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png'
                    alt='Google Icon'
                    style={{ marginRight: '10px' }}
                  />
                }
              >
                התחברות עם חשבון גוגל
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type='primary'
                size='large'
                style={{
                  backgroundColor: '#007bff',
                  borderColor: '#007bff',
                  width: '100%',
                }}
                htmlType='submit'
              >
                צור חשבון
              </Button>
            </Col>
          </Row>
          <div className='existing-account'>
            <span>יש לך חשבון קיים?</span>
            <a href='#'>להתחברות</a>
          </div>
          <div className='store-btns'>
            <img src='/app-store.png' />
            <img src='/google-play.png' alt='Google Play' />
          </div>
        </Form>
      </div>
    </section>
  )
}
