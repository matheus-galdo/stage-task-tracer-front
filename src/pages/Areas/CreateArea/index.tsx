import { Button, Form, Input, Space } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/index.tsx'
import { CreateAreaContainer, CreateAreaContent, FormContainer } from './style.tsx'
import areasService from '../../../services/areasService.ts';
import { NavbarContext } from '../../../contexts/NavbarContext.tsx';

type FieldsTypes = {
  title: string;
};

function CreateArea() {
  const { getAreas } = useContext(NavbarContext);
  const navigate = useNavigate();

  function handleSubmit(formData: FieldsTypes) {
    areasService.createArea(formData).then((response) => {
      getAreas();
      navigate(`/areas/${response.data.id}`);
    });
  }

  function goHome() {
    navigate('/');
  }

  return <CreateAreaContainer>
    <NavBar defaultActiveOption="newArea" />
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
              <Button type="default" onClick={goHome}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" >
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
