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
    removeButtons(splide.length, splide.index)
})

function removeButtons(length, index) {
    if (index + 1 === length) {
        nextButton.style.visibility = "hidden"
    } else {
        nextButton.style.visibility = "visible"
    }

    if (index === 0) {
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

previousButton.addEventListener('click', e => {
    splide.go('<')
    removeButtons(splide.length, splide.index)
})

function pageTo(attr) {

    if (attr === "alktunes") {
        splide.go(0)
        removeButtons(splide.length, splide.index)
    }

    if (attr === "shopee") {
        splide.go(1)
        removeButtons(splide.length, splide.index)
    }

    if (attr === "qrcode") {
        splide.go(2)
        removeButtons(splide.length, splide.index)
    }


}

covers.forEach(cover => {
    cover.addEventListener('click', e => {
        document.body.style.overflow = "hidden"
        const attr = cover.getAttribute('data-cover')


        handleOverBody()
        handleNavDown()
        gsap.fromTo(projectPage, {
            transform: 'translate(0px, -100%)',
            top: `${window.scrollY}px`
        }, {
            display: 'flex',
            transform: "translate(0px, 0%)",
            top: `${window.scrollY}px`,
            height: `80vh`,
            onComplete() {
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

function lightButtons(attr) {

    radialButtons.forEach(button => {
        const btnAttribute = button.getAttribute('data-button')

        if (btnAttribute == attr) {
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

function handleOverBody() {
    gsap.to(bodyBlack, {
        display: 'block',
        duration: .6
    })

}



// INIT NAV 

const navLinks = document.querySelectorAll('.nav-links')

document.querySelector('.logo-name').addEventListener('click', e => {
    gsap.to(window, { duration: 1.3, scrollTo: `#intro`, ease: "power2" })
})

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        const attr = link.getAttribute('data-link')
        if (attr === 'contact') {
            revealContact()
        } else if (attr === 'cv') {

        } else {
            gsap.to(window, { duration: 1.3, scrollTo: { y: `#${attr}`, offsetY: getWidth(attr) }, ease: "power2" })
        }
    })

})

var oldScroll = window.scrollY

function closeBody() {
    gsap.to(bodyBlack, {
        display: 'none'
    })
    document.body.style.overflow = "scroll"
}


window.onscroll = (e) => {
    var currentScrollPosition = window.scrollY

    if (currentScrollPosition <= 91) {
        navNormal()
    }

    if (window.scrollY >= 91) {
        if (oldScroll > currentScrollPosition) {
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

function closeMenu() {
    gsap.to('.menu-mobile', {
        top: `${window.scrollY}px`,
        display: 'none',
        transform: 'translate(100%)',
        ease: "power2",
    })
}

bodyBlack.addEventListener('click', e => {

    closeMenu()
    if (window.scrollY > 91) {
        handleNavUp()

    }


    gsap.to(projectPage, {
        transform: 'translate(0px, -100%)',
        display: 'none'
    })
    document.body.style.overflow = 'scroll'
    gsap.to(bodyBlack, {
        display: 'none'
    })
    closeContact()
})



window.onresize = e => {
    if (window.innerWidth > 770) {

        gsap.fromTo(projectPage, {
            transform: 'translate(0%, 0%)',
            top: `${window.scrollY}px`,
        }, {
            transform: 'translate(0px, -100%)',
            top: `${window.scrollY}px`,
            display: 'none',
            onComplete () {
                closeBody()
            }
        })
        gsap.to('.menu-mobile', {
            display: 'none',
            transform: 'translateX(100%)',
            onComplete () {
               closeBody()
            }
        })

    }
}

function getWidth(attr) {
    if (window.innerWidth <= 700) {
        return 65
    } else {
        if (attr == "about") {
            return 95
        } else {
            return 80
        }
    }
}


// MENU - MOBILE 

const menuMobile = document.querySelector('.nav-menu')
const mobileLinks = document.querySelectorAll('.mobile-link')
// cv = resume
mobileLinks.forEach(link => {
    link.addEventListener('click', e => {
        const attr = link.getAttribute('data-mobile-link')
        if (attr === 'contact') {
            revealContact()
        } else if (attr === 'cv') {
            alert("something else")
        } else {
            gsap.to(window, { duration: 1.3, scrollTo: { y: `#${attr}`, offsetY: getWidth(attr) }, ease: "power2" })
            closeBody()
            closeMenu()
            handleNavDown()
        }
    })
})

menuMobile.addEventListener('click', e => {
    showMenuMobile()
})

function showMenuMobile() {
    document.body.style.overflow = "hidden"

    if (window.scrollY > 91) {
        handleNavDown()
    }

    gsap.to('.menu-mobile', {
        top: `${window.scrollY}`,
        duration: 0,
        onComplete() {
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

        gsap.to(bodyBlack, {
            display: 'none',
            onComplete() {
                document.body.style.overflow = "scroll"
            }
        })


    })
}


// EFFECTS

const introTimeline = gsap.timeline();
introTimeline.to('.fader-right', { transform: 'translat(0%, 0%)', opacity: 1, stagger: 1, duration: .1 })

const aboutTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top center'
    }
})

aboutTimeLine.to('.about-text-top', { opacity: 1 })
    .to('.about-container-stack', { opacity: 1, transform: 'translateX(0%)' })
    .to('.about-card-show', { opacity: 1, transform: 'translateX(0%)', stagger: .1 })

const projectTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: '.project-container',
        start: 'top center',
    }
})

projectTimeLine.to('.proj-cover', {
    opacity: 1,
    transform: 'translateX(0%)',
    duration: 1
})
    .to('.proj-link', { opacity: 1, })

const imgTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'img-cover',
        start: 'top-center',
    }
})
    .to('.img-cover', {
        opacity: 1,
    })
    .to('.cover-link', {
        opacity: 1,
        transform: 'translateY(0%)',
        stagger: .2,
        duration: .1
    })

    .to('.anim-cover-text', { opacity: 1, })
const activityTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.show-activity',
        start: 'top center',
    }
})

activityTimeline.to('.activity-show-cover', {
    opacity: 1,
    transform: 'translateX(0%)',
})
    .to('.activity-img', {
        opacity: 1,
        transform: 'translateX(0%)'
    })
    .to('.activity-txt', {
        opacity: 1,
        transform: 'translateY(0%)'
    })

const closeContactBtn = document.querySelector('.close-contact')

function revealContact() {
    document.body.style.overflow = 'hidden'
    const revealTimeLine = gsap.timeline()
    closeMenu()
    handleNavDown()
    revealTimeLine.to('.cta-contact', {
        width: '90%',
        height: '50%',
        position: 'fixed',
        top: `${window.screenTop}px`,
        display: 'flex',
        opacity: 1,
    })
    .to('.contact-header', {
        opacity: 1,
    })
    .to(bodyBlack, {
        display: 'block'
    })
    .to('.contact-item', {
        opacity : 1,
    })
    .to('.contact-message', {
        opacity: 1,
    })

    bodyBlack.addEventListener('click', e => {
        closeContact()
    })

    closeContactBtn.addEventListener('click', e => {
        closeContact()
    })

}

function closeContact() {
    const closeTimeline = gsap.timeline()

    closeTimeline.to('.contact-header', {
        opacity: 0,
    })
    .to('.contact-item', {
        opacity: 0
    })
    .to('.contact-message', {
        opacity: 0,
    })
    .to('.cta-contact', {
        display: 'none',
        top: `${window.screenTop}px`,
        opacity: 0,
        width: '0%',
        height: '0%'
    })
    
    closeBody()
    handleNavUp()

}