const NUMERO_WHATSAPP = "5592993651947";

const formulario = document.getElementById("formulario");

function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, "").slice(0, 11);

    valor = valor
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    input.value = valor;
}

function mascaraCNPJ(input) {
    let valor = input.value.replace(/\D/g, "").slice(0, 14);

    valor = valor
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");

    input.value = valor;
}

function mascaraCelular(input) {
    let valor = input.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 10) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1) $2-$3");
    }

    input.value = valor;
}

document.getElementById("cpf").addEventListener("input", function () {
    mascaraCPF(this);
});

document.getElementById("cnpj").addEventListener("input", function () {
    mascaraCNPJ(this);
});

document.getElementById("celular").addEventListener("input", function () {
    mascaraCelular(this);
});

document.querySelectorAll(".service-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        this.parentElement.classList.toggle("selected", this.checked);
    });
});

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const dados = new FormData(formulario);

    const servicos = [...document.querySelectorAll(".service-checkbox:checked")]
        .map(checkbox => checkbox.value)
        .join(", ") || "Não informado";

    const mensagem = `
Olá! Gostaria de entrar em contato com a Duo Consultoria e Negócios.

Dados do cliente

*Nome:* ${dados.get("nome")}
*CPF:* ${dados.get("cpf")}
*CNPJ:* ${dados.get("cnpj") || "Não informado"}
*Celular/WhatsApp:* ${dados.get("celular")}
*E-mail:* ${dados.get("email")}

*Serviços de interesse:*
${servicos}
    `.trim();

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});