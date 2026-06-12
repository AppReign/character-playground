/** Keep in sync with AuthService.ts + dotvEnv.ts (callback.html is outside webpack). */
function getOidcCallbackSettings(Oidc) {
  var host = window.location.hostname;
  var authority;
  var clientId;

  if (host === "localhost" || host === "127.0.0.1") {
    authority = "https://login-stage.dragonsofthevoid.com";
    clientId = "dotv-creator-local";
  } else if (window.location.href.indexOf("stage") !== -1) {
    authority = "https://login-stage.dragonsofthevoid.com";
    clientId = "dotv-creator-stage";
  } else {
    authority = "https://login.dragonsofthevoid.com";
    clientId = "dotv-creator";
  }

  return {
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
    authority: authority,
    client_id: clientId,
    redirect_uri: window.location.origin + "/callback.html",
    response_type: "id_token token",
    scope: "openid profile email api1.read api1.write",
    automaticSilentRenew: false,
    monitorSession: false
  };
}
