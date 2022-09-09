window.onload = () => {
    const timePdf = gsap.timeline()
    timePdf.to('.pdf-img', {
        opacity: 1,
        transform: 'translateY(0%)',
        duration: 1.5,
        boxShadow: '8px 8px 8px black'
    }).to('.pdf-img', {
        scale: 1
        // boxShadow: '8px 8px 8px black'
    })

}






