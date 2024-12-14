import PropTypes from "prop-types";

function ActionCardEditor({ action, setAction, sendActionInfo }) {
  function handleActionChange(actionType, input) {
    setAction((state) => ({ ...state, [actionType]: input }));
    sendActionInfo({ ...action, [actionType]: input });
  }

  return (
    <div>
      <div className="flex h-10 justify-center rounded border-2 border-solid">
        <button
          type="button"
          className="h-full w-full rounded border-2 border-gray bg-black text-white"
        >
          콘텐츠
        </button>
        <button type="button" className="h-full w-full rounded border-2 border-gray">
          스타일
        </button>
      </div>
      <div className="my-3 flex flex-col">
        <span>메시지</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="settingMessageTitle"
            name="settingMessageTitle"
            value={action.message_title}
            placeholder="제목을 입력하세요"
            className="border-2 border-solid"
            onChange={(e) => handleActionChange("message_title", e.target.value)}
          />
        </label>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="settingMessageBody"
            name="settingMessageBody"
            value={action.message_body}
            placeholder="본문을 입력하세요"
            className="border-2 border-solid"
            onChange={(e) => handleActionChange("message_body", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col">
        <span>배경 투명도</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="range"
            id="settingBackgroundOpacity"
            name="settingBackgroundOpacity"
            value={action.background_opacity}
            className="border-2 border-solid"
            onChange={(e) => handleActionChange("background_opacity", e.target.value)}
          />
        </label>
      </div>
      <div className="my-3 flex flex-col">
        <span>메시지 버튼 색상</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="color"
            id="settingMessageButtonColor"
            name="settingMessageButtonColor"
            value={
              action.message_button_color_code === "" ? "#ffffff" : action.message_button_color_code
            }
            className="border-2 border-solid"
            onChange={(e) => handleActionChange("message_button_color_code", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default ActionCardEditor;

ActionCardEditor.propTypes = {
  action: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    target_element_id: PropTypes.string,
    message_title: PropTypes.string,
    message_body: PropTypes.string,
    message_button_color_code: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  setAction: PropTypes.func.isRequired,
  sendActionInfo: PropTypes.func.isRequired,
};
