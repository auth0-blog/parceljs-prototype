# Zero Config JavaScript App Prototyping with ParcelJS

To run:

```bash
git clone git@github.com:auth0-blog/webpack-prototype.git
```

```bash
npm install
```

```bash
npm run dev
```

Sometimes you don't need a framework like Vue or React to demonstrate an idea or concept in JavaScript. You just want a framework-agnostic, plain JavaScript development environment to play around with things like [service workers](https://auth0.com/blog/creating-offline-first-web-apps-with-service-workers/), [web workers](https://auth0.com/blog/speedy-introduction-to-web-workers/), new JavaScript syntax, or IndexedDB, for example. In this blog post, you are going to learn how to quickly prototype plain JavaScript apps using ParcelJS to create such environment with zero config and low development overhead.

[ParcelJS](https://parceljs.org/) is an established web application bundler that powers cloud development platforms such as [CodeSandbox](https://codesandbox.io) to create plain JavaScript projects. Its developers position it as a fast and zero configuration bundler with the following features:

- Fast bundle times.
- Zero config code splitting.
- Hot module replacement with no configuration needed.
- Automatic transforms using Babel, PostCSS, and PostHTML when needed.
- Parcel has out-of-the-box support for JS, CSS, HTML, file assets, and more without needing any plugins or loaders.
- Readable error logging by printing syntax highlighted code frames when it encounters errors.

For the use case of this blog post, which is to quickly prototype vanilla JavaScript apps, these are promising features. However, ParcelJS also has the capability and flexibility to help you build highly complex applications.

![Polished version of the ParcelJS JavaScript app.](https://cdn.auth0.com/blog/zero-config-javascript-app-prototyping-with-parceljs/parceljs-polished-app.png)

## Auth0: Never Compromise on Identity

At [Auth0](https://auth0.com/), we make heavy use of full-stack JavaScript to help our customers to [manage user identities including password resets, creating and provisioning, blocking and deleting users](https://auth0.com/user-management). We also created a serverless platform, called [Auth0 Extend](https://auth0.com/extend/), that enables customers to run arbitrary JavaScript functions securely. Therefore, it must come as no surprise that using our identity management platform on JavaScript web apps is a piece of cake.

[Auth0 offers a **free tier**](https://auth0.com/pricing) to get started with modern authentication. Check it out, or <a href="https://auth0.com/signup" data-amp-replace="CLIENT_ID" data-amp-addparams="anonId=CLIENT_ID(cid-scope-cookie-fallback-name)">sign up for a free Auth0 account here</a>!

![Auth0 Login Page](https://cdn2.auth0.com/docs/media/articles/web/hosted-login.png)

It's as easy as installing the [`auth0-js`](https://github.com/auth0/auth0.js) and [`jwt-decode`](https://github.com/auth0/jwt-decode) node modules like so:

```bash
npm install jwt-decode auth0-js --save
```

Then implement the following in your JS app:

```js
const auth0 = new auth0.WebAuth({
  clientID: "YOUR-AUTH0-CLIENT-ID", // E.g., you.auth0.com
  domain: "YOUR-AUTH0-DOMAIN",
  scope: "openid email profile YOUR-ADDITIONAL-SCOPES",
  audience: "YOUR-API-AUDIENCES", // See https://auth0.com/docs/api-auth
  responseType: "token id_token",
  redirectUri: "http://localhost:9000" //YOUR-REDIRECT-URL
});

function logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("access_token");
  window.location.href = "/";
}

function showProfileInfo(profile) {
  var btnLogin = document.getElementById("btn-login");
  var btnLogout = document.getElementById("btn-logout");
  var avatar = document.getElementById("avatar");
  document.getElementById("nickname").textContent = profile.nickname;
  btnLogin.style.display = "none";
  avatar.src = profile.picture;
  avatar.style.display = "block";
  btnLogout.style.display = "block";
}

function retrieveProfile() {
  var idToken = localStorage.getItem("id_token");
  if (idToken) {
    try {
      const profile = jwt_decode(idToken);
      showProfileInfo(profile);
    } catch (err) {
      alert("There was an error getting the profile: " + err.message);
    }
  }
}

auth0.parseHash(window.location.hash, (err, result) => {
  if (err || !result) {
    // Handle error
    return;
  }

  // You can use the ID token to get user information in the frontend.
  localStorage.setItem("id_token", result.idToken);
  // You can use this token to interact with server-side APIs.
  localStorage.setItem("access_token", result.accessToken);
  retrieveProfile();
});

function afterLoad() {
  // buttons
  var btnLogin = document.getElementById("btn-login");
  var btnLogout = document.getElementById("btn-logout");

  btnLogin.addEventListener("click", function() {
    auth0.authorize();
  });

  btnLogout.addEventListener("click", function() {
    logout();
  });

  retrieveProfile();
}

window.addEventListener("load", afterLoad);
```

Get [the full example using this code](https://github.com/auth0-blog/es2015-rundown-example).

Go ahead and check out our [Quick Start tutorials](https://auth0.com/docs/quickstarts) to learn how to implement authentication using different languages and frameworks in your apps.
