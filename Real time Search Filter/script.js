let users = [
  {
    name: "amisha rathore",
    pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "silent chaos in a loud world 🖤🌙 | not for everyone",
  },
  {
    name: "kiara mehta",
    pic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    bio: "main character energy ☕✨ | coffee > everything ✨🤍",
  },
  {
    name: "aarav sharma",
    pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "living one chapter at a time 📘 | peace > drama",
  },
  {
    name: "sana kapoor",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "sunsets & soft music 🌅🎧 | emotionally unavailable 💛",
  },
  {
    name: "reyansh patel",
    pic: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    bio: "chaotic good vibes 😎🔥 | dreaming loudly",
  },
  {
    name: "isha malhotra",
    pic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    bio: "flower but with thorns 🌸🗡️ | soft on the inside",
  },
];

function showUsers(arr) {
  arr.forEach(function (user) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create image
    const img = document.createElement("img");
    img.src = user.pic;
    img.classList.add("bg-img");

    // Create text-area div
    const textArea = document.createElement("div");
    textArea.classList.add("text-area");

    // Create h3 heading
    const heading = document.createElement("h3");
    heading.textContent = user.name;

    // Create paragraph
    const para = document.createElement("p");
    para.textContent = user.bio;

    // Append h3 + p inside text-area
    textArea.appendChild(heading);
    textArea.appendChild(para);

    // Append image + text-area into card
    card.appendChild(img);
    card.appendChild(textArea);

    // Finally, append card into container
    document.querySelector(".card").appendChild(card);
  });
}
showUsers(users);

let input = document.querySelector("input");
input.addEventListener("input", function () {
  console.log(input);
  let newuser = users.filter((user) => {
    return user.name.startsWith(input.value);
  });
  document.querySelector(".card").innerHTML = "";
  showUsers(newuser);
});
