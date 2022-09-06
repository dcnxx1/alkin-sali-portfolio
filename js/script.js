var splideIndex = 1
const covers = document.querySelectorAll('.mobile-cover')

const appcover = document.querySelectorAll('.cover-img')
const radialButtons = document.querySelectorAll('.radial-button')
const projectPage = document.querySelector('.project-page')
const closePage = document.querySelector('.project-escape')
const projectSection = document.querySelector('.project')
const bodyBlack = document.querySelector('.body-black')
var isProjectPage = false
var currentPage = 'button1'

const previousButton = document.querySelector('.go-previous')
const nextButton = document.querySelector('.go-next')

// gsap.to('.cover-qr', {scale: ".5", transform: "translate(-50px, 0px)", opacity: 0, duration: .2})

const splide = new Splide('.splide', {
    arrows: false,
    perPage: 1,
    pagination: false,
    drag: false,
    start: splideIndex,
    perMove: 1,
    isNavigation: true
})

splide.on('mounted', () => {
    splide.go(0)
    removeButtons(splide.length, splide.index)
})




splide.mount()







nextButton.addEventListener('click', e => {
    splide.go('>')
   removeButtons(splide.lengt, splide.index)
})

function removeButtons(length, index){
    if(index + 1 === length){
        nextButton.style.visibility  = "hidden"
    } else {
        nextButton.style.visibility = "visible"
    }

    if(index === 0) {
        gsap.to(previousButton, {
            visibility: 'hidden',
            duration: 1,
            ease: "none"
        })
    } else {
        gsap.to(previousButton, {
            visibility: 'visible',
            duration: 1,
            ease: "none"
        })
    }
}


previousButton.addEventListener('click',e => {
    splide.go('<')
    
    removeButtons(splide.length, splide.index)
})

function pageTo(attr){
        
        if(attr === "alktunes"){
            splide.go(0)
            removeButtons(splide.length, splide.index)
        }
    
        if(attr === "shopee"){
            splide.go(1)
            removeButtons(splide.length, splide.index)
        }
    
        if(attr === "qrcode"){
            splide.go(2)
            removeButtons(splide.length, splide.index)
        }
    
    
}

covers.forEach(cover => {
    cover.addEventListener('click', e => {
        document.body.style.overflow = "hidden"
        const attr = cover.getAttribute('data-cover')
        
  
        handleOverBody()
        gsap.fromTo(projectPage, {
            transform: 'translate(0px, -100%)',
            top: `${window.scrollY}px`
        }, {
            display: 'flex',
            transform: "translate(0px, 0%)",
            top: `${window.scrollY}px`,
            height: `80vh`,
            onComplete () {
                pageTo(attr)
            }
        })
    })
})






closePage.addEventListener('click', e => {
    

    gsap.to(projectPage, {
        transform: `translate(0px, -100%)`,
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