function ActionCardEditor() {
  return (
    <div>
      <div className="flex justify-center border-2 border-solid rounded h-10">
        <button
          type="button"
          className="border-2 border-gray rounded bg-black text-white w-full h-full"
        >
          콘텐츠
        </button>
        <button type="button" className="border-2 border-gray rounded w-full h-full">
          스타일
        </button>
      </div>
      <div className="flex flex-col gap-5 my-5">
        <span>메시지</span>
        <input
          type="text"
          id="settingMessageTitle"
          name="settingMessageTitle"
          placeholder="제목을 입력하세요"
          className="border-2 border-solid"
        />
        <input
          type="text"
          id="settingMessageBody"
          name="settingMessageBody"
          placeholder="본문을 입력하세요"
          className="border-2 border-solid"
        />
      </div>
      <div className="flex flex-col gap-5 my-5">
        <span>배경 투명도</span>
        <input
          type="range"
          id="settingBackgroundOpacity"
          name="settingBackgroundOpacity"
          className="border-2 border-solid"
        />
      </div>
      <div className="flex flex-col gap-5 my-5">
        <span>메시지 버튼 색상</span>
        <input
          type="color"
          id="settingMessageButtonColor"
          name="settingMessageButtonColor"
          className="border-2 border-solid"
        />
      </div>
    </div>
  );
}

export default ActionCardEditor;
