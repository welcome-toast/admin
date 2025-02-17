import { MAX_INPUT_LENGTH } from "../constant";

function checkNewToast([toastKey, toastValue], key) {
  return toastKey === key && toastValue === "";
}

function validateInputLengthLimit(inputType, inputLength) {
  const lengthGuide = `(현재 글자 수 ${inputLength > MAX_INPUT_LENGTH ? "999+" : inputLength})`;

  switch (inputType) {
    case "name":
      if (inputLength > 10) {
        return `이름을 10자 이하로 입력해주세요 ${lengthGuide}`;
      }
      return true;
    case "message_title":
      if (inputLength > 20) {
        return `메시지 제목은 20자 이하를 권장해요 ${lengthGuide}`;
      }
      return true;
    case "message_body":
      if (inputLength > 50) {
        return `메시지 본문을 50자 이하로 입력해주세요 ${lengthGuide}`;
      }
      return true;
    default:
      return true;
  }
}

export { checkNewToast, validateInputLengthLimit };
