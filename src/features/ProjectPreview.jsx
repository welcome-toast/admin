function ProjectPreview() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full border-2 border-solid">미리보기 콘텐츠</div>
      <iframe
        id="projectPreview"
        title="projectPreview"
        src="https://www.vanillacoding.co/"
        className="w-full h-full"
      />
    </div>
  );
}

export default ProjectPreview;
