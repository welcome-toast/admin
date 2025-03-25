function getInstallCode(apiKey) {
  const VERSION = "1.0.0";
  const SDK_URL = `https://cdn.jsdelivr.net/gh/welcome-toast/welcome-toast@refs/heads/v${VERSION}/src/main.js`;

  return `<script>
  window.welcometoastConfig = {
    apiKey: "${apiKey}",
    init: function() {
      window.welcometoast.getProject(window.welcometoastConfig.apiKey);
    }
  };
</script>
<script defer type="text/javascript" src="${SDK_URL}"></script>`;
}

export { getInstallCode };
