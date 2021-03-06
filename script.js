let carrinho = [];
let modalKey = 0;
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
    modalKey = key;

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

// Carrinho modal
c(".pizzaInfo--addButton").addEventListener("click", () => {
  let sizePizza = parseInt(
    c(".pizzaInfo--size.selected").getAttribute("data-key")
  );

  let identifier = `${pizzaJson[modalKey].id}@${sizePizza}`;
  let key = carrinho.findIndex((item) => item.identifier === identifier); //findIndex -> retorna a index do primeiro item encontrado e caso não encontre retorna -1(false)

  if (key > -1) {
    carrinho[key].quantidade += modalQuantidade;
  } else {
    carrinho.push({
      identifier,
      id: pizzaJson[modalKey].id,
      sizePizza,
      quantidade: modalQuantidade,
    });
  }

  updateCarrinho();
  closeModal();
});

c(".menu-openner").addEventListener("click", () => {
  if (carrinho.length > 0) c("aside").style.left = 0;
});

c(".menu-closer").addEventListener(
  "click",
  () => (c("aside").style.left = "100vw")
);
c(".menu-closer").addEventListener(
  "click",
  () => (c("aside").style.left = "100vw")
);

function updateCarrinho() {
  c(".menu-openner span").innerHTML = carrinho.length;
  if (carrinho.length > 0) {
    c("aside").classList.add("show");
    c(".cart").innerHTML = "";

    let subTotal = 0;
    let desconto = 0;
    let total = 0;

    for (let i in carrinho) {
      let pizzaItem = pizzaJson.find((item) => item.id === carrinho[i].id); //find - retorna o item encontrado com seus valores
      subTotal += pizzaItem.price * carrinho[i].quantidade;
      let carrinhoItem = c(".models .cart--item").cloneNode(true);
      let pizzaSizeName;
      switch (carrinho[i].sizePizza) {
        case 0:
          pizzaSizeName = "P";
          break;
        case 1:
          pizzaSizeName = "M";
          break;
        case 2:
          pizzaSizeName = "G";
          break;
      }
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
      carrinhoItem.querySelector("img").src = pizzaItem.img;
      carrinhoItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      carrinhoItem.querySelector(".cart--item--qt").innerHTML =
        carrinho[i].quantidade;
      carrinhoItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (carrinho[i].quantidade > 1) carrinho[i].quantidade--;
          else carrinho.splice(i, 1); //remove o item index 1, quantidade a ser removido após o index já contando com a index
          updateCarrinho();
        });
      carrinhoItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          carrinho[i].quantidade++;
          updateCarrinho();
        });

      c(".cart").append(carrinhoItem);
    }

    desconto = subTotal * 0.1;
    total = subTotal - desconto;

    c(".subtotal span:last-child").innerHTML = `R$ ${subTotal.toFixed(2)}`;
    c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
    c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    c("aside").classList.remove("show");
    c("aside").style.left = "100vw";
  }
}
