const coverMore = document.querySelector('.mobile-cover')
const appcover = document.querySelectorAll('.cover-img')
const radialButtons = document.querySelectorAll('.radial-button')
const projectPage = document.querySelector('.project-page')
const closePage = document.querySelector('.project-escape')
const projectSection = document.querySelector('.project')
const bodyBlack = document.querySelector('.body-black')
var isProjectPage = false
var currentPage = 'button1'
// gsap.to('.cover-qr', {scale: ".5", transform: "translate(-50px, 0px)", opacity: 0, duration: .2})





new Splide('.splide').mount()

closePage.addEventListener('click', e => {
    
    gsap.fromTo(projectPage, {
        transform: "translate(0px, 0%)",
    }, {
        transform: "translate(0px, -100%)",
        display: "none", 
        onComplete() {
            document.body.style.overflow = "initial"
        }
    })
    gsap.to(bodyBlack, {
        display: 'none'
    })
   
})

radialButtons.forEach((button) => {
    const attr = button.getAttribute('data-button')
    button.addEventListener('click', e => {
        currentPage = attr
        lightButtons(attr)
        handleRadialButtons()
    })
})

function lightButtons(attr){
    
    radialButtons.forEach(button => {
        const btnAttribute = button.getAttribute('data-button')
        
        if(btnAttribute == attr){
            gsap.to(button, {
                background: '#70e000',
                border: '2px solid #70e000 ',
                color: '#002855',
                duration: .1
            })
        } else {
            gsap.to(button, {
                background: '#002855',
                color: '#38B000',
                border: '2px solid #38B000 ',
                duration: .1
            })
        }
    })
}

function handleOverBody () {
    gsap.to(bodyBlack, {
       display: 'block',
       duration: .6
    })
    
    bodyBlack.addEventListener('click', e => {
        gsap.to(bodyBlack, {
            display: 'none',
            onComplete() {
                document.body.style.overflow = "initial"
            }
        })
        gsap.to(projectPage, {
            transform: 'translate(0px, -100%)',
            display : 'none'
        })
    })
    
}

coverMore.addEventListener('click', e => {
    document.body.style.overflow = "hidden"
    handleOverBody()
    gsap.to(projectPage, {
        display: 'flex',
        transform: "translate(0px, 0%)",
        top: `${window.scrollY}px`,

        height: `80vh`,
    })
})

function handleProjectChange(imgSrc, textSrc){
    
}


function handleRadialButtons() {
    switch(currentPage){
        case 'button1':
        break;
        case 'button2':
        break;
        case 'button3':
        break;
        default:
             
        break;
    }
}


// btn inactive
// gsap.to(button, {
//     background: '#002855',
//     color: '#38B000',
//     border: '2px solid #38B000 ',
//     duration: .1
// })

// btn active
// gsap.to(button, {
//     background: '#70e000',
//     border: '2px solid #70e000 ',
//     color: '#002855',
//     duration: .1
    
// })