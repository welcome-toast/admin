interface Toast {
  id: string;
  name: string;
  type: string;
  message_title: string;
  message_body: string;
  message_button_color: string;
  target_element_id: string;
  image_url: string;
  background_opacity: number;
  project_id?: string;
  created_at?: string;
  updated_at?: string;
}

type FirstToast = Toast | null;

interface ToastInput {
  name: string;
  message_title: string;
  message_body: string;
  image_url: string;
  message_button_color: string;
  target_element_id: string;
  background_opacity: number;
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
