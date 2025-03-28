interface Toast {
  id: string;
  name: string;
  message_title: string;
  message_body: string;
  image_url: string;
  target_element_id: string;
}

type firstToast = Toast | null;

interface ToastInput {
  name: string;
  message_title: string;
  message_body: string;
  image_url: string;
  target_element_id: string;
}

type sendToastInput = (toastInput: ToastInput) => void;

export type { Toast, firstToast, ToastInput, sendToastInput };
