async function register(username, email, pw) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: pw,
    }),
  };

  console.log(options.body);

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/register",
      options
    );
    const result = await response.json();
    console.log(result);
  } catch (e) {}
}

register("chili999", "chili999@stud.noroff.no", "chili9999");
