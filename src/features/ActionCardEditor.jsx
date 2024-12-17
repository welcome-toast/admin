import PropTypes from "prop-types";

function ActionCardEditor({ action, setAction, isActionSavedRef, sendActionInfo }) {
  function handleActionChange(actionType, input) {
    setAction((state) => ({ ...state, [actionType]: input }));

    if (isActionSavedRef.current) {
      sendActionInfo({ ...action, [actionType]: input });
    }
    return;
  }

  return (
    <div>
      <div className="my-3 flex flex-col">
        <span className="font-bold text-gray-900 text-l">액션 이름</span>
        <label className="my-5 flex flex-col gap-5">
          <input
            type="text"
            id="settingActionName"
            name="settingActionName"
            value={action.name}
            placeholder="액션 이름을 입력하세요"
            className="h-10 border-2 border-solid"
            onChange={(e) => handleActionChange("name", e.target.value)}
          />
        </label>
      </div>
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
            className="h-10 border-2 border-solid"
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
            className="h-10 border-2 border-solid"
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
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
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
            value={action.message_button_color}
            className="border-2 border-solid"
            onChange={(e) => handleActionChange("message_button_color", e.target.value)}
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
    message_button_color: PropTypes.string,
    background_opacity: PropTypes.string,
    project_id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  setAction: PropTypes.func.isRequired,
  isActionSavedRef: PropTypes.object.isRequired,
  sendActionInfo: PropTypes.func.isRequired,
};
