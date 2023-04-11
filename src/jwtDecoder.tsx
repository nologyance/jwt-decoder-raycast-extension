import { useState } from 'react';
import { Action, ActionPanel, Form, showToast, Toast } from '@raycast/api';

export default function Command() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleSubmit = () => {
    try {
      const [header, payload, signature] = jwt.split('.');
      const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
      const decodedString = JSON.stringify(JSON.parse(decodedPayload), null, 2);
      setDecoded(decodedString);
    } catch (error: any) {
      showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: error.message,
      });
    }
  };

  return (
      <Form
        actions={
        <ActionPanel>
          <Action.SubmitForm title="Decode" onSubmit={handleSubmit} />
        </ActionPanel>
      }>
      <Form.TextField id="jwt" value={jwt} onChange={setJwt} />
      <Form.TextArea id="decoded" value={decoded} />
    </Form>
  );
}
