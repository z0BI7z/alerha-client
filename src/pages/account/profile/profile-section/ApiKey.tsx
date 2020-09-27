import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import {
  selectApiKey,
  fetchApiKeyStart,
  createApiKeyStart,
} from "../../../../modules/user";
import {
  ApiKeyCopyContainer,
  ApiKeyLabel,
  ApiKeyCopyText,
} from "./api-key/styles";
import Spacer from "../../../../components/Spacer";

function ApiKey() {
  const dispatch = useDispatch();
  const apiKey = useSelector(selectApiKey);

  useEffect(() => {
    dispatch(fetchApiKeyStart());
  }, [dispatch]);

  const createApiKey = useCallback(() => dispatch(createApiKeyStart()), [
    dispatch,
  ]);

  const copyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
    }
  };

  return (
    <div>
      <ApiKeyLabel>Your Key:</ApiKeyLabel>
      <ApiKeyCopyContainer>
        <ApiKeyCopyText>{apiKey ? apiKey : "No api key"}</ApiKeyCopyText>
        <Spacer width="1rem" />
        <Button
          type="dashed"
          shape="circle-outline"
          icon={<CopyOutlined />}
          onClick={copyApiKey}
        />
      </ApiKeyCopyContainer>
      <Spacer height="1rem" />
      <Button onClick={createApiKey}>
        {apiKey ? "Reset key" : "Generate an api key"}
      </Button>
    </div>
  );
}

export default ApiKey;
