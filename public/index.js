

// const input=document.getElementsByClassName("in")
// console.log(input)
// const button=document.getElementsByClassName("but")
// console.log(button[0])

// const result=document.querySelector('.result')
// button[0].addEventListener('click',(e)=>{
//     e.preventDefault()
//     console.log('event fires')
//     if(input[0].value===undefined){
//         result.innerHTML= '<h3 class="address">please provide address</h3>'
//     }
//     else{
//         const address=document.getElementsByClassName("address")
//         result.removeChild(address[0]);
// fetch(`http://localhost:8000/weathers?search=${input.value}`).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error!==undefined){
//             document.querySelector('.result').innerHTML= `<h3 class='address'>an error occured</h3>`
//         }
//         else{
//             document.querySelector('.result').innerHTML=`<h3 class='address'>placename:${data.placename}</h3>
//             <h3 class='address'>temperature:${data.temperature}</h3>`
//         }
//     })
// })
//     }
// })





const form=document.querySelector('form')
console.log(form)
const search=document.querySelector('input');
const message_one=document.querySelector('#message-1')
const message_two=document.querySelector('#message-2')


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    message_one.innerHTML=`<h4>please wait</h4>`;
    message_two.innerHTML=``
    fetch(`http://localhost:8000/weathers?search=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error!==undefined){
                message_one.innerHTML=`<h4>please provide valid address</h4>`
            }
            else{
                console.log(data)
                message_one.innerHTML=``
                message_two.innerHTML=`
                <div class="main"
        style="width:50%;margin:10px auto 0px auto;border:2px solid black;border-radius:15px;background-image:url(weat.jpg);background-color:white;background-size:auto;height:100%;color:black">
        <div class="weathericon"style="margin-top:10px">
            <img src=${data.current.weather_icons[0]} style="border:1px solid orange;border-radius:15px">
        </div>
        <div class="info">
            <h2 class="location"><i class="fa-solid fa-street-view"></i>${data.location.name},${data.location.country}</h2>
            <p class="date">${data.location.localtime}</p>
            <h3 class="temp">Temperature: ${data.current.temperature}°C</h3>
            <h3 class="tempmin_max">Status: ${data.current.weather_descriptions[0]}</h3>
            <h3> Wind Speed:${data.current.wind_speed}</h3>
        </div>
    </div>`
            }
        })
    })
})