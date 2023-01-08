const form = document.getElementById("form");
const lista = document.getElementById("lista");
const nameText = document.getElementById("name");
const age = document.getElementById("age");
const weight = document.getElementById("weight");
const height = document.getElementById("height");

const menssageEmpty = document.getElementById("menssage-empty");

const url = "http://localhost:8000/pessoas";

const app = () => {
  //Metodo Listar pessoas
  const listPeople = async () => {
    const response = await axios.get(url);
    const pessoas = response.data.pessoas;

    lista.innerHTML = "";

    pessoas.forEach((pessoa) => {
      const div = document.createElement("div");

      const liName = document.createElement("li");
      const liAge = document.createElement("li");
      const liWeight = document.createElement("li");
      const liHeight = document.createElement("li");

      liName.textContent = `Nome: ${pessoa.nome}`;
      liAge.textContent = `Idade: ${pessoa.idade}`;
      liWeight.textContent = `Peso: ${pessoa.peso.toFixed(2)} kg`;
      liHeight.textContent = `Altura: ${pessoa.altura.toFixed(2)} cm`;

      div.appendChild(liName);
      div.appendChild(liAge);
      div.appendChild(liWeight);
      div.appendChild(liHeight);

      lista.appendChild(div);

      if (lista.childElementCount > 0) {
        menssageEmpty.style.display = "none";
      }
    });
  };

  listPeople();

  //Metodo para cadastrar uma pessoa
  form.onsubmit = (e) => {
    e.preventDefault();

    const ageValue = Number(age.value);
    const heightValue = Number(height.value);
    const weightValue = Number(weight.value);

    axios.post(url, {
      nome: nameText.value,
      idade: ageValue,
      peso: weightValue,
      altura: heightValue,
    });

    nameText.value = "";
    age.value = "";
    height.value = "";
    weight.value = "";

    listPeople();
  };
};

app();
