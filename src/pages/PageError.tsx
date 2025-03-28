import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

function PageError() {
  const navigate = useNavigate();

  function handleHomeButtonClick() {
    navigate("/");
  }

  return (
    <main className="mt-32 flex flex-col items-center justify-center gap-5">
      <span className="font-semibold text-lg">페이지를 찾을 수 없어요!</span>
      <Button text={"👉 홈으로 돌아가기"} onClick={handleHomeButtonClick} />
    </main>
  );
}

export default PageError;
