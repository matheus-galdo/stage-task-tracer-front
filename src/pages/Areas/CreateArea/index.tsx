import axios from 'axios';
import NavBar from '../../../components/NavBar/index.tsx'
import './style.tsx'
import { CreateAreaContainer, CreateAreaContent, FormContainer } from './style.tsx'

import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';

type FieldsTypes = {
  title: string;
};

function CreateArea() {
  const [areas, setAreas] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/areas').then(response => {
      setAreas(response.data)
    });
  }, []);

  function handleSubmit(formData: FieldsTypes) {
    console.log(formData.title);
    axios.post('http://localhost:3000/areas', formData);
  }

  return <CreateAreaContainer>
    <NavBar areas={areas}/>
    <CreateAreaContent>
      <FormContainer>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: "Este campo é obrigatório" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 10 }} >
            <Space size="small">
              <Button type="default">
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </FormContainer>
    </CreateAreaContent>

  </CreateAreaContainer>
}

export default CreateArea
