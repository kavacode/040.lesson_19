async function searchUser() {
  const usernameInput = document.getElementById("usernameInput");
  const searchTerm = usernameInput.value.trim();
  if (!searchTerm) {
    alert("Enter a GitHub username");
    return;
  }

  const apiUrl = `https://api.github.com/users/${searchTerm}`;
  const response = await fetch(apiUrl);
  if (response.ok) {
    const userData = await response.json();
    displayUserInfo(userData);
  } else {
    alert("User not found or an error occurred");
  }
}

async function getRandomUserData() {
  try {
    const usersResponse = await fetch("https://api.github.com/users");
    if (!usersResponse.ok) {
      throw new Error("Failed to fetch user list");
    }

    const users = await usersResponse.json();
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const userDetailsResponse = await fetch(randomUser.url);
    if (!userDetailsResponse.ok) {
      throw new Error("Failed to fetch user data");
    }
    displayUserInfo(await userDetailsResponse.json());
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to fetch random user");
  }
}

function displayUserInfo(user) {
  const userInfoContainer = document.getElementById("userInfo");
  userInfoContainer.innerHTML = `
	  <img src="${user.avatar_url}" alt="${user.login}" width="100">
	  <h2>${user.login}</h2>
	  <p>${user.bio || "No bio available"}</p>
	  <p>Location: ${user.location || "Not specified"}</p>
	  <p>Followers: ${user.followers}</p>
	`;
}
