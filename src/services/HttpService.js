export default class HttpService {
  static extractUser(token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    return {
      user: {
        _id: userJson._id,
        email: userJson.email,
        username: userJson.username,
        firstname: userJson.firstname,
        surname: userJson.surname,
        password: userJson.password,
        phone: userJson.phone,
        birthdate: userJson.birthdate,
        registeredDate: userJson.registeredDate,
        gender: userJson.gender,
        district: userJson.district,
        postcode: userJson.postcode,
        city: userJson.city,
        correspondenceAddress: userJson.correspondenceAddress,
      },
    };
  }


  static async get(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      console.log("HTTP:"+url);
      let resp = await fetch(url, {
        method: "GET",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async put(url, data, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
          // resp.admin = this.extractAdmin(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async post(url, data, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }
    header.append("Content-Type", "application/json");

    try {
      let resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        if (resp.hasOwnProperty("token")) {
          window.localStorage["jwtToken"] = resp.token;
          resp.user = this.extractUser(resp.token);
        }
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static async remove(url, onSuccess, onError) {
    let token = window.localStorage["jwtToken"];
    let header = new Headers();
    if (token) {
      header.append("Authorization", `JWT ${token}`);
    }

    try {
      let resp = await fetch(url, {
        method: "DELETE",
        headers: header,
      });

      if (this.checkIfUnauthorized(resp)) {
        window.location = "/login";
        return;
      } else {
        resp = await resp.json();
      }

      if (resp.error) {
        onError(resp.error);
      } else {
        onSuccess(resp);
      }
    } catch (err) {
      onError(err.message);
    }
  }

  static checkIfUnauthorized(res) {
    if (res.status === 401) {
      return true;
    }
    return false;
  }
}
