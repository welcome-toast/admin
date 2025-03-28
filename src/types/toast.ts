interface Toast {
  id: string;
  name: string;
  message_title: string;
  message_body: string;
  image_url: string;
  target_element_id: string;
}

type FirstToast = Toast | null;

interface ToastInput {
  name: string;
  message_title: string;
  message_body: string;
  image_url: string;
  target_element_id: string;
}

interface ToastShown {
  isToastSaved: boolean;
  warningType: string;
}

interface ToastInputError {
  name: string;
  message_title: string;
  message_body: string;
  target_element_id: string;
}

type SendToastInput = (toastInput: ToastInput) => void;

export type { Toast, FirstToast, ToastInput, SendToastInput, ToastShown, ToastInputError };
