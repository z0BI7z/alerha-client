import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ConfirmModal } from "./messages-actions/ConfirmModal";
import { MessagesActionsButton } from "./messages-actions/styles";
import {
  deleteMessagesStart,
  fetchMessagesStart,
} from "../../modules/messages";

function MessagesActions() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState<Function | null>(null);

  const deleteMessages = (date?: string) => {
    setPendingAction(() => deleteMessagesStart(date));
    setVisible(true);
  };

  const onConfirm = () => {
    if (pendingAction) {
      dispatch(pendingAction);
    }
    setPendingAction(null);
    setVisible(false);
  };

  const onCancel = () => {
    setPendingAction(null);
    setVisible(false);
  };

  const reloadMessages = () => {
    dispatch(fetchMessagesStart());
  };

  const menu = (
    <Menu style={{ display: "inline-block" }}>
      <Menu.Item onClick={reloadMessages}>Reload</Menu.Item>
      <Menu.SubMenu title="Delete">
        <Menu.Item
          onClick={() =>
            deleteMessages(moment().subtract(1, "hour").toISOString())
          }
        >
          {"Before last hour"}
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            deleteMessages(moment().subtract(1, "day").toISOString())
          }
        >
          {"Before last day"}
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            deleteMessages(moment().subtract(1, "month").toISOString())
          }
        >
          {"Before last 30 days"}
        </Menu.Item>
        <Menu.Item onClick={() => deleteMessages()}>{"All"}</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <React.Fragment>
      <div>
        <Dropdown overlay={menu}>
          <MessagesActionsButton>
            Actions <DownOutlined />
          </MessagesActionsButton>
        </Dropdown>
      </div>
      <ConfirmModal
        visible={visible}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </React.Fragment>
  );
}

export default MessagesActions;
