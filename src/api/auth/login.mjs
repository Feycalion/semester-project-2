async function login(email, pw) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"x-noroff-api-key": "ekwrjwekjwrk",
      //   Authentication: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      password: pw,
    }),
  };

  console.log(options.body);
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/login",
      options
    );
    const result = await response.json();
    console.log(result);
  } catch (e) {
    //onsole.log(e);
  }
}

login("chili999@stud.noroff.no", "chili9999");
