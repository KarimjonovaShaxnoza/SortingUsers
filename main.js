const apiURL = "https://randomuser.me/api/?results=36";
const usersList = document.getElementById("usersList");
const searchInput = document.getElementById("searchInput");
const sortOptions = document.getElementById("sortOptions");

let users = [];

async function fetchUsers() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    users = data.results.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      age: user.dob.age,
    }));
    renderUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function renderUsers(usersToRender) {
  usersList.innerHTML = usersToRender
    .map((user) => `<li>${user.name}, Age: ${user.age}</li>`)
    .join("");
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  renderUsers(filteredUsers);
});

sortOptions.addEventListener("change", () => {
  const sortOption = sortOptions.value;
  let sortedUsers = [...users];
  if (sortOption === "az") {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "za") {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "youngest") {
    sortedUsers.sort((a, b) => a.age - b.age);
  } else if (sortOption === "oldest") {
    sortedUsers.sort((a, b) => b.age - a.age);
  }
  renderUsers(sortedUsers);
});

fetchUsers();
