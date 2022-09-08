gsap.registerPlugin(ScrollTrigger);

// INIT FOR SPLIDE 
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

// SPLIDE FUNCTIONS

const splide = new Splide('.splide', {
    arrows: false,
    perPage: 1,
    pagination: false,
    drag: false,
    start: 0,
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
    
}



// INIT NAV 

const navLinks = document.querySelectorAll('.nav-links')

document.querySelector('.logo-name').addEventListener('click', e => {
    gsap.to(window, {duration : 1.3, scrollTo: `#intro`, ease: "power2"})
})
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        const attr = link.getAttribute('data-link')
        gsap.to(window, {duration: 1.3, scrollTo: {y: `#${attr}`, offsetY: getWidth(attr)}, ease: "power2"})
    })

})

var oldScroll = window.scrollY

function closeBody(){
    gsap.to(bodyBlack, {
        display: 'none'
    })
    document.body.style.overflow = "scroll"
}


window.onscroll = (e) => {


    var currentScrollPosition = window.scrollY
    console.log(window.scrollY)

    if(currentScrollPosition <= 91){
        navNormal()
    } 


    if(window.scrollY >= 91){
        if(oldScroll > currentScrollPosition){
            // scroll up 
            handleNavUp()
           } else {
               // scroll down
            handleNavDown()
        }
    }
    
    oldScroll = currentScrollPosition
}

function navNormal() {
    gsap.to('nav', {
       y: 0,
       left: '0%',
       transform: 'translateX(0%)',
       width: '100%',
       position: 'fixed',
       background: 'initial',
       borderRadius: '0px',
    }) 
}

function handleNavUp() {
    gsap.to('nav', {
       y: 20,
       width: '80%',
       position: 'fixed',
       background: '#001845',
       left: '50%',
       transform: 'translateX(-50%)',
       borderRadius: '20px',
    })

}

function handleNavDown() {
    gsap.to('nav', {
        y: -140,
        transform: 'translateX(-50%)',
        left: '50%',
       
    })

   
}

function closeMenu(){
    gsap.to('.menu-mobile', {
        top: `${window.scrollY}px`,
        display: 'none',
        transform: 'translate(100%)',
        ease: "power2",  
    })
}

bodyBlack.addEventListener('click', e => {
    
    closeMenu()
    if(window.scrollY > 91){
        handleNavUp()
       
    }


    gsap.to(projectPage, {
        transform: 'translate(0px, -100%)',
        display : 'none'
    })
    document.body.overflow = 'scroll'
})



window.onresize = e => {
    if(window.innerWidth > 770){
        
       
        gsap.fromTo(projectPage, {
            transform: 'translate(0%, 0%)',
            top: `${window.scrollY}px`,
        }, {
            transform: 'translate(0px, -100%)',
            top: `${window.scrollY}px`,
            display: 'none'
        })
        gsap.to('.menu-mobile', {
            display: 'none',
            transform: 'translateX(100%)',
            
        })

        gsap.to(bodyBlack, {
            display: 'none',
            onComplete () {
                document.body.style.overflow = "initial"
            }
        })
        
    }
}

function getWidth (attr) {
    if(window.innerWidth <= 700){
        return 65
    } else {
        if(attr == "about"){
            return 95
        } else {
            return 80
        }
    }
}


// MENU - MOBILE 

const menuMobile = document.querySelector('.nav-menu')
const mobileLinks = document.querySelectorAll('.mobile-link')

mobileLinks.forEach(link => {
    link.addEventListener('click', e => {
        const attr = link.getAttribute('data-mobile-link')
        gsap.to(window, {duration: 1.3, scrollTo: {y: `#${attr}`, offsetY: getWidth(attr)}, ease: "power2"})
        closeBody()
        closeMenu()
        handleNavDown()
    })
})

menuMobile.addEventListener('click', e => {
    showMenuMobile()
})


function showMenuMobile() {
    document.body.style.overflow = "hidden"
    
    if(window.scrollY >91){
        handleNavDown()
    }

    gsap.to('.menu-mobile', {
        top: `${window.scrollY}`,
        duration: 0,
        onComplete () {
            gsap.to('.menu-mobile', {
                display: 'flex',
                transform: 'translate(0%)',
                ease: "power2",
            })
        }
        
        
    })
    
    gsap.to(bodyBlack, {
        display: 'block'
    })

    bodyBlack.addEventListener('click', e => {
        // handleNavUp()
        
        gsap.to(bodyBlack, {
            display: 'none',
            onComplete () {
                document.body.style.overflow = "scroll"
            }
        })
       

    })
}