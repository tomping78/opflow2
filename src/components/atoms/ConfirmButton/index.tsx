import React, { ReactNode, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface ConfirmButtonProps {
  type?: ButtonType;
  size?: SizeType;
  icon?: ReactNode;
  popupTitle?: ReactNode;
  disablePopup?: boolean;
  children?: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Confirm 버튼
 *
 * @Author: circlegiven
 * @Date: 2022-03-31
 */
const ConfirmButton = ({
  icon,
  size,
  type = 'primary',
  disablePopup,
  children,
  popupTitle,
  cancelText = '취소',
  okText = '확인',
  onOk,
  onCancel,
}: ConfirmButtonProps) => {
  /******************************************
   * Constant / State
   * ****************************************/

  const [visible, setVisible] = useState(false);

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  function handleCancel(event: React.MouseEvent<HTMLElement>) {
    close();

    if (onCancel) {
      onCancel(event);
    }
  }

  function handleConfirm(event: React.MouseEvent<HTMLElement>) {
    close();

    if (onOk) {
      onOk(event);
    }
  }

  function handleChangedConfirmVisible(confirmVisible: boolean) {
    if (disablePopup) {
      return;
    }

    setVisible(confirmVisible);
  }

  /******************************************
   * Function
   * ****************************************/

  function close() {
    setVisible(false);
  }

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return (
    <Popconfirm
      icon={icon}
      title={popupTitle}
      cancelButtonProps={{
        onClick: handleCancel,
      }}
      okButtonProps={{
        onClick: handleConfirm,
      }}
      cancelText={cancelText}
      okText={okText}
      onVisibleChange={handleChangedConfirmVisible}
      visible={visible}>
      <Button
        size={size}
        type={type}>
        {children}
      </Button>
    </Popconfirm>
  );
};

export default ConfirmButton;
