import { CustomPlusCircle, SubProcessItem, TimelineContainer, TimelineMarker, TimelinePipe } from './style.tsx'
import { Button, Drawer, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { SubProcess } from './Index.tsx';

export type SubProcessTimeLineProps = {
  subProcesses: SubProcess[];
  selectedSubProcess: number | undefined;
  onSelectSubProcess: (item: SubProcess) => void;
  onNewSubProcessClick: () => void;
};

function SubProcessTimeLine({ subProcesses, selectedSubProcess, onSelectSubProcess, onNewSubProcessClick }: SubProcessTimeLineProps) {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  function isSelected(item: SubProcess) {
    return item.id === selectedSubProcess;
  }

  return <>
    <Drawer
      title={<Row justify='space-between'>
        Sub Processos
        <Button type='text' size='small' onClick={onNewSubProcessClick}>
          <CustomPlusCircle />
        </Button>
      </Row>}
      onClose={onClose}
      open={open}
      forceRender={true}
      mask={false}
      closeIcon={<MenuOutlined />}
    >
      {subProcesses.map(subProcess => <SubProcessItem
        key={subProcess.id}
        onClick={() => onSelectSubProcess(subProcess)}
        selected={isSelected(subProcess)}
      >
        <TimelineContainer>
          <TimelinePipe />
          <TimelineMarker selected={isSelected(subProcess)} />
        </TimelineContainer>
        {subProcess.name}
      </SubProcessItem>)}
    </Drawer>

    <div>
      <Button onClick={showDrawer}>
        <MenuOutlined />
      </Button>
    </div>
  </>;
}

export default SubProcessTimeLine;