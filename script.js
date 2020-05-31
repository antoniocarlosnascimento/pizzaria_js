let modalQuantidade = 1;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Listagem das pizzas
// pizzaJson - referente ao JSON que já esta carregado no documento HTML
pizzaJson.map((item, index) => {
  let pizzaItem = c(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();

    // closest -> busque pele elemento mais proximo tanto abaixo quanto acima do elemento
    let key = event.target.closest(".pizza-item").getAttribute("data-key");
    modalQuantidade = 1;

    c(".pizzaBig img").src = pizzaJson[key].img;
    c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(
      2
    )}`;

    c(".pizzaInfo--size.selected").classList.remove("selected");

    cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex === 2) size.classList.add("selected");
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    c(".pizzaInfo--qt").innerHTML = modalQuantidade;

    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".pizzaWindowArea").style.opacity = 1;
    }, 300);
  });

  c(".pizza-area").append(pizzaItem);
});

// Eventos do modal
function closeModal() {
  c(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    c(".pizzaWindowArea").style.display = "none";
  }, 500);
}
cs(
  ".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton"
).forEach((botaoCancela) => botaoCancela.addEventListener("click", closeModal));

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQuantidade > 1) {
    modalQuantidade--;
    c(".pizzaInfo--qt").innerHTML = modalQuantidade;
  }
});

c(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQuantidade++;
  c(".pizzaInfo--qt").innerHTML = modalQuantidade;
});

cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", (event) => {
    c(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});
