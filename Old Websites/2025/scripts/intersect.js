const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            nav.classList.remove('bg-secondary');
        } else{
            nav.classList.add('bg-secondary');
        }
    })
})

const El=document.getElementById("hero")
const nav=document.querySelector('nav');
observer.observe(El);