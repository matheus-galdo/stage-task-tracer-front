import { Button, Form, Input, Modal, Row, Space } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";
import { Process } from "../../pages/Areas/ViewArea";
import subProcessesService from "../../services/subProcessesService";
import { SubProcessTimelineContext } from "../../contexts/SubProcessTimelineContext";
import { SubProcessEditModalContext } from "../../contexts/SubProcessEditModalContext";

type TimelineModalFormProps = {
  process: Process;
  onCreateOrUpdate: (processId: number) => void;
}

type FieldsTypes = {
  subProcessName: string;
}

function TimelineModalForm({ process, onCreateOrUpdate }: TimelineModalFormProps) {
  const { isEditModalOpen, closeEditModal } = useContext(SubProcessEditModalContext);
  const { selectedSubProcess, setSelectedSubProcess } = useContext(SubProcessTimelineContext);

  const isEditingSubProcess = !!selectedSubProcess;

  function handleSubmit(formData: FieldsTypes) {
    const formRequestBody = { name: formData.subProcessName, processId: process?.id };

    let promise: Promise<AxiosResponse>;
    if (isEditingSubProcess) {
      promise = subProcessesService.updateProcess(selectedSubProcess.id, formRequestBody);
    } else {
      promise = subProcessesService.createProcess(formRequestBody);
    }

    promise.then(() => {
      closeEditModal();
      onCreateOrUpdate(process?.id);
    }).catch((error: AxiosError) => {
      alert(error.response?.data);
    });
  }

  function cancelEditOrCreate() {
    setSelectedSubProcess(undefined);
    closeEditModal();
  }

  const initialValues: FieldsTypes = {
    subProcessName: selectedSubProcess ? selectedSubProcess.name : '',
  }

  const modalTitle = `${isEditingSubProcess ? "Editar" : "Criar"} Processo`;
  return <Modal title={modalTitle} open={isEditModalOpen} footer={false} onCancel={cancelEditOrCreate} destroyOnClose={true}>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item<FieldsTypes>
        name="subProcessName"
        label="Nome"
        rules={[{ required: true, message: "Este campo é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <Row justify="end" align="top">
        <Space size="small">
          <Button type="default" onClick={cancelEditOrCreate}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Space>
      </Row>
    </Form>
  </Modal>
}

export default TimelineModalForm;