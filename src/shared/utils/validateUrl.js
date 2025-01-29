const validateUrl = (urlString) => {
  try {
    const url = new URL(urlString);

    const domain = url.hostname.split(".");
    if (domain.length < 2) {
      throw new Error("올바른 도메인 형식을 확인해주세요.");
    }

    const mainDomain = domain[domain.length - 2];
    if (mainDomain.length < 1) {
      throw new Error("웹사이트의 도메인 이름을 입력해주세요.");
    }
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(mainDomain)) {
      throw new Error(
        "유효하지 않은 도메인 이름 형식이에요. 문자, 숫자, 하이픈(-) 사용을 확인해주세요.",
      );
    }

    const topLevelDomain = domain[domain.length - 1];
    if (!/^[a-zA-Z]{2,}$/.test(topLevelDomain)) {
      throw new Error("유효하지 않은 최상위 도메인 형식이에요. com 등 2글자 이상 입력해주세요.");
    }

    return { isValid: true, errorMessage: null };
  } catch (error) {
    return { isValid: false, errorMessage: error.message };
  }
};

export { validateUrl };
