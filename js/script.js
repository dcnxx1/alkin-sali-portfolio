const coverMore = document.querySelector('.mobile-cover')
const appcover = document.querySelectorAll('.cover-img')
const radialButtons = document.querySelectorAll('.radial-button')
const projectPage = document.querySelector('.project-page')
const closePage = document.querySelector('.project-escape')


var isProjectPage = false
var currentPage = 'button1'
// gsap.to('.cover-qr', {scale: ".5", transform: "translate(-50px, 0px)", opacity: 0, duration: .2})


document.body.style.overflow = isProjectPage ? "hidden" : "initial"


closePage.addEventListener('click', e => {
    
    gsap.fromTo(projectPage, {
        transform: "translate(0px, 0%)",
    }, {
        transform: "translate(0px, -100%)", 
        onComplete() {
            document.body.style.overflow = "initial"
        }
    })
   
})

radialButtons.forEach((button) => {
    button.addEventListener('click', e => {
        const attr = button.getAttribute('data-button')
        handleCovers(attr)
       
    })
})

coverMore.addEventListener('click', e => {
    document.body.style.overflow = "hidden"
    gsap.to(projectPage, {
        display: 'flex',
        transform: "translate(0px, 0%)"
    })
})


function handleCovers(buttonId){
    switch(buttonId){
        case 'button1':
            
           
            break;

        case 'button2':
                
            
        break;

        case 'button3':
            
              
        break;

        default : 

            break;
    }

}