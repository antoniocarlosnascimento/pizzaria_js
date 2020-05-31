const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// pizzaJson - referente ao JSON que já esta carregado no documento HTML
pizzaJson.map((item, index) => {
  let pizzaItem = c(".models .pizza-item").cloneNode(true);

  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (event) => {
    event.preventDefault();

    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".pizzaWindowArea").style.opacity = 1;
    }, 300);
  });

  c(".pizza-area").append(pizzaItem);
});
