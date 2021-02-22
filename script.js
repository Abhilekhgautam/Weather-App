const process = () =>{
    if(document.querySelector('.inputBox').value=="")
    {
        document.querySelector('.warning').innerText="Input  field cannot be empty"
        document.querySelector('.warning').style.color="cyan"
    }
    else{
        var input =document.querySelector('.inputBox').value
        document.querySelector('.warning').innerText=""
        fetch(`https://api.weatherapi.com/v1/current.json?key=ea4d5173a7da4d89841162642212102&q=${input}`,{method:'POST'})
        .then(res=>{
            if(res.status===400){
                document.querySelector('.warning').innerText="No data found"
               document.querySelector('.warning').style.color="cyan"
               document.querySelector('.weatherStatus').innerText=""
               document.querySelector('.imageStatus').innerHTML=""
               document.querySelector('.currentTemp').innerText=""
              document.querySelector('.lastUpdated').innerText=""
               return res
            }
            return res.json()
        })
        .then((location)=>{
            console.log(location)
            document.querySelector('.weatherStatus').innerText=`${location.current.condition.text} at ${input}`
            document.querySelector('.imageStatus').innerHTML=`<img src=${location.current.condition.icon} alt="Weather Icon">`
            document.querySelector('.currentTemp').innerText=`Current Temperature:${location.current.temp_c} C`
            document.querySelector('.currentTemp').style.color="red"
            document.querySelector('.lastUpdated').innerText=`Last updated at:${location.current.last_updated}`
            document.querySelector('.lastUpdated').style.color="red"


        })
        .catch((err)=>{
        throw err
        })

    }
}
document.querySelector('.search').addEventListener('click',()=>{
    process()
    
})
document.querySelector('.inputBox').addEventListener('keydown',(event)=>{
if(event.keyCode === 13){
    process()
}
})
