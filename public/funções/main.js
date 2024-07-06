
function slide3d() {
 
  const imagens = ['./img/infantil.png', './img/d27.png', './img/h1.png', './img/d11.png', './design/gta1.png', './img/otto.png', './design/MaiDefinitive.png', './img/lobo.png', './design/my.png', './design/un.png', './design/fg.png', './design/nago.png', "./img/load.gif"];
  
  let fotoClasses = ['foto1', 'foto2', 'foto3', 'foto4', 'foto5'];

  // Índice atual para rastrear a posição atual do slide
  let indiceAtual = 0;
  
  const fotos = document.querySelectorAll('.foto');
  const prev = document.querySelector('.prev');
  prev.addEventListener('click', () => {
    prev.classList.toggle('active');
    const firstClass = fotoClasses.shift();
    fotoClasses.push(firstClass);
    fotos.forEach((foto, index) => {
      foto.classList.remove(fotoClasses[(index + fotoClasses.length - 1) % fotoClasses.length]);
      foto.classList.add(fotoClasses[index]);
    });

    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    fotos.forEach((foto, index) => {
      const nextIndex = (index + 1) % imagens.length;
      foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
    });
  });

  const next = document.querySelector('.next');
  next.addEventListener('click', () => {
    next.classList.toggle('active');
    const lastClass = fotoClasses.pop();
    fotoClasses.unshift(lastClass);
    fotos.forEach((foto, index) => {
      foto.classList.remove(fotoClasses[(index + 1) % fotoClasses.length]);
      foto.classList.add(fotoClasses[index]);
    });

    indiceAtual = (indiceAtual + 1) % imagens.length;
    fotos.forEach((foto, index) => {
      const nextIndex = (index + 1) % imagens.length;
      foto.src = imagens[(indiceAtual + nextIndex) % imagens.length];
    });
  });

  const image = document.querySelectorAll('.ft');
  image.forEach((ft, index) => {
    ft.addEventListener('click', () => {
      const sl = document.querySelector('#slide');
      sl.classList.add('active');
      const clickedImgSrc = ft.getAttribute('src');
      const imgIndex = imagens.findIndex(imgSrc => imgSrc === clickedImgSrc);
      indiceAtual = imgIndex;
      document.querySelector('#slide img').src = clickedImgSrc;
      fotos.forEach((foto, index) => {
        foto.src = imagens[(indiceAtual + index) % imagens.length];
      });
    });
  });

  const mais = document.querySelector('.mais');
  mais.addEventListener('click', () => {
    const sl = document.querySelector('#slide');
    sl.classList.toggle('active');
  });

  // Guardar as classes originais das imagens
  const classesOriginais = [...fotoClasses];
  const close = document.querySelector('#close');
  close.addEventListener('click', () => {
    fotos.forEach((foto, index) => {
      foto.classList.remove(fotoClasses[index]);
      foto.classList.add(classesOriginais[index]);
    });
    fotoClasses = [...classesOriginais];
    indiceAtual = 0;
    fotos.forEach((foto, index) => {
      foto.src = imagens[(indiceAtual + index) % imagens.length];
    });
    // Fechar o slide removendo a classe 'active'
    const sl = document.querySelector('#slide');
    sl.classList.remove('active');
    prev.classList.remove('active');
    next.classList.remove('active');
  });
}

window.addEventListener('load', slide3d);
window.addEventListener('resize', slide3d);

   // Função para copiar texto para a área de transferência e exibir mensagem
   function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        const originalText = element.innerHTML;
        element.innerHTML = "Link copiado";
        setTimeout(function() {
            element.innerHTML = originalText;
        }, 2000);
    }, function(err) {
        console.error("Erro ao copiar o texto: ", err);
    });
}
const emailBotao = document.getElementById('email');
emailBotao.addEventListener('click', event =>{
  const contact_email = document.querySelector('#contact-email')
  contact_email.classList.toggle('active');
})

const contact_email = document.getElementById("contact-email");
 contact_email.addEventListener("click", function(event) {
    event.preventDefault();
    copyToClipboard("yale.designers@gmail.com", this);
});
//menuMobile
   const btn = document.querySelector('.btn')
   btn.addEventListener('click', ()=> {
    const nave = document.querySelector('#menuL')
    menuL.classList.toggle('active');

    
    
   })  